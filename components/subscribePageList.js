/*
 专栏订阅详情列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FilterReport from './filterReport';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {getColumnReportList,loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './function/ajax';
import FilterSubscribeList from './filterSubscribeList';

class SubscribePageList extends Component {
  constructor(props){
    super(props);
    this.state={
        request:true,
        loading:true,
        id:this.props.params.id
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
    componentDidMount(){
        this.ele = this.refs.content;
        this._loadData();
        this._getReportType();
    }
    _loadData(){
        this.setState({
            request:false
        });
        console.log(this.props.subscribePageList.pageNo,"costStatusss")
        //读取专栏订阅详情
        getColumnReportList({
            columnId:this.props.params.id,
            reportType:this.props.params.reportType,
            costStatus:this.props.subscribePageList.costStatus,
            pageNo:this.props.subscribePageList.pageNo,
            titleOrReportKey:this.props.subscribePageList.titleOrReportKey,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADSUBSCRIBEPAGELISTDATA',
                    data:res.datas,
                    pageNo:this.props.subscribePageList.pageNo+1
                });
                this.setState({
                    loading:false
                });
                this.setState({
                    request:true
                });
            }
        });
    }
    _getReportType(){
        getReportType({
            columnId:this.props.params.id,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'CHANGESUBSCRIBEPAGELISTTYPEDATE',
                    subscribeTypeDate:res.datas
                });
            }
        });
    }
    _infiniteScroll(){
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.subscribePageList.infinite && this.state.request){
          this._loadData();
        }
  }
    _searchHandle(){
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type:'LOADSUBSCRIBEPAGELISTDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this._loadData(),100);
    }
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTERSUBSCRIBEPAGE'
        });
    }
    _fn(args){
        this.setState({
            loading:true
        });
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADSUBSCRIBEPAGELISTDATA',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTERPSUBSCRIBEPAGE'
            });
            console.log(args.costStatus)
            dispatch({
                type:'CHANGESUBSCRIBEPAGELISTEFILTER',
                costStatus:args.costStatus,
                column:args.column
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    componentWillUnmount(){
        this.props.dispatch({
            type: 'RESETSUBSCRIBEPAGELIST'
        });
    }
  render() {

    return (
      <div className="root">
          {
              //<HeaderBar {...this.props}  searchHandle={this._searchHandle.bind(this)} showProvicenHandle={this._showProvicenHandle.bind(this)}/>
          }
       <div  ref="content"  className="scroll-content subscribeAll">
          <Main {...this.props} data={this.props.subscribePageList.data} id={this.state.id}  briefContentList={this.props.subscribePageList.briefContentList} loading={this.state.loading}/>
        </div>
          {
              this.props.subscribePageList.data.buyReport==0
                  ? <div className="bar bar-footer row purchase-bar" style={{display:"none"}}>
                        <button>¥ 6999/年</button>
                         <button className="purchase-subscribe">专栏订阅</button>
                     </div>
                  :  null
          }
          {
              this.props.subscribePageList.isShowFilter&&!this.state.loading? <FilterSubscribeList fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.subscribePageList}/> : null
          }
      </div>
    )
  }
}
class HeaderBar extends Component{
  _changeHandle(){
    this.props.dispatch({
      titleOrReportKey:encodeURI(encodeURI(this.refs.subscribePageSearchName.value))
    })
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
          <div className="buttons">
              <button className="button" onClick={this.props.showProvicenHandle}>
                  <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
              </button>
          </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="subscribePageSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
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
    _hiddenbriefContent(){
        this.props.briefContentList
            ?   this.props.dispatch({type: 'UNSHOWBRIEFCONTENTLIST'})
            : this.props.dispatch({type: 'SHOWBRIEFCONTENTLIST'})
    }
  render(){
    if(this.props.loading) {
      return <Loading/>
    }else{
        return(
            <div>
                <div className="img-title">
                    <img className="title" src={this.props.data.columnInstroImg} alt=""/>
                    {
                        this.props.params.id==3?null
                            : <div className="bar-title">
                                {this.props.data.title}
                                <div className="bar-typeName">{this.props.data.typeName}</div>
                            </div>
                    }
                </div>
                <div className="list">
                    <div className="item item-divider home-item-title">
                        <strong>
                            {
                                this.props.params.id==3?"课程简介":"栏目简介"
                            }
                        </strong>
                        <div className="list-title-right">
                            {
                                //<i className="fa fa-eye"></i>
                                //14786人订阅
                            }
                            <i   className={this.props.briefContentList ? "ion-chevron-up": "ion-chevron-down"} style={{ color:'#0894ec',marginLeft: '6px'}} onClick={this._hiddenbriefContent.bind(this)}></i>
                        </div>
                    </div>
                    {
                        this.props.briefContentList
                            ? <p className="subscribeAll-body">{this.props.data.typeMainContent}</p>
                            :null
                    }
                    <div className="item item-divider home-item-title">
                        <strong>
                            {
                                this.props.params.id==3?"课程内容":"栏目报告"
                            }
                        </strong>
                    </div>
                    <ul className="list new_report">
                        {
                            this.props.data.lists.map((ele,index)=> <List id={this.props.id} typeName={this.props.data.typeName} dataSources={ele} key={ele.id+Math.random()}/>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
  }
}

class List extends Component{
    constructor(props){
        super(props);
    }
    render() {
        var viewicon=(()=>{
            var children=null;
            if(this.props.dataSources.buyReport==1){
                children=<i className="item-icon item-icon-free">点击查看</i>
            }else{
                if(this.props.dataSources.costStatus==0){
                    children=<i className="item-icon item-icon-free">点击查看</i>
                }else{
                    children=<i className="item-icon">报告试读</i>
                }
            }
            return children;
        })();
        return (
            <Link className="item" to={`/subscribeContent/${this.props.id}/${this.props.dataSources.id}/${this.props.typeName}`}>
                <div className="item-left">
                    <img src={this.props.dataSources.mainImg} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">{this.props.dataSources.title}</h3>
                    <div className="introduce">{this.props.dataSources.reportDigest}</div>
                    {
                        //<div className="item-right-footer item-footer-right">
                        //    {viewicon}
                        //</div>
                    }
                </div>
            </Link>
        )
    }
}

function select(state){
  return{
      subscribePageList:state.subscribePageList
  }
}
SubscribePageList.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default connect(select)(SubscribePageList);