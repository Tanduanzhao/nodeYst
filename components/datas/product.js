/*
 广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadProd} from '../function/ajax';
import Provicen from '../provicen';
import FilterProduct from '../filterProduct';
import {Link} from 'react-router';
import Loading from '../loading';
import EmptyComponent from '../emptyComponent';
import More from './more';
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
        loadProd({
            tradeType:this.props.product.tradeType,
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:this.props.searchAreaType,
            pageNo:this.props.product.pageNo,
            searchName:this.props.product.searchName,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                console.log(res.datas,"dd")
                console.log(this.props.product.data,"sss")
                this.props.dispatch({
                    type:'LOADPRODUCTDATA',
                    data:this.props.product.data.concat(res.datas),
                    pageNo:this.props.product.pageNo+1
                });
                this.setState({
                    request:true
                });
                this.setState({
                    loading:false
                });
            }
        });
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        console.dir(this.ele);
        console.log(this.ele.firstChild.clientHeight-this.ele.scrollTop , document.body.clientHeight-this.ele.offsetTop)
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.product.infinite  && this.state.request){
            this._loadData();
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(this.props.product.data.length == 0){
            this._loadData();
        }
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'CLEADRUGSEARCHNAME'
        })
        this.props.dispatch({
            type:'UNSHOWFILTERPRODUCT',
        });
        //this.props.dispatch({
        //    type:'LOADPRODUCTDATA',
        //    data:[],
        //    pageNo:1,
        //});
    }

    _searchHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/vip');
            return false;
        }
        this.setState({
            loading:true
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
            this.context.router.push('/vip');
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
                <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}  showProvicenHandle={this._showProvicenHandle.bind(this)} loading={this.state.loading}/>
                <div ref="content" className="scroll-content has-header">
                        <Main {...this.props} data={this.props.product.data} loading={this.state.loading}/>
                </div>
                <More {...this.props}/>
                {
                    this.props.product.isShowFilter ? <FilterProduct fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
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
        console.log( this.props.data,"ss")
    }
    render(){
        if (this.props.data.length != 0) {
            return (
                <ul className="list product-view">
                    {
                        this.props.data.map((ele, index)=> <List dataSources={ele} key={index}/>)
                    }
                </ul>
            )
        } else {
            return <EmptyComponent/>
        }
    }
}

class List extends Component{
    render(){
        return(
            <div>
                <h2>产品名称： {this.props.dataSources.productName}</h2>
            <li  className="card">
                <ul className="list">
                    <li>剂型/规格：{this.props.dataSources.prepName}/{this.props.dataSources.spec}</li>
                    <li>批准文号/注册证号：{this.props.dataSources.pzwh}</li>
                    <li>生产企业：{this.props.dataSources.manufacturerName}</li>
                </ul>
                {
                    this.props.dataSources.catalogId?<TradeBreedId  {...this.props} catalog={this.props.dataSources}/>:null
                }
            </li>
            </div>
        )
    }
}

class TradeBreedId extends Component{
    render(){
        return(
            <div>
                <span className="btn"  > 广东交易平台</span>
                <ul className="list">
                    <li>目录ID：{this.props.catalog.catalogId}</li>
                    <li>目录名称：{this.props.catalog.catalogName}</li>
                    <li>目录类型：{this.props.catalog.catalogType}</li>
                </ul>
            </div>
        )
    }
}

class HeaderBar extends Component{
    _changeHandle(){
        console.log(this.refs.hospitalSearchName.value)
        this.props.dispatch({
            type:'CHANGEDRUGSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons">
                    <button className="button" onClick={this.props.showProvicenHandle}>
                        <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
                    </button>
                </div>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
                </label>
                <button className="button button-clear" onClick={this.props.searchHandle}>
                    搜索
                </button>
            </div>
        )
    }
}

function select(state){
    return{
        product:state.product,
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