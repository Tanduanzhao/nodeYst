/*
 中标数据列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';
import {loadBidListContent,getBidAreaInfo,getProjectStatus} from '../function/ajax.js';

import EmptyComponent from '../common/emptyComponent';
import HeaderBar from './../common/headerbar.js';
import Loading from '../common/loading';
import ScrollLoading from '../common/scrollLoading';
import FilterBidList from '../filterPage/filterBidList';
import More from './../common/more';

class BidList extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            isSrollLoading:false,
            infinite:true,
            isLoadData:true,
            provinceId:this.props.stores.provinceId
        };

        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
         if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoadData) return false;
            this.setState({
                isLoadData:true
            });
            this._loadData();
        }
    }
    _reSet(){
        this.props.dispatch({
            type:'LOADBIFLISTCONTENTDATA',
            data:[],
            pageNo:1
        });
    }
    //搜索方法
    _searchDatas(key){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                isLoading:true,
                infinite:true
            });
            this.props.dispatch({
                type:'RESETBIDLISTAREAId',
                areaId:["0"]
            });
            this.props.dispatch({
                type:'CHANGEBIDLISTTITLEORREPORTKEY',
                searchName:encodeURI(encodeURI(key))
            });
            this.props.dispatch({
                type:'LOADBIFLISTCONTENTDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData(),100);
        }
    }
    _fn(args){
        this.setState({
            isLoading:true
        });
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADBIFLISTCONTENTDATA',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTERPBIDLIST'
            });
            dispatch({
                type:'CHANGEBIDLISTFILTER',
                sord:args.sord,
                sidx:args.sidx,
                areaId:args.areaId,
                searchAreaType:args.searchType,
                active:args.active,
                searchProductStatus:args.searchProductStatus
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    _loadData(){
        loadBidListContent({
            areaId:JSON.stringify(this.props.stores.areaId),
            sidx:this.props.stores.sidx,
            sord:this.props.stores.sord,
            pageNo:this.props.stores.pageNo,
            searchName:this.props.stores.searchName,
            searchProductStatus:this.props.stores.searchProductStatus,
            callBack:(res)=>{
                this.setState({
                    isLoadData:false,
                    isLoading:false,
                    isSrollLoading:true
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADBIFLISTCONTENTDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    if(res.totalSize <= this.props.stores.data.length){
                        this.setState({
                            infinite:false,
                            isSrollLoading:false
                        });
                    }else{
                        this.setState({
                            infinite:true
                        });
                    }
                }
            }
        });
    }
    _showProvicenHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.props.dispatch({
                type:'SHOWFILTERBIDLIST'
            });
        }
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:34});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)})
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:34});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        });
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
    componentDidMount(){
        if(this.props.params.productName){
            this.props.dispatch({
                type:'LOADBIFLISTCONTENTDATA',
                data:[],
                pageNo:1
            });
            this.props.dispatch({
                type:'RESETBIDLISTAREAId',
                areaId:['0']
            });
            this.props.dispatch({
                type:'mpAreaID'
            });
        }
        this.props.dispatch({
            type:'CHANGEBIDLISTTITLEORREPORTKEY',
            searchName:this.props.params.productName? (encodeURI(encodeURI(this.props.params.productName))+" "+encodeURI(encodeURI(this.props.params.prepName))+" "+encodeURI(encodeURI(this.props.params.spec))+" "+encodeURI(encodeURI(this.props.params.manufacturerName))):null
        });
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        getBidAreaInfo({
            pageNo: this.props.stores.pageNo,
            searchName: this.props.stores.searchName,
            callBack: (res)=> {
                this.props.dispatch({
                    type: 'getBidAreaInfo',
                    getBidAreaInfo: res.datas
                });
            }
        });
        getProjectStatus({
            callBack: (res)=> {
                this.props.dispatch({
                    type: 'getProjectStatus',
                    getProjectStatus: res.datas
                });
            }
        });
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        setTimeout((res)=>{
            this._loadData();
        });
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'UNSHOWFILTERPBIDLIST'
        });
        this.ele.removeEventListener('scroll',this._infiniteScroll);
        this.props.dispatch({
            type:'UNSHOWFILTERPRODUCE'
        });
        this.props.dispatch({
            type:'UNCHANGEBIDLISTTITLEORREPORTKEY'
        });
        this.props.dispatch({
            type:'RESETBIDLIST'
        });
        if(!this.props.search.searchLinkType){
            this.props.dispatch({
                type:"RESETSEARCH"
            });
        }
    }

    render(){
        return (
            <div className="root" style={{"overflow":"auto"}}>
                <HeaderBar {...this.props} titleName="中标数据"  showSearch={this.showSearch.bind(this)} showFilter={this._showProvicenHandle.bind(this)} showIntro={this.showIntro.bind(this)} />
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        this.props.stores.data.length == 0 && !this.state.isLoading ? <EmptyComponent/> : <Main {...this.props} data={this.props.stores.data}/>
                    }
                    {
                        this.props.stores.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                    <More {...this.props}/>
                </div>
                {
                    this.props.stores.isShowFilter && !this.state.isLoading ? <FilterBidList {...this.props} fn={this._fn.bind(this)}/> : null
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
            <ul className="bidList-view">
                {
                    this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random()}/>)
                }
            </ul>
        )
    }
}

class List extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.value !== nextProps.value;
    }
    render(){
        return(
            <div>
                <h2 className="title">产品名称：{this.props.dataSources.productName}</h2>
                <li className="item card">
                    <p>商品名：{this.props.dataSources.trandName}</p>
                    <p>剂型：{this.props.dataSources.prepName}</p>
                    <p>规格：{this.props.dataSources.spec}</p>
                    <p>包装数量：{this.props.dataSources.packNum}</p>
                    <p>包材名称：{this.props.dataSources.packMaterialName}</p>
                    <p>生产企业：{this.props.dataSources.manufacturerName}</p>
                    <p>中标价：<span className="calm">{this.props.dataSources.bidPrice}</span></p>
                    <p>最小制剂招标价格：<span className="calm">{this.props.dataSources.minBidPrice}</span></p>
                    <p>省份：<span className="calm">{this.props.dataSources.areaName}</span></p>
                    <p>项目名称：{this.props.dataSources.projectName}</p>
                    <p>公布时间：{this.props.dataSources.publishDate}</p>
                </li>
            </div>
        )
    }
}

function select(state){
    return{
        stores:state.bidList,
        search:state.search,
        isVip:state.userInfo.isVip
    }
}
BidList.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(BidList);