import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Button, Modal, Layout, Menu, theme, Col, Row, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { MySider } from './components/Layout/MySider';
import { AuthContext } from './components/AuthContext';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

/*
const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Cerrar sesión', '3', <CloseCircleOutlined />),
  ])
];
*/
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function HomeUser() {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  const auth = JSON.parse(localStorage.getItem("auth"))

  console.log(auth)
  
  useEffect(() => {
    const userid = auth.user_id
    const trainerid = auth.associate_trainer
    fetch(`${process.env.REACT_APP_API_URL}/sesiones/${userid}/${trainerid}`)
      .then(response => response.json())
      .then(data => setSessions(data));
  }, []); 

  const [activeSession, setActiveSession] = useState(null);

  const handleSessionClick = (id) => {
    setActiveSession(id === activeSession ? null : id);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
                  <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Button type="primary" onClick={showModal} icon={<InfoCircleOutlined />}></Button>
                    <Modal title={session.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <p>{session.description}</p>
                      <p>Link sesion: <a href={session.sessions_url}>{session.sessions_url}</a></p>
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

export default HomeUser;