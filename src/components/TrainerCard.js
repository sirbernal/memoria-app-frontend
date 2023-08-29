
import React, { useState } from 'react';
import { ContactsOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal} from 'antd';
const { Meta } = Card;

export const TrainerCard = ({ cover_img, meta_img, name, description, number, email }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Define la función que muestra el modal
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    // Define la función que oculta el modal
    const hideModal = () => {
      setIsModalVisible(false);
    };
  
    // Define la función que se ejecuta al confirmar el modal
    const handleOk = () => {
      console.log('OK');
      hideModal();
    };
  
    // Define la función que se ejecuta al cancelar el modal
    const handleCancel = () => {
      console.log('Cancel');
      hideModal();
    };
    return (
        <>
            <Card
                cover={
                    <img
                        alt="example"
                        src={cover_img}
                    />
                }
                actions={[
                    <ContactsOutlined  onClick={showModal}/>
                ]}
            >
                <Meta
                    avatar={<Avatar src={meta_img} />}
                    title={name}
                    description={description}

                />
            </Card>
            <Modal
                title="Información de contacto"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p>Nombre: {name}</p>
                <p>Teléfono: {number}</p>
                <p>Email: {email}</p>
            </Modal>
        </>

    )
}