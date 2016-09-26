import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadNewrepor,loadPicture} from './function/ajax';

var Slider = require('react-slick');
 class Home extends Component{
	 newReportMap(){
		 this.props.dispatch({
			 type:'CHANGETYPE',
			 searchType: 1
		 });
	 }
	 hotReportMap(){
		 this.props.dispatch({
			 type:'CHANGETYPE',
			 searchType: 2
		 });
	 }
	 constructor(props){
		 super(props);
		 this.state= {

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
			 }
		 });
		 loadPicture({
			 yearMonth:this.props.yearMonth,
			 areaId:this.props.areaId,
			 searchAreaType:this.state.searchAreaType,
			 callBack:(res)=>{
				 this.props.dispatch({
					 type:'LOADHOMEIMG',
					 img: res.datas
				 });
			 }
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
		console.log(this.props.home.img,"ddd");
		return(
			<div className="root home">
				<div  className="main">
					<Slider {...settings} {...this.props}>
						{
							this.props.home.img.map((ele,index)=> <div key={`img_${ele.id}`}><img src={ele.imgUrl}  alt=""/></div>)
						}
					</Slider>
					<Column {...this.props}/>
					<div className="item item-divider home-item-title">
					<strong>最新报告</strong>
					<img src="/images/new_report.jpg" alt="" />
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
				</div>
				<FooterBar {...this.props}/>
			</div>
		)
	}
}

class Column extends Component{
	render(){
		return(
			<ul className="column">
				<li>
					<img src="/images/column01.jpg" alt=""/>
					分析报告
				</li>
				<li>
					<img src="/images/column02.jpg" alt=""/>
					中标数据
				</li>
				<li>
					<img src="/images/column03.jpg" alt=""/>
					政策准入
				</li>
				<li>
					<img src="/images/column04.jpg" alt=""/>
					用药目录
				</li>
				<li>
					<img src="/images/column05.jpg" alt=""/>
					产品数据
				</li>
				<li>
					<img src="/images/column06.jpg" alt=""/>
					医院列表
				</li>
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
			<a href={`/pdf?file=${encodeURIComponent(`http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId=${this.props.dataSources.id}`)}`} className="item">
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
			</a>
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
				<a href={`/pdf?file=${encodeURIComponent(`http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId=${this.props.dataSources.id}`)}`}>
					<img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
					<h3> {this.props.dataSources.title}</h3>
					<div className="report-card-price">¥{this.state.price}</div>
					<p className="report-card-footer">
						{number}
						{tag}
					</p>
				</a>
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
