import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './common/footerBar';
import {Link} from 'react-router';
import {loadWx,loadNewrepor,loadPicture,loadJoinActivity,loadRecordContent,loadReportList,getCiReportColumnList,subscribeColumn,getNewContent} from './function/ajax';
import Box from './common/box';
import Loading from './common/loading';
import ReportList from './reportList';
import SubscribeList from './subscribePage/subscribeList';
import {url2obj} from './function/common';

var Slider = require('react-slick');
class Home extends Component{
	constructor(props) {
		super(props);
		this.state ={
			showPopup:false,
			loading:true,
			reCordNum:0,
			isSubscribe:"",
			phonePrompt:0,
			popupTitle:"",
			showPopupVIP:0,
			showPublishDate:false
		};
		this._loadData = this._loadData.bind(this);
		this._loadRecordContent = this._loadRecordContent.bind(this);
	}
	_loadData(){
		wx.ready(()=>{
			getNewContent({
				publishDate:typeof localStorage.getItem("publishDate") == 'undefined' ? this.props.home.publishDate : localStorage.getItem("publishDate"),
				callBack:(res)=>{
					if(res){
						if(res.datas.isNew == 1){
							this.props.dispatch({
								type:'LOADPUBLISHDATE',
								publishDate: res.datas.newContent.publishDate,
								newContent: res.datas.newContent
							});
							this.setState({
								showPublishDate:true
							});
							localStorage.setItem("publishDate", res.datas.newContent.publishDate);
						}
					}
				}
			})
		})
		//读取首页热门和最新报告
		loadNewrepor({
			yearMonth:this.props.yearMonth,
			areaId:this.props.areaId,
			searchAreaType:this.props.searchAreaType,
			callBack:(res)=>{
				this.props.dispatch({
					type:'LOADHOMEDATA',
					data: res.datas
				});
				this.setState({
					loading:false
				});
			}
		});
		//读取图片
		loadPicture({
			yearMonth:this.props.yearMonth,
			areaId:this.props.areaId,
			searchAreaType:this.state.searchAreaType,
			imgType: "MAIN_ADVERTISEMENT",
			callBack:(res)=>{
				this.props.dispatch({
					type:'LOADHOMEIMG',
					img: res.datas
				});
				this.setState({
					loading:false
				});
			}
		});
		//读取分析报告
		loadReportList({
			pageNo:1,
			reportType:0,
			costStatus:0,
			pageSize:5,
			callBack:(res)=>{
				if(res){
					this.props.dispatch({
						type:'LOADHOMEPARSEREPORT',
						ParseReport: res.datas
					});
					this.setState({
						loading:false
					});
				}
			}
		});
		//读取专栏订阅列表
		getCiReportColumnList({
			callBack:(res)=>{
				this.props.dispatch({
					type:'LOADHOMECOLUMNLIST',
					ColumnList: res.datas
				});
			}
		});

		//获取金银活动箱子状态
		loadJoinActivity({
			callBack:(res)=>{
				if(res.state == 1){
					if(res.datas.isJoinCashBox == '0'){
						this.props.dispatch({
							type:'SHOWCASHBOX'
						});
					}else{
						this.props.dispatch({
							type:'UNSHOWCASHBOX'
						});
					}
					if(res.datas.isJoinGlodBox == '0'){
						this.props.dispatch({
							type:'SHOWGOLDBOX'
						});
					}else{
						this.props.dispatch({
							type:'UNSHOWGOLDBOX'
						});
					}
				}
			}
		})
	}
	_loadRecordContent(){
		loadRecordContent({
			callBack:(res)=>{
				this.props.dispatch({
					type:'SHOWRECORD'
				});
				this.setState({
					reCordNum:res.datas.content
				});
				setTimeout(()=>{
					this.props.dispatch({
						type:'HIDERECORD'
					});
				},8000)
			}
		})
	}

	//切换弹出框
	_togglePopup(){
		this.setState({
			showPopup:!this.state.showPopup
		})
	}
	_popupSure(userPhone){
		if(userPhone == ""){
			setTimeout(()=>{
				subscribeColumn({
					columnId:this.state.columnId,
					userPhone:userPhone|| "",
					phonePrompt:0,
					callBack:()=>{
						this.setState({
							isSubscribe:this.state.columnId
						})
						this._togglePopup();
					}
				})
			})
		}else {
			if(!(/^1\d{10}$/.test(userPhone))){
				this.setState({
					phonePrompt:1
				})
				return false
			}else{
				setTimeout(()=>{
					subscribeColumn({
						columnId:this.state.columnId,
						userPhone:userPhone|| "",
						phonePrompt:0,
						callBack:()=>{
							this.setState({
								isSubscribe:this.state.columnId
							})
							this._togglePopup();
						}
					})
				})
			}
		}
	}

	//显示弹出框
	_showPopup(id,title){
		this.setState({
			columnId:id,
			popupTitle:title
		})
		setTimeout(()=>{
			this._togglePopup();
		})
	}
	showPublishDate(){
		this.setState({
			showPublishDate:false
		})
	}
	resetShearch(){
		this.props.dispatch({
			type:'RESETREPORT'
		})
	}

