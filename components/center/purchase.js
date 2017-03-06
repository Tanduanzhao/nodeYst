/*
 已购报告列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './../common/footerBar';
import {Link} from 'react-router';
import FilterPurchase from './../filterPage/filterPurchase';
import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';
import ReportList from './../reportList';
import {loadProduct,getReportType,loadWx} from './../function/ajax';
import HeaderBar from './../common/headerbar.js';
import ScrollLoading from './../common/scrollLoading';

class purchase extends Component {
  constructor(props){
    super(props);
    this.state={
      searchType:this.props.purchase.searchType,
      loading:true,
      isSrollLoading:false,
      isLoadData:true,
      BuyReportList:true,
      userInfo:this.props.userInfo.userName
    };
    this._loadData = this._loadData.bind(this);
    this._infiniteScroll = this._infiniteScroll.bind(this);
  }
  _loadData(){
    loadProduct({
      titleOrReportKey:this.props.purchase.titleOrReportKey,
      pageNo:this.props.purchase.pageNo,
      searchType:this.props.purchase.searchType,
      reportType:this.props.purchase.reportType,
      callBack:(res)=>{
        if(this._calledComponentWillUnmount) return false;
        this.props.dispatch({
          type:'LOADPURCHASEDATA',
          data:this.props.purchase.data.concat(res.datas),
          pageNo:this.props.purchase.pageNo+1
        });
        this.setState({
          loading: false,
          isLoadData:false,
          isSrollLoading:true
        });
        if(res.totalSize <= this.props.purchase.data.length){
          this.setState({
            isSrollLoading:false
          });
          this.props.dispatch({
            type:'UNINFINITE'
          });
        }else{
          this.props.dispatch({
            type:'INFINITE'
          });
        }
      }
    });
  }
  _infiniteScroll(){
    //全部高度-滚动高度 == 屏幕高度-顶部偏移
    if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.purchase.infinite){
      if(this.state.isLoadData) return false;
      this.setState({
        isLoadData:true
      });
      this._loadData();
    }
  }
  //显示搜索
  showSearch(){
    this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:11});
    this.props.dispatch({
      type:'CLICKKSEARCH',
      clickSearch:false
    })
    setTimeout(()=>{
      this.context.router.push('/search');
    })
  }
  componentDidMount(){
    this.ele = this.refs.content;
    this.ele.addEventListener('scroll',this._infiniteScroll);
    getReportType({
      callBack:(res)=>{
        this.props.dispatch({
          type:'CHANGEPURCHASETYPE',
          ReportTypeDate:res.datas
        });
      }
    });
    if(this.props.search.clickSearch){
      this._searchDatas(this.props.search.searchName);
      return false
    }
    this._loadData();
  }
  componentWillUnmount(){
    this.props.dispatch({
      type:'LOADPURCHASEDATA',
      data:[],
      pageNo:1
    });
    this.props.dispatch({
      type:'RESETPURCHASETYPE',
      data:[],
      pageNo:1
    });
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE',
      data:[],
      pageNo:1
    });
  }
  _fn(args) {
    this.setState({
      loading:true
    });
    this.props.dispatch({
      type:'LOADPURCHASEDATA',
      data:[],
      pageNo:1
    });
    this.props.dispatch({
      type:'UNSHOWFILTERPRODUCE'
    })
    this.props.dispatch({
      type:'CHANGETYPEPURCHASE',
      searchType:args.searchType,
      reportType:encodeURI(encodeURI(args.reportType))
    });
    setTimeout(()=>{
      this._loadData();
    },100);
  }
  _searchDatas(key){
    this.setState({
      loading:true
    });
    this.props.dispatch({
      type:'CHANGETITLEORREPORTKEY',
      titleOrReportKey:key
    })
    this.props.dispatch({
      type:'LOADPURCHASEDATA',
      data:[],
      pageNo:1
    });
    setTimeout(()=> this._loadData(),100);
  }
  _showFilter(){
    this.props.dispatch({
      type:'SHOWFILTERPRODUCE'
    });
  }
  render() {
    return (
      <div className="root">
        {
          this.state.loading ? <Loading/> : null
        }
        <HeaderBar {...this.props} titleName="已购报告" showSearch={this.showSearch.bind(this)} showFilter={this._showFilter.bind(this)}/>
        <div  ref="content"  className="scroll-content has-header has-footer">
          {
            (this.props.purchase.data.length == 0  && !this.state.loading)
                ? <EmptyComponent/>
                : <Main data={this.props.purchase.data} loading={this.state.loading} BuyReportList={this.state.BuyReportList}/>
          }
          {
            this.props.purchase.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
          }
        </div>
        <FooterBar {...this.props}/>
        {
          this.props.purchase.isShowFilter ?
            <FilterPurchase fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
        }
      </div>
    )
  }
}

class Main extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
        <ul className="list new_report">
          {
            this.props.data.map((ele, index)=> <ReportList BuyReportList={this.props.BuyReportList} dataSources={ele} key={ele.id}/>)
          }
        </ul>
    )
  }
}
class List extends Component{
  constructor(props){
    super(props);
    };
  render(){
    var string = null;
    var tag = (()=>{
      if(this.props.dataSources.costStatus == "1"){
        string = <i className="report-card-icon">点击查看</i>;
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
    return(
        <div className="col-50">
          <Link to={`/pdf/${this.props.dataSources.id}/${this.props.dataSources.title}`}>
            <div className="report-img">
              <img src={this.props.dataSources.mainImg}/>
            </div>
            <h3> {this.props.dataSources.title}</h3>
            <div className="report-card-price">¥{this.state.price}</div>
            <p className="report-card-footer">
              {number}
              {tag}
            </p>
          </Link>
        </div>
    )
  }
}
function select(state){
  return{
    search:state.search,
    provicenData:state.provicen.data,
    purchase:state.purchase,
    userInfo:state.userInfo
  }
}
purchase.contextTypes = {
  router:React.PropTypes.object.isRequired
}

export default connect(select)(purchase);