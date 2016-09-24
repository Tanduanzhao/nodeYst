/*
 中标数据详情信息
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadBidListContent} from '../function/ajax.js';
import Loading from '../loading';
import FilterBidList from '../filterBidList'
class bidDataContent extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true
        };
    }
    _loadData(){
        loadBidListContent({
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:this.props.searchAreaType,
            callBack:(res)=>{
                console.log(res.datas)
                this.props.dispatch({
                    type:'LOADBIFLISTCONTENTDATA',
                    data: res.datas
                });
                this.setState({
                    loading:false
                });
            }
        });
    }
    componentDidMount(){
        this._loadData();
    }
    render(){
        if(this.state.loading) {
            return <Loading/>
        }else {
            return (
                <div className="root" style={{"overflow":"auto"}}>
                    <HeaderBar {...this.props}/>
                    <ul className="scroll-content has-header">
                        {
                            this.props.bidDataContent.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
                        }
                    </ul>
                    {
                        this.props.bidDataContent.isShowFilter ? <FilterBidList {...this.props}/> : null
                    }
                </div>
            )
        }
    }
}
class HeaderBar extends Component{
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTERPRODUCE'
        });
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
                    <input ref="hospitalSearchName" type="search" placeholder="请输入搜索关键词"/>
                </label>
                <Link to={'/produce/vip'}>
                    <button className="button button-clear">
                        搜索
                    </button>
                </Link>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <li className="item">
                <p>头孢呋辛{this.props.dataSources.productName}</p>
                <p>商品名：{this.props.dataSources.trandName}</p>
                <p>剂型：(头孢呋辛酯)胶囊剂{this.props.dataSources.prepName}</p>
                <p>规格：0.125g{this.props.dataSources.spec}</p>
                <p>包装数量：{this.props.dataSources.packNum}</p>
                <p>包材名称：{this.props.dataSources.packMaterialName}</p>
                <p>生产企业：深圳致君制药有限公司{this.props.dataSources.manufacturerName}</p>
                <p>中标价：{this.props.dataSources.bidPrice}</p>
                <p>最小制剂招标价格：{this.props.dataSources.minBidPrice}</p>
                <p>省份：{this.props.dataSources.areaName}</p>
                <p>项目名称：（201607）广东省基本药物竞价交易品种{this.props.dataSources.projectName}</p>
                <p>公布时间：2016-08-02{this.props.dataSources.publishDate}</p>
            </li>
        )
    }
}

function select(state){
    return{
        bidDataContent:state.bidDataContent
    }
}
export default connect(select)(bidDataContent);