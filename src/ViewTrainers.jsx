import React, { useEffect, useRef, useState } from 'react';
import { Layout, theme, Col, Row, Input } from 'antd';
import { MySider } from './components/Layout/MySider';
import { TrainerCard } from './components/TrainerCard';



const { Header, Content, Footer } = Layout;


function ViewTrainers() {
  const { token: { colorBgContainer } } = theme.useToken();

  const auth = JSON.parse(localStorage.getItem("auth"))

  const [searchTerm, setSearchTerm] = useState('');
  const [trainerContact, setTrainerContact] = useState([]);

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/trainer_contact`)
      .then(response => response.json())
      .then(data => setTrainerContact(data))
      .catch(() => console.log("x"))
    console.log(trainerContact)
// eslint-disable-next-line
  }, []);

/*  const cards = [
    {
      cover_img: "https://www.capacitacionesonline.com/blog/wp-content/uploads/2022/01/Alimentos-y-liquidos-para-el-entrenamiento-de-fuerza-2.jpg",
      meta_img: "https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-black-male-512.png",
      name:  "Jorge Alvarez",
      short_description: "Entrenamiento de fuerza",
      number: "+569000000111",
      email: "jalvares@mail.com",
      full_description: "",
      socials: {
        instagram: "https://www.instagram.com/josefloresfitness/?hl=es-la",
        whatsapp: "+569000000111",
        facebook: "https://es-la.facebook.com/JorgeLoveritaRamirezEntrenador",
        linkedin: "https://cl.linkedin.com/in/robert-rivera-4b8a83a5",
        youtube: "https://www.youtube.com/watch?v=9juytn-FgN0&pp=ygUgcHJlc2VudGFjaW9uIGVudHJlbmFkb3IgcGVyc29uYWw%3D",
      }
    },
    {
      cover_img: "https://statics-cuidateplus.marca.com/cms/styles/amp_1200x675_16_9/azblob/beneficios-pilates.jpg.webp?itok=h079snsd",
      meta_img: "https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-asian-female-512.png",
      name:  "Mirta Acosta",
      short_description: "Entrenamiento de pilates",
      number: "+569000000111",
      email: "acostam@zzmail.com",
      full_description: "",
      socials: {
        instagram: "https://www.instagram.com/malagaentrena/",
        whatsapp: "+569000000111",
        facebook: "https://es-la.facebook.com/JorgeLoveritaRamirezEntrenador",
        linkedin: "https://cl.linkedin.com/in/karen-a-cea-carvajal-a4b0b57b",
        youtube: "https://www.youtube.com/watch?v=tFwQx9hkkkI&pp=ygUgcHJlc2VudGFjaW9uIGVudHJlbmFkb3IgcGVyc29uYWw%3D",
      }
    },
    {
      cover_img: "https://www.ufv.es/cetys/blog/wp-content/uploads/2023/06/joven-haciendo-ejercicios-deportivos-casa-scaled.jpg",
      meta_img: "https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-black-female-512.png",
      name:  "Andrea Fernandez",
      short_description: "Entrenamiento de acondicionamiento físico",
      number: "+569000000111",
      email: "ferndand@sawmail.com",
      full_description: "Acondicionamiento full body, tengo disponibilidad horarios Lunes a Viernes desde 10:00-12:00",
      socials: {
        instagram: "https://www.instagram.com/malagaentrena/",
        whatsapp: "+569000000111",
        facebook: "https://es-la.facebook.com/JorgeLoveritaRamirezEntrenador",
        linkedin: "https://cl.linkedin.com/in/karen-a-cea-carvajal-a4b0b57b",
        youtube: "https://www.youtube.com/watch?v=tFwQx9hkkkI&pp=ygUgcHJlc2VudGFjaW9uIGVudHJlbmFkb3IgcGVyc29uYWw%3D",
      }
    },
    {
      cover_img: "https://s2.abcstatics.com/media/bienestar/2019/12/12/calistenia-kKoD--1248x698@abc.jpg",
      meta_img: "https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-05/64/fitness-trainer-white-male-512.png",
      name:  "Miguel Flores",
      short_description: "Entrenamiento de calistenia",
      number: "+569000000111",
      email: "miguel_flores@mails2.com",
      full_description: "Entrenamiento enfocado a la fuerza en calistenia, tengo disponibilidad horarios Lunes a Viernes desde 10:00-12:00",
      socials: {
        instagram: "https://www.instagram.com/josefloresfitness/?hl=es-la",
        whatsapp: "569000000111",
        facebook: "https://es-la.facebook.com/JorgeLoveritaRamirezEntrenador",
        linkedin: "https://cl.linkedin.com/in/robert-rivera-4b8a83a5",
        youtube: "https://www.youtube.com/watch?v=uD5fCf6b7AY&pp=ygUgcHJlc2VudGFjaW9uIGVudHJlbmFkb3IgcGVyc29uYWw%3D",
      }
    }
  ]
*/
  function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

  const filterCards = (cards, searchTerm) => {
    return cards.filter((card) =>
    eliminarDiacriticos(card.name).toLowerCase().includes(searchTerm.toLowerCase()) || eliminarDiacriticos(card.short_description).toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Función para manejar el cambio en el input de búsqueda
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

            <Input
              placeholder="Buscar por nombre o descripción"
              value={searchTerm}
              onChange={handleChange}
            />
            <div style={{ margin: '10px' }}></div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {filterCards(trainerContact, searchTerm).map((tc, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <TrainerCard
                  cover_img= {tc.cover_img}
                  meta_img= {tc.meta_img}
                  name= {tc.name}
                  short_description={tc.short_description}
                  full_description={tc.full_description}
                  number={tc.number}
                  email={tc.email}
                  socials={tc.socials}
                />
                <br></br>
              </Col>
              ))}
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