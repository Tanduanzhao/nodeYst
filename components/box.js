import React, {Component}from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import {httpAddress} from './config.js';
import {loadProvince} from './function/ajax';
export default class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false,
			showSilver:false,
			hideGlodBox:true,
			hideBox:true
		};
	}
    
	_changeBox(){
		console.log(this.refs.username.value)
		this.props.dispatch({
			type:'CHANGEDRUGSEARCHNAME',
			searchName:encodeURI(encodeURI(this.refs.username.value))
		})
	}
	get(e){
		e.stopPropagation();
	}
	glodBox(e){
		if(!(/^1\d{10}$/.test(this.refs.phone.value))){
			alert("请输入正确的手机号码");
			return false
		}
		if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.refs.email.value))){
			alert("请输入正确的邮箱");
			return false
		}
		$.ajax({
			url:httpAddress +"partakeActivity/glodBox",
			data:{
                username:this.refs.username.value || null,
                phone:this.refs.phone.value || null,
                email:this.refs.email.value || null
            },
			success:(res)=>{
                if(res.state == '1'){
                    this.props.dispatch({
                        type:'UNSHOWGOLDBOX'
                    });
                    this.setState({show:false})
                    alert("领取2015年珠三角医疗终端市场分析报告成功，请到“个人中心-已购报告查阅”查阅。");
                }
			}
		});
		
	}
	cashBox(e){
		$.ajax({
			url:httpAddress +"partakeActivity/cashBox",
			success:(res)=>{
                if(res.state == '1'){
                    this.props.dispatch({
                        type:'UNSHOWCASHBOX'
                    });
                    this.setState({showSilver:false});
                    alert("领取2015年广东省心脑血管中成药市场分析报告报告成功，请到“个人中心-已购报告查阅”查阅。");
                }
                
			}
		});
		
		
	}
	render() {
		return (
			<div>
				{
                    !this.props.home.goldBox ? null : <div className="box" onClick={()=>{(this.state.show)?this.setState({show:false}): this.setState({show:true})}}>
                        <img src="/images/box_golden.png" alt="" className="box_photo"/>
                    </div>
                }
				<div className="more-content" onClick={this.get.bind(this)} style={(this.state.show) ? styles.active :styles.hidden}>
					<div className="boxContont">
						<img src="/images/box_close.png" alt="" className="close"  onClick={()=>{this.setState({show:false})}}/>
						<div><img src="/images/box_header_silver.jpg" alt=""/></div>
						<div className="boxMain silver-main">
							<form className="silver-bg">
								<div className="list">
									<label className=" item-input">
										<span>姓名*</span>
										<input ref="username" type="text" onChange={this._changeBox.bind(this)}/>
									</label>
									<label className=" item-input">
										<span>手机*</span>
										<input ref="phone" type="text" onChange={this._changeBox.bind(this)}/>
									</label>
									<label className=" item-input">
										<span>邮箱*</span>
										<input ref="email" type="text" onChange={this._changeBox.bind(this)}/>
									</label>
								</div>
								<span className="get"  onClick={this.glodBox.bind(this)}>马上领取</span>
							</form>
						</div>
					</div>
				</div>
                {
                    !this.props.home.cashBox ? null : <div className="box bottom" onClick={()=>{(this.state.showSilver)?this.setState({showSilver:false}): this.setState({showSilver:true})}}>
                        <img src="/images/box_silver.png" alt="" className="box_photo"/>
                    </div>
                }
                <div className="more-content" onClick={this.get.bind(this)} style={(this.state.showSilver) ? styles.active :styles.hidden}>
                    <div className="boxContont">
                        <img src="/images/box_close.png" alt="" className="close" onClick={()=>{this.setState({showSilver:false})}}/>
                        <div style={{"overflow":"hidden"}}><img src="/images/box_header.jpg" alt=""/></div>
                        <div style={{"overflow":"hidden"}}>
                            <div className="boxMain">
                                <span className="get"  onClick={this.cashBox.bind(this)}>马上领取</span>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		)
	}
}
const styles = {
	active:{
		display:'block',
		color:'#000'
	},
	hidden:{
		display:'none',
		color:'#000'
	}
}