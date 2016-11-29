/*
 订阅列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FilterReport from './filterReport';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {getCiReportColumnList,loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './function/ajax';
import SubscribeList from './subscribeList';

class SubscribePage extends Component {
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
        //读取专栏订阅列表
        getCiReportColumnList({
            pageNo:this.props.subscribePage.pageNo,
            titleOrReportKey:this.props.subscribePage.titleOrReportKey,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADSUBSCRIBEPAGEDATA',
                    data:this.props.subscribePage.data.concat(res.datas),
                    pageNo:this.props.subscribePage.pageNo+1
                });
                if(res.totalSize <= this.props.subscribePage.data.length){
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
    if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.subscribePage.infinite && this.state.request){
      this._loadData();
    }
  }
    _searchHandle(){
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type:'LOADSUBSCRIBEPAGEDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this._loadData(),100);
    }
    componentWillUnmount(){
        this.props.dispatch({
            type: 'RESETSUBSCRIBEPAGE'
        });
    }
  render() {
      console.log(this.props.subscribePage.data,"date")
    return (
      <div className="root">
        <HeaderBar {...this.props}  searchHandle={this._searchHandle.bind(this)}/>
        <div  ref="content"  className="scroll-content has-header report-view">
          <Main {...this.props} data={this.props.subscribePage.data} loading={this.state.loading}/>
        </div>
      </div>
    )
  }
}
class HeaderBar extends Component{
  _changeHandle(){
    this.props.dispatch({
      type:'CHANGESUBSCRIBEPAGETITLEORREPORTKEY',
      titleOrReportKey:encodeURI(encodeURI(this.refs.subscribePageSearchName.value))
    })
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
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
      if(this.props.data.length != 0){
        return(
            <ul className="list new_report">
              {
                this.props.data.map((ele,index)=> <SubscribeList dataSources={ele} key={ele.id+Math.random()}/>)
              }
            </ul>
        )
      }else{
        return <EmptyComponent/>
      }
    }
  }
}
function select(state){
  return{
      subscribePage:state.subscribePage
  }
}
SubscribePage.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default connect(select)(SubscribePage);