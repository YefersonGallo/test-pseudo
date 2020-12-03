import {useEffect, useState} from 'react';
import {Button, Col, Input, Layout, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Card} from "antd/es";

function KS(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [freedom, setFreedom] = useState();
    const [passTest, setPassTest] = useState('');
    const [ks_inv, setKs_inv] = useState('');
    const [max_diference, setMax_diference] = useState('');
    const [accumulative_frequence, setAccumulative_frequence] = useState([]);
    const [accumulative_probability, setAccumulative_probability] = useState([]);
    const [correlation, setCorrelation] = useState([]);
    const [diferences, setDiferences] = useState([]);
    const [expected_frequence, setExpected_frequence] = useState([]);
    const [expected_probability, setExpected_probability] = useState([]);
    const [frequence, setFrequence] = useState([]);
    const [intervals, setIntervals] = useState([]);



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
        console.log(res)
        setPassTest(res.result)
        setAccumulative_frequence(res.accumulative_frequence)
        setAccumulative_probability(res.accumulative_proability)
        setExpected_frequence(res.expected_frequence)
        setExpected_probability(res.expected_proability)
        setKs_inv(res.ks_inv)
        setMax_diference(res.max_diference)
        setCorrelation(res.correlation)
        setDiferences(res.diferences)
        setFrequence(res.frequence)
        setIntervals(res.intervals)
        setFreedom('')
    }

    const columns = [
        {
            title: 'Inicio',
            dataIndex: 'init',
            key: 'init',
            fixed: 'left',
        },
        {
            title: 'Final',
            dataIndex: 'finish',
            key: 'finish',
            fixed: 'left',
        },
        {
            title: 'Frecuenacia',
            dataIndex: 'f',
            key: 'f',
        },
        {
            title: 'Correlacón',
            dataIndex: 'cor',
            key: 'cor',
        },
        {
            title: 'Frecuenacia Acumulada',
            dataIndex: 'fa',
            key: 'fa',
        },
        {
            title: 'Probabilidad Acumulada',
            dataIndex: 'pa',
            key: 'pa',
        },
        {
            title: 'Frecuenacia Esperada',
            dataIndex: 'fe',
            key: 'fe',
        },
        {
            title: 'Probabilidad Esperada',
            dataIndex: 'pe',
            key: 'pe',
        },
        {
            title: 'Diferencias',
            dataIndex: 'dif',
            key: 'dif',
        }
    ]

    let to_render = () =>{
        var result = []
        intervals.map((number, i) => (
            result.push({
                'init':number[0],
                'finish':number[1],
                'f':frequence[i],
                'cor':correlation[i],
                'fa':accumulative_frequence[i],
                'pa':accumulative_probability[i],
                'fe':expected_frequence[i],
                'pe':expected_probability[i],
                'dif':diferences[i]
            })
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
                    <p>A continuación suba un archivo de los números donde se encuentran cada uno en una línea, es decir la separación sea un salto de línea</p>
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
                        <Card title="Superó prueba" style={{ marginBottom: 5 }}>
                            <p>{passTest==="Cumple"?"Pasó la prueba":"No pasó la prueba"}</p>
                        </Card>
                        <Card title="KS Inverso" style={{ marginBottom: 5 }}>
                            <p>{ks_inv}</p>
                        </Card>
                        <Card title="Diferencia Máxima" style={{ marginBottom: 5 }}>
                            <p>{max_diference}</p>
                        </Card>
                        <Card title="Datos de la prueba" style={{ marginBottom: 5 }}>
                            <Table
                                columns={columns}
                                dataSource={to_render()}
                                size="small"
                                pagination={{ pageSize: 100 }}
                                scroll={{ x: 1300 }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
export default KS;
