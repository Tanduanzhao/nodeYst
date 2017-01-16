/*
 药市通会员服务协议
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Popup from '../popup';
import {valINarr} from './../function/common';
import {addAccountManager,getAccountManagerSpecialty} from '../function/ajax';
class ManagerForm extends Component{
    constructor(props){
        super(props);
        this.state={
            speciallyDatas:[],
            specially:[],
            showPopup:false,
            content:""
        }
    }
    //返回前一个页面
    _goBack(){
        alert(goBack);
        this.context.router.goBack();
    }
    //客户经理申请
    _becomeManager(){
        if(this.refs.name.value == ""){
            this.setState({
                showPopup:true,
                content:"姓名"
            })
            return false
        }
        if(this.refs.birth.value == ""){
            this.setState({
                showPopup:true,
                content:"出生年月"
            })
            return false
        }
        if( this.refs.location.value == "" ){
            this.setState({
                showPopup:true,
                content:"所在地"
            })
            return false
        }
        if(this.refs.phoneNumber.value == ""){
            this.setState({
                showPopup:true,
                content:"手机号"
            })
            return false
        }
        console.log((/^1\d{10}$/.test(this.refs.phoneNumber.value)))
        console.log(this.refs.phoneNumber.value)
        if(!(/^1\d{10}$/.test(this.refs.phoneNumber.value))){
            this.setState({
                showPopup:true,
                content:"有效手机号"
            })
            return false
        }
        if(this.refs.organization.value == ""){
            this.setState({
                showPopup:true,
                content:"所属机构"
            })
            return false
        }
        if(this.state.specially.length == 0){
            addAccountManager({
                userId:this.props.userInfo.id,
                name:this.refs.name.value,
                birth:this.refs.birth.value,
                location:this.refs.location.value,
                phoneNumber:this.refs.phoneNumber.value,
                organization:this.refs.organization.value,
                specially:"",
                callBack:(res)=>{
                    this.context.router.push('/center/becomeManager');
                }
            })
        }else{
            addAccountManager({
                userId:this.props.userInfo.id,
                name:this.refs.name.value,
                birth:this.refs.birth.value,
                location:this.refs.location.value,
                phoneNumber:this.refs.phoneNumber.value,
                organization:this.refs.organization.value,
                specially:JSON.stringify(this.state.specially),
                callBack:(res)=>{
                    this.context.router.push('/center/becomeManager');
                }
            })
        }
    }
    _spanhandleClick(specially){
        this.setState({
            specially :valINarr(this.state.specially,specially)
        })
    }

    //渲染完成后调用
    componentDidMount(){
        getAccountManagerSpecialty({
            userId:this.props.userInfo.id,
            callBack:(res)=>{
                this.setState({
                    speciallyDatas:res.datas
                });
            }
        })
    }

    _popupSure() {
        this.setState({
            showPopup:false
        })
    }
    render(){
        return(
            <div className="root">
                {
                    this.state.showPopup ? <Popup  {...this.props} content={`请输入${this.state.content}`} popupSure={this._popupSure.bind(this)}/> : null
                }
                <div className="scroll-content bg-fff center-secondary form">
                    <div className="managerForm-top">
                        <img src="/images/managerForm_top.jpg" alt="" style={{width:'100%'}}/>
                        <div className="managerForm-top-text">
                            欢迎加入药市通客户经理团队 <br/>
                            请填写以下个人信息，方便工作人员与您联系。
                        </div>
                    </div>
                    <div className="padding managerForm-center">
                        <div className="list">
                            <label className="item item-input text-right">
                                <span className="input-label" >姓名</span>
                                <input type="text" ref="name" placeholder="必填"/>
                            </label>
                            <label className="item item-input text-right">
                                <span className="input-label" >出生年月</span>
                                <input type="date"  ref="birth" placeholder="必填"/>
                            </label>
                            <label className="item item-input text-right">
                                <span className="input-label" >所在地</span>
                                <input type="text"  ref="location" placeholder="必填"/>
                            </label>
                            <label className="item item-input text-right" >
                                <span className="input-label">手机号</span>
                                <input type="text"  ref="phoneNumber" placeholder="必填"/>
                            </label>
                            <label className="item item-input text-right">
                                <span className="input-label">所属机构</span>
                                <input type="text"  ref="organization" placeholder="必填"/>
                            </label>
                            <div className="item options">
                                <span className="input-label text-right">业务专长</span>
                                <div className="options-item">
                                    {
                                       this.state.speciallyDatas.map((ele,index)=>{
                                           return <a href="javascript:void(0)" style={(this.state.specially.indexOf(ele.specialty) != -1) ? {backgroundColor:'#0284D0',color:'#fff'} : null} onClick={this._spanhandleClick.bind(this,ele.specialty)} key={Math.random()}>{ele.specialty}</a>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="bar bar-button">
                            <a href="javascript:void(0)" className="button button-positive" onClick={this._becomeManager.bind(this)}>申请</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ManagerForm.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{
        userInfo:state.userInfo
    }
}
export default connect(select)(ManagerForm);
