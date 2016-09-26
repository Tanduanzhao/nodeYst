/*
 中标数据详情信息
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loadBidListContent} from '../function/ajax.js';
import Loading from '../loading';
import FilterBidList from '../filterBidList'
class BidList extends Component{
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
                    <HeaderBar fn={this._loadData} {...this.props}/>
                    <div ref="content" className="scroll-content has-header">
                        <div className="bar bar-header">
                            <h3 className="title">筛选条件提示语</h3>
                        </div>
                        <ul className="scroll-content has-header bidList-view">
                            {
                                this.props.bidList.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
                            }
                        </ul>
                        {
                            this.props.bidList.isShowFilter ? <FilterBidList dataSources={this.props.provicenData} {...this.props}/> : null
                        }
                    </div>
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
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGETITLEORREPORTKEY',
            titleOrReportKey:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    _searchHandle(){
        this.props.dispatch({
            type:'LOADPRODUCEDATA',
            data:[],
            pageNo:1,
        });
        setTimeout(()=> this.props.fn(),100);
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
                    <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)}  type="search" placeholder="请输入搜索关键词"/>
                </label>
                <button className="button button-clear" onClick={this._searchHandle.bind(this)}>
                    搜索
                </button>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <div>
                <h2 className="title">产品名称：头孢呋辛{this.props.dataSources.productName}</h2>
                <li className="item card">
                    <p>商品名：{this.props.dataSources.trandName}</p>
                    <p>剂型：(头孢呋辛酯)胶囊剂{this.props.dataSources.prepName}</p>
                    <p>规格：0.125g{this.props.dataSources.spec}</p>
                    <p>包装数量：{this.props.dataSources.packNum}</p>
                    <p>包材名称：{this.props.dataSources.packMaterialName}</p>
                    <p>生产企业：深圳致君制药有限公司{this.props.dataSources.manufacturerName}</p>
                    <p>中标价：<span className="calm">{this.props.dataSources.bidPrice}</span></p>
                    <p>最小制剂招标价格：<span className="calm">{this.props.dataSources.minBidPrice}</span></p>
                    <p>省份：<span className="calm">{this.props.dataSources.areaName}</span></p>
                    <p>项目名称：（201607）广东省基本药物竞价交易品种{this.props.dataSources.projectName}</p>
                    <p>公布时间：2016-08-02{this.props.dataSources.publishDate}</p>
                </li>
            </div>
        )
    }
}

function select(state){
    return{
        provicenData:state.provicen.data,
        bidList:state.bidList
    }
}
export default connect(select)(BidList);