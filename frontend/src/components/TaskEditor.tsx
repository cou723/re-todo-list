import { ITask, Task } from '../../../backend/common/Task';
import TextInput from './TextInput';
import { createStore } from 'solid-js/store';
import { Button, Form } from 'solid-bootstrap';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';
import { For, createResource, mergeProps, Show } from 'solid-js';
import { Result } from 'ts-results';
import api from '../lib/api';
import { getTaskViewTree } from '../lib/getTaskView';
import { ITaskView, TaskView } from '../types/TaskView';

const TaskEditor = (props: {
  onSend: (task: ICreateTaskDto) => void;
  default?: ICreateTaskDto;
  sendLabel: string;
  id?: number;
}) => {
  const merged = mergeProps(
    {
      default: {
        title: '',
        description: '',
      },
    },
    props,
  );
  console.log('task:', props.default);

  const [currentTask, setTask] = createStore<ICreateTaskDto>(merged.default);

  function generateSetTaskProps<T extends keyof ITask>(key: T) {
    return (value: string) => setTask({ ...currentTask, [key]: value });
  }

  const [parentTaskList] = createResource(true, async () => {
    const data = await api.list();
    let tasks: ITaskView[] = [];
    if (data.ok) {
      const taskTree: Result<ITaskView[], void> = getTaskViewTree(
        data.val.map((task) => new TaskView(Task.fromObject(task))),
      );
      if (taskTree.ok) tasks = taskTree.val;
    } else window.location.href = '/login';

    return tasks.filter((task) => task.id != props.id);
  });

  return (
    <>
      <TextInput
        label="タイトル"
        value={() => currentTask.title}
        setValue={generateSetTaskProps('title')}
      />
      <TextInput
        label="説明"
        value={() => currentTask.description}
        setValue={generateSetTaskProps('description')}
      />
      <Form>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) =>
            setTask({
              ...currentTask,
              parentId:
                e.currentTarget.value == 'undefined'
                  ? undefined
                  : parseInt(e.currentTarget.value),
            })
          }
        >
          <Show when={parentTaskList()}>
            <For each={parentTaskList()}>
              {(parentTask) => (
                <option
                  selected={parentTask.id == currentTask.parentId}
                  value={parentTask.id}
                >
                  {parentTask.title}
                  {/* :{_task.id == task.parent ? 'ok' : 'no'}:
                  {_task.id}:{task.parent} */}
                </option>
              )}
            </For>
            <option
              selected={currentTask.parentId === undefined}
              value={undefined}
            >
              なし
            </option>
          </Show>
        </select>
      </Form>
      <Button onClick={() => props.onSend(currentTask)}>
        {props.sendLabel}
      </Button>
    </>
  );
};

export default TaskEditor;
