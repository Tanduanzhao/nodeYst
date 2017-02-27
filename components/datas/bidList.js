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
import FilterBidList from '../filterPage/filterBidList';
import More from './../common/more';

class BidList extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            provinceId:this.props.bidList.provinceId
        };

        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _reSet(){
        this.props.dispatch({
            type:'LOADBIFLISTCONTENTDATA',
            data:[],
            pageNo:1
        });
    }
    _loadData(){
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type:'request'
        });
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
                this.props.dispatch({
                    type:'requestss'
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
    _searchDatas(key){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                loading:true
            });
            this.props.dispatch({
                type:'RESETBIDLISTAREAId',
                areaId:["0"]
            });
            this.props.dispatch({
            type:'CHANGEBIDLISTTITLEORREPORTKEY',
            searchName:encodeURI(encodeURI(key))
        })
            this.props.dispatch({
                type:'LOADBIFLISTCONTENTDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData(),100);
        }
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
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.bidList.infinite && this.props.bidList.request){
            this._loadData();
        }
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
            pageNo: this.props.bidList.pageNo,
            searchName: this.props.bidList.searchName,
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
        })
        this.ele.removeEventListener('scroll',this._infiniteScroll);
        this.props.dispatch({
            type:'UNSHOWFILTERPRODUCE'
        });
        this.props.dispatch({
            type:'UNCHANGEBIDLISTTITLEORREPORTKEY'
        })
        this.props.dispatch({
            type:'RESETBIDLIST'
        })
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
                <div ref="content" className="scroll-content has-header">
                    <Main data={this.props.bidList.data} loading={this.state.loading}/>
                    <More {...this.props}/>
                </div>
                {
                    this.props.bidList.isShowFilter && !this.state.loading? <FilterBidList fn={this._fn.bind(this)} {...this.props}/> : null
                }
                {
                    this.state.loading ? <Loading/> : null
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
        var bidList = 0;
        return(
        this.props.data.length == 0 ? <EmptyComponent/>
            : <ul className="bidList-view">
                {
                    this.props.data.map((ele,index)=> <List dataSources={ele} key={`bidList_${bidList++}+${ele.id}`}/>)
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
        console.log("a");
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
        bidList:state.bidList,
        search:state.search,
        isVip:state.userInfo.isVip
    }
}
BidList.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(BidList);