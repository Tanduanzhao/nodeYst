/*
 广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadProd} from '../function/ajax';
import Provicen from '../provicen';
import FilterProduct from '../filterPage/filterProduct';
import {Link} from 'react-router';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
import More from './../common/more';
import HeaderBar from './../common/headerbar.js';
class product extends Component{
    constructor(props){
        super(props);
        this.state= {
            loading: false,
            request:true
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _fn(args) {
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type: 'LOADPRODUCTDATA',
            data: [],
            pageNo: 1
        });
        this.props.dispatch({
            type: 'UNSHOWFILTERPRODUCT'
        });
        this.props.dispatch({
            type: 'CHANGETRADETYPE',
            tradeType: args.tradeType,
        });
        setTimeout(()=> {
            this._loadData();
        }, 100);
    }
    _loadData(){
        this.setState({
            loading:true
        });
        this.setState({
            request:false
        });
        console.log(this.props.stores.searchName,"ddd");
        loadProd({
            tradeType:this.props.stores.tradeType,
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:this.props.searchAreaType,
            pageNo:this.props.stores.pageNo,
            searchName:this.props.stores.searchName,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    loading:false
                });
                if(res){
                    if(res.pageNo >= res.totalPage){
                        this.props.dispatch({
                            type:'UNINFINITEDRUG'
                        });
                    }else{
                        this.props.dispatch({
                            type:'INFINITEDRUG'
                        });
                    }
                    this.props.dispatch({
                        type:'LOADPRODUCTDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    this.setState({
                        request:true
                    });
                }
                }
        });
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.stores.infinite  && this.state.request){
            this._loadData();
        }
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:36});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)});
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:36});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        })
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        this._loadData();
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETPRODUCT'
        });
        if(!this.props.search.searchLinkType){
            this.props.dispatch({
                type:"RESETSEARCH"
            });
        }
    }

    _searchDatas(key){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'CHANGEPRODUCTSEARCHNAME',
            searchName:encodeURI(encodeURI(key))
        })
        this.props.dispatch({
            type:'LOADPRODUCTDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this._loadData(),100);
    }
    _showProvicenHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.props.dispatch({
                type:'SHOWFILTERPRODUCT'
            });
        }
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="产品数据"  showSearch={this.showSearch.bind(this)} showFilter={this._showProvicenHandle.bind(this)}
                                           showIntro={this.showIntro.bind(this)} />
                <div ref="content" className="scroll-content has-header">
                    {
                        (this.props.stores.data.length == 0 && !this.state.loading) ? <EmptyComponent/> : <Main {...this.props} data={this.props.stores.data} loading={this.state.loading}/>
                    }
                </div>
                <More {...this.props}/>
                {
                    this.props.stores.isShowFilter ? <FilterProduct fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
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
        return (
            <ul className="list product-view">
                {
                    this.props.data.map((ele, index)=> <List dataSources={ele} key={index}/>)
                }
            </ul>
        )
    }
}

class List extends Component{
    render(){
        var string = null;
        var trandName = (()=> {
            if (this.props.dataSources.trandName==null || this.props.dataSources.trandName==undefined) {
                string = ""
            } else {
                string = "(",
                string +=this.props.dataSources.trandName,
                string +=")"
            }
            return string;
        })();
        var specAttrName = (()=>{
            if(this.props.dataSources.specAttrName != ""&& this.props.dataSources.specAttrName != null&&this.props.dataSources.specAttrName != undefined){
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
            <div>
                <h2>产品名称： {this.props.dataSources.productName}{trandName}</h2>
            <li  className="card">
                <ul className="list">
                    <li>剂型/规格：{this.props.dataSources.prepName}/{this.props.dataSources.spec}{specAttrName}</li>
                    <li>批准文号/注册证号：{this.props.dataSources.pzwh}</li>
                    <li>生产企业：{this.props.dataSources.manufacturerName}</li>
                </ul>
            </li>
                {
                    typeof this.props.dataSources.newCatalog == 'undefined' && typeof this.props.dataSources.oldCatalog == 'undefined' ? null:<TradeBreedId  {...this.props} dataSources={this.props.dataSources}/>
                }
            </div>
        )
    }
}

class TradeBreedId extends Component{
    render(){
        return(
            <div>
                <span className="btn">广东省交易品种</span>
                <ul className="list">
                    <li style={{borderBottom:"4px solid #ddd"}}>
                        <table className="table-border" width="100%">
                            <tbody>
                            {
                                (typeof this.props.dataSources.newCatalog == 'undefined')?null
                                    :
                                        <tr  key={Math.random()}>
                                            <td style={{fontSize: '14px',verticalAlign: 'middle',textAlign: 'center'}}>
                                                新目录分组
                                            </td>
                                            <td className="item-text-wrap">
                                                {
                                                    //typeof  this.props.dataSources.oldCatalog.catalogId== 'undefined' || typeof  this.props.dataSources.oldCatalog.catalogName== 'undefined' || typeof  this.props.dataSources.oldCatalog.catalogType== 'undefined'
                                                }
                                                <p>
                                                    <span className={this.props.dataSources.newCatalog.isCatalogIdNew == 1? "assertive" : null}>目录ID：{this.props.dataSources.newCatalog.catalogIdNew}</span> <br/>
                                                    <span className={this.props.dataSources.newCatalog.isCatalogNameNew == 1? "assertive" : null}> 目录名称：{this.props.dataSources.newCatalog.catalogNameNew}</span> <br/>
                                                    <span className={this.props.dataSources.newCatalog.isCatalogTypeNew == 1? "assertive" : null}> 目录类型：{this.props.dataSources.newCatalog.catalogTypeNew}</span>
                                                </p>
                                            </td>
                                        </tr>
                                 }
                            {
                                (typeof this.props.dataSources.oldCatalog == 'undefined')?null
                                    : <tr  key={Math.random(0)}>
                                            <td style={{fontSize: '14px',verticalAlign: 'middle',textAlign: 'center'}}>
                                                旧目录分组
                                            </td>
                                            <td className="item-text-wrap">
                                                <p>
                                                    目录ID：{this.props.dataSources.oldCatalog.catalogId} <br/>
                                                    目录名称：{this.props.dataSources.oldCatalog.catalogName} <br/>
                                                    目录类型：{this.props.dataSources.oldCatalog.catalogType}
                                                </p>
                                            </td>
                                        </tr>
                            }
                            </tbody>
                        </table>
                    </li>
                </ul>
            </div>
        )
    }
}

function select(state){
    return{
        search:state.search,
        stores:state.product,
        isVip:state.userInfo.isVip
    }
}

export default connect(select)(product);

product.contextTypes = {
    router:React.PropTypes.object.isRequired
}

const styles = {
    active:{
        display:'none',
    }
}