/*
 报告列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './common/footerBar';
import {Link} from 'react-router';
import FilterReport from './filterPage/filterReport';
import Loading from './common/loading';
import EmptyComponent from './common/emptyComponent';
import {loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './function/ajax';
import ReportList from './reportList';

class Report extends Component {
  constructor(props){
    super(props);
    this.state={
      searchType:this.props.report.searchType,
      loading:true,
      request:true,
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
    this.ele.addEventListener('scroll',this._infiniteScroll);
    this._loadData();
    this._getReportType();
  }
  componentWillUnmount(){
    this.props.dispatch({
          type: 'RESETREPORT'
        });
  }
  _fn(args) {
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
  render() {
    return (
      <div className="root">
        <HeaderBar {...this.props} opacityNum={this.state.opacityNum} isOpacity={this.state.isOpacity} searchHandle={this._searchHandle.bind(this)}/>
        <div ref="content"  className="scroll-content scroll-report report-view">
          <div>
            {
              (this.state.loading) ? <Loading/> : null
            }
            <div className="header-img" ref="headerImg">
              <img width="100%" src="../images/report_bg.jpg"/>
            </div>
            <Main ref="main" {...this.props} reportTag={this.state.reportTag} data={this.props.report.data} loading={this.state.loading}>
            </Main>
          </div>
        </div>
        <FooterBar {...this.props}/>
        {
          this.props.report.isShowFilter ?
            <FilterReport fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.report}/> : null
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
        <div className="buttons"  onClick={this._showProvicenHandle.bind(this)} style={{ fontSize: '.75rem'}}>
          <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
          <span  style={{margin:' 0 5px'}}>筛选</span>
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
      if(this.props.data.length != 0){
        return(
            <div>
                {this.props.children}
                <ul className="list new_report">
                  {
                    this.props.data.map((ele,index)=> <ReportList reportTag={this.props.reportTag} dataSources={ele} key={ele.id+Math.random()}/>)
                  }
                </ul>
            </div>
        )
      }else{
        return <EmptyComponent/>
      }
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