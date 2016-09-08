/*
    分类品种信息
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';

import $ from 'jquery';

import HeaderBar from './headerBar.js';
import Provicen from './provicen.js';

import {loadSingleClassifyProduct} from './function/ajax.js';


class OptionalClassify extends Component{
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
            loadSingleClassifyProduct(dispatch,{
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
                <HeaderBar decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>
                <SubHeader/>
                <div ref="content" className="scroll-content has-subheader">
                    <ul className="list">
                        {
                            this.state.data.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random(1)}/>)
                        }
                    </ul>
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
            <li className="row item">
                <div className="col">{this.props.dataSources.genericName}<span className="tag">{this.props.dataSources.icoType}</span></div>
                <div className="col-20">{this.props.dataSources.sales}</div>
                <div className="col-20">{this.props.dataSources.marketMth}</div>
                <div className="col-25">{this.props.dataSources.change}</div>
            </li>
        )
    }
}

/*
    二级标题栏
*/
class SubHeader extends Component{
    render(){
        return(
            <div ref="sub" className="bar bar-subheader row">
              <div className="col">通用名</div>
              <div className="col-20">市场规模</div>
              <div className="col-20">市场份额</div>
              <div className="col-25">涨跌幅</div>
            </div>
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
export default connect(select)(OptionalClassify);