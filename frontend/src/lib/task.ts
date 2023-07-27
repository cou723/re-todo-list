import endpoints from './endpoints';
import {type Result, Ok, Err} from 'ts-results';
import {type Task, taskIoType, type ITask} from '../../../backend/common/Task';
import * as t from 'io-ts';

const taskListIoType = t.array(taskIoType);

const httpErrorTypeObject = {
	statusCode: t.number,
	message: t.string,
};

const unknownError = {
	statusCode: 500,
	message: 'Unknown error',
};

const httpErrorIo = t.type(httpErrorTypeObject);

type HttpError = t.TypeOf<typeof httpErrorIo>;

async function fetchWrapper(url: string, body: any = {}, method: 'GET' | 'POST' | 'DELETE' = 'GET'): Promise<Response> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	return fetch(url, {method, headers: {'Content-Type': 'application/json'}, body});
}

type ApiReturnVal<T=void> = Promise<Result<T, HttpError>>;

async function commandTypeRequest(url: string, body: any = {}, method: 'POST' | 'DELETE' = 'POST'): ApiReturnVal {
	const res = await fetchWrapper(url, body, method);
	if (res.ok) {
		return Ok(undefined);
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const error = await res.json();
	if (httpErrorIo.is(error)) {
		return Err(error);
	}

	return Err(unknownError);
}

export async function get(id: number): ApiReturnVal<ITask> {
	const res: any = await fetch(endpoints.task.get(id));

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const data: any = await res.json();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	if (taskIoType.is(data)) {
		return Ok(data);
	}

	if (httpErrorIo.is(data)) {
		return Err(data);
	}

	return Err(unknownError);
}

export async function create(Task: ITask): ApiReturnVal {
	return commandTypeRequest(endpoints.task.base, Task);
}

export async function deleteIt(id: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.base, {id}, 'DELETE');
}

export async function update(id: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.get(id), {}, 'POST');
}

export async function list(): ApiReturnVal<ITask[]> {
	const res: any = await fetch(endpoints.task.list);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const data: any = await res.json();
	if (taskListIoType.is(data)) {
		return Ok(data);
	}

	if (httpErrorIo.is(data)) {
		return Err(data);
	}

	return Err(unknownError);
}

export async function done(id: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.done(id), {}, 'POST');
}

export async function undone(id: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.undone(id), {}, 'POST');
}

export async function parent(id: number, newParent: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.parent(id), {newParent}, 'POST');
}

export async function deleteParent(id: number): ApiReturnVal {
	return commandTypeRequest(endpoints.task.parent(id), {}, 'DELETE');
}
