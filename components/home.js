import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadWx,loadNewrepor,loadPicture,loadJoinActivity,loadRecordContent,loadReportList,getCiReportColumnList} from './function/ajax';
import Box from './box';
import Loading from './loading';
import Popup from './popup';
import ReportList from './reportList';
import SubscribeList from './subscribeList';
import {OpenProductView,url2obj} from './function/common';

var Slider = require('react-slick');
class Home extends Component{
	constructor(props) {
		super(props);
		this.state ={
			loading:true,
			showPopup:false,
			reCordNum:0
		};
		this._loadData = this._loadData.bind(this);
		this._loadRecordContent = this._loadRecordContent.bind(this);
	}
	componentWillMount(){
		if(this.props.home.hasRecord) this._loadRecordContent();
	}
	_loadData(){
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
				if(res){
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
	componentDidMount(){
		this._loadData();
	}
	render(){
		return(
			<div className="root home">
				{
					this.props.home.isShowRecord ? <Record dataSources={this.state.reCordNum}/> : false
				}
				{
					!this.props.userInfo.isLogin ? null : <Main {...this.props}/>//openProductView={this._openProductView.bind(this)}
				}
				{
					(this.state.loading) ? <Loading/> : null
				}
				{
					this.state.showPopup ? <Popup {...this.props}  popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
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
			return string;
		})();
		return(
			<div  className="scroll-content has-footer">
				{slide}
				<Column {...this.props}/>
				<Subscribe {...this.props}/>
				<ParseReport {...this.props}/>
				<div className="item item-divider home-item-title">
					<strong>最新报告</strong>
					<img src="/images/new_report.jpg" alt="" className="hot-title"/>
					<Link  to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.newReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="list new_report">
					{
						this.props.home.data.newReportMap.datas.map((ele,index)=> <ReportList dataSources={ele} key={ele.id}/>)//openProductView = {this.props.openProductView}
					}
				</ul>
				<div className="item item-divider home-item-title">
					<strong>热门报告</strong>
					<img src="/images/hot_report.jpg" alt="" className="hot-title"/>
					<Link to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.hotReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<div className="list new_report">
					{
						this.props.home.data.hotReportMap.datas.map((ele,index)=> <ReportList dataSources={ele} key={ele.id}/>)//openProductView = {this.props.openProductView}
					}
				</div>
				<div className="item item-divider home-item-title">
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
				<Link to="/report">
					<img src="/images/column01.jpg" alt=""/>
					分析报告
				</Link>
				<Link to="/datas/policy">
					<img src="/images/column03.jpg" alt=""/>
					政策准入
				</Link>
				<Link to="/datas/bidList">
					<img src="/images/column02.jpg" alt=""/>
					中标数据
				</Link>
				<Link to="/datas/marketPrice">
					<img src="/images/column07.jpg" alt="" className="price-icon"/>
					入市价
				</Link>
				<Link to="/datas/product">
					<img src="/images/column05.jpg" alt=""/>
					产品数据
				</Link>
			</ul>
		)
	}
}

class ParseReport extends Component{
	freeReport(nub) {
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
				<div className="item item-divider home-item-title">
					<strong>分析报告</strong>
					<img src="/images/free.jpg" alt="" className="hot-title"/>
					<Link  to="/report"  onClick={this.freeReport.bind(this)}  style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="parseReport-list">
					{
						this.props.home.ParseReport.map((ele,index)=> <Link  to={`/pdf/${ele.id}/${encodeURIComponent(ele.title)}/${ele.price}`}  className="parseReport-item" key={ele.id+Math.random()}><i className="fa fa-play-circle"></i> 《{ele.title}》</Link >)
					}
				</ul>
				{
					//<ul className="list new_report">
					//	{
					//		this.props.home.ParseReport.map((ele,index)=> <ReportList dataSources={ele} key={ele.id}/>)
					//	}
					//</ul>
				}
			</div>
		)
	}
}
class Subscribe extends Component{
	free(nub){
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
				<div className="item item-divider home-item-title">
					<strong>专栏订阅</strong>
					<Link  to="/subscribePage" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="list new_report">
					{
						this.props.home.ColumnList.map((ele,index)=> <SubscribeList {...this.props} dataSources={ele} key={ele.id+Math.random()}/>)
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

class Record extends Component{
	render(){
		return(
			<div style={{position:'absolute',left:'0',top:'0',zIndex:'98',width:'100%',paddingLeft:'10px',lineHeight:'2',fontSize:'12px',backgroundColor:'rgba(255,255,255,.7)'}}>
				{this.props.dataSources}
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