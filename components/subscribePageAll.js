/*
 专栏订阅详情
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FilterReport from './filterReport';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {getReportColumnTypeList,loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './function/ajax';
import SubscribeAllList from './subscribeAllList';

class SubscribePageAll extends Component {
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
        //专栏订阅分类列表
        getReportColumnTypeList({
            columnId:this.props.params.id,
            pageNo:this.props.subscribePageAll.pageNo,
            titleOrReportKey:this.props.subscribePageAll.titleOrReportKey,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADSUBSCRIBEPAGEALLDATA',
                    data:res.datas,
                    pageNo:this.props.subscribePageAll.pageNo+1
                });
                //if(res.totalSize <= this.props.subscribePageAll.data.length){
                //    this.props.dispatch({
                //        type:'UNINFINITE'
                //    });
                //}else{
                //    this.props.dispatch({
                //        type:'INFINITE'
                //    });
                //}
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
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.subscribePageAll.infinite && this.state.request){
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
    componentWillUnmount(){
        this.props.dispatch({
            type: 'RESETSUBSCRIBEPAGEALL'
        });
    }
  render() {
      console.log(this.props.subscribePageAll.data,"date")
    return (
      <div className="root">
        <div  ref="content"  className="scroll-content subscribeAll has-footer">
          <Main {...this.props} data={this.props.subscribePageAll.data} loading={this.state.loading}/>
        </div>
          <div className="bar bar-footer bar-assertive row purchase-report ">
              <button className="button-clear col-50 purchase-price">¥sss}</button>
              <button className="button-clear col-50">报告购买</button>
          </div>
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
                        <h3>专栏简介</h3>
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
                            this.props.data.lists.map((ele,index)=> <SubscribeAllList dataSources={ele} id={this.props.params.id} key={ele.id+Math.random()}/>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
  }
}
function select(state){
  return{
      subscribePageAll:state.subscribePageAll
  }
}
SubscribePageAll.contextTypes = {
  router:React.PropTypes.object.isRequired
}
export default connect(select)(SubscribePageAll);