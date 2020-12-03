import { useState, useEffect }  from 'react';
import {Button, Col, Layout, Row, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/lib/typography/Text";
import {Card} from "antd/es";

function Means(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);
    const [isOk, setIsOk] = useState('');
    const [limiteInferior, setLimiteInferior] = useState('');
    const [limiteSuperior, setLimiteSuperior] = useState('');
    const [media, setMedia] = useState('');
    const [n, setN] = useState('');
    const [z, setZ] = useState('');

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
        const responseP = await fetch('https://dcb-node-deploy-poker.herokuapp.com/mediatest', requestOptions)
        const res = await responseP.json();
        console.log(res)
        setIsOk(res.isOk)
        setLimiteInferior(res.limiteInferior)
        setLimiteSuperior(res.limiteSuperior)
        setMedia(res.media)
        setN(res.n)
        setZ(res.z)
    }

    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba de Medias</p>
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
                <Row>
                    <Col hidden={numbers.length===0} span={12}>
                        <h1>Los números ingresados son:</h1>
                        {numbers.map(num =>
                            <h1>{num}</h1>
                        )}
                    </Col>
                    <Col hidden={isOk===''} span={12}>
                        <Card title="Límite Inferior" style={{ width: 300 }}>
                            <p>{limiteInferior}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    );
}
export default Means;
