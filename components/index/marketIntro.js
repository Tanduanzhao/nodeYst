/*
    行情简介
*/
import React,{Component} from 'react';
import {loadReport} from './../function/ajax';
import {connect} from 'react-redux';

import Loading from './../common/loading';

class MarketIntro extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            title:null,
            isLoading:true,
        }
    }
    componentDidMount(){
        this.setState({
            isLoading:true
        });
        loadReport({
            id:this.props.params.reportUrl,
            callBack:(res)=>{
                this.setState({
                    data:res.datas.content,
                    title:res.datas.title,
                    isLoading:false
                })
            }
        })
    }

    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} title={this.state.title}/>
                <div className="scroll-content has-header padding bg-fff marketIntro">
                    <p className="nestedHTML" dangerouslySetInnerHTML={{__html:this.state.data}}></p>
                </div>
                {
                    this.state.isLoading ? <Loading /> : null
                }
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
               <div className="title">{this.props.title}</div>
            </div>
        )
    }
}
function select(state){
    return{

    }
}
export default connect(select)(MarketIntro);
