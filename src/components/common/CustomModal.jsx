import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-bootstrap/Modal";

const CustomModal = forwardRef(({ show, onHide, title, children }, ref) => {
  CustomModal.displayName = "CustomModal";
  const [showModal, setShowModal] = useState(show);
  useImperativeHandle(ref, () => ({
    open: () => setShowModal(true),
    close: () => setShowModal(false),
  }));
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        onHide && onHide();
      }}
      centered={true}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton style={{ backgroundColor: "#EEF1F5" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ backgroundColor: "#EEF1F5", borderRadius: "0 0 10px 10px" }}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
});

CustomModal.displayName = "CustomModal";

export default CustomModal;
