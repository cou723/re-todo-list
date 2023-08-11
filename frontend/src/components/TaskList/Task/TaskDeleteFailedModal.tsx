import Modal from '@/components/util/Modal';

const TaskDeleteFailedModal = (props: { handleClose: () => void; show: boolean }) => {
  return <Modal content="タスクの削除に失敗しました" onClick={props.handleClose} />;
};

export default TaskDeleteFailedModal;
