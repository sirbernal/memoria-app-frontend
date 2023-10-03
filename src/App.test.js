import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import "./setupTests"


const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

test('Renderiza Login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Iniciar sesión/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renderiza pagina de usuarios', () => {
  
  localStorage.setItem('auth', '{"user":"usuario1","user_type":"trainer","trainer_id":2,"associate_user":[1]}')
  //render(<App />);
  const wrapper = shallow(<App />);
  const linkElement = screen.getByText(/Iniciar sesión/i);
  expect(linkElement).toBeInTheDocument();
});
