import { ITask } from '@/../../backend/common/Task';
import TextInput from '@/components/TextInput';
import { createStore } from 'solid-js/store';
import { Button, Form } from 'solid-bootstrap';
import { ICreateTaskDto } from '@/../../backend/src/task/createTaskDto';
import { mergeProps } from 'solid-js';
import ParentTaskSelect from './ParentTaskSelect';

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

  function generateSetTaskProps<T extends keyof ITask>(key: T) {
    return (value: string) => setTask({ ...currentTask, [key]: value });
  }

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
        <ParentTaskSelect
          currentTask={currentTask}
          setTask={setTask}
          id={props.id}
        />
      </Form>
      <Button onClick={() => props.onSend(currentTask)}>
        {props.sendLabel}
      </Button>
    </>
  );
};

export default TaskEditor;
