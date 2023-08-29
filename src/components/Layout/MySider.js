
import { Layout, Menu} from 'antd';
import { UserOutlined, CloseCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@ant-design/icons';

const { Sider } = Layout;

const MyIcon = () => {
    return <img src="trainer.png" alt="trainer" width="20px" height="20px"/>;
};

export const MySider = (auth) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const [collapsed, setCollapsed] = useState(isMobile);
    const user = auth.auth.user
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} collapsedWidth="50px" width="200px">
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={ <UserOutlined />}>
                    {user}
                </Menu.Item>
                <Menu.Item key="2" icon={ <CloseCircleOutlined />}>
                    <Link to="/logout" className="nav-text">Cerrar Sesión</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={ <Icon component={MyIcon}  style={{maxWidth: "50%", maxHeight: "50%"}} />}>
                    <Link to="/view_trainers" className="nav-text">Entrenadores disponibles</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<CalendarOutlined />}>
                    <Link to="/home_trainer" className="nav-text">Sesiones de entrenamiento</Link>
                </Menu.Item>
                
            </Menu>
        </Sider>
    );
}
