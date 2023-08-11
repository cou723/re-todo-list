import { ICreateTaskDto } from 'common';
import { mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import Button from '../util/Button';

import ParentTaskSelect from './ParentTaskSelect';

import TextInput from '@/components/util/TextInput';

const TaskEditor = (props: {
  default?: ICreateTaskDto;
  id?: number;
  onSend: (task: ICreateTaskDto) => void;
  sendLabel: string;
}) => {
  const merged = mergeProps(
    {
      default: {
        description: '',
        title: '',
      },
    },
    props,
  );

  const [currentTask, setTask] = createStore<ICreateTaskDto>(merged.default);

  function generateSetTaskProps<T extends keyof ICreateTaskDto>(key: T) {
    return (value: string) => setTask(key, value);
  }

  return (
    <div class="flex flex-col gap-4">
      <TextInput
        label="タイトル"
        accessor={() => currentTask.title}
        setter={generateSetTaskProps('title')}
        full
      />
      <TextInput
        label="説明"
        accessor={() => currentTask.description}
        setter={generateSetTaskProps('description')}
        full
      />
      <ParentTaskSelect currentTask={currentTask} setTask={setTask} id={props.id} full />
      <Button onClick={() => props.onSend(currentTask)}>{props.sendLabel}</Button>
    </div>
  );
};

export default TaskEditor;
