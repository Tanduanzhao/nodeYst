/*
    行情搜索页
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadBidListContent,getBidAreaInfo,getProjectStatus,getBusinessFirstFacProdInfo} from './../../function/ajax.js';

import Loading from './../../common/loading';
import EmptyComponent from './../../common/emptyComponent';
import FilterMarketProvinces from './../../filterPage/filterMarketProvinces';
//import FilterMarket from './../../filterPage/filterMarket';
import More from './../../common/more';
class MarketSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            infinite:true,
            isShowFilter:false,
            sordActive:0,
            areaNames:""
        };

        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }

    //加载页面数据
    _loadData(){
        getBusinessFirstFacProdInfo({
            areaId:this.props.areaId,
            yearMonth:this.props.yearMonth,
            pageNo:this.props.stores.pageNo,
            searchName:encodeURI(encodeURI(this.props.stores.searchName)),
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.setState({
                        isLoading:false,
                        areaNames:res.areaNames
                    });
                    this.props.dispatch({
                        type:'LOADMARKETSEARCHDATA',
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

    //搜索方法
    _searchHandle(searchKeys){
        console.log(decodeURI(decodeURI(this.props.stores.searchName)))
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                isLoading:true
            });
            //if(decodeURI(decodeURI(this.props.stores.searchName))=="支持多个条件筛选，如“头孢呋辛  深圳立健”"){
            //    searchKeys=""
            //}
            this.props.dispatch({
                type:'CHANGEMARKETSEARCHSEARCHNAME',
                searchName:searchKeys
            });
            this.props.dispatch({
                type:'LOADMARKETSEARCHDATA',
                data:[],
                pageNo:1,
            });
            setTimeout(()=> this._loadData());
        }
    }

    //筛选方法
    _fn(args){
        this.setState({
            isLoading:true
        });
        this.props.dispatch({
            type:'LOADMARKETSEARCHDATA',
            data:[],
            pageNo:1
        });
        this.props.dispatch({
            type: 'CHANGEDATA',
            yearMonth: args.yearMonth
        });
        this.props.dispatch({
            type:'CHANGEMARKETPROVICENNAME',
            areaName:args.areaName,
        });
        this.props.dispatch({
            type:'CHANGEMARKETPROVICENID',
            areaId:args.areaId,
        });
        this.setState({
            //yearMonth:args.yearMonth,
            areaId:args.areaId,
            //searchAreaType:args.searchAreaType
        });
        setTimeout(()=>{
            this._toggleFilter();
            this._loadData();
        },100);
    }

    //滚动加载
    _infiniteScroll(){
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoading) return false;
            this.setState({
                isLoading:true
            });
            this._loadData();
        }
    }

    //排序
    sort(sordActive){
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
            sordActive:sordActive
        });
        setTimeout(()=> this._loadData());
    }

    //渲染完成后调用
    componentDidMount(){
        //if(this.props.stores.searchName==""){
        //    this.props.dispatch({
        //        type:'CHANGEMARKETSEARCHSEARCHNAME',
        //        searchName:"支持多个条件筛选，如“头孢呋辛  深圳立健”"
        //    });
        //}
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETMARKETSEARCH'
        })
    }

    render(){
        return (
            <div className="root">
                <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}  showFilter={this._toggleFilter.bind(this)} />
                <div ref="content" className="scroll-content has-header market">
                    <div>
                        <LinkBar  {...this.props} searchName={this.props.stores.searchName} areaNames={this.state.areaNames}/>
                        {
                            (this.props.stores.data.length == 0 && !this.state.isLoading)
                                ? <EmptyComponent/>
                                : <Main  {...this.props}  searchName={this.props.stores.searchName} data={this.props.stores.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive} isLoading={this.state.isLoading}/>
                        }
                    </div>
                </div>
                {
                    this.state.isShowFilter &&!this.state.isLoading? <FilterMarketProvinces {...this.props} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}  dataSources={this.props.marketProvice}/> : null
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
    render(){
        console.log(this.props.searchName=="","searchName")
        return(
            <div>
                {
                    this.props.data.map((ele,index)=> <List {...this.props} searchName={this.props.searchName} dataSources={ele} key={Math.random()}/>)
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
                    <input ref="searchName" type="search"  placeholder={this.props.stores.searchName}/>
                </label>
                <button className="button button-clear" onClick={()=>this.props.searchHandle(this.refs.searchName.value)}>
                    搜索
                </button>
            </div>
        )
    }
}

class LinkBar extends Component{
    render(){
        return(
            <div className="card" style={{margin:0}}>
                <div className="item item-divider item-text-wrap" style={{fontSize:'.6rem'}}>
                    筛选条件“{this.props.yearMonth}，{this.props.areaName}
                    {this.props.searchName==""?null:"，"}{this.props.searchName}”
                    在{this.props.areaNames}有销售数据。
                </div>
            </div>
        )
    }
}

class List extends Component{
    render(){
        return(
            <div className="list card item-divider item-text-wrap marketSearch-item"  style={{marginTop:0}}>
                <div  className="item marketSearch-item-top"  style={{padding: '0.325rem .4rem',fontSize: '.6rem'}}>
                    <img src="/images/bidList-icon.png"  style={{ width: '19.5px',marginRight: '3px',verticalAlign: 'bottom'}} />
                    {this.props.dataSources.provinceName} {this.props.dataSources.yearMonth}
                    <Link  to={`/market/marketSearch/marketSearchDetail/${this.props.dataSources.areaId}`}style={{ float: 'right'}}>
                        查看地市数据 >
                    </Link>
                </div>
                <div className="row  item" style={{ padding: '10px',fontSize: ' .6rem',color: '#0894ec',paddingLeft:'1.525rem'}}>
                    <div className="col text-left col-flex">产品</div>
                    <div className="col text-center">市场规模(万)</div>
                    <div className="col text-center">最小使用单位销量(万)</div>
                </div>
                <div className="list border">
                    {
                        this.props.dataSources.data.map((ele,index)=> <ListItem dataSources={ele} key={Math.random()}/>)
                    }
                </div>
            </div>
        )
    }
}

class ListItem extends Component{
    render(){
        return(
            <div className="row item" style={{ padding: '10px',fontSize: ' .6rem',paddingLeft:'1.525rem'}}>
                <div className="col text-left col-flex">
                    <p> {this.props.dataSources.code5Name}</p>
                    <p> {this.props.dataSources.dosSname}</p>
                    <p> {this.props.dataSources.spec} </p>
                    <p> {this.props.dataSources.factoryAbbrCl}</p>
                </div>
                <div className="col text-center">
                    <p> {this.props.dataSources.sales}</p>
                </div>
                <div className="col text-center">{this.props.dataSources.unitQuanty}</div>
            </div>
        )
    }
}

function select(state){
    return{
        areaId:state.marketProvice.areaId,
        provicenData:state.provicen.data,
        stores:state.marketSearch,
        yearMonth:state.data.yearMonth,
        isVip:state.userInfo.isVip,
        areaName:state.marketProvice.areaName,
        marketProvice:state.marketProvice.data,
    }
}
MarketSearch.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(MarketSearch);

const styles = {
    active:{
        display:'inline-block'
    }
}