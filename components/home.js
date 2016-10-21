import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadNewrepor,loadPicture,loadJoinActivity,loadRecordContent} from './function/ajax';
import Box from './box';
import Loading from './loading';
import Popup from './popup';
import ReportList from './reportList';

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
     _loadData(){
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
     componentWillMount(){
         if(this.props.home.hasRecord) this._loadRecordContent();
     }
	 componentDidMount(){
		 this._loadData();
         
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
         //获取金银活动箱子状态
         loadJoinActivity({
             callBack:(res)=>{
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
         })
	 }
     _openProductView(id){
        if (typeof WeixinJSBridge == "undefined")   return false;
        var pid = id;
//        var pid = "pDF3iY_G88cM_d-wuImym3tkVfG5";//只需要传递
        WeixinJSBridge.invoke('openProductViewWithPid',{"pid":pid},(res)=>{
            // 返回res.err_msg,取值 
            // open_product_view_with_id:ok 打开成功
//            alert(res.err_msg);
            if (res.err_msg == "open_product_view_with_id:ok"){
                WeixinJSBridge.invoke('openProductView',{
                    "productInfo":"{\"product_id\":\""+pid+"\",\"product_type\":0}"
                    },(res)=>{ 
                    this.setState({
                        showPopup:true
                    });
                });
            }
        })
     }
         _popupCancel(){
            this.setState({
            showPopup:false
            })
            }
        _popupSure(){
            this.setState({
            showPopup:false
            });
            this.props.dispatch({
              type:'RESETHOMEREPORT'
            });
            setTimeout(()=> this._loadData(),100);
    }
	render(){
		return(
			<div className="root home">
                {
                    this.props.home.isShowRecord ? <Record dataSources={this.state.reCordNum}/> : false
                }
				<Main {...this.props} showPopup={this.state.showPopup} popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)} openProductView={this._openProductView.bind(this)}/>
				{
                    this.state.loading ? <Loading/> : null
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
					console.log(this.props.home.img[index].imgSource)
					switch(this.props.home.img[index].resourceType){
						case "EXTERNAL": let url = '/picture/'+encodeURIComponent(this.props.home.img[index].imgSource);return <div  key={ele.id+Math.random()}><Link to={url}><img src={ele.imgUrl}  alt=""/></Link></div>;
						case "INTERNAL":<div  key={ele.id+Math.random()}><Link to={this.props.home.img[index].imgSource}><img src={ele.imgUrl}  alt=""/></Link></div>;
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
			    {
                    this.props.showPopup ? <Popup popupCancel={this.props.popupCancel} popupSure={this.props.popupSure}/> : null
                }
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
						this.props.home.data.newReportMap.datas.map((ele,index)=> <ReportList openProductView = {this.props.openProductView} dataSources={ele} key={ele.id}/>)
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
						this.props.home.data.hotReportMap.datas.map((ele,index)=> <ReportList openProductView = {this.props.openProductView} dataSources={ele} key={ele.id}/>)
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
        let isCanViewReport = false;
          if(this.props.dataSources.costStatus == '1' && this.props.dataSources.buyReport == '0'){
                  isCanViewReport = false;
          }else{
              isCanViewReport = true;
          }
		return(
			<div>
			    {
               isCanViewReport ? <Link to={`/pdf/${this.props.dataSources.id}/${this.props.dataSources.title}`}  className="item">
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
                </Link>:
                <a onClick={()=>this.props.openProductView(this.props.dataSources.id)}  className="item">
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
            }
			</div>
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
        let isCanViewReport = false;
          if(this.props.dataSources.costStatus == '1' && this.props.dataSources.buyReport == '0'){
                  isCanViewReport = false;
          }else{
              isCanViewReport = true;
          }
		return(
			<div className="col-50">
				{
                    isCanViewReport ? <Link to={`/pdf/${this.props.dataSources.id}/${this.props.dataSources.title}`}>
                        <div className="report-img">
                            <img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
                        </div>
                        <h3> {this.props.dataSources.title}</h3>
                        <div className="report-card-price">¥{this.state.price}</div>
                        <p className="report-card-footer">
                            {number}
                            {tag}
                        </p>
                    </Link>:
                    <a onClick={()=>this.props.openProductView(this.props.dataSources.id)}>
                        <div className="report-img">
                            <img src={this.props.dataSources.mainImg} style={{display:'block',width: "100%"}}/>
                        </div>
                        <h3> {this.props.dataSources.title}</h3>
                        <div className="report-card-price">¥{this.state.price}</div>
                        <p className="report-card-footer">
                            {number}
                            {tag}
                        </p>
                    </a>
                }
			</div>
		)
	}
}

class Record extends Component{
    render(){
		console.log(this.props.dataSources);
        return(
            <div style={{position:'absolute',left:'0',top:'0',zIndex:'999',width:'100%',paddingLeft:'10px',lineHeight:'2',fontSize:'12px',backgroundColor:'rgba(255,255,255,.7)'}}>
                {this.props.dataSources}
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
