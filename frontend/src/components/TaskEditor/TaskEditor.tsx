import { ICreateTaskDto } from 'common';
import { mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';

import Button from '../util/Button';

import ParentTaskSelect from './ParentTaskSelect';

import TextInput from '@/components/util/TextInput';

const TaskEditor = (props: {
  default?: ICreateTaskDto;
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

  return (
    <div class="flex flex-col gap-4">
      <TextInput
        label="タイトル"
        accessor={() => currentTask.title}
        setter={(value: string) => setTask('title', value)}
        full
      />
      <TextInput
        label="説明"
        accessor={() => currentTask.description}
        setter={(value: string) => setTask('description', value)}
        full
      />
      <ParentTaskSelect currentTask={currentTask} setTask={setTask} full />
      <Button onClick={() => props.onSend(currentTask)}>{props.sendLabel}</Button>
    </div>
  );
};

export default TaskEditor;
