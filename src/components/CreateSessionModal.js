import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CreateSessionModal = ({ user_id, trainer_id, sessions, setSessions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const new_sesion = {
        title: values.title,
        description: values.description,
        sessions_url: values.sessions_url,
        trainer_id: trainer_id,
        user_id: user_id,
        training_details: values.training_details,
        link_videos: values.link_videos
      }
      console.log(values)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sesiones/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_sesion),
      });
      const data = await response.json();
      new_sesion._id = data.id
      if (response.status === 200) {
        message.success('Sesión agregada');
        setSessions([...sessions, new_sesion])
      }
      setIsModalOpen(false);
    } catch (error) {
      if ("errorFields" in error) {
        console.log("Error al validar el formulario:", error);
      } else {
        console.log("Error al validar el formulario:", error);
        message.error('Problema al actualizar sesión');
        setIsModalOpen(false);
      }


    }

  }

  const handleCancel = () => {
    setIsModalOpen(false);
    message.info('No se ha agregado la sesión');
  }

  const handleClick = () => {
    form.setFieldsValue(sessions[sessions.length - 1]);
  };

  const clearForm = () => {
    form.setFieldsValue({
      title: "",
      description: "",
      sessions_url: "",
      trainer_id: "",
      user_id: "",
      training_details: "",
      link_videos: ""
    });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}><Button type="primary" shape="round" icon={<PlusOutlined />} onClick={showModal} style={{ alignSelf: 'flex-end' }}>Crear sesión</Button></div>
      <Modal title="Crear sesión" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Crear" cancelText="Cancelar">
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item name="title" label="Titulo"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el título de la sesión de entrenamiento",
              },
            ]}>
            <Input autoComplete='off' />
          </Form.Item>
          <Form.Item name="description" label="Descripción"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la description de la sesión de entrenamiento",
              },
            ]}>
            <Input type="textarea" autoComplete='off' />
          </Form.Item>
          <Form.Item name="sessions_url" label="Link de entrenamiento"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el link de entrenamiento de la sesión",
              },
            ]}>
            <Input type="textarea" autoComplete='off' required={true} />
          </Form.Item>
          <Form.Item name="training_details" label="Detalle de entrenamiento"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el detalle de los ejercicios de la sesión de entrenamiento",
              },
            ]}>
            <Input.TextArea type="textarea" autoSize={{
              minRows: 3,
              maxRows: 5,
            }} autoComplete='off' />
          </Form.Item>
          <Form.Item name="link_videos" label="Videos de entrenamiento de referencia">
            <Input.TextArea type="textarea" autoSize={{
              minRows: 3,
              maxRows: 5,
            }} autoComplete='off' />
          </Form.Item>
          <Button type="primary" onClick={handleClick}>
            Rellenar con ultima sesión
          </Button>
          <div style={{ margin: '10px' }}></div>
          <Button type="primary" onClick={clearForm}>
            Limpiar campos
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default CreateSessionModal;
