import React from 'react';
//import './home.css';
import { useState, useEffect} from 'react';
import { Button, Modal, Layout, theme, Col, Row, Typography, Form, Input, message } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import { MySider } from './components/Layout/MySider';
import SessionModal from './components/SessionModal';
import EditSessionModal from './components/EditSessionModal'


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
      .then(data => setSessions(data))
      .catch(() => console.log("x"))
    console.log(auth.trainer_id)
  }, []);


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
        <Content style={{ padding: '0 10px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {sessions.map((session) => (
              <>
                <Row justify="center" align="stretch" style={{margin: "1rem"}}>
                  <Col span={12}>
                    <Title level={4} style={{margin: "0"}}>{session.title}</Title>
                  </Col>
                  <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', alignContent: "space-around", flexWrap: "wrap"}} >
                    <SessionModal session={session}></SessionModal>
                    <EditSessionModal session={session} />
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