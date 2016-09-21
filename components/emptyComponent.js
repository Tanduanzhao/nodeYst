/*
    空数据显示界面
*/
import React,{Component,defaultProps} from 'react';
export default class EmptyComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="noDataTip">
                <i className="fa fa-4x fa-exclamation-triangle"></i>
                {this.props.message}
            </div>
        )
    }
}

EmptyComponent.defaultProps ={
    message:'抱歉没有数据'
}