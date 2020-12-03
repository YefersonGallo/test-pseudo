import {useEffect, useState} from 'react';
import {Button, Layout, Upload, Input, Col, Row} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Card} from "antd/es";

function Variance(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [error, setError] = useState();
    const [passTest, setPassTest] = useState('');
    const [limiteInferior, setLimiteInferior] = useState('');
    const [limiteSuperior, setLimiteSuperior] = useState('');
    const [varianza, setVarianza] = useState('');

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
            body: JSON.stringify({ ri: numbers, mError: error})
        };
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/Pvarianza', requestOptions)
        const res = await responseP.json();
        console.log(res)
        setLimiteSuperior(res.limiteSuperior)
        setLimiteInferior(res.limiteInferior)
        setPassTest(res.passTest)
        setVarianza(res.varianza)
    }

    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba de Varianzas</p>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Input
                        type="text"
                        placeholder="Ingrese el error, con decimales usando el ."
                        value={error}
                        onChange={(e) => {setError( e.target.value.toString().replace(/[^0-9.]+/, ''))}}/>
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
                        <Card title="Superó prueba" style={{ width: 200, marginBottom: 5 }}>
                            <p>{passTest?"Pasó la prueba":"No pasó la prueba"}</p>
                        </Card>
                        <Card title="Límite Inferior" style={{ marginBottom: 5 }}>
                            <p>{limiteInferior}</p>
                        </Card>
                        <Card title="Límite Superior" style={{ marginBottom: 5 }}>
                            <p>{limiteSuperior}</p>
                        </Card>
                        <Card title="Varianza" style={{ marginBottom: 5 }}>
                            <p>{varianza}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
export default Variance;
