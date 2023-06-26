import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import { message, Form, Input, Button } from 'antd';

function Login() {
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext)


  const handleSubmit = async (values) => {
    //event.preventDefault();
    try {
      let bodyFormData = new FormData();
      bodyFormData.append("username", values.username);
      bodyFormData.append("password", values.password);
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        body: bodyFormData,
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        login(data)
        if (data.user_type === "trainer") {
          navigate('/home_trainer')
          message.success('Inicio de sesión exitoso!');
        }
        if (data.user_type === "user"){
          navigate('/home_user')
          message.success('Inicio de sesión exitoso!');
        }
      }
      else {
        message.error('Error de las credenciales');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form-container">
    <Form className="login-form" onFinish={handleSubmit}>
      <Form.Item label="Usuario" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="Contraseña" name="password">
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
  
}

export default Login;