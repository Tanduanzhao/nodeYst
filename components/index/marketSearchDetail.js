/*
    行情搜索详情页
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getBusinessFactoryProdInfo,getBidAreaInfo,getProjectStatus} from './../function/ajax.js';

import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';
import FilterMarket from './../filterPage/filterMarket';

class MarketSearchDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            infinite:true,
            isShowFilter:false,
            sord:"desc",
            sordActive:0,
            sidx:"sales",
            searchName:this.props.stores.searchName || '',
            isCity:null,
            searchAreaType:""
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    //加载页面数据
    _loadData(){
        getBusinessFactoryProdInfo({
            areaId:this.props.areaId,
            yearMonth:this.props.yearMonth,
            breedId:this.props.params.id,
            yytj:typeof this.props.params.icoType == undefined ?'':this.props.params.icoType,
            pageNo:this.props.stores.pageNo,
            searchAreaType:this.state.searchAreaType,
            parentId:this.props.params.parentId || '',
            searchName:this.state.searchName=="多个条件请用空格区分"?"":(encodeURI(encodeURI(this.state.searchName)) || ""),
            //sord:this.state.sord,
            //sidx:this.state.sidx,
            isCity:this.state.isCity,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.setState({
                        isLoading:false
                    });
                    this.props.dispatch({
                        type:'LOADMARKETSEARCHDETAILDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    setTimeout(()=>{
                        if(res.totalSize <= this.props.stores.data.length){
                            this.setState({
                                infinite:false
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
            searchAreaType:args.searchAreaType,
        });
        this.setState({
            //yearMonth:args.yearMonth,
            areaId:args.areaId,
            searchAreaType:args.searchAreaType
        });
        setTimeout(()=>{
            this._toggleFilter();
            this._loadData();
        },100);
    }

    //搜索方法
    _searchHandle(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                isLoading:true,
                searchName:searchKeys
            });
            //this.props.dispatch({
            //    type:'CHANGEMARKETSEARCHDETAILSEARCHNAME',
            //    searchName:searchKeys
            //});
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
            if(this.state.isLoading) return false;
            this.setState({
                isLoading:true
            });
            this._loadData();
        }
    }

    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(!this.props.params.parentId){
            if(typeof this.props.params.searchName != 'undefined' ){
                this.setState({
                    searchName:decodeURIComponent(decodeURIComponent(this.props.params.searchName))
                });
            }
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
        setTimeout(()=>{
            this._loadData();
        });
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETMARKETSEARCHDETAIL'
        })
    }

    render(){
        return (
            <div className="root" style={{"overflow":"auto"}}>
                <HeaderBar {...this.props} searchName={this.state.searchName} searchHandle={this._searchHandle.bind(this)} showFilter={this._toggleFilter.bind(this)}/>
                <div ref="content" className="scroll-content has-header item-text-wrap market card " style={{margin:0}}>
                    {
                        (this.props.stores.data.length == 0 && !this.state.isLoading)
                            ? <EmptyComponent/>
                            : <Main  {...this.props} data={this.props.stores.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive} isLoading={this.state.isLoading}/>
                    }
                </div>
                {
                    this.state.isShowFilter &&!this.state.isLoading? <FilterMarket {...this.props}  fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}  dataSources={this.props.provicenData}/> : null
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
class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons" onClick={this.props.showFilter} style={{ fontSize: '.75rem'}}>
                    <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
                    <span  style={{margin:' 0 5px'}}>筛选</span>
                </div>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="searchName"  type="search"  placeholder={this.props.searchName}/>
                </label>
                <button className="button button-clear" onClick={()=>this.props.searchHandle(this.refs.searchName.value)}>
                    搜索
                </button>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <div className="row item" style={{ padding: '10px',fontSize: ' .6rem'}}>
                <div className="col text-left col-flex">
                    <p> {this.props.dataSources.code5Name}</p>
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
        areaId:state.provicen.areaId,
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