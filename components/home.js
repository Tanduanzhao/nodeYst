import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadNewrepor,loadPicture} from './function/ajax';

var Slider = require('react-slick');
 class Home extends Component{

	 constructor(props){
		 super(props);
		 this.state={
			 //datas:{
				// data:[
				// {id:"1",prodName:"广东省药械政策变化和市场机遇.",dosSname:"0",nub:1211,icon:"点击查看",url:"free",img:"home_hot_report01"},
				// {id:"2",prodName:"药品流通行业运行统计分析报告2015年.",dosSname:"200",nub:3211,icon:"报告试读",url:"charge",img:"home_hot_report02"}
			 //],
				// newreport:[
				//	 {id:"1",prodName:"慢阻肺患者的用药图谱.",dosSname:"200",nub:1211,icon:"报告试读",url:"charge",img:"produce_Item01"},
				//	 {id:"2",prodName:"其他β-内酰胺类抗菌药市场报告.",dosSname:"0",nub:3211,icon:"点击查看",url:"free",img:"produce_Item02"}
				// ],
				// img:[
				//	 {id:"1",img:"home"},
				//	 {id:"2",img:"home"},
				//	 {id:"3",img:"home"},
				// ]
			 //}

		 };
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
			 searchAreaType:this.props.searchAreaType,
			 callBack:(res)=>{
				 console.log(res,"dddddd");
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
					<a href="#" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</a>
				</div>
				<ul className="list new_report">
					{
						this.props.home.data.newReportMap.datas.map((ele,index)=> <Newrepor dataSources={ele} key={ele.id}/>)
					}
				</ul>
				<div className="item item-divider home-item-title">
					<strong>热门报告</strong>
					<img src="/images/hot_report.jpg" alt="" className="hot-title"/>
					<a href="#" style={{position: "absolute",right:"1rem",fontSize:"1.2rem"}}>
						<i className="icon ion-android-more-horizontal"></i>
					</a>
				</div>
				<div className="row produce-cards bg-fff">
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
		this.state= {
			num: this.props.dataSources.num
		}
	};
	_subscribe(event) {
		this.setState({
			num:this.state.num * 1+1
		})
		event.preventDefault();
	}
	render(){
		return(
			<Link to={`/produce/${this.props.dataSources.url}`} className="item" >
				<div  className="item-left">
					<img src={this.props.dataSources.mainImg} alt=""/>
				</div>
				<div className="item-right">
					<h3>{this.props.dataSources.title}</h3>
					<p>¥{this.props.dataSources.price}</p>
					<div className="item-right-footer">
						<span style={{textAlign:"left"}} onClick={this._subscribe.bind(this)}>{this.state.num}人购买</span>
						<i className="item-icon">报告试读</i>
					</div>
				</div>
			</Link>
		)
	}
}

class Hotrepor extends Component{
	constructor(props){
		super(props);
		this.state= {
			num: this.props.dataSources.num
		}
	};
	_subscribe(event) {
		this.setState({
			nub:this.state.num * 1+1
		})
		event.preventDefault();
	}
	render(){
		return(
			<div className="col-50">
				<Link to={`/produce/${this.props.dataSources.url}`}>
					<img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
					<h3> {this.props.dataSources.title}</h3>
					<div className="produce-card-price">¥{this.props.dataSources.price}</div>
					<p className="produce-card-footer">
						<span style={{textAlign:'left'}}  onClick={this._subscribe.bind(this)}>{this.state.num}人查看</span>
						<i className="produce-card-icon">报告试读</i>
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