	componentDidMount(){
		this._loadData();
	}
	componentWillMount(){
		if(this.props.home.hasRecord) this._loadRecordContent();
	}
	render(){
		return(
			<div className="root home">
				{
					this.state.showPublishDate ? <PublishDate {...this.props} showPublishDate={this.showPublishDate.bind(this)}/> : null
				}
				{
					this.state.showPopup ?<Popup  {...this.props}  popupTitle={this.state.popupTitle} phonePrompt={this.state.phonePrompt} popupSure={this._popupSure.bind(this)} close={this._togglePopup.bind(this)}/>:null
				}
				{
					this.props.home.isShowRecord ? <Record dataSources={this.state.reCordNum}/> : false
				}
				{
					this.state.loading? <Loading/> : null
				}
				{
					 <Main {...this.props} resetShearch={this.resetShearch.bind(this)} showPopup={this._showPopup.bind(this)} isSubscribe={this.state.isSubscribe}/>
				}
				<FooterBar {...this.props}/>

			</div>
		)
	}
}

class Main extends Component{
	constructor(props){
		super(props);
	}
	newReportMap(){
		this.props.dispatch({
		    type: 'RESETREPORT'
		});
		this.props.dispatch({
			type:'GOREPORT',
			data:[],
			searchType: 0,
			pageNo:1
		});
		this.props.dispatch({
			type:'UNCHANGEREPORTTAG'
		});
	}
	hotReportMap(){
		this.props.dispatch({
			type: 'RESETREPORT'
		});
		this.props.dispatch({
			type:'GOREPORT',
			data:[],
			searchType: 2,
			pageNo:1
		});
		this.props.dispatch({
			type:'UNCHANGEREPORTTAG'
		});
	}
	render(){
		const settings = {
			className: '',
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight:false,
			autoplay:true
		};
		var string = null;
		var slide = (()=>{
			{
				if(this.props.home.img.length != 0){
					string = <Slider {...settings} {...this.props}>{this.props.home.img.map((ele,index)=> {
						switch(ele.resourceType){
							case "EXTERNAL": let url = '/picture/'+encodeURIComponent(ele.imgSource);return <div  key={ele.id+Math.random()}><Link to={url}><img src={ele.imgUrl}  alt=""/></Link></div>;
							case "INTERNAL":return <div  key={ele.id+Math.random()}><Link to={ele.imgSource}><img src={ele.imgUrl}  alt=""/></Link></div>;
							case "ORDER_REPORT":return <div key={ele.id+Math.random()}><img src={ele.imgUrl}  alt=""/></div>;
							case "NO":return <div key={ele.id+Math.random()}><img src={ele.imgUrl}  alt=""/></div>;
							default : return <div key={ele.id+Math.random()}><img src={ele.imgUrl}  alt=""/></div>;
						}
					})}</Slider>;
				}else{
					string = <Slider {...settings} {...this.props}><div><img src="/images/home.jpg" alt=""/></div></Slider>;
				}
			}
			return string;
		})();
		return(
			<div  className="scroll-content has-footer">
				{slide}
				<Column {...this.props}/>
				<Subscribe {...this.props}/>
				<ParseReport {...this.props} />
				<div className="item item-divider module-bar">
					<strong>最新报告</strong>
					<img src="/images/new_report.png" alt="" className="hot-title"/>
					<Link  to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.newReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="list new_report">
					{
						this.props.home.data.newReportMap.datas.map((ele,index)=> <ReportList dataSources={ele} key={ele.id}/>)
					}
				</ul>
				<div className="item item-divider module-bar">
					<strong>热门报告</strong>
					<img src="/images/hot_report.png" alt="" className="hot-title"/>
					<Link to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.hotReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<div className="list new_report">
					{
						this.props.home.data.hotReportMap.datas.map((ele,index)=> <ReportList dataSources={ele} key={ele.id}/>)
					}
				</div>
				<div className="item item-divider module-bar">
					<strong>合作公众号</strong>
				</div>
				<div className="partners">
					<div className="partners-class">
						<img src="/images/partners.png" alt=""/>
						<p>赛柏蓝</p>
					</div>
				</div>
				<Box {...this.props}/>
			</div>
		)
	}
}

class Column extends Component{
	render(){
		return(
			<ul className="column">
				<Link to="/report"  onClick={this.props.resetShearch}>
					<img src="/images/column01.jpg" alt=""/>
					分析报告
				</Link>
				<Link to="/datas/groups" >
					<img src="/images/datas_groups.jpg" alt=""/>
					<b className="assertive">目录分组</b>
				</Link>
                <Link to="/datas/dataSources">
					<img src="/images/datas_dataSources.jpg" alt=""/>
					<b className="assertive">入市价数据源</b>
				</Link>
				<Link to="/datas/marketPrice">
					<img src="/images/column07.jpg" alt="" className="price-icon"/>
					全国限价
				</Link>
				<Link to="/datas/bidList">
					<img src="/images/column02.jpg" alt=""/>
					中标数据
				</Link>
			</ul>
		)
	}
}

