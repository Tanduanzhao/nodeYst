/*
    加载组件
*/
import React,{Component} from 'react';
export default class srollLoading extends Component {
    render(){
        return(
            <div style={{textAlign: 'center', height: '40px',lineHeight:'40px'}}>
                <img src="/images/srollLoad.gif"style={{width: '20px',verticalAlign: 'middle',marginRight: '5px'}}/>正在加载 . . .
            </div>
        )
    }
}