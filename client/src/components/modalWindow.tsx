import { Modal, Button } from 'react-bootstrap';

function ModalWindow({ show, handleClose }: { show: boolean, handleClose: () => void }) {
  return (
    <Modal className='d-flex align-items-center' show={show} onHide={handleClose}>
      <Modal.Body>
        <p>You can send a message with a tag. To see a message with a tag, you need to enter this tag.</p>
        <div className='exampleImage'></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