class Subscribe extends Component{
	free(nub){
		this.props.dispatch({
			type: 'RESETREPORT'
		});
		this.props.dispatch({
			type:'GOREPORTTYPE',
			data:[],
			reportType: nub,
			pageNo:1
		});
	}
	render(){
		return(
			<div>
				<div className="item item-divider module-bar">
					<strong>专栏订阅</strong>
					<img src="/images/read.png" alt="" className="hot-title"/>
					<Link  to="/subscribePage" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="list new_report">
					{
						this.props.home.ColumnList.map((ele,index)=> <SubscribeList {...this.props}  dataSources={ele} key={ele.id+Math.random()}/>)
					}
				</ul>
				<div  className="report_classify">
					<div className="row">
						<Link to="/report"  onClick={this.free.bind(this,467095547)} className="col col-50"><img src="/images/report_classify01.jpg" alt=""/></Link>
						<Link to="/report"  onClick={this.free.bind(this,467095549)} className="col col-50"><img src="/images/report_classify02.jpg" alt=""/></Link>
					</div>
					<div className="row">
						<Link to="/report"  onClick={this.free.bind(this,467095546)} className="col col-50"><img src="/images/report_classify03.jpg" alt=""/></Link>
						<Link to="/report"  onClick={this.free.bind(this,467095548)} className="col col-50"><img src="/images/report_classify04.jpg" alt=""/></Link>
					</div>
				</div>
			</div>
		)
	}
}

class ParseReport extends Component{
	freeReport(nub) {
		this.props.dispatch({
			type: 'RESETREPORT'
		});
		this.props.dispatch({
			type: 'GOREPORTFREE',
			data: [],
			costStatus: 0,
			pageNo: 1
		});
	}
	render(){
		return(
			<div>
				<div className="item item-divider module-bar">
					<strong>分析报告</strong>
					<img src="/images/free.png" alt="" className="hot-title"/>
					<Link  to="/report"  onClick={this.freeReport.bind(this)}  style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="parseReport-list">
					{
						this.props.home.ParseReport.map((ele,index)=> <Link  to={`/pay/pdf/${ele.id}`}  className="parseReport-item" key={ele.id+Math.random()}>《{ele.title}》</Link >)
					}
				</ul>
			</div>
		)
	}
}

class Popup extends Component{
	render(){
		return(
			<div style={{width:'100%',height:'100%'}}>
				<div className="backdrop visible active"></div>
				<div className="popup-container popup-showing active">
					<div className="popup popup-invitation">
						<img  className="popup_close" src="/images/home_close.png" onClick={this.props.close} alt=""/>
						<img style={{width:'100%'}} src="/images/subscribe_popup.png" alt=""/>
						<div className="popup-center">
							<div className="popup-center-text">
								尊敬的用户： <br/>
								<p> 您已成功订阅药市通《{this.props.popupTitle}》，留下联系方式可接收订阅专栏的更新信息，欢迎留下您的足迹。</p>
							</div>
							<form className="popup-center-form">
								<div className="list">
									<label className=" item-input">
										<span>手机号码</span>
										<input ref="phone" placeholder="非必填" type="text"/>
									</label>
									{
										this.props.phonePrompt==1?<span className="phonePrompt">请输入正确的手机号码</span>:null
									}
								</div>
								<div className="popup-footer">
									<span className="popup-btn" onClick={()=>{this.props.popupSure(this.refs.phone.value)}}>确定</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Record extends Component{
	render(){
		return(
			<div style={{position:'absolute',left:'0',top:'0',zIndex:'98',width:'100%',paddingLeft:'10px',lineHeight:'2',fontSize:'12px',backgroundColor:'rgba(255,255,255,.7)'}}>
				{this.props.dataSources}
			</div>
		)
	}
}

class PublishDate extends Component{
	render(){
		return(
			<div style={{width:'100%',height:'100%'}}>
				<div className="backdrop visible active"></div>
				<div className="popup-container popup-showing active">
					<div className="publishDate-popup"  style={{borderRadius: '5px',width: '80.07%'}}>
						<div>
							<img  className="publishDate-title-img" src="/images/publishDate_img.png" alt=""/>
						</div>
						<div className="popup-body"  style={{ textAlign: 'center'}}>
							<div className="popup-title">版本更新</div>
							<div className="popup-content" dangerouslySetInnerHTML={{__html:this.props.home.newContent.content}}>
							</div>
							<div style={{textAlign:'center'}}>
								<img className="popup-btn" onClick={this.props.showPublishDate}  src="/images/publishDate_btn.png" alt=""/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function select(state){
	return{
		home:state.home,
		userInfo:state.userInfo
	}
}

Home.contextTypes = {
	router:React.PropTypes.object.isRequired
}
export default connect(select)(Home);