
import React, { useState } from 'react';
import { ContactsOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal, Row, Col  } from 'antd';
import { YoutubeOutlined, LinkedinOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';
const { Meta } = Card;

export const TrainerCard = ({ cover_img, meta_img, name, short_description, full_description, number, email, socials }) => {
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
                    <ContactsOutlined onClick={showModal} />
                ]}
            >
                <Meta
                    avatar={<Avatar src={meta_img} />}
                    title={name}
                    description={short_description}

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
                <p>Descripción: {full_description}</p>
                <p>Teléfono: <a href={`tel:${number}`}>{number}</a></p>
                <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                {}
                <p>Redes sociales:</p>
                <Row justify="space-around">
                    <Col>
                        <a href={socials.youtube} target="_blank" rel="noreferrer">
                            <YoutubeOutlined style={{ fontSize: '16px' }} />
                        </a>
                    </Col>
                    <Col>
                        <a href={socials.linkedin} target="_blank" rel="noreferrer">
                            <LinkedinOutlined style={{ fontSize: '16px'}} />
                        </a>
                    </Col>
                    <Col>
                        <a href={socials.instagram} target="_blank" rel="noreferrer">
                            <InstagramOutlined style={{ fontSize: '16px'}} />
                        </a>
                    </Col>
                    <Col>
                        <a href={socials.facebook} target="_blank" rel="noreferrer">
                            <FacebookOutlined style={{ fontSize: '16px'}} />
                        </a>
                    </Col>
                    <Col>
                        <a href={`https://wa.me/${number}`} target="_blank" rel="noreferrer">
                            <WhatsAppOutlined style={{ fontSize: '16px'}} />
                        </a>
                    </Col>

                    
                </Row>
            </Modal>
        </>

    )
}