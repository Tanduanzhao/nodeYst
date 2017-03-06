/*
    行情搜索详情页
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getBusinessFactoryProdInfo,loadProvince} from './../function/ajax.js';

import EmptyComponent from './../common/emptyComponent';
import FilterMarket from './../filterPage/filterMarket';
import HeaderBar from '../common/headerbar.js';
import Loading from './../common/loading';
import ScrollLoading from './../common/scrollLoading';

class MarketSearchDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            infinite:true,
            isShowFilter:false,
            isSrollLoading:false,
            isLoadData:true,
            sord:"desc",
            sordActive:0,
            sidx:"sales",
            searchName:this.props.stores.searchName || '',
            isCity:null,
            searchAreaType:"",
            yytj:this.props.params.icoType || "",
            yearMonth:this.props.yearMonth || ""
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _reSet(){
        this.props.dispatch({
            type:'LOADMARKETSEARCHDETAILDATA',
            data:[],
            pageNo:1
        });
    }
    //加载页面数据
    _loadData(){
        getBusinessFactoryProdInfo({
            areaId:this.props.areaId,
            yearMonth:this.state.yearMonth,
            breedId:typeof this.props.params.id == undefined ?'':this.props.params.id,
            yytj: this.state.yytj,
            pageNo:this.props.stores.pageNo,
            searchAreaType:this.state.searchAreaType,
            searchName:this.props.stores.searchName,
            isCity:this.state.isCity,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.setState({
                        isLoadData:false,
                        isLoading:false,
                        isSrollLoading:true
                    });
                    this.props.dispatch({
                        type:'LOADMARKETSEARCHDETAILDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    setTimeout(()=>{
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
                    })
                }
            }
        });
    }

    //显示/取消筛选方法
    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }
    //排序
    sort(sordActive,sidx){
        if(this.state.sord=="desc"){
            this.setState({
                sord:"asc"
            });
        }else{
            this.setState({
                sord:"desc"
            });
        }
        this.setState({
            loading:true,
            data:[],
            pageNo:1,
            sordActive:sordActive,
            sidx:sidx
        });
        setTimeout(()=> this._loadData());
    }

    //筛选方法
    _fn(args){
        this.setState({
            isLoading:true
        });
        this.props.dispatch({
            type:'LOADMARKETSEARCHDETAILDATA',
            data:[],
            pageNo:1
        });
        this.props.dispatch({
            type:'CHANGEDATA',
            yearMonth:args.yearMonth
        });
        this.props.dispatch({
            type:'CHANGE',
            areaId:args.areaId,
            areaName:args.areaName,
            searchAreaType:args.searchAreaType
        });
        this.setState({
            yearMonth:args.yearMonth,
            areaId:args.areaId,
            searchAreaType:args.searchAreaType
        });
        setTimeout(()=>{
            this._toggleFilter();
            this._loadData();
        },100);
    }

    //搜索方法
    _searchDatas(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                isLoading:true,
                yytj:""
            });
            this.props.dispatch({
                type: 'CHANGEMARKETSEARCHDETAILSEARCHNAME',
                searchName: searchKeys
            });
            this.props.dispatch({
                type:'LOADMARKETSEARCHDETAILDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData());
        }
    }

    //滚动加载
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
    //显示搜索
    showSearch(){
        switch(this.props.areaId){
            case "ZZOQD0000000000000000000000020" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:50}); break;
            case "ZZOQD0000000000000000000000011" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:51}); break;
            case "ZZOQD0000000000000000000000002" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:52}); break;
            case "ZZOQD0000000000000000000000016" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:53}); break;
            case "ZZOQD0000000000000000000000005" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:54}); break;
            case "ZZOQD0000000000000000000000013" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:55}); break;
            case "ZZOQD0000000000000000000000015" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:56}); break;
            case "ZZOQD0000000000000000000000017" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:57}); break;
            case "ZZOQD0000000000000000000000018" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:58}); break;
            case "ZZOQD0000000000000000000000019" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:59}); break;
        }
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        });
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(typeof this.props.params.searchName != 'undefined' ){
            this.props.dispatch({
                type: 'CHANGEMARKETSEARCHDETAILSEARCHNAME',
                searchName:decodeURIComponent(this.props.params.searchName)
            })
        }
        if(typeof this.props.params.parentId != 'undefined' ){
            this.setState({
                searchAreaType:"0",
                isCity:"1"
            });
            this.props.dispatch({
                type:'CHANGEIdAREAAREAID',
                areaId:""
            });
        }
        this.setState({
            isLoading:true
        });
        if(this.props.search.searchLinkType){
            this.setState({
                yearMonth:this.props.yearMonth
            });
        }
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            loadProvince(this.props.dispatch);
            return false
        }
        setTimeout(()=>{
            this._loadData();
        });
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETMARKETSEARCHDETAIL'
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
                <HeaderBar {...this.props} titleName={this.props.stores.searchName==""?this.props.params.searchName:this.props.stores.searchName}  icoType={this.state.yytj} showSearch={this.showSearch.bind(this)} showFilter={this._toggleFilter.bind(this)}/>
                <div ref="content" className="scroll-content has-header item-text-wrap market card " style={{margin:0}}>
                    {
                        (this.props.stores.data.length == 0 && !this.state.isLoading)
                            ? <EmptyComponent/>
                            : <Main  {...this.props} data={this.props.stores.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive} isLoading={this.state.isLoading}/>
                    }
                    {
                        this.props.stores.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                </div>
                {
                    this.state.isShowFilter && !this.state.isLoading? <FilterMarket {...this.props}  fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}  dataSources={this.props.provicenData}/> : null
                }
                {
                    this.state.isLoading ? <Loading/> : null
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
            <div className="border">
                <div className="row  item" style={{ padding: '10px',fontSize: ' .6rem',color: '#0894ec'}}>
                    <div className="col text-left">产品</div>
                    <div className="col text-center" >市场规模(万)</div>
                    <div className="col-40 text-center">最小使用单位销量</div>
                </div>
                {
                    (typeof this.props.data == 'undefined' || this.props.data.length == 0) ? null : this.props.data.map((ele, index)=> <List dataSources={ele} key={Math.random()}/>)
                }
            </div>
        )
    }
}

class List extends Component{
    render(){
        return(
            <div className="row item" style={{ padding: '10px',fontSize: ' .6rem'}}>
                <div className="col text-left col-flex">
                    <p>{this.props.dataSources.code5Name}</p>
                    <p>{this.props.dataSources.dosSname}</p>
                    <p> {this.props.dataSources.spec}
                        {
                            (this.props.dataSources.specAttr == "无" || typeof this.props.dataSources.specAttr == 'undefined' || this.props.dataSources.specAttr =="")?  null : <span> {this.props.dataSources.specAttr}</span>
                        }
                    </p>
                    <p>{this.props.dataSources.factoryAbbrCl}</p>
                </div>
                <div className="col text-center">
                    <p> {this.props.dataSources.sales}</p>
                </div>
                <div className="col-40 text-center">{this.props.dataSources.unitQuanty}</div>
            </div>
        )
    }
}

function select(state){
    return{
        search:state.search,
        areaId:state.provicen.areaId,
        searchName:state.search.searchName,
        stores:state.marketSearchDetail,
        isVip:state.userInfo.isVip,
        yearMonth:state.data.yearMonth,
        areaName:state.provicen.areaName,
        provicenData:state.provicen.data,
        searchAreaType:state.provicen.searchAreaType
    }
}
MarketSearchDetail.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(MarketSearchDetail);

const styles = {
    active:{
        display:'inline-block'
    }
}