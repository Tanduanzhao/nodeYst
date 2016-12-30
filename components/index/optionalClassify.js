/*
    分类品种信息
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//import HeaderBar from './../common/headerBar.js';
//import Provicen from './../provicen.js';
import FilterMarket from './../filterPage/filterMarket';

import {loadSingleClassifyProduct} from './../function/ajax.js';

import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';


class OptionalClassify extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pageNo:1,
            infinite:false,
            loading:true,
            searchName:"",
            sord:"desc",
            sidx:"sales",
            sordActive:0,
            isShowFilter:false,
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
            pageNo:1,
            data:[]
        })
    }
    //筛选方法
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOW'
        });
    }

    //搜索方法
    _searchHandle(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                loading:true,
                data:[],
                pageNo:1,
                searchName:searchKeys
            });
            setTimeout(()=> this._loadData());
        }
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
                loadSingleClassifyProduct(dispatch,{
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
                            data:res.datas,
                            infinite:false
                        })
                        if(res.totalSize <= this.state.data.length){
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
    //加载数据
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadSingleClassifyProduct(dispatch,{
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
                        data:this.state.data.concat(res.datas),
                        infinite:false
                    })
                    if(res.totalSize <= this.state.data.length){
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

    //显示/取消筛选方法
    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
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
                        (this.state.data.length == 0 && !this.state.loading)
                            ? <EmptyComponent/>
                            : <Main data={this.state.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive} loading={this.state.loading}/>
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
                    <input ref="searchName"  type="search" placeholder={this.props.params.searchName}/>
                </label>
                <button className="button button-clear" onClick={()=>this.props.searchHandle(this.refs.searchName.value)}>
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
            <div className="list card item-text-wrap" style={{ margin: '0',wordBreak: 'break-all'}}>
                <div className="row item"  style={{ padding: '16px 10px',fontSize: ' .6rem',color: '#0894ec'}}>
                    <div className="col">通用名</div>
                    <div className="col text-center" onClick={()=>{this.props.sort(0,"sales")}}>市场规模(万)<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 0) ? styles.active : null}></i></div>
                    <div className="col text-center"onClick={()=>{this.props.sort(1,"changeCost")}}>增长额(万) <i className={this.props.sord=="desc"?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 1) ? styles.active : null}></i> </div>
                    <div className="col col-flex-last text-center" onClick={()=>{this.props.sort(2,"change")}}>增长率 <i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 2) ? styles.active : null}></i> </div>
                </div>
                <ul className="border horizontal list">
                    {
                        this.props.data.map((ele,index)=> <List dataSources={ele} key={Math.random()}/>)
                    }
                </ul>
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
            }else if (this.props.dataSources.change >= 0 ) {
                string= <div className="col col-flex-last text-center assertive">{this.props.dataSources.change}%</div>
            } else {
                string= <div className="col col-flex-last text-center balanced">{this.props.dataSources.change}%</div>
            }
            return string;
        })();
        var changeCost = (()=>{
            if (this.props.dataSources.changeCost >= 0 ) {
                string=  <div className="col text-center assertive">{this.props.dataSources.changeCost}</div>
            } else {
                string=  <div className="col text-center balanced">{this.props.dataSources.changeCost}</div>
            }
            return string;
        })();
        return(
            <Link to={`/market/marketSearch/marketSearchDetail/${encodeURIComponent(encodeURIComponent(this.props.dataSources.genericName))}/${this.props.dataSources.breedId}`}  className="row item" style={{ padding: '16px 10px',fontSize: '.6rem'}}>
                <div className="col"  style={{fontSize: '.6rem'}}>
                    <span className="tag" style={{background: '#fea512'}}>{this.props.dataSources.icoType}</span>
                    {this.props.dataSources.genericName}
                </div>
                <div className="col  text-center">{this.props.dataSources.sales}</div>
                {changeCost}
                {change}
            </Link>
        )
    }
}

function select(state){
	return{
		showProvicen:state.index.showProvicen,
		areaId:state.provicen.areaId,
		areaName:state.provicen.areaName,
        provicenData:state.provicen.data,
		yearMonth:state.data.yearMonth,
		uri:state.router.uri,
        isVip:state.userInfo.isVip,
        searchAreaType:state.provicen.searchAreaType

	}
}
OptionalClassify.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(OptionalClassify);

const styles = {
    active:{
        display:'inline-block'
    }
}