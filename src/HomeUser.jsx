import React from 'react';
import { useState, useEffect} from 'react';
import { Layout, theme, Col, Row, Typography } from 'antd';
import { MySider } from './components/Layout/MySider';
import SessionModal from './components/SessionModal';

const { Header, Content, Footer} = Layout;
const { Title } = Typography;

function HomeUser() {
  const [sessions, setSessions] = useState([]);
  const { token: { colorBgContainer } } = theme.useToken();

  const auth = JSON.parse(localStorage.getItem("auth"))

  console.log(auth)
  
  useEffect(() => {
    const userid = auth.user_id
    const trainerid = auth.associate_trainer
    fetch(`${process.env.REACT_APP_API_URL}/sesiones/${userid}/${trainerid}`)
      .then(response => response.json())
      .then(data => setSessions(data));
  }, [auth.associate_trainer, auth.user_id]); 


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
                <Row justify="center" align="stretch" className='justify-content-center align-item-center' style={{margin: "1rem"}}>
                  <Col span={12}>
                    <Title level={4} style={{margin: "0"}}>{session.title}</Title>
                  </Col>
                  <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', alignContent: "space-around", flexWrap: "wrap"}} >
                  <SessionModal session={session}></SessionModal>
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