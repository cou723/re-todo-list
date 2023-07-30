import { ITask } from '../../../backend/common/Task';
import TextInput from './TextInput';
import { createStore } from 'solid-js/store';
import { Button } from 'solid-bootstrap';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';
const TaskEditor = (props: {
  onSend: (task: ICreateTaskDto) => void;
  default?: ICreateTaskDto;
  sendLabel: string;
}) => {
  const [task, setTasks] = createStore<ICreateTaskDto>(
    props.default ?? {
      title: '',
      description: '',
    },
  );
  function generateSetTaskProps<T extends keyof ITask>(key: T) {
    return (value: string) => setTasks({ ...task, [key]: value });
  }
  return (
    <>
      <TextInput
        label="タイトル"
        value={() => task.title}
        setValue={generateSetTaskProps('title')}
      />
      <TextInput
        label="説明"
        value={() => task.description}
        setValue={generateSetTaskProps('description')}
      />
      <Button onClick={() => props.onSend(task)}>{props.sendLabel}</Button>
    </>
  );
};

export default TaskEditor;
