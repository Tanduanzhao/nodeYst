import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadNewrepor,loadPicture} from './function/ajax';
import Box from './box';
import Loading from './loading';

var Slider = require('react-slick');
 class Home extends Component{
	 constructor(props) {
		 super(props);
		 this.state ={
			 loading:true,
		 }
	 }
	 componentDidMount(){
		 loadNewrepor({
			 yearMonth:this.props.yearMonth,
			 areaId:this.props.areaId,
			 searchAreaType:this.props.searchAreaType,
			 callBack:(res)=>{
				console.log(res.datas)
				 this.props.dispatch({
					 type:'LOADHOMEDATA',
					 data: res.datas
				 });
				 this.setState({
					 loading:false
				 });
			 }
		 });
		 loadPicture({
			 yearMonth:this.props.yearMonth,
			 areaId:this.props.areaId,
			 searchAreaType:this.state.searchAreaType,
			 imgType:"MAIN_ADVERTISEMENT"
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
	 }
	render(){
		return(
			<div className="root home">
				{this.state.loading ? <Loading/> : <Main {...this.props}/>}
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
	}
	hotReportMap(){
		this.props.dispatch({
			type:'GOREPORT',
			data:[],
			searchType: 2,
			pageNo:1
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
				string = <Slider {...settings} {...this.props}>{this.props.home.img.map((ele,index)=> <div key={`img_${ele.id}`}><img src={ele.imgUrl}  alt=""/></div>)}</Slider>;
			}else{
				string = <Slider {...settings} {...this.props}><div><img src="/images/home.jpg" alt=""/></div></Slider>;
			}
			return string;
		})();
		return(
			<div  className="main">
				{slide}
				<Column {...this.props}/>
				<div className="item item-divider home-item-title">
					<strong>最新报告</strong>
					<img src="/images/new_report.jpg" alt="" className="hot-title"/>
					<Link  to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.newReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<ul className="list new_report">
					{
						this.props.home.data.newReportMap.datas.map((ele,index)=> <Newrepor dataSources={ele} key={ele.id}/>)
					}
				</ul>
				<div className="item item-divider home-item-title">
					<strong>热门报告</strong>
					<img src="/images/hot_report.jpg" alt="" className="hot-title"/>
					<Link to="/report" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}  onClick={this.hotReportMap.bind(this)}>
						<i className="icon ion-android-more-horizontal"></i>
					</Link>
				</div>
				<div className="row report-cards bg-fff">
					{
						this.props.home.data.hotReportMap.datas.map((ele,index)=> <Hotrepor dataSources={ele} key={ele.id}/>)
					}

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
				<Link to="/datas/marketPrice">
					<img src="/images/column07.jpg" alt="" className="price-icon"/>
					入市价
				</Link>
				<Link to="/datas/bidList">
					<img src="/images/column02.jpg" alt=""/>
					中标数据
				</Link>
				<Link to="/datas/policy">
					<img src="/images/column03.jpg" alt=""/>
					政策准入
				</Link>
				<Link to="/datas/product">
					<img src="/images/column05.jpg" alt=""/>
					产品数据
				</Link>
			</ul>
		)
	}
}

class Newrepor extends Component{
	constructor(props){
		super(props);
	};
	render(){
		var string = null;
		var tag = (()=>{
			if(this.props.dataSources.costStatus == "1"){
				string = <i className="item-icon">报告试读</i>;
			}else{
				string = <i className="item-icon">点击查看</i>;
			}
			return string;
		})();
		var number = (()=>{
			if(this.props.dataSources.costStatus == "1"){
				string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人购买</span>;
			}else{
				string =<span style={{textAlign:"left"}}>{this.props.dataSources.num}人查看</span>;
			}
			return string;
		})();
		if(this.props.dataSources.costStatus == "1"){
			this.state= {
				price: this.props.dataSources.price
			}
		}else{
			this.state= {
				price: 0
			}
		}
		return(
			<Link to={`/pdf/${this.props.dataSources.id}`}  className="item">
				<div  className="item-left">
					<img src={this.props.dataSources.mainImg} alt=""/>
				</div>
				<div className="item-right">
					<h3>{this.props.dataSources.title}</h3>
					<p>¥{this.state.price}</p>
					<div className="item-right-footer">
						{number}
						{tag}
					</div>
				</div>
			</Link>
		)
	}
}

class Hotrepor extends Component{
	constructor(props){
		super(props);
	};
	render(){
		var string = null;
		var tag = (()=>{
			if(this.props.dataSources.costStatus == "1"){
				string = <i className="report-card-icon">报告试读</i>;
			}else{
				string = <i className="report-card-icon">点击查看</i>;
			}
			return string;
		})();
		var number = (()=>{
			if(this.props.dataSources.costStatus == "1"){
				string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人购买</span>;
			}else{
				string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人查看</span>;
			}
			return string;
		})();
		if(this.props.dataSources.costStatus == "1"){
			this.state= {
				price: this.props.dataSources.price
			}
		}else{
			this.state= {
				price: 0
			}
		}
		return(
			<div className="col-50">
				<Link to={`/pdf/${this.props.dataSources.id}`}>
					<div className="report-img">
						<img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
					</div>
					<h3> {this.props.dataSources.title}</h3>
					<div className="report-card-price">¥{this.state.price}</div>
					<p className="report-card-footer">
						{number}
						{tag}
					</p>
				</Link>
			</div>
		)
	}
}
function select(state){
	return{
		home:state.home
	}
}
export default connect(select)(Home);
