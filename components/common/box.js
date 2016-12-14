import React, {Component}from 'react';
import {glodBox,cashBox} from './../function/ajax';
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
	//禁止宝箱活动页面隐藏
	get(e){
		e.stopPropagation();
	}
	//金宝箱活动方法
	_glodBox(){
		glodBox({
			username:this.refs.username.value,
			phone:this.refs.phone.value,
			callBack:(res)=>{
                if(res.state == '1'){
                    this.props.dispatch({
                        type:'UNSHOWGOLDBOX'
                    });
                    this.setState({show:false})
                    alert("领取【2015年珠三角医疗终端市场分析报告】成功，请到“个人中心-已购报告”查阅。");
                }
			}
		});
	}
	//银宝箱活动方法
	_cashBox(){
		cashBox({
			callBack:(res)=>{
                if(res.state == '1'){
                    this.props.dispatch({
                        type:'UNSHOWCASHBOX'
                    });
                    this.setState({showSilver:false});
                    alert("领取【2015年广东省心脑血管中成药市场分析报告】成功，请到“个人中心-已购报告”查阅。");
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
									<label className=" item-input" >
										<span>姓名*</span>
										<input ref="username" type="text"/>
									</label>
									<label className=" item-input">
										<span>手机*</span>
										<input ref="phone" type="text"/>
									</label>
								</div>
								<span className="get"  onClick={this._glodBox.bind(this)}>马上领取</span>
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
                                <span className="get"  onClick={this._cashBox.bind(this)}>马上领取</span>
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