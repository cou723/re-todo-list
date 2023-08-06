import TextInput from '@/components/utils/TextInput';
import { createStore } from 'solid-js/store';
import { ICreateTaskDto } from '@/../../backend/src/task/createTaskDto';
import { mergeProps } from 'solid-js';
import ParentTaskSelect from './ParentTaskSelect';
import Button from '../utils/Button';

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
      />
      <TextInput
        label="説明"
        accessor={() => currentTask.description}
        setter={generateSetTaskProps('description')}
      />
      <ParentTaskSelect
        currentTask={currentTask}
        setTask={setTask}
        id={props.id}
      />
      <Button onClick={() => props.onSend(currentTask)}>
        {props.sendLabel}
      </Button>
    </div>
  );
};

export default TaskEditor;
