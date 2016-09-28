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
            loading: true,
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _fn(args) {
        console.log(args.tradeType)
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
        loadProd({
            tradeType:this.props.product.tradeType,
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:this.props.searchAreaType,
            pageNo:this.props.product.pageNo,
            searchName:this.props.product.searchName,
            callBack:(res)=>{
                console.log(res.datas,"dd")
                console.log(this.props.product.data,"sss")
                this.props.dispatch({
                    type:'LOADPRODUCTDATA',
                    data:this.props.product.data.concat(res.datas),
                    pageNo:this.props.product.pageNo+1
                });
                this.setState({
                    loading:false
                });
            }
        });
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.product.infinite){
            this._loadData();
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }
    componentWillUnMount(){
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }

    render(){
        return(
            <div className="root">
                <HeaderBar fn={this._loadData} {...this.props} loading={this.state.loading}/>
                <div ref="content" className="scroll-content has-header">
                        <Main {...this.props} data={this.props.product.data} loading={this.state.loading}/>
                </div>
                <More {...this.props}/>
                {
                    this.props.product.isShowFilter ? <FilterProduct fn={this._fn.bind(this)}  {...this.props} dataSources={this.props.provicenData}/> : null
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
        if(this.props.loading) {
            return <Loading/>
        }else {
            if (this.props.data.length != 0) {
                return (
                    <ul className="list product-view">
                        {
                            this.props.data.map((ele, index)=> <List dataSources={ele} key={ele.id}/>)
                        }
                    </ul>
                )
            } else {
                return <EmptyComponent/>
            }
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
                <span className="btn"> {this.props.dataSources.tradeBreedId}</span>
                <ul className="list">
                    <li>目录ID：{this.props.dataSources.catalogId}</li>
                    <li>目录名称：{this.props.dataSources.catalogName}</li>
                    <li>目录类型：{this.props.dataSources.catalogType}</li>
                </ul>
            </li>
            </div>
        )
    }
}

class HeaderBar extends Component{
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTERPRODUCT'
        });
    }
    _changeHandle(){
        console.log(this.refs.hospitalSearchName.value)
        this.props.dispatch({
            type:'CHANGEDRUGSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    _searchHandle(){
        console.log(this.props.product.searchName)
        this.setState({
            loading:true
        })
        this.props.dispatch({
            type:'LOADPRODUCTDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this.props.fn(),100);
    }
    componentUnMount(){
        this.props.dispatch({
            type:'CLEADRUGSEARCHNAME'
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
                    <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
                </label>
                <button className="button button-clear" onClick={this._searchHandle.bind(this)}>
                    搜索
                </button>
            </div>
        )
    }
}

function select(state){
    return{
        product:state.product
    }
}

export default connect(select)(product);