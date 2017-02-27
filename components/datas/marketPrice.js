/*
 广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadBidList} from '../function/ajax';
import Provicen from '../provicen';
import {Link} from 'react-router';
import Loading from '../common/loading';
import More from './../common/more';
import HeaderBar from './../common/headerbar.js';
import EmptyComponent from '../common/emptyComponent';
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

    //滚动加载
    _infiniteScroll(){
      if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && ! this.props.stores.infinite  && this.state.request){
            this._loadData();
        }
    }

    //搜索方法
    _searchDatas(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                loading:true
            })
            this.props.dispatch({
                type:'CHANGEDRUGSEARCHNAME',
                searchName:searchKeys
            })
            this.props.dispatch({
                type:'LOADMARKETTDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData());
        }
    }

    //查看各省中标价方法
    tobidList(productName,prepName,spec,manufacturerName,id){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.context.router.push(`/bidListall/${encodeURI(encodeURI(productName))}/${encodeURI(encodeURI(prepName))}/${encodeURI(encodeURI(spec))}/${encodeURI(encodeURI(manufacturerName))}/${encodeURI(encodeURI(id))}`);
        }
    }

    //加载页面数据
    _loadData(){
        this.setState({
            loading:true
        });
        this.setState({
            request:false
        });
        loadBidList({
            searchName:encodeURI(encodeURI(this.props.stores.searchName)),
            pageNo:this.props.stores.pageNo,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    loading:false
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADMARKETTDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                }
                this.setState({
                    request:true
                });
            }
        });
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:35});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)});
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:35});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        })
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }

    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        this._loadData();
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETMARKETPRICE'
        });
        if(!this.props.search.searchLinkType){
            this.props.dispatch({
                type:"RESETSEARCH"
            });
        }
    }

    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="全国限价"  showSearch={this.showSearch.bind(this)} showIntro={this.showIntro.bind(this)} />
                {
                    this.state.loading?<Loading/>: null
                }
                <div ref="content" className="scroll-content has-header">
                    <Main {...this.props} tobidList={this.tobidList.bind(this)} data={this.props.stores.data} loading={this.state.loading}/>
                </div>
                <More {...this.props}/>
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
            this.props.data.length == 0 ? <EmptyComponent/>
                : <ul className="list bid-list">
                    {
                        this.props.data.map((ele)=> <List {...this.props} dataSources={ele} key={ele.id+Math.random()}/>)
                    }
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
        var specAttrName = (()=>{
            if(this.props.dataSources.specAttrName != ""&& this.props.dataSources.specAttrName != null&&this.props.dataSources.specAttrName != undefined ){
                var children="";
                children+="（" ;
                children+=this.props.dataSources.specAttrName;
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
                        <p>规格：{this.props.dataSources.spec}
                            {specAttrName}
                        </p>
                        <p>生产企业：{this.props.dataSources.manufacturerName}</p>
                        {
                            this.props.dataSources.catalogId!=null&& this.props.dataSources.catalogId!=""&& this.props.dataSources.catalogId!=undefined
                                ?<div>
                                <p>目录ID：{this.props.dataSources.catalogId}</p>
                                <p>目录名称：{this.props.dataSources.catalogName}</p>
                                <p>目录类型：{this.props.dataSources.catalogType}</p>
                            </div>:null
                        }
                    </div>
                    <div onClick={()=> this.props.tobidList(this.props.dataSources.productName,this.props.dataSources.prepName,this.props.dataSources.spec,this.props.dataSources.manufacturerName,this.props.dataSources.id)}  className="list-right btn"> 查看各省中标价</div>
                </div>
                <div className="row market-price">
                    <div className="col-50"> 广东省最小制剂入市价</div>
                    <div className="col-50">{this.props.dataSources.entryPrice}
                        {entryDate}
                    </div>
                </div>
                {
                    (()=>{
                        if(this.props.dataSources.minThreeMean!=null||this.props.dataSources.minThreeMean!=undefined){
                            return <MarketList {...this.props} dataSources={this.props.dataSources}/>
                        }
                    })()
                }
            </li>

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
                                <div key={v.id+Math.random()}>
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
        search:state.search,
        stores:state.marketPrice,
        isVip:state.userInfo.isVip
    }
}

export default connect(select)(MarketPrice);

MarketPrice.contextTypes = {
    router:React.PropTypes.object.isRequired
}