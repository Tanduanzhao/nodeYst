/*
 专栏订阅详情
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FilterReport from './../filterPage/filterReport';
import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';
import {getReportColumnTypeList,loadNewrepor,loadPicture,insertUserAction,getReportType,loadReportList} from './../function/ajax';
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
      console.log(this.props.subscribePageAll.pageNo,"date")
    return (
      <div className="root">
        <div  ref="content"  className="scroll-content subscribeAll">
          <Main {...this.props} data={this.props.subscribePageAll.data} briefContent={this.props.subscribePageAll.briefContent} loading={this.state.loading}/>
        </div>
          {
              this.props.subscribePageAll.data.buyReport==0
                  ? <div className="bar bar-footer row purchase-bar" style={{display:"none"}}>
                        <button>¥ 6999/年</button>
                        <button className="purchase-subscribe">专栏订阅</button>
                    </div>
                  :  null
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
        this.props.briefContent
            ?   this.props.dispatch({type: 'UNSHOWBRIEFCONTENT'})
            : this.props.dispatch({type: 'SHOWBRIEFCONTENT'})
    }
  render(){
      console.log( this.props.briefContent," this.props.subscribePageAll.briefContent")
      if(this.props.loading) {
      return <Loading/>
    }else{
        return(
            <div>
                <div className="img-title">
                    <img className="title" src={this.props.data.columnInstroImg} alt=""/>
                    {
                        this.props.params.id==3?null
                            : <div className="bar-title">{this.props.data.title}</div>
                    }
                </div>
                <div className="list">
                    <div className="item item-divider home-item-title">
                        <strong>
                            {
                                this.props.params.id==3?"大汇简介":"专栏简介"
                            }
                        </strong>
                        <div className="list-title-right">
                            {
                                //<i className="fa fa-eye"></i>
                                //14786人订阅
                            }
                            <i   className={this.props.briefContent ? "ion-chevron-up": "ion-chevron-down"} style={{ color:'#0894ec',marginLeft: '6px'}} onClick={this._hiddenbriefContent.bind(this)}></i>
                        </div>
                    </div>
                    {
                        this.props.briefContent
                            ? <p className="subscribeAll-body">{this.props.data.columnMainContent}</p>
                            :null
                    }
                    <div className="item item-divider home-item-title">
                        <strong>
                            {
                                this.props.params.id==3?"培训课程":"专栏栏目"
                            }
                        </strong>
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