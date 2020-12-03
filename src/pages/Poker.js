import {useEffect, useState} from 'react';
import {Button, Layout, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

function Poker(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);

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
        console.log(res)
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
                <div
                    className={numbers.length!==0?"":"is-hidden"}
                >
                    <h1>Los números ingresados son:</h1>
                    {numbers.map(num =>
                        <h1>{num}</h1>
                    )}</div>
            </div>
        </Content>
    );
}
export default Poker;
