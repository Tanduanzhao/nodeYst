/*
 药市通会员服务协议
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getAccountManagerAgreement} from '../function/ajax';
import Popup from '../popup';
class ManagerProtocol extends Component{
    constructor(props){
        super(props);
        this.state={
           datas:"",
            showPopup:false
        }
    }
    //返回前一个页面
    _goBack(){
        this.context.router.goBack();
    }

    //渲染完成后调用
    componentDidMount(){
        getAccountManagerAgreement({
            userId:this.props.userInfo.id,
            callBack:(res)=>{
                this.setState({
                    datas:res.datas
                });
            }
        })
    }
    _popupSure() {
        this.setState({
            showPopup:false
        })
    }
    _determine(){
        if(!this.refs.checkbox.checked){
            this.setState({
                showPopup:true
            })
            return false
        }
        this.context.router.push('/center/managerForm');
    }
    render(){
        return(
            <div className="root">
                {
                    this.state.showPopup ? <Popup  {...this.props} content='请同意服务协议' popupSure={this._popupSure.bind(this)}/> : null
                }
                <HeaderBar  {...this.props} />
                <div className="scroll-content has-header padding center-secondary">
                    <div dangerouslySetInnerHTML={{__html:this.state.datas}}></div>
                    <div style={{margin:'10px 0'}}>
                        <input ref="checkbox" type="checkbox" defaultChecked style={{marginRight: '5px',verticalAlign: 'sub',width: '16px', height: '16px'}}/>
                        我已阅读并同意 <a href="javascript:void(0)">《药市通客户经理申请协议》</a></div>
                    <div className="bar bar-button">
                        <button className="button button-default" onClick={this._goBack.bind(this)}>取消</button>
                        <a href="javascript:void(0)" className="button button-positive button-last" onClick={this._determine.bind(this)}>确定</a>
                    </div>
                </div>
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
               <div className="title"> 药市通客户经理申请协议</div>
            </div>
        )
    }
}

ManagerProtocol.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{
        userInfo:state.userInfo
    }
}
export default connect(select)(ManagerProtocol);
