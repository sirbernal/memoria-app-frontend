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
  console.log(session.training_details)

  const training_details_array = session.training_details.split("\n")

  return (
    <>
    <div style={{display: "flex", justifyContent: "center"}}>
      <Button type="primary" onClick={showModal} icon={<InfoCircleOutlined />} style={ {marginRight: "5px", marginLeft: "auto"}}>
      </Button>
      <Modal title={session.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Cerrar" cancelButtonProps={{ style: { display: 'none' } }}> 
      
        <p>{session.description}</p>
        <p>Link sesion: <a href={session.sessions_url}>{session.sessions_url}</a></p>
        <ul>
        {training_details_array.map( (details) => (
          <li> {details} </li>
        )
        )}
        </ul>
      
      </Modal>
    </div>  
    </>
  );
}

export default SessionModal;
