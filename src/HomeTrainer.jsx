import React from 'react';
//import './home.css';
import { useState, useEffect} from 'react';
import { Button, Modal, Layout, theme, Col, Row, Typography, Form, Input, message } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { MySider } from './components/Layout/MySider';


const { Header, Content, Footer} = Layout;
const { Title } = Typography;

function HomeTrainer() {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const [form] = Form.useForm();

  const auth = JSON.parse(localStorage.getItem("auth"))

  useEffect(() => {
    const userid = auth.associate_user[0]
    const trainerid = auth.trainer_id
    fetch(`${process.env.REACT_APP_API_URL}/sesiones/${userid}/${trainerid}`)
      .then(response => response.json())
      .then(data => setSessions(data));
  }, [auth.associate_user, auth.trainer_id]);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModal2Open(true);
  };

  const handleOk2 = async () => {
    try {
      const values = await form.validateFields();
      
      console.log(values)

      const response = await fetch(`${process.env.REACT_APP_API_URL}/sesiones/${values._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          sessions_url: values.sessions_url,
          trainer_id: values.trainer_id,
          user_id: values.user_id,
          training_details: values.training_details
        }),
      });
      const data = await response.json();
      console.log(data)
      if (response.status === 200) {
        message.success('Sesión actualizada');
      }

      
    } catch (error) {
      console.log("Error al validar el formulario:", error);
      message.error('Problema al actualizar sesión');
    }
    setIsModal2Open(false);
  };

  const handleCancel2 = () => {
    setIsModal2Open(false);
  };


  return (
    <Layout style={{ height: "100vh" }}>
      <MySider auth={auth} />
      <Layout>
        <Header style={{
          padding: 0,
          background: colorBgContainer,
        }}
        />
        <Content style={{ padding: '0 50px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {sessions.map((session) => (
              <>
                <Row justify="center" align="stretch">
                  <Col span={12}>
                    <Title level={4}>{session.title}</Title>
                  </Col>
                  <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', alignContent: "space-around", flexWrap: "wrap"}} >
                    <Button type="primary" onClick={showModal} icon={<InfoCircleOutlined />}></Button>
                    <Modal title={session.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <p>{session.description}</p>
                      <p>Link sesion: <a href={session.sessions_url}>{session.sessions_url}</a></p>
                    </Modal>
                    <Button type="primary" onClick={showModal2} icon={<EditOutlined />}></Button>
                    <Modal title={session.title} open={isModal2Open} onOk={handleOk2} onCancel={handleCancel2} okText="Editar" cancelText="Cancelar">
                      <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={session}
                      >
                        <Form.Item name="title" label="Titulo">
                          <Input defaultValue={session.title} autoComplete='off'/>
                        </Form.Item>
                        <Form.Item name="description" label="Descripción">
                          <Input type="textarea" defaultValue={session.description} autoComplete='off'/>
                        </Form.Item>
                        <Form.Item name="sessions_url" label="Url de entrenamiento">
                          <Input type="textarea" defaultValue={session.sessions_url} value={session.sessions_url} autoComplete='off'/>
                        </Form.Item>
                        <Form.Item name="training_details" label="Detalle de entrenamiento">
                          <Input.TextArea type="textarea" defaultValue={session.sessions_url} autoSize={{
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
                  </Col>
                </Row>

              </>
            ))}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Memoria Cristian Bernal
        </Footer>
      </Layout>
    </Layout>
  );
}

export default HomeTrainer;