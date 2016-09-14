import React,{Component} from 'react';
import {connect} from 'react-redux';
import HeaderBar from './headerBar.js';
import Provicen from './provicen.js';
import {loadListClassifyProduct} from './function/ajax.js';

import {Link} from 'react-router';
class RiseClassify extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pageNo:1,
            infinite:false
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
    _fn(){
        this._loadData();
    }
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadListClassifyProduct(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:getState().provicen.areaId,
                salesId:this.props.params.sid,
                searchAreaType:getState().provicen.searchAreaType,
                pageNo:this.state.pageNo,
                callBack:(res)=>{
                    this.setState({
                        data:this.state.data.concat(res.datas),
                        infinite:false
                    })
                    if(res.totalSize <= this.state.data.length){
                        this.ele.removeEventListener('scroll',this._infiniteScroll);
                    }
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
                <HeaderBar decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>s
                <div ref="content" className="scroll-content  has-header">
                    <div className="list">
                        {
                            this.state.data.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random(1)}/>)
                        }
                    </div>
                </div>
                {
					this.props.showProvicen ? <Provicen fn={this._fn.bind(this)} {...this.props} dataSources={this.props.provicenData}/> :null
				}
            </div>
        )
    }
}


class List extends Component{
    render(){
        return(
            <Link to={`/optional/classify/${this.props.dataSources.salesId}`} className="item">
                <div>{this.props.dataSources.salesName}<span className="tag">{this.props.dataSources.icoType}</span></div>
                <p>
                    <span>市场规模：{this.props.dataSources.sales}</span>
                    <span style={{marginLeft:'1rem'}}>市场份额： {this.props.dataSources.marketMth}</span>
                    <span style={{marginLeft:'1rem'}}>涨跌幅：{this.props.dataSources.change}%</span>
                </p>
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
        searchAreaType:state.provicen.searchAreaType
	}
}
export default connect(select)(RiseClassify);