import { Button, Modal } from 'solid-bootstrap';

const TaskDeleteFailedModal = (props: {
  show: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>タスクの削除に失敗しました</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDeleteFailedModal;
