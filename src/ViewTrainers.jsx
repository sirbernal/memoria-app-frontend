import React, { useEffect, useRef } from 'react';
import { Layout, theme, Col, Row} from 'antd';
import { MySider } from './components/Layout/MySider';
import { TrainerCard } from './components/TrainerCard';



const { Header, Content, Footer } = Layout;


function ViewTrainers() {
  const { token: { colorBgContainer } } = theme.useToken();

  const auth = JSON.parse(localStorage.getItem("auth"))

  console.log(auth)
  const layoutRef = useRef(null);
  
  useEffect(() => {
    // Crea la consulta de medios
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // Define la función que cambia el estilo del Layout
    const handleMediaChange = (e) => {
      if (e.matches) {
        // Si la consulta se cumple, usa style={{ height: '100vh' }}
        layoutRef.current.style.height = '100vh';
      } else {
        // Si la consulta no se cumple, usa el estilo por defecto
        layoutRef.current.style.height = '';
      }
    };

    // Ejecuta la función al montar el componente
    handleMediaChange(mediaQuery);

    // Añade el controlador de eventos al objeto mediaQuery
    mediaQuery.addListener(handleMediaChange);

    // Elimina el controlador de eventos al desmontar el componente
    return () => {
      mediaQuery.removeListener(handleMediaChange);
    };
  }, []);


  return (
    <Layout ref={layoutRef}>
      <MySider auth={auth} />
      <Layout>
        <Header style={{
          padding: 0,
          background: colorBgContainer,
        }}
        />
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Row gutter={ { xs: 8, sm: 16, md: 24, lg: 32 } }>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrainerCard
                  cover_img="https://www.capacitacionesonline.com/blog/wp-content/uploads/2022/01/Alimentos-y-liquidos-para-el-entrenamiento-de-fuerza-2.jpg"
                  meta_img="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-black-male-512.png"
                  name="Jorge Alvarez"
                  description="Entrenamiento de fuerza"
                  number="+569000000111"
                  email="jalvares@mail.com"
                />
                <br></br>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrainerCard
                  cover_img="https://statics-cuidateplus.marca.com/cms/styles/amp_1200x675_16_9/azblob/beneficios-pilates.jpg.webp?itok=h079snsd"
                  meta_img="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-asian-female-512.png"
                  name="Mirta Acosta"
                  description="Entrenamiento de pilates"
                  number="+569000000111"
                  email="acostam@zzmail.com"
                />
                <br></br>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrainerCard
                  cover_img="https://www.ufv.es/cetys/blog/wp-content/uploads/2023/06/joven-haciendo-ejercicios-deportivos-casa-scaled.jpg"
                  meta_img="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-black-female-512.png"
                  name="Andrea Fernandez"
                  description="Entrenamiento de acondicionamiento físico"
                  number="+569000000111"
                  email="ferndand@sawmail.com"
                />
                <br></br>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrainerCard
                  cover_img="https://s2.abcstatics.com/media/bienestar/2019/12/12/calistenia-kKoD--1248x698@abc.jpg"
                  meta_img=" https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-white-male-512.png"
                  name="Miguel Flores"
                  description="Entrenamiento de calistenia"
                  number="+569000000111"
                  email="miguel_flores@mails2.com"
                />
                <br></br>
              </Col>
            </Row>
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

export default ViewTrainers;