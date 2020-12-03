import { useState }  from 'react';
import 'antd/dist/antd.css';
import './MenuBar.css'
import { Layout, Menu } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function MenuBar(){
    const { Header, Sider, Content } = Layout;
    const [select, setSelect] = useState('1');
    const [numbers, setNumbers] = useState([]);

    let read_file=(file)=>{
        var reader = new FileReader()
        reader.onload = function (event) {
            setNumbers(event.target.result.split('\n'));
        }
        reader.readAsText(file);
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    height: '100vh',
                }}
            >
                <Menu theme="dark" mode="inline" selectedKeys={[select]} defaultSelectedKeys={["1"]} onClick={(e) => {setSelect(e.key)}}>
                    <Menu.Item key="1">
                        Prueba de Medias
                    </Menu.Item>
                    <Menu.Item key="2">
                        Prueba de Varianza
                    </Menu.Item>
                    <Menu.Item key="3">
                        Prueba KS
                    </Menu.Item>
                    <Menu.Item key="4">
                        Prueba Chi^2
                    </Menu.Item>
                    <Menu.Item key="5">
                        Prueba de Póker
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <h1>Pruebas de Números Pseudoaletorios</h1>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Upload
                            accept=".txt"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                            beforeUpload={file => read_file(file)}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        <div
                            className={numbers.length!==0?"":"is-hidden"}
                        >
                            {numbers.map(num =>
                                <h1>{num} -</h1>
                        )}</div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
export default MenuBar;
