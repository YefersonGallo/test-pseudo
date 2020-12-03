import {useEffect, useState} from 'react';
import {Button, Col, Layout, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Card} from "antd/es";

function Poker(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [passTest, setPassTest] = useState('');
    const [chi2, setChi2] = useState('');
    const [sum, setSum] = useState('');
    const [d, setD] = useState([]);
    const [f, setF] = useState([]);
    const [k, setK] = useState([]);
    const [o, setO] = useState([]);
    const [p, setP] = useState([]);
    const [q, setQ] = useState([]);
    const [t, setT] = useState([]);

    useEffect(() =>{
        fetch('https://dcb-node-deploy-poker.herokuapp.com/ping')
            .then(res => res.json())
    });

    let read_file=(file)=>{
        var reader = new FileReader()
        reader.onload = function (event) {
            setNumbers(event.target.result.split('\n'));
        }
        reader.readAsText(file);
    }

    let send_request = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listRi: numbers})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/pokertest', requestOptions)
        const res = await responseP.json();
        setPassTest(res.isOk)
        setChi2(res.chi2)
        setSum(res.sum)
        setD(res.results.D)
        setF(res.results.F)
        setK(res.results.K)
        setO(res.results.O)
        setP(res.results.P)
        setQ(res.results.Q)
        setT(res.results.T)
    }

    const columns = [
        {
            title: 'Oi',
            dataIndex: 'Oi',
            key: 'Oi',
        },
        {
            title: 'Prob',
            dataIndex: 'Prob',
            key: 'Prob',
        },
        {
            title: 'Ei',
            dataIndex: 'Ei',
            key: 'Ei',
        },
        {
            title: 'Chi2',
            dataIndex: 'Chi2',
            key: 'Chi2',
        },
    ]

    let to_render_d = (arr) =>{
        var result = []
        result.push({'Oi':arr.Oi, 'Prob':arr.Prob, 'Ei':arr.Ei, 'Chi2':arr.Chi2})
        return result
    }


    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba de Póker</p>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <p>A continuación suba un archivo de los números donde se encuentran cada uno en una línea, es decir la separeción sea un salto de línea</p>
                    <Upload
                        accept=".txt"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        beforeUpload={file => read_file(file)}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {send_request()}}>
                        Validar números
                    </Button>
                </div>
                <Row style={{ paddingTop: 10 }}>
                    <Col hidden={numbers.length===0} span={12}>
                        <h1>Los números ingresados son:</h1>
                        {numbers.map(num =>
                            <h1>{num.toFixed(5)}</h1>
                        )}
                    </Col>
                    <Col hidden={passTest===''} span={12}>
                        <Card title="Superó prueba" style={{ width: 200, marginBottom: 5 }}>
                            <p>{passTest?"Pasó la prueba":"No pasó la prueba"}</p>
                        </Card>
                        <Card title="Chi2" style={{ width: 200, marginBottom: 5 }}>
                            <p>{chi2}</p>
                        </Card>
                        <Card title="Suma" style={{ width: 200, marginBottom: 5 }}>
                            <p>{sum}</p>
                        </Card>
                        <Card title="Todos diferentes" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(d)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Full House" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(f)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Dos pares" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(k)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Un par" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(o)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Póker" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(p)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Una quintilla" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(q)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Una tercia" style={{ width: 400, marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render_d(t)}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
export default Poker;
