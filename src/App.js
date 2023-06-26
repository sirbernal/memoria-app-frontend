//import 'antd/dist/reset.css';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import { Router } from './Router';
import { ConfigProvider, theme } from 'antd';
//REVISAR: https://stackoverflow.com/questions/68727068/how-do-i-usecontext-hook-on-react-router-v6
import enUS from 'antd/locale/en_US';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          // any theme overirdes
          colorPrimary: '#7f00ff',
        },
        // this line sets it to dark mode
        algorithm: theme.darkAlgorithm,
      }}
      locale={enUS}
    >
    <AuthProvider>
      <Router/>
    </AuthProvider>
  </ConfigProvider>
  );
}

export default App;
