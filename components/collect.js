/*
 收藏页面
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import FilterCollect from './filterCollect';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {getReportKeepList,insertUserAction,getReportType,cancelKeepReport} from './function/ajax';
import Popup from './popup';
import Collectpopup from './collectpopup';
import ReportList from './reportList';
import {OpenProductView} from './function/common';
import CollectPrompt from './collectPrompt';

class Collect extends Component {
  constructor(props){
    super(props);
    this.state={
      searchType:this.props.report.searchType,
      loading:true,
      request:true,
      showPopup:false,
      reportTag:this.props.report.reportTag,
      showPromptMes:false,
      showPrompt:false
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
  componentDidMount(){
    this.ele = this.refs.content;
    this.ele.addEventListener('scroll',this._infiniteScroll);
    this._loadData();
    this._getReportType();
  }
  _loadData(){
    this.setState({
      loading:true
    });
    this.setState({
      request:false
    });
    getReportKeepList({
      sidx:this.props.report.sidx,
      sord:this.props.report.sord,
      pageNo:this.props.report.pageNo,
      searchType:this.props.report.searchType,
      reportType:this.props.report.reportType,
      costStatus:this.props.report.costStatus,
      columnBigType:this.props.report.columnBigType,
      titleOrReportKey:this.props.report.titleOrReportKey,
      callBack:(res)=>{
        console.log(res);
        if(this.state.showPrompt){
          setTimeout(()=>{
            this.setState({
              showPrompt:0
            })
          },1000)
        }
        this.props.dispatch({
          type:'LOADCOLLECT',
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
  }
  _getReportType(){
    getReportType({
      callBack:(res)=>{
        this.props.dispatch({
          type:'CHANGECOLLECTREPORTTYPEDATE',
          ReportTypeDate:res.datas,
        });
      }
    });
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
      type:'LOADCOLLECT',
      data:[],
      pageNo:1
    });
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    })
    this.props.dispatch({
      type:'SELECTCHANGERCOLLECT',
      searchType:args.searchType,
      reportType:encodeURI(encodeURI(args.reportType)),
      active:args.active,
      sord:args.sord,
      sidx:args.sidx,
      costStatus:args.costStatus,
      reportTag:args.reportTag,
      columnBigType:args.columnBigType
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
      type:'LOADCOLLECT',
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
      this.context.router.push('/purchase');
    }
    _collectPopupCancel(){
      this.setState({
        showPrompt:1,
        showPromptMes:"取消收藏"
      })
      cancelKeepReport({
        reportId:this.props.report.showCollectPopupID,
        callBack:(res)=>{
          if(res.state==1)
            this.setState({
              isKeep:0
            })
        }
      })
      this.props.dispatch({
        type:'LOADCOLLECT',
        data:[],
        pageNo:1
      });
      setTimeout(()=>{
        this._loadData();
      });
      this.props.dispatch({
        type:'SHOWCOLLECTPOPUP',
        showCollectPopup:false,
        showCollectPopupID:null
      })
  }
  _collectPopupCancelall(){
    this.props.dispatch({
      type:'SHOWCOLLECTPOPUP',
      showCollectPopup:false,
      showCollectPopupID:null
    })
  }
  componentWillUnmount(){
    this.props.dispatch({
      type:'RESETREPORTCOLLECT'
    });
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    });
  }
  render() {
    return (
      <div className="root">
        <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}/>
        <div  ref="content"  className="scroll-content has-header report-view">
          <Main {...this.props} openProductView={this._openProductView.bind(this)} reportTag={this.state.reportTag} data={this.props.report.data} loading={this.state.loading}/>
        </div>
        <FooterBar {...this.props}/>
        {
          this.props.report.isShowFilter ?
            <FilterCollect fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.report}/> : null
        }
        {
          this.state.loading ? <Loading/> : null
        }
        {
          this.state.showPopup ? <Popup {...this.props}  popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
        }
        {
          this.props.report.showCollectPopup ? <Collectpopup collectPopupCancel={this._collectPopupCancel.bind(this)}  collectPopupCancelall={this._collectPopupCancelall.bind(this)}/> : null
        }
        {
          this.state.showPrompt ? <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
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
      type:'CHANGECOLLECTTITLEORREPORTKEY',
      titleOrReportKey:encodeURI(encodeURI(this.refs.collectSearchName.value))
    })
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
        <div className="buttons" onClick={this._showProvicenHandle.bind(this)} style={{ fontSize: '.75rem'}}>
          {
            //<button className="button" onClick={this._showProvicenHandle.bind(this)}>
            //  <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
            //</button>
          }
          <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
          <span  style={{margin:' 0 5px'}}>筛选</span>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="collectSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
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
    this.state={
      collect:true
    };

  }
  render(){

      if(this.props.data.length != 0){
        return(
            <ul className="list new_report">
              {
                this.props.data.map((ele,index)=> <ReportList  {...this.props} openProductView = {this.props.openProductView} reportTag={this.props.reportTag} collect={this.state.collect} dataSources={ele} key={ele.id+Math.random()}/>)
              }
            </ul>
        )
      }else{
        return <EmptyComponent/>
      }
    }
}
function select(state){
  return{
    report:state.collect
  }
}
Collect.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default connect(select)(Collect);