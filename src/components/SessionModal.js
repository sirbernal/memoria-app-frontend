import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const SessionModal = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
    <div style={{display: "flex", justifyContent: "center"}}>
      <Button type="primary" onClick={showModal} icon={<InfoCircleOutlined />} style={ {marginRight: "5px", marginLeft: "auto"}}>
      </Button>
      <Modal title={session.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> 
      
        <p>{session.description}</p>
        <p>Link sesion: <a href={session.sessions_url}>{session.sessions_url}</a></p>
      
      </Modal>
    </div>  
    </>
  );
}

export default SessionModal;
