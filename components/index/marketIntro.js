/*
    行情简介
*/
import React,{Component} from 'react';
import {getSynopsis} from './../function/ajax';
import {connect} from 'react-redux';

import Loading from './../common/loading';

class MarketIntro extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            title:null,
            reportName:null,
            isLoading:true
        }
    }
    goBack(){
        setTimeout(()=> this.context.router.goBack());
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });
        getSynopsis({
            reportId:this.props.params.reportUrl,
            callBack:(res)=>{
                this.setState({
                    data:res.datas.reportMainContent,
                    reportName:res.datas.reportName.split("栏目")[0],
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
                    <div className="nestedHTML" dangerouslySetInnerHTML={{__html:this.state.data}}></div>
                    <div className="positive" onClick={this.goBack.bind(this)}>
                        <i className="fa fa-angle-double-right" style={{marginRight:'5px'}}></i>进入{this.state.reportName}</div>
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
MarketIntro.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(MarketIntro);
