import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteSessionModal = ({ session_id, setSessions, sessions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/sesiones/${session_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();

    if (data.deleted_count === 1) {
      message.success('Sesión eliminada');
      setSessions(sessions.filter(e => e._id !== session_id))
    } else {
      message.error('Ha ocurrido un error');
    }
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<DeleteOutlined />}></Button>
      <Modal title="Borrar sesión" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Eliminar" cancelText="Cancelar">
        <p>¿Desea borrar la sesion?</p>
      </Modal>
    </>
  );
}

export default DeleteSessionModal;
