import {useEffect, useState} from 'react';
import {Button, Col, Input, Layout, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Card} from "antd/es";

function KS(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [freedom, setFreedom] = useState();
    const [passTest, setPassTest] = useState('');
    const [accumulative_frequence, setAccumulative_frequence] = useState([]);
    const [accumulative_probability, setAccumulative_probability] = useState([]);
    const [expected_frequence, setExpected_frequence] = useState([]);
    const [expected_probability, setExpected_probability] = useState([]);


    useEffect(() =>{
        fetch('https://congruentialmethods.herokuapp.com/ping')
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
            body: JSON.stringify({ numbers: numbers, freedom: freedom})
        };
        const responseP = await fetch('https://congruentialmethods.herokuapp.com/ks_test', requestOptions)
        const res = await responseP.json();
        setPassTest(res.result)
        setAccumulative_frequence(res.accumulative_frequence)
        setAccumulative_probability(res.accumulative_proability)
        setExpected_frequence(res.expected_frequence)
        setExpected_probability(res.expected_proability)
        setFreedom('')
    }

    const column_accumulative_frequence = [
        {
            title: 'Frecuenacia Acumulada',
            dataIndex: 'fa',
            key: 'fa',
        }
    ]

    const column_accumulative_proability = [
        {
            title: 'Probabilidad Acumulada',
            dataIndex: 'pa',
            key: 'pa',
        }
    ]

    const column_expected_frequence = [
        {
            title: 'Frecuenacia Esperada',
            dataIndex: 'fe',
            key: 'fe',
        }
    ]

    const column_expected_proability = [
        {
            title: 'Probabilidad Esperada',
            dataIndex: 'pe',
            key: 'pe',
        }
    ]
    let to_render_fa = () =>{
        var result = []
        accumulative_frequence.map(number => (
            result.push({'fa':number})
        ))
        return result
    }

    let to_render_pa = () =>{
        var result = []
        accumulative_probability.map(number => (
            result.push({'pa':number})
        ))
        return result
    }

    let to_render_fe = () =>{
        var result = []
        expected_frequence.map(number => (
            result.push({'fe':number})
        ))
        return result
    }

    let to_render_pe = () =>{
        var result = []
        expected_probability.map(number => (
            result.push({'pe':number})
        ))
        return result
    }

    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba de Kolmogorov-Smirnov</p>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Input
                        type="text"
                        placeholder="Ingrese la libertad, con decimales usando el ."
                        value={freedom}
                        onChange={(e) => {setFreedom( e.target.value.toString().replace(/[^0-9.]+/, ''))}}/>
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
                            <h1>{num}</h1>
                        )}
                    </Col>
                    <Col hidden={passTest===''} span={12}>
                        <Card title="Superó prueba" style={{ width: 200, marginBottom: 5 }}>
                            <p>{passTest==="Cumple"?"Pasó la prueba":"No pasó la prueba"}</p>
                        </Card>
                        <Card title="Frecuencia Acumulada" style={{ width: 200, marginBottom: 5 }}>
                            <Table
                                columns={column_accumulative_frequence}
                                dataSource={to_render_fa()}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Probabilidad Acumulada" style={{ width: 200, marginBottom: 5 }}>
                            <Table
                                columns={column_accumulative_proability}
                                dataSource={to_render_pa()}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Frecuencia Esperada" style={{ width: 200, marginBottom: 5 }}>
                            <Table
                                columns={column_expected_frequence}
                                dataSource={to_render_fe()}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Probabilidad Esperada" style={{ width: 200, marginBottom: 5 }}>
                            <Table
                                columns={column_expected_proability}
                                dataSource={to_render_pe()}
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
export default KS;
