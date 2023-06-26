import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza Login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Iniciar sesión/i);
  expect(linkElement).toBeInTheDocument();
});
