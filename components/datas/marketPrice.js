/*
   广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadBidList} from '../function/ajax';
import Provicen from '../provicen';
import {Link} from 'react-router';
import Loading from '../loading';
import More from './more';
import EmptyComponent from '../emptyComponent';
class MarketPrice extends Component{
    constructor(props){
        super(props);
        this.state= {
            loading: false,
            request:true
            }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _loadData(){
        this.setState({
            loading:true
        });
        this.setState({
            request:false
        });
        loadBidList({
            searchName:this.props.marketPrice.searchName,
            pageNo:this.props.marketPrice.pageNo,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    loading:false
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADMARKETTDATA',
                        data:this.props.marketPrice.data.concat(res.datas),
                        pageNo:this.props.marketPrice.pageNo+1
                    });
                }
                this.setState({
                    request:true
                });
            }
        });
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        console.log(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop)
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && ! this.props.marketPrice.infinite  && this.state.request){
            this._loadData();
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        //if(this.props.marketPrice.data.length == 0){
        //    this._loadData();
        //}
        this._loadData();
    }
    componentWillUnmount(){
        //this.setState({
        //    loading:false
        //})
        this.props.dispatch({
            type:'LOADMARKETTDATA',
            data:[],
            pageNo:1
        });
    }
    _searchHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/vip');
            return false;
        }else{
            this.setState({
                loading:true
            })
            this.props.dispatch({
                type:'LOADMARKETTDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData(),100);
        }
    }
    render(){
        return(
          <div className="root">
              <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}/>
              <div ref="content" className="scroll-content has-header">
                  <Main {...this.props} data={this.props.marketPrice.data} loading={this.state.loading}/>
              </div>
              <More {...this.props}/>
              {  
                this.state.loading?<Loading/>: null
               }
          </div>
        )
    }
}
class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
            return(
                this.props.data.length == 0 ? <EmptyComponent/> : <ul className="list bid-list">
                        <ul className="list bid-list">
                            {
                                this.props.data.map((ele)=> <List dataSources={ele} key={ele.id}/>)
                            }
                        </ul>
                    </ul>
            )
    }
}

class List extends Component{
    render(){
        var entryDate = (()=>{
            if(this.props.dataSources.entryDate != null ||  this.props.dataSources.entryDate!=undefined){
                var children="";
                children+="（" ;
                children+=this.props.dataSources.entryDate;
                children+= "）";
            }else{
                children="";
            }
            return children;
        })();
        return(
                <li  className="card">
                    <h2><img src="/images/bidList-icon.png" alt=""/>{this.props.dataSources.productName}</h2>
                    <div className="market-list">
                        <div className="list-left">
                            <p>剂型：{this.props.dataSources.prepName}</p>
                            <p>规格：{this.props.dataSources.spec}</p>
                            <p>生产企业：{this.props.dataSources.manufacturerName}</p>
                        </div>
                        <Link to={`/datas/bidList/${encodeURI(encodeURI(this.props.dataSources.productName))}/${encodeURI(encodeURI(this.props.dataSources.prepName))}/${encodeURI(encodeURI(this.props.dataSources.spec))}/${encodeURI(encodeURI(this.props.dataSources.manufacturerName))}`}  className="list-right btn"> 查看各省中标价</Link>
                    </div>
                    <div className="row market-price">
                        <div className="col-50"> 广东省最小制剂入市价</div>
                        <div className="col-50">{this.props.dataSources.entryPrice}
                            {entryDate}
                        </div>
                    </div>
                    {
                        (()=>{
                            if(this.props.dataSources.zuidiwusheng!=null||this.props.dataSources.zuidiwusheng!=undefined){
                                return <MarketList {...this.props} dataSources={this.props.dataSources}/>
                            }
                        })()
                    }
                </li>

        )
    }
}

class HeaderBar extends Component{
    _changeHandle(){
        console.log(this.props.marketPrice.searchName);
        this.props.dispatch({
            type:'CHANGEDRUGSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    componentUnmount(){
        this.props.dispatch({
            type:'CLEADRUGSEARCHNAME'
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
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
class MarketList extends Component{
    render(){
        return(
            <div className="market-list price-list">
                <div className="list-left">
                    <p>最低三省均值：{this.props.dataSources.minThreeMean}</p>
                    <p>最低五省均值：{this.props.dataSources.minFiveMean}</p>
                </div>
                <div className="list-right">
                    {
                        this.props.dataSources.zuidiwusheng == null ? null : this.props.dataSources.zuidiwusheng.map((v)=>{
                            return (
                                <div key={v.id}>
                                    {v.bidPrice} ({v.areaName} {v.publishDate})
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function select(state){
    return{
        uri:state.router.uri,
        marketPrice:state.marketPrice,
        isVip:state.userInfo.isVip
    }
}

export default connect(select)(MarketPrice);

MarketPrice.contextTypes = {
    router:React.PropTypes.object.isRequired
}