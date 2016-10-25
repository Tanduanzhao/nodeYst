import React,{Component} from 'react';
import {connect} from 'react-redux';
import HeaderBar from './headerBar.js';
import Provicen from './provicen.js';
import {loadListConceptProduct} from './function/ajax.js';

import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {Link} from 'react-router';
class RiseConcept extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pageNo:1,
            infinite:false,
            loading:true
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
    _fn(args){
        this.props.dispatch((dispatch,getState)=>{
            loadListConceptProduct(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:args.areaId,
                conceptId:this.props.params.cid,
                searchAreaType:args.searchAreaType,
                pageNo:this.state.pageNo,
                callBack:(res)=>{
                    this.setState({
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
    }
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadListConceptProduct(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:getState().provicen.areaId,
                conceptId:this.props.params.cid,
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
    componentDidMount(){
        this.props.dispatch({
            type:'UNSHOW'
        })
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
       
    }
    componentWillUnmount(){
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }
    render(){
        return(
            <div className="root">
                <HeaderBar decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>
                <div ref="content" className="scroll-content has-header">
                    <Main data={this.state.data} loading={this.state.loading}/>
                </div>
                {
					this.props.showProvicen ? <Provicen fn={this._fn.bind(this)} {...this.props} dataSources={this.props.provicenData}/> :null
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
        if(this.props.loading) {
            return <Loading/>
        }else{
            if(this.props.data.length != 0){
                return(
                    <div className="list">
                        {
                            this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id+Math.random(1)}/>)
                        }
                    </div>
                )
            }else{
                return <EmptyComponent/>;
            }
        }
    }
}

class List extends Component{
    render(){
        var string = null;
        var change = (()=>{
            if (this.props.dataSources.change >= 0 ) {
                string= <span className="item-note assertive">{this.props.dataSources.change}%</span>
            } else {
                string= <span className="item-note balanced">{this.props.dataSources.change}%</span>
            }
            return string;
        })();
        return(
            <div className="item">
                <div>
                    {this.props.dataSources.conceptName}
                    {change}
                </div>
                <p>
                    <span>市场规模：{this.props.dataSources.sales}万</span>
                    <span style={{marginLeft:'1rem'}}>市场份额： {this.props.dataSources.marketMth}%</span>
                </p>
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
export default connect(select)(RiseConcept);