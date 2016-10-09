/*
 中标数据列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router';
import {loadBidListContent,getBidAreaInfo,getProjectStatus} from '../function/ajax.js';
import Loading from '../loading';
import EmptyComponent from '../emptyComponent';
import FilterBidList from '../filterBidList';
import {Token} from '../function/tokenbidList.js';
class BidList extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _loadData(){
        loadBidListContent({
            areaId:JSON.stringify(this.props.bidList.areaId),
            sidx:this.props.bidList.sidx,
            sord:this.props.bidList.sord,
            pageNo:this.props.bidList.pageNo,
            searchName:this.props.bidList.searchName,
            searchProductStatus:this.props.bidList.searchProductStatus,
            callBack:(res)=>{
                this.setState({
                    loading:false
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADBIFLISTCONTENTDATA',
                        data:this.props.bidList.data.concat(res.datas),
                        pageNo:this.props.bidList.pageNo+1
                    });
                    if(res.totalSize <= this.props.bidList.data.length){
                        this.props.dispatch({
                            type:'UNINFINITE'
                        });
                    }else{
                        this.props.dispatch({
                            type:'INFINITE'
                        });
                    }
                }
            }
        });
    }
    _fn(args){
        this.setState({
            loading:true
        });
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADBIFLISTCONTENTDATA',
                data:[],
                pageNo:1,
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
                searchProductStatus:args.searchProductStatus,
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    _searchHandle(){
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type:'LOADBIFLISTCONTENTDATA',
            data:[],
            pageNo:1,
        });
        setTimeout(()=> this._loadData(),100);
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.bidList.infinite){
            this._loadData();
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
        getBidAreaInfo({
                pageNo:this.props.bidList.pageNo,
                searchName:this.props.bidList.searchName,
                callBack:(res)=>{
                    this.props.dispatch({
                        type:'getBidAreaInfo',
                        getBidAreaInfo:res.datas,
                    });
                }
            });
        getProjectStatus({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'getProjectStatus',
                    getProjectStatus:res.datas,
                });
            }
        });
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'LOADBIFLISTCONTENTDATA',
            data:[],
            pageNo:1,
        });
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }

    render(){
            return (
                <div className="root" style={{"overflow":"auto"}}>
                    <HeaderBar {...this.props} loading={this.state.loading} _searchHandle={this._searchHandle.bind(this)}/>
                    <div ref="content" className="scroll-content has-header">
                        <Main data={this.props.bidList.data} loading={this.state.loading}/>
                        {
                            this.props.bidList.isShowFilter ? <FilterBidList fn={this._fn.bind(this)}  dataSources={this.props.provicenData} {...this.props}/> : null
                        }
                    </div>
                </div>
            )
        }
    }
class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        var bidList = 0;
        if(this.props.loading) {
            return <Loading/>
        }else{
            console.log(this.props.data.length)
            if(this.props.data.length != 0){
                return(
                    <ul className="bidList-view">
                        {
                            this.props.data.map((ele,index)=> <List dataSources={ele} key={`bidList_${bidList++}+${ele.id}`}/>)
                        }
                    </ul>
                )
            }else{
                return <EmptyComponent/>
            }
        }
    }
}
class HeaderBar extends Component{
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTERBIDLIST'
        });
    }
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGEBIDLISTTITLEORREPORTKEY',
            searchName:encodeURI(encodeURI(this.refs.bidListSearchName.value))
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons">
                    <button className="button" onClick={this._showProvicenHandle.bind(this)}>
                        <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
                    </button>
                </div>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="bidListSearchName" onChange={this._changeHandle.bind(this)}  type="search" placeholder="请输入搜索关键词"/>
                </label>
                <button className="button button-clear" onClick={this.props._searchHandle.bind(this)}>
                    搜索
                </button>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <div>
                <h2 className="title">产品名称：{this.props.dataSources.productName}</h2>
                <li className="item card">
                    <p>商品名：{this.props.dataSources.trandName}</p>
                    <p>剂型：{this.props.dataSources.prepName}</p>
                    <p>规格：0.125g{this.props.dataSources.spec}</p>
                    <p>包装数量：{this.props.dataSources.packNum}</p>
                    <p>包材名称：{this.props.dataSources.packMaterialName}</p>
                    <p>生产企业：{this.props.dataSources.manufacturerName}</p>
                    <p>中标价：<span className="calm">{this.props.dataSources.bidPrice}</span></p>
                    <p>最小制剂招标价格：<span className="calm">{this.props.dataSources.minBidPrice}</span></p>
                    <p>省份：<span className="calm">{this.props.dataSources.areaName}</span></p>
                    <p>项目名称：{this.props.dataSources.projectName}</p>
                    <p>公布时间：2016-08-02{this.props.dataSources.publishDate}</p>
                </li>
            </div>
        )
    }
}

function select(state){
    return{
        provicenData:state.provicen.data,
        bidList:state.bidList
    }
}
export default connect(select)(BidList);