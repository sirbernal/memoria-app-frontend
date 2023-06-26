import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import { LoginFormPage, intlMap } from '@ant-design/pro-components';
import { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import ProForm, { LoginForm } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined, InfoOutlined } from '@ant-design/icons'
import { message, Form, Input, Button } from 'antd';

function Login() {
  const navigate = useNavigate(); 
  const { login, isAuthenticated } = useContext(AuthContext)


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


 /* return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
  */



  const onFinish = (values) => {
      console.log(values);
    };

  /*
  return (
    <LoginFormPage
    backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
    title="Iniciar Sesión"
    subTitle="Ingrese credenciales"
    submitter={{
      searchConfig: {
        submitText: "Entrar"
      }
    }

  }
    onFinish={handleSubmit}
    >
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Nombre de usuario'}
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu nombre de usuario!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Contraseña'}
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu contraseña!',
          },
        ]}
      />
    
    </LoginFormPage>
  ); 
  
*/
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

/*
    <LoginForm
      title="Iniciar Sesion"
      onFinish={onFinish}
      submitter={{
        searchConfig: {
          submitText: 'Iniciar sesión',
        },
        render: (_, dom) => dom.pop(),
        submitButtonProps: {
          size: 'large',
          style: {
            width: '100%',
          },
        },
      }}
    >

    </LoginForm>

      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Nombre de usuario'}
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu nombre de usuario!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
        }}
        placeholder={'Contraseña'}
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu contraseña!',
          },
        ]}
      />
*/
export default Login;