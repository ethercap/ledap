import React, { useState, useEffect, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";

const ModalContext = createContext({ closeModal: null });

interface ModalProps extends AntModalProps {
  root?: any;
  container?: any;
}
function Modal(props: ModalProps) {
  const { onClose, children, ...reset } = props;
  const { open, closeModal, root, container, _onClose } =
    useContext(ModalContext);

  const _close = () => {
    closeModal();
  };

  function _afterClose(e) {
    _onClose && _onClose();
    onClose && onClose(e);
  }
  useEffect(() => {
    return () => {
      root?.unmount?.();
    };
  }, []);

  function _onCancel() {
    _close();
  }
  return (
    <AntModal
      destroyOnClose
      open={open}
      afterClose={_afterClose}
      onCancel={_onCancel}
      getContainer={() => container}
      {...reset}
    >
      {children}
    </AntModal>
  );
}
Modal.create = (props) => {
  const { Modal: ModalComponent, onClose, container, ...reset } = props;

  const _container =
    container || document.getElementById("ledap-modal-root") || document.body;
  let div = document.createElement("div");
  _container.append(div);
  const root = ReactDOM.createRoot(div);
  const _onClose = () => {
    // dom清理
    onClose && onClose?.();
    // 在组件内部unmount
    // root.unmount();
    div?.parentNode?.removeChild(div);
    div = null;
  };
  root.render(
    <ModalProvidr root={root} container={_container} _onClose={_onClose}>
      <ModalComponent {...reset} />
    </ModalProvidr>
  );
};

function ModalProvidr(props) {
  const { root, container, _onClose } = props;
  const [open, setOpen] = useState(true);
  function _closeModal() {
    setOpen(false);
  }
  return (
    <ModalContext.Provider
      value={{ closeModal: _closeModal, open, root, container, _onClose }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

Modal.context = ModalContext;

Modal.useModalContext = () => useContext(ModalContext);

Modal.info = AntModal.info;
Modal.success = AntModal.success;
Modal.error = AntModal.error;
Modal.warning = AntModal.warning;
Modal.confirm = AntModal.confirm;
Modal.Provider = ModalProvidr;

export default Modal;
