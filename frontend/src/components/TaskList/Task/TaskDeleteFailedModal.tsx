import Modal from '@/components/util/Modal';

const TaskDeleteFailedModal = (props: { show: boolean; handleClose: () => void }) => {
  return <Modal content="タスクの削除に失敗しました" onClick={props.handleClose} />;
};

export default TaskDeleteFailedModal;
