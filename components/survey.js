import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './common/footerBar';
import {Link} from 'react-router';
import {saveInvestigation,isGetSevenDaysVIP,openSevenDaysVIP} from './function/ajax';
import Loading from './common/loading';
import {url2obj,valINarr} from './function/common';
import Popup from './popup';
import $ from 'jquery';
class Survey extends Component{
	constructor(props) {
		super(props);
		this.state ={
			showPopup:false,
			showPopupVIP:false,
			content:'',
			surveyArr:[],
			kindArr:[],
			loading:true,
			work:false,
			obj:{},
			isGetSevenDaysVIP:false,

			zhaoshang:0,
			linchuang:0,
			zhaobiao:0,
			shangwu:0,
			otherWork:0,

			geshengzhongbiaoshuju:0,
			yiyuanxiaoshoushuju:0,
			shengchanqiyezhaoshanrenyuandianhua:0,
			zhengceheshichangfenxi:0,
			otherTypeData:0,

			"daxingyiyaohuiyi": 0,
			"yaoquanpengyoutuijian": 0,
			"kehujinglijieshao": 0,
			"weixinpengyouquan": 0,
			"otherCanal": 0,
			"chenggonganli": 0,
			"zhaoshangpinzhongxinxi": 0,
			"yaopinzhishiku": 0,
			"shiyonggongju": 0,
			"otherService": 0,
			asksGroup:[[0,0,0,0,''],[0,0,0,0,''],[0,0,0,0,''],[0,0,0,0,'']],
			nameGroup:[['zhaoshang','linchuang','zhaobiao','shangwu','otherWork'],
				['geshengzhongbiaoshuju','yiyuanxiaoshoushuju','shengchanqiyezhaoshanrenyuandianhua','zhengceheshichangfenxi','otherTypeData'],
				['daxingyiyaohuiyi','yaoquanpengyoutuijian','kehujinglijieshao','weixinpengyouquan','otherCanal'],
				['chenggonganli','zhaoshangpinzhongxinxi','yaopinzhishiku','shiyonggongju','otherService']]

		};
		this._loadData = this._loadData.bind(this);
		this._mapValue = this._mapValue.bind(this);
	}
	//切换选项方法
	_onCheckChange(e){
		console.dir(e.target.getAttribute('data-index'));
		let ele = e.target;
		let index = ele.getAttribute('data-index');
		let position = ele.getAttribute('data-position');
		let value = ele.value;
		let asksArr = this.state.asksGroup;

		if(ele.checked){
			console.log('选中',typeof(ele.value));
			if(ele.value == '0'){
				asksArr[index][position] = 1
			}else{
				asksArr[index][position] = ele.value
			}
		}else{
			console.log('取消选中');
			asksArr[index][position] = 0
		}
		console.log(asksArr,'最新的数组');
		this.setState({
			asksGroup:asksArr
		});
		console.log(this.state.asksGroup);
	}
	_onChangeSliderValue(e){
		let ele = e.target;
		let index = ele.getAttribute('data-index');
		let position = ele.getAttribute('data-position');
		let otherArr = this.state.asksGroup;
		otherArr[index][position] = ele.value;
		this.setState({
			asksGroup:otherArr
		});
	}
	_mapValue(){
		let newGroup ={};
 		this.state.nameGroup.map((ele,i)=>{
			ele.map((item,j)=>{
				newGroup[item] = this.state.asksGroup[i][j];
			})
		})
		newGroup['remark']=this.refs.Textarea.value;
		return JSON.stringify([newGroup]);
	}
	_sendMessage(){
		let isNull = false;
		for(let i =0;i<this.state.asksGroup.length;i++){
			console.log(this.state.asksGroup[i].indexOf(1) < 0,this.state.asksGroup[i][this.state.asksGroup[i].length-1]=='');
			if(this.state.asksGroup[i].indexOf(1) < 0 && this.state.asksGroup[i][this.state.asksGroup[i].length-1] == ''){
				isNull = true;
				break;
			}
		}
		if(isNull){
			this.setState({
				showPopup:true,
				content:"客官，请留步！完整填写问卷才有7天药市通超级VIP会员的免费体验，您有遗漏的题目未填写哦~"
			})
		}else{
			saveInvestigation({
				datas:this._mapValue(),
				callBack: (res)=>{
					this.showPopupVIP();
				}
			});
			console.log(this._mapValue());
		}
	}

