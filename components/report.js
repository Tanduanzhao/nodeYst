/*
 报告列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import FilterReport from './filterReport';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './function/ajax';
import Popup from './popup';
import ReportList from './reportList';
import {OpenProductView} from './function/common';

class Report extends Component {
  constructor(props){
    super(props);
    this.state={
      searchType:this.props.report.searchType,
      loading:true,
      request:true,
      showPopup:false,
      isOpacity:true,
      opacityNum:0,
      reportTag:this.props.report.reportTag
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
  _loadData(){
    this.setState({
      request:false
    });
    loadReportList({
      sidx:this.props.report.sidx,
      sord:this.props.report.sord,
      pageNo:this.props.report.pageNo,
      searchType:this.props.report.searchType,
      reportType:this.props.report.reportType,
      costStatus:this.props.report.costStatus,
      titleOrReportKey:this.props.report.titleOrReportKey,
      callBack:(res)=>{
        this.props.dispatch({
          type:'LOADPRODUCEDATA',
          data:this.props.report.data.concat(res.datas),
          pageNo:this.props.report.pageNo+1
        });
        if(res.totalSize <= this.props.report.data.length){
          this.props.dispatch({
            type:'UNINFINITE'
          });
        }else{
          this.props.dispatch({
            type:'INFINITE'
          });
        }
        this.setState({
          loading:false
        });
        this.setState({
          request:true
        });
      }
    });
  }
  _infiniteScroll(){
    //全部高度-滚动高度 == 屏幕高度-顶部偏移
    console.log(this.ele.firstChild.clientHeight,"clientHeight")
    console.log(this.ele.scrollTop,"scrollTop")
    console.log(this.ele.firstChild.clientHeight-this.ele.scrollTop ,"requestss")
    console.log(document.body.clientHeight-this.ele.offsetTop ,"ssss")
    if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.report.infinite && this.state.request){
      this._loadData();
    }
    if(this.ele.scrollTop>=this.refs.headerImg.clientHeight){
        this.setState({
            isOpacity:false,
            opacityNum:1
        });
    }else{
        this.setState({
            isOpacity:true,
            opacityNum:this.ele.scrollTop/this.refs.headerImg.clientHeight
        })
    }
  }
  _getReportType(){
    getReportType({
      callBack:(res)=>{
        this.props.dispatch({
          type:'CHANGEREPORTTYPEDATE',
          ReportTypeDate:res.datas,
        });
      }
    });
  }
  componentDidMount(){
      
    this.ele = this.refs.content;
//    console.dir(this.refs.headerImg);
    this.ele.addEventListener('scroll',this._infiniteScroll);
//    console.log(this.props.report.fixedScroll);
    //this._loadData();
    //this._getReportType();
    if(this.props.report.fixedScroll!=2){
      this._loadData();
      this._getReportType();
      this.props.dispatch({
        type:'CHAGNGEFIXEDSCROLL',
        fixedScroll:2
      })
    }else{
      this.setState({
        loading:false
      });
    }
  }
  componentWillUnmount(){
    if(this.props.report.fixedScroll != 2){
      this.props.dispatch({
        type: 'RESETREPORT'
      });
    }
    this.props.dispatch({
      type:'CHAGNGEFIXEDSCROLL',
      fixedScroll:1
    })
  }
   _openProductView(id){
     OpenProductView(id,()=>{
           this.setState({
             showPopup:true
           });
         }
     )
    }
  _fn(args) {
    console.log(args.reportTag,"args")
    if(!args.reportTag){
      this.setState({
        reportTag:false
      });
    }else{
      this.setState({
        reportTag:true
      });
    }
    this.setState({
      loading:true
    });
    this.props.dispatch({
      type:'LOADPRODUCEDATA',
      data:[],
      pageNo:1
    });
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    })
    this.props.dispatch({
      type:'CHANGEREPORTTYPE',
      searchType:args.searchType,
      reportType:encodeURI(encodeURI(args.reportType)),
      active:args.active,
      sord:args.sord,
      sidx:args.sidx,
      costStatus:args.costStatus,
      reportTag:args.reportTag
    });
    setTimeout(()=>{
      this._loadData();
    },100);
  }
  _searchHandle(){
    this.setState({
      loading:true
    });
    this.props.dispatch({
      type:'LOADPRODUCEDATA',
      data:[],
      pageNo:1
    });
    setTimeout(()=> this._loadData(),100);
  }

    _popupCancel(){
        this.setState({
            showPopup:false
        })
    }
    _popupSure(){
        //this.setState({
        //    showPopup:false
        //});
      this.context.router.push('/purchase');
        //this.props.dispatch({
        //  type:'LOADPRODUCEDATA',
        //  data:[],
        //  pageNo:1,
        //});
        //setTimeout(()=> this._loadData(),100);
    }
  render() {
    return (
      <div className="root">
        <HeaderBar {...this.props} opacityNum={this.state.opacityNum} isOpacity={this.state.isOpacity} searchHandle={this._searchHandle.bind(this)}/>
        <div ref="content"  className="scroll-content scroll-report report-view">
          <div className="header-img" ref="headerImg">
              <img width="100%" src="../images/report_bg.jpg"/>
          </div>
          <Main ref="main" {...this.props} openProductView={this._openProductView.bind(this)} reportTag={this.state.reportTag} data={this.props.report.data} loading={this.state.loading}>
          </Main>
        </div>
        <FooterBar {...this.props}/>
        {
          this.props.report.isShowFilter ?
            <FilterReport fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.report}/> : null
        }
        {
          this.state.showPopup ? <Popup {...this.props}  popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
        }
      </div>
    )
  }
}
class HeaderBar extends Component{
  _showProvicenHandle(){
    this.props.dispatch({
      type:'SHOWFILTERPRODUCE'
    });
  }
  _changeHandle(){
    this.props.dispatch({
      type:'CHANGETITLEORREPORTKEY',
      titleOrReportKey:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
    })
  }
  render(){
    return(
      <div className={`bar bar-header bar-positive item-input-inset ${this.props.isOpacity ? 'bar-opacity' : null}`} style={{backgroundColor:`rgba(56,126,245,${this.props.opacityNum})`}}>
        <div className="buttons">
          <button className="button" onClick={this._showProvicenHandle.bind(this)}>
            <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
          </button>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
        </label>
        <button className="button button-clear" onClick={this.props.searchHandle}>
           搜索
        </button>
      </div>
    )
  }
}
class Main extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.loading) {
      return <Loading/>
    }else{
      if(this.props.data.length != 0){
        return(
            <div>
                {this.props.children}
                <ul className="list new_report">
                  {
                    this.props.data.map((ele,index)=> <ReportList openProductView = {this.props.openProductView} reportTag={this.props.reportTag} dataSources={ele} key={ele.id+Math.random()}/>)
                  }
                </ul>
            </div>
        )
      }else{
        return <EmptyComponent/>
      }
    }
  }
}
class List extends Component{
  constructor(props){
    super(props);
    };
  insertUserAction(e){
    insertUserAction({
      reportId:this.props.dataSources.id,
      costStatus:this.props.dataSources.costStatus,
      callBack:(res)=> {
        console.log(res)
      }
    });

  }
  render(){
      console.log(this.props.dataSources.costStatus,'ct');
      console.log(this.props.dataSources.buyReport,'sss');
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
        string = <span style={{textAlign:"left"}}>{this.props.dataSources.number}人购买</span>;
      }else{
        string = <span style={{textAlign:"left"}}>{this.props.dataSources.number}人查看</span>;
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
                      <img src={this.props.dataSources.mainImg}/>
                    </div>
                    <h3> {this.props.dataSources.title}</h3>
                    <div className="report-card-price">¥{this.state.price}</div>
                    <p className="report-card-footer">
                      {number}
                      {tag}
                    </p>
                  </Link> : <a onClick={()=>this.props.openProductView(this.props.dataSources.id)}>
                    <div className="report-img">
                      <img src={this.props.dataSources.mainImg}/>
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
function select(state){
  return{
    subscribe:state.report.subscribe,
    subscribeTwo:state.report.subscribeTwo,
    showProvicen:state.index.showProvicen,
    areaId:state.provicen.areaId,
    areaName:state.provicen.areaName,
    provicenData:state.provicen.data,
    yearMonth:state.data.yearMonth,
    uri:state.router.uri,
    report:state.report,
    searchAreaType:state.provicen.searchAreaType
  }
}
Report.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default connect(select)(Report);