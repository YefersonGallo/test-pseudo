import { useState }  from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './MenuBar.css'
import { Layout, Menu } from 'antd';
import Chi2 from "./Chi2";
import Variance from "./Variance";
import Means from "./Means";
import KS from "./KS";
import Poker from "./Poker";

function MenuBar(){
    const { Header, Sider } = Layout;
    const [select, setSelect] = useState('1');

    return (
        <Router>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        height: '100vh',
                    }}
                >
                    <Menu theme="dark" mode="inline" selectedKeys={[select]} onClick={(e) => {setSelect(e.key)}}>
                        <Menu.Item key="1">
                            <Link to="/">
                                Prueba de Medias
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/variance">
                                Prueba de Varianza
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/ks">
                                Prueba KS
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/chi2">
                                Prueba Chi^2
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to="/poker">
                                Prueba de Póker
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <h1>Pruebas de Números Pseudoaletorios</h1>
                    </Header>
                    <Switch>
                        <Route exact path="/">
                            <Means />
                        </Route>
                        <Route path="/variance">
                            <Variance />
                        </Route>
                        <Route path="/ks">
                            <KS />
                        </Route>
                        <Route path="/chi2">
                            <Chi2 />
                        </Route>
                        <Route path="/poker">
                            <Poker />
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        </Router>
    );
}
export default MenuBar;
