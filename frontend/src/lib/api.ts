import endpoints from './endpoints';
import { type Result, Ok, Err } from 'ts-results';
import { taskIoType, type ITask } from '../../../backend/common/Task';
import * as t from 'io-ts';
import {
  type HttpError,
  httpErrorIo,
  unknownFormatError,
} from '../types/httpError';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';

const taskListIoType = t.array(taskIoType);

export async function fetchWithHeader(
  url: string,
  body: any = {},
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
): Promise<Response> {
  let payload: {
    method: 'GET' | 'POST' | 'DELETE';
    headers: any;
    credentials: 'include';
    body?: any;
  } = {
    method,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (method !== 'GET') payload = { ...payload, body: JSON.stringify(body) };
  return fetch(url, payload);
}

type ApiReturnVal<T = void> = Promise<Result<T, HttpError>>;

// CommandTypeRequestとはpostやdeleteなどの返り値にデータを要求していないものにつかうラッパー
async function commandTypeRequest(
  url: string,
  body: any = {},
  method: 'POST' | 'DELETE' = 'POST',
): ApiReturnVal {
  const res = await fetchWithHeader(url, body, method);
  if (res.ok) {
    return Ok(undefined);
  }

  const error = await res.json();
  if (httpErrorIo.is(error)) {
    return Err(error);
  }

  return Err(unknownFormatError);
}

async function get(id: number): ApiReturnVal<ITask> {
  const res: any = await fetchWithHeader(endpoints.task.one(id));

  // Errorハンドリングめんどくさいので放置
  const data: any = await res.json();
  if (taskIoType.is(data)) return Ok(data);
  if (httpErrorIo.is(data)) return Err(data);

  return Err(unknownFormatError);
}

async function create(task: ICreateTaskDto): ApiReturnVal {
  return commandTypeRequest(endpoints.task.base, task);
}

async function deleteIt(id: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.base + '/' + id, {}, 'DELETE');
}

async function update(id: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.one(id), {}, 'POST');
}

async function list(): ApiReturnVal<ITask[]> {
  const res: any = await fetchWithHeader(endpoints.task.list);

  const data: any = await res.json();
  if (taskListIoType.is(data)) return Ok(data);

  if (httpErrorIo.is(data)) return Err(data);

  return Err(unknownFormatError);
}

async function done(id: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.done(id), {}, 'POST');
}

async function undone(id: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.undone(id), {}, 'POST');
}

async function addParent(id: number, newParent: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.parent(id), { newParent }, 'POST');
}

async function deleteParent(id: number): ApiReturnVal {
  return commandTypeRequest(endpoints.task.parent(id), {}, 'DELETE');
}

async function login(username: string, password: string) {
  return commandTypeRequest(endpoints.login, { username, password }, 'POST');
}

async function logout() {
  return commandTypeRequest(endpoints.logout, {}, 'POST');
}

async function register(username: string, password: string) {
  return commandTypeRequest(endpoints.register, { username, password }, 'POST');
}

async function deleteAccount() {
  return commandTypeRequest(endpoints.user, {}, 'DELETE');
}

const api = {
  get,
  create,
  deleteIt,
  update,
  list,
  done,
  undone,
  addParent,
  deleteParent,
  login,
  logout,
  register,
  deleteAccount,
};

export default api;
