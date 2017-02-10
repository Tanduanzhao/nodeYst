import React,{Component} from 'react';
import {connect} from 'react-redux';
//import HeaderBar from './../common/headerBar.js';
//import Provicen from './../provicen.js';
import FilterMarket from './../filterPage/filterMarket';

import {getBusinessFactoryInfo} from './../function/ajax.js';

import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';

import {Link} from 'react-router';
class RiseFactory extends Component{
    constructor(props){
        super(props);
        this.state={
            //data:[],
            pageNo:1,
            infinite:false,
            loading:true,
            searchName:"",
            sord:"desc",
            sidx:"sales",
            sordActive:0,
            isShowFilter:false
        };
        this._reSet = this._reSet.bind(this);
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _increaseHandle(){
		this.props.dispatch((dispatch)=>{
            this._reSet();
            dispatch({
                type:'INCREASE'
            });
            this._loadData();
        })
	}
	_decreaseHandle(){
		this.props.dispatch((dispatch)=>{
            this._reSet();
            dispatch({
                type:'DECREASE'
            });
            this._loadData();
        })
	}
    _reSet(){
        this.setState({
            pageNo:1
            //data:[]
        })
        this.props.dispatch({
            type:'LOADFACTORYDATA',
            data:[]
        });
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
        this._reSet();
        this.setState({
            loading:true,
            //data:[],
            //pageNo:1,
            sordActive:sordActive,
            sidx:sidx
        });
        setTimeout(()=> this._loadData());
    }
    _fn(args){
        this._reSet()
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
        setTimeout(()=> {
            this._toggleFilter();
            this.props.dispatch((dispatch,getState)=>{
            getBusinessFactoryInfo(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:args.areaId,
                salesId:this.props.params.sid,
                searchAreaType:args.searchAreaType,
                pageNo:this.state.pageNo,
                sord:this.state.sord,
                sidx:this.state.sidx,
                searchName:encodeURI(encodeURI(this.state.searchName)),
                callBack:(res)=>{
                    this.setState({
                        pageNo:this.state.pageNo+1,
                        //data:res.datas,
                        infinite:false
                    })
                    this.props.dispatch({
                        type:'LOADFACTORYDATA',
                        data:res.datas,
                    });
                    if(res.totalSize <= this.props.stores.data.length){
                        this.ele.removeEventListener('scroll',this._infiniteScroll);
                    }
                    this.setState({
                        loading:false
                    });
                }
            });
        })
        });
    }
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            getBusinessFactoryInfo(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:getState().provicen.areaId,
                salesId:this.props.params.sid,
                searchAreaType:getState().provicen.searchAreaType,
                pageNo:this.state.pageNo,
                sord:this.state.sord,
                sidx:this.state.sidx,
                searchName:encodeURI(encodeURI(this.state.searchName)),
                callBack:(res)=>{
                    this.setState({
                        pageNo:this.state.pageNo+1,
                        //data:this.state.data.concat(res.datas),
                        infinite:false
                    })
                    this.props.dispatch({
                        type:'LOADFACTORYDATA',
                        data:this.props.stores.data.concat(res.datas),
                    });
                    if(res.totalSize <= this.props.stores.data.length){
                        this.ele.removeEventListener('scroll',this._infiniteScroll);
                    }
                    this.setState({
                        loading:false
                    });
                }
            });
        })
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop){
            this._loadData();
        }
    }

    //筛选方法
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOW'
        });
    }

    //显示/取消筛选方法
    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }

    //搜索方法
    _searchHandle(searchKeys,storesSearchName,storesData){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this._reSet();
            this.setState({
                loading:true,
                //data:[],
                //pageNo:1,
                searchName:searchKeys == '' && storesData.length !=0  ?storesSearchName:searchKeys
            });
            if(searchKeys != '' || storesData.length ==0) {
                this.props.dispatch({
                    type: 'FACTORYSEARCHNAME',
                    searchName: searchKeys
                });
            }
            setTimeout(()=> this._loadData());
        }
    }

    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }

    componentWillUnmount(){
        this.props.dispatch({
            type:'UNSHOW'
        })
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)} showFilter={this._toggleFilter.bind(this)}/>
                <div ref="content" className="scroll-content has-header market">
                    {
                        (this.props.stores.data.length == 0 && !this.state.loading)
                            ? <EmptyComponent/>
                            :  <Main data={this.props.stores.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive} loading={this.state.loading}/>
                    }
                </div>
                {
                    this.state.isShowFilter ? <FilterMarket {...this.props}  fn={this._fn.bind(this)}  hideFilter={this._toggleFilter.bind(this)} dataSources={this.props.provicenData}/> :null
                }
                {
                    this.state.loading ? <Loading/> : null
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
                    <input ref="searchName"  type="search"  placeholder={this.props.stores.searchName == ''?"多个条件请用空格区分":this.props.stores.searchName}/>
                </label>
                <button className="button button-clear" onClick={()=>this.props.searchHandle(this.refs.searchName.value,this.props.stores.searchName,this.props.stores.data)}>
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
    render(){
        return(
            <div  className="list card item-text-wrap"  style={{ margin: '0',wordBreak: 'break-all'}}>
                <div className="row item"  style={{ padding: '16px 10px',fontSize: ' .6rem',color: '#0894ec'}}>
                    <div className="col">厂家</div>
                    <div className="col text-center"   onClick={()=>{this.props.sort(0,"sales")}}>市场规模(万)<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 0) ? styles.active : null}></i></div>
                    <div className="col text-center"   onClick={()=>{this.props.sort(1,"changeCost")}}>增长额(万)<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 1) ? styles.active : null}></i></div>
                    <div className="col col-flex-last  text-center"  onClick={()=>{this.props.sort(2,"change")}}>增长率<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 2) ? styles.active : null}></i></div>
                </div>
                {
                    this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random(1)}/>)
                }
            </div>
        )
    }
}

class List extends Component{
    render(){
        var string = null;
        var change = (()=>{
            if (this.props.dataSources.change == "" ) {
                string=""
            } else if(this.props.dataSources.change >= 0){
                string=<span className="col col-flex-last text-center assertive">{this.props.dataSources.change}%</span>
            }else {
                string=<span className="col col-flex-last text-center balanced">{this.props.dataSources.change}%</span>
            }
            return string;
        })();
        var changeCost = (()=>{
            if (this.props.dataSources.changeCost >= 0 ) {
                string=<span className="col text-center assertive">{this.props.dataSources.changeCost}</span>
            } else {
                string=<span className="col text-center balanced">{this.props.dataSources.changeCost}</span>
            }
            return string;
        })();
        return(
            <Link to={`/market/MarketSearch/marketSearchDetail/${this.props.dataSources.factoryAbbrCl}/${this.props.dataSources.id}`} className="row item" style={{ padding: '16px 10px',fontSize: '.6rem'}}>
                <h3 className="col"  style={{fontSize: '.6rem'}}>{this.props.dataSources.factoryAbbrCl}</h3>
                <h5 className="col text-center">{this.props.dataSources.sales}</h5>
                {changeCost}
                {change}
            </Link>
        )
    }
}

function select(state){
	return{
        stores:state.riseFactory,
		areaId:state.provicen.areaId,
		areaName:state.provicen.areaName,
        provicenData:state.provicen.data,
		yearMonth:state.data.yearMonth,
        searchAreaType:state.provicen.searchAreaType
        //uri:state.router.uri,
        //showProvicen:state.index.showProvicen,
	}
}
export default connect(select)(RiseFactory);

const styles = {
    active:{
        display:'inline-block'
    }
}