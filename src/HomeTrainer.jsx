import React from 'react';
//import './home.css';
import { useState, useEffect} from 'react';
import { Layout, theme, Col, Row, Typography} from 'antd';
import { MySider } from './components/Layout/MySider';
import SessionModal from './components/SessionModal';
import EditSessionModal from './components/EditSessionModal'


const { Header, Content, Footer} = Layout;
const { Title } = Typography;

function HomeTrainer() {
  const [sessions, setSessions] = useState([]);
  const { token: { colorBgContainer } } = theme.useToken();

  const auth = JSON.parse(localStorage.getItem("auth"))

  useEffect(() => {
    const userid = auth.associate_user[0]
    const trainerid = auth.trainer_id
    fetch(`${process.env.REACT_APP_API_URL}/sesiones/${userid}/${trainerid}`)
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(() => console.log("x"))
    console.log(auth.trainer_id)
// eslint-disable-next-line
  }, []);

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