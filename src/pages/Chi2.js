import { useState }  from 'react';
import {Button, Layout, Upload, Input} from "antd";
import {UploadOutlined} from "@ant-design/icons";

function Chi2(){
    const { Content } = Layout;
    const [numbers, setNumbers] = useState([]);

    let read_file=(file)=>{
        var reader = new FileReader()
        reader.onload = function (event) {
            setNumbers(event.target.result.split('\n'));
        }
        reader.readAsText(file);
    }

    return(
        <Content style={{ margin: '24px 16px 0' }}>
            <p>Prueba Chi2</p>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <p>A continuación suba un archivo de los números donde se encuentran cada uno en una línea, es decir la separeción sea un salto de línea</p>
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
    );
}
export default Chi2;
