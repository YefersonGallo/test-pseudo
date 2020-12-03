import { useState }  from 'react';
import {Button, Layout, Upload, Input, Col, Row, Table} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Card} from "antd/es";

function Chi2(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [numIntervalos, setNumIntervalos] = useState([]);
    const [mError, setMError] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [passTest, setPassTest] = useState('');
    const [chi2, setChi2] = useState([]);
    const [ni, setNi] = useState([]);
    const [sumaChi, setSumaChi] = useState('');
    const [valorComparasion, setValorComparasion] = useState('');

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
            body: JSON.stringify({ ri: numbers, numIntervalos: numIntervalos, a: a, b: b, mError: mError})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/Pchi2', requestOptions)
        const res = await responseP.json();
        setChi2(res.chi2)
        setNi(res.ni)
        setPassTest(res.passTest)
        setSumaChi(res.sumaChi2)
        setValorComparasion(res.valorComparasion)
        setNumIntervalos('')
        setA('')
        setB('')
        setMError('')
    }

    const column_chi = [
        {
            title: 'Chi2',
            dataIndex: 'chi2',
            key: 'chi2',
        }
        ]

    const column_ni = [
        {
            title: 'Ni',
            dataIndex: 'ni',
            key: 'ni',
        }
    ]

    let to_render_chi = () =>{
        var result = []
        chi2.map(number => (
            result.push({'chi2':number})
        ))
        return result
    }

    let to_render_ni = () =>{
        var result = []
        ni.map(number => (
            result.push({'ni':number})
        ))
        return result
    }

    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba Chi2</p>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Input
                    type="text"
                    placeholder="Ingrese el número de intervalos"
                    value={numIntervalos}
                    onChange={(e) => {setNumIntervalos( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                <Input
                    type="text"
                    placeholder="Ingrese el valor de a"
                    value={a}
                    onChange={(e) => {setA( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                <Input
                    type="text"
                    placeholder="Ingrese el valor de b"
                    value={b}
                    onChange={(e) => {setB( e.target.value.toString().replace(/[^0-9]+/, ''))}}/>
                <Input
                    type="text"
                    placeholder="Ingrese el margen de error usando el . como separador"
                    value={mError}
                    onChange={(e) => {setMError( e.target.value.toString().replace(/[^0-9.]+/, ''))}}/>
                <p>A continuación suba un archivo de los números donde se encuentran cada uno en una línea, es decir la separación sea un salto de línea</p>
                <Upload
                    accept=".txt"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    beforeUpload={file => read_file(file)}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
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
                            <p>{passTest?"Pasó la prueba":"No pasó la prueba"}</p>
                        </Card>
                        <Card title="Suma Chi2" style={{ marginBottom: 5 }}>
                            <p>{sumaChi}</p>
                        </Card>
                        <Card title="Valor de comparación" style={{ marginBottom: 5 }}>
                            <p>{valorComparasion}</p>
                        </Card>
                        <Card title="Chi2" style={{ marginBottom: 5 }}>
                            <Table
                                columns={column_chi}
                                dataSource={to_render_chi()}
                                size="small"
                                pagination={{ pageSize: 100 }}
                            />
                        </Card>
                        <Card title="Ni" style={{ marginBottom: 5 }}>
                            <Table
                                columns={column_ni}
                                dataSource={to_render_ni()}
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
export default Chi2;
