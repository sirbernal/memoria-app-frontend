import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function modifyLocalSessions(sessions, id, new_session) {
  let new_sessions = []
  for (let i = 0; i < sessions.length; i++) {
    let session = sessions[i]
    console.log(session)
    console.log(session._id, id)
    console.log(session._id === id)
    if (session._id === id) {
      session.title = new_session.title
      session.description = new_session.description
      session.sessions_url = new_session.sessions_url
      session.trainer_id = new_session.trainer_id
      session.user_id = new_session.user_id
      session.training_details = new_session.training_details
    }
    new_sessions.push(session)
  }
  console.log(new_sessions)
  return new_sessions
}


const EditSessionModal = ({ session, sessions, setSessions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = async () => {
    // Aquí puedes acceder a los valores del formulario y utilizarlos para actualizar la sesión
    try {
      const values = await form.validateFields();

      console.log(values)

      const new_session = {
        title: values.title,
        description: values.description,
        sessions_url: values.sessions_url,
        trainer_id: values.trainer_id,
        user_id: values.user_id,
        training_details: values.training_details,
        link_videos: values.link_videos
      }

      console.log(new_session)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/sesiones/${values._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_session),
      });
      const data = await response.json();
      console.log(data)
      if (response.status === 200) {
        message.success('Sesión actualizada');
        setSessions(modifyLocalSessions(sessions, values._id, new_session))
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
    message.info('No se ha editado la sesión');
    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}></Button>
      <Modal title={session.title} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Editar" cancelText="Cancelar">
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={session}
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
            <Input type="textarea" autoComplete='off' />
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
          <Form.Item name="_id" label="_id" hidden={true} >
          </Form.Item>
          <Form.Item name="trainer_id" label="trainer_id" hidden={true} >
          </Form.Item>
          <Form.Item name="user_id" label="user_id" hidden={true} >
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditSessionModal;
