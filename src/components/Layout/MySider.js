
import { Layout, Menu} from 'antd';
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;

export const MySider = (auth) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const [collapsed, setCollapsed] = useState(isMobile);
    const user = auth.auth.user
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={ <UserOutlined />}>
                    {user}
                </Menu.Item>
                <Menu.Item key="2" icon={ <CloseCircleOutlined />}>
                    <Link to="/logout" className="nav-text">Cerrar Sesión</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
