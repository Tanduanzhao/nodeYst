/*
    加载组件
*/
import React,{Component} from 'react';
export default class Loading extends Component {
    render(){
        return(
            <div className="loading" style={{position:"absolute",width:'100%',backgroundColor:'rgba(255,255,255,1)',height:'100%',zIndex:99,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src="/images/yst.gif"/>
            </div>
        )
    }
}