/*
    意见反馈
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getBusinessFeedBackInfo,insertBusinessFeedBackInfo} from './function/ajax';
class FeedBack extends Component{
    componentDidMount(){
        getBusinessFeedBackInfo({
            callBack:(res)=>{
                if((typeof res.datas) != 'undefined'){
                    this.props.dispatch({
                        type:'LOADFEEDBACK',
                        message:res.datas
                    });
                }
            }
        });
    }
    _sendMessage(){
        insertBusinessFeedBackInfo({
            feedContent:this.refs.feedBackInput.value,
            callBack:(res)=>{
                if(res.state == 1){
                    res.datas.feedContent = this.refs.feedBackInput.value
                    this.props.dispatch({
                        type:'LOADFEEDBACK',
                        message:res.datas
                    });
                    this.refs.feedBackInput.value = null;
                }else{
                    alert('网络故障');
                }
            }
        })
    }
    render(){
        return(
            <div className="root">
                <div className="scroll-content padding">
                    {
                        this.props.feedBack.data.map((ele)=>{
                          return (ele.isReplay == 1) ? (<Dialog key={Math.random(1)} feedContent = {ele.feedContent}/>) : (<Dialog key={Math.random(1)} feedContent ={ele.feedContent} dir="right" imgUrl={ele.headImageUrl}/>)
                        })
                    }
                </div>
                <div className="bar bar-footer item-input-inset">
                    <label className="item-input-wrapper">
                        <i className="icon ion-ios-compose-outline placeholder-icon"></i>
                        <input type="text" ref="feedBackInput" placeholder="说点什么吧"/>
                    </label>
                    <button onClick={this._sendMessage.bind(this)} className="button button-clear">
                        发送
                    </button>
                </div>
            </div>
        )
    }
}

class Dialog extends Component{
    constructor(props){
        super(props)
    }
    render(){
        
        var dialog = (()=>{
            if((typeof this.props.dir) =='undefined'){
                return(
                    <div className="dialog-feedBack left">
                        <img src="/images/logo.jpg"/>
                        <div className="dialog-content"><span>{this.props.feedContent}</span></div>
                    </div>
                )
            }else{
                return(
                    <div className="dialog-feedBack right">
                        <div className="dialog-content"><span>{this.props.feedContent}</span></div>
                        <img src={this.props.imgUrl}/>
                    </div>
                )
            }
        })();
        return(
            <div>
                {dialog}
            </div>
        )
    }
}
function select(state){
    return{
        feedBack:state.feedBack
    }
}
export default connect(select)(FeedBack);
