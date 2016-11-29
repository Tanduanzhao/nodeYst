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
        loading:true
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
    componentDidMount(){
        this.ele = this.refs.content;
        this._loadData();
    }
    _loadData(){
        this.setState({
            request:false
        });
        //读取专栏订阅详情
        getColumnReportList({
            columnId:this.props.params.id,
            pageNo:this.props.subscribePageList.pageNo,
            titleOrReportKey:this.props.subscribePageList.titleOrReportKey,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADSUBSCRIBEPAGEALLDATA',
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
            type:'LOADSUBSCRIBEPAGEALLDATA',
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
                type:'LOADSUBSCRIBEPAGEALLDATA',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTERPSUBSCRIBEPAGE'
            });
            dispatch({
                type:'CHANGESUBSCRIBEPAGEFILTER'
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
      console.log(this.props.subscribePageList.data,"date")
    return (
      <div className="root">
        <HeaderBar {...this.props}  searchHandle={this._searchHandle.bind(this)} showProvicenHandle={this._showProvicenHandle.bind(this)}/>
        <div  ref="content"  className="scroll-content has-header subscribeAll has-footer">
          <Main {...this.props} data={this.props.subscribePageList.data} loading={this.state.loading}/>
        </div>
          <div className="bar bar-footer bar-assertive row purchase-report ">
              <button className="button-clear col-50 purchase-price">¥sss}</button>
              <button className="button-clear col-50">报告购买</button>
          </div>
          {
              this.props.subscribePageList.isShowFilter&&!this.state.loading? <FilterSubscribeList fn={this._fn.bind(this)}  dataSources={this.props.provicenData} {...this.props}/> : null
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
  render(){
    if(this.props.loading) {
      return <Loading/>
    }else{
        return(
            <div>
                <div className="img-title">
                    <img className="title" src={this.props.data.columnInstroImg} alt=""/>
                    <div className="bar-title">吴炳洪･《老吴专栏》</div>
                </div>
                <div className="list">
                    <div className="item list-title">
                        <h3>栏目报告</h3>
                       <div className="list-title-right">14786人订阅</div>
                    </div>
                    <p className="subscribeAll-body">
                        Phasellus porta fermentum est et eleifend. Pellentesque dapibus fermentum tortor, non fermentum sem vehicula sit amet. Vivamus sed justo nisl. Nunc suscipit scelerisque ex, at mattis ipsum elementum sed. Cras eget neque ut justo dignissim tempus. In eu mi sagittis, fringilla lorem ac, porttitor ante. Duis fermentum, leo eget gravida cursus, eros mi congue est, et aliquam lectus enim ac ipsum. Cras eu lacus non odio laoreet fringilla. Curabitur eget enim vitae velit tincidunt aliquam. Aliquam nec tortor eu sapien efficitur rhoncus eu vel ante.
                    </p>
                    <div className="item list-title">
                        <h3>专栏栏目</h3>
                    </div>
                    <ul className="list new_report">
                        {
                            this.props.data.lists.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random()}/>)
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
            <Link className="item" to={`/subscribeContent/${this.props.dataSources.id}`}>
                <div className="item-left">
                    <img src={this.props.dataSources.mainImg} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">{this.props.dataSources.title}</h3>
                    <div className="introduce">{this.props.dataSources.columnBriefContent}</div>
                    <div className="item-right-footer item-footer-right">
                        {viewicon}
                    </div>
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