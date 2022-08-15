import 'antd/dist/antd.css';
import React from 'react';
import { Button } from 'antd';
import './Buttonn.css';

function Buttonn(props) {
    return <Button className={props.text}>{props.content}</Button>;
}

export default Buttonn;
