import { Button, Modal } from "react-bootstrap";

function ConvertModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons && props.buttons.length > 0 ? (
          props.buttons.map((button, index) => {
            return (
              <Button
                key={index}
                variant={button.color}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            );
          })
        ) : (
          <>
            {props.handleSubmit && (
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={props.handleSubmit}
              >
                Save
              </Button>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConvertModal;