	_loadData(){
		isGetSevenDaysVIP({
			callBack:(res)=>{
				this.setState({
					isGetSevenDaysVIP:res.message
				})
				if(res.message == "isGet"){
					this.showPopupVIP();
				}
			}
		})
	}

	//切换弹出框
	showPopupVIP(){
		this.setState({
			showPopupVIP:!this.state.showPopupVIP
		})
	}
	isVIP(){
		this.context.router.push('/');
		this.setState({
			showPopupVIP:!this.state.showPopupVIP
		})
	}
	//切换弹出框
	_togglePopup(){
		this.setState({
			showPopup:!this.state.showPopup
		})
	}

	//显示弹出框
	_showPopup(e){
		e.preventDefault();
		this.showPopupVIP();
	}

   _obj(obj,value,checked){
	   if(JSON.stringify(obj)=="{}"){obj[value]=1}else{
		   if(checked){
			   for(var i in obj){
				   obj[value] = 1;
			   }
		   }else{
			   for(var i in obj){
				   obj[value] = 0;
			   }
		   }
	   }
	   return obj
   }

	handleWork(e){
		if(e.target.checked){
			let  valueArr=e.target.value.split("_");
			this.setState({
				kindArr:valINarr(this.state.kindArr,valueArr[0]),
				surveyArr :this._obj(this.state.obj,valueArr[1],e.target.checked)
			})
		}
	}
	toFocus(e){}

