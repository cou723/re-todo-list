import { For, createSignal } from 'solid-js';

import TaskDeleteFailedModal from './TaskDeleteFailedModal';
import TaskEditButtonGroup from './TaskEditButtonGroup/TaskEditButtonGroup';

import Checkbox from '@/components/util/Checkbox';
import api from '@/lib/api';
import { getAllChildren } from '@/lib/getTaskView';
import { type ITaskView } from '@/types/TaskView';

export const Task = (props: { class?: string; task: ITaskView; reload:any }) => {
  const [showErrorModal, setShowErrorModal] = createSignal(false);
  const [isDone, setIsDone] = createSignal(props.task.isDone);

  const deleteFailed = () => {
    setShowErrorModal(true);
  };

  const handleClick = () => {
    setIsDone(!isDone());
    if (isDone()) api.done(props.task.id);
    else api.undone(props.task.id);
  };

  return (
    <div class={`flex flex-col ${props.class}`}>
      <div class={`flex flex-row justify-between p-3 bg-pri-light rounded-t-xl`}>
        <div class="flex flex-row items-center  ml-4">
          <Checkbox isChecked={isDone} onClick={handleClick} />
          <span class="ml-2 text-2xl font-bold">{props.task.title}</span>
        </div>
        <TaskEditButtonGroup
          childTaskIdList={getAllChildren(props.task).map((task) => task.id)}
          id={props.task.id}
          failedDelete={deleteFailed}
          reload={props.reload}
        />
      </div>
      <div class="bg-slate-100 p-5 border rounded-b-xl">
        <div class="mb-3">{props.task.description}</div>

        <For each={props.task.children}>{(child) => <Task class="pl-7" task={child} reload={props.reload}/>}</For>
        <TaskDeleteFailedModal
          show={showErrorModal()}
          handleClose={() => setShowErrorModal(false)}
        />
      </div>
    </div>
  );
};

export default Task;
