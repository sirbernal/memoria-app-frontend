import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditSessionModal = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    // Aquí puedes acceder a los valores del formulario y utilizarlos para actualizar la sesión
    const values = form.getFieldsValue();
    console.log(values);
    setIsModalOpen(false);
  }

  const handleCancel = () => {
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
          <Form.Item name="title" label="Titulo">
            <Input autoComplete='off'/>
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input type="textarea" autoComplete='off'/>
          </Form.Item>
          <Form.Item name="sessions_url" label="Url de entrenamiento">
            <Input type="textarea" autoComplete='off'/>
          </Form.Item>
          <Form.Item name="training_details" label="Detalle de entrenamiento">
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