	componentDidMount(){
		this._loadData();
	}
	render(){
		return(
			<div className="root survey">
				{
					this.state.showPopupVIP ?<PopupVIP  {...this.props}  isGetSevenDaysVIP={this.state.isGetSevenDaysVIP} isVIP={this.isVIP.bind(this)} popupSure={this.showPopupVIP.bind(this)}/>:null
				}
				{
					this.state.showPopup ? <Popup  {...this.props} content={`${this.state.content}`} popupSure={this._togglePopup.bind(this)}/> : null
				}
				{
					//this.state.loading? <Loading/> : null
				}
				<div className="scroll-content bg-fff">
					<div className="scroll-content-top">
						<img src="/images/survey_top.jpg" alt="" style={{width:'100%',display: 'block'}}/>
						<img src="/images/survey_text.jpg" alt="" style={{width:'100%'}}/>
					</div>
					<div className="scroll-content-content">
						<h3>一、您在公司从事以下哪方面工作？</h3>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox" onChange={this._onCheckChange.bind(this)} data-index = {0} data-position = {0} value={0}/>A. 招商</label>
								</div>
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {0} data-position = {1} value={0}/>B. 临床</label>
							</div>
						</div>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {0} data-position = {2} value={0}/>C. 招标</label>
							</div>
							<div className="col-50">
								<label><input type="checkbox" onChange={this._onCheckChange.bind(this)} data-index = {0} data-position = {3} value={0}/>D. 商务</label>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<label>
									<span> 其他</span>
									<input type="text"  onFocus={this.toFocus.bind(this)} data-index={0} data-position={4} onChange={this._onChangeSliderValue.bind(this)} type="text" className='otherWork'/></label>
							</div>
						</div>
						<h3>二、您平时工作需要用到什么类型的数据？</h3>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {1} data-position = {0} value={0}/>A. 各省中标数据</label>
							</div>
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {1} data-position = {1} value={0}/>B. 医院销售数据</label>
							</div>
						</div>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {1} data-position = {2} value={0}/>C. 生产企业招商人员电话</label>
							</div>
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {1} data-position = {3} value={0}/>D. 政策和市场分析报告</label>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<label>
									<span> 其他</span>
									<input type="text"  ref="otherTypeData" onFocus={this.toFocus.bind(this)} data-index={1} data-position={4} onChange={this._onChangeSliderValue.bind(this)} type="text" className='otherTypeData'/></label>
							</div>
						</div>
						<h3>三、您是通过什么渠道关注药市通？）</h3>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {2} data-position = {0} value={0}/>A. 大型医药会议</label>
							</div>
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {2} data-position = {1} value={0}/>B. 药圈朋友圈推荐</label>
							</div>
						</div>
						<div className="row">
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {2} data-position = {2} value={0}/>C. 客户经理介绍</label>
							</div>
							<div className="col-50">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {2} data-position = {3} value={0}/>D. 微信朋友圈</label>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<label>
									<span>其他</span>
									<input type="text"  ref="otherCanal" onFocus={this.toFocus.bind(this)} data-index={2} data-position={4} onChange={this._onChangeSliderValue.bind(this)} type="text" className='otherCanal'/></label>
							</div>
						</div>
						<h3>四、您希望药市通提供什么样的服务？</h3>
						<div className="row">
							<div className="col-90">
								<label><input type="checkbox" onChange={this._onCheckChange.bind(this)} data-index = {3} data-position = {0} value={0}/>A. 品种销售的成功案例</label>
							</div>
							<div className="col-90">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {3} data-position = {1} value={0}/>B. 更多招商品种信息</label>
							</div>
							<div className="col-90">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {3} data-position = {2} value={0}/>C. 药品相关的知识库（临床指南、学术报告）</label>
							</div>
							<div className="col-90">
								<label><input type="checkbox"  onChange={this._onCheckChange.bind(this)} data-index = {3} data-position = {3} value={0}/>D. 更多实用工具（附近医院、附近药店）</label>
							</div>
							<div className="col-90">
								<label>
									<span>其他</span>
									<input onFocus={this.toFocus.bind(this)} type="text"  ref='otherService' data-index={3} data-position={4} onChange={this._onChangeSliderValue.bind(this)} className='otherService'/></label>
							</div>
						</div>
						<div className="comments">
                                <textarea name="" id="" cols="30" rows="10" ref="Textarea"
										  placeholder="您还有什么话想对我们说 ......"></textarea>
							<button  style={{fontSize: '.7rem'}} onClick={this._sendMessage.bind(this)}>提交</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class PopupVIP extends Component{
	render(){
		return(
			<div style={{width:'100%',height:'100%'}}>
				<div className="backdrop visible active"></div>
				<div className="popup-container popup-showing active">
					{
						this.props.isGetSevenDaysVIP == "isGet"?
							<div className="popup"  style={{borderRadius: '5px'}}>
								<div className="popup-body"  style={{ padding: '20px 10px',fontSize: '18px', textAlign: 'center'}}>
									<span>亲，您已参加过该活动啦！</span>
								</div>
								<div className="popup-buttons">
									<button onClick={this.props.isVIP} className="button ng-binding button-positive">确定</button>
								</div>
							</div>
							:<div className="popup popup-invitation" style={{width: '88.67%',position: 'relative'}}>
							<div>
								<img onClick={this.props.isVIP} className="clone"  src="/images/clone.png" alt=""/>
								<img style={{width:'100%'}} src="/images/survey_popup.png" alt=""/>
								<span onClick={this.props.isVIP}  className="survey-btn">我知道了</span>
							</div>
						</div>
					}
				</div>
			</div>
		)
	}
}

function select(state){
	return{
		stores:state.home,
		userInfo:state.userInfo
	}
}

Survey.contextTypes = {
	router:React.PropTypes.object.isRequired
}
export default connect(select)(Survey);