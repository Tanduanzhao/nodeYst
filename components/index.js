import React,{Component} from 'react';
import HeaderBar from './headerBar.js';
import FooterBar from './footerBar.js';
import SliderBar from './sliderBar.js';
import Provicen from './provicen.js';

import {connect} from 'react-redux';
import {httpAddress} from './config.js';
import $ from 'jquery';
import {loadIndex,loadProvince} from './function/ajax.js';

class Index extends Component{
	constructor(props) {
	  super(props);
	}
    componentDidMount(){
        loadProvince(this.props.dispatch)
    }
    
	_increaseHandle(){
        var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:++yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:function(res){
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'INCREASE'
                    });
                }
            })
        })
	}
	_decreaseHandle(){
		var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:--yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:function(res){
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'DECREASE'
                    });
                }
            })
        })
	}
    _fn(arg){
        loadIndex(this.props.dispatch,{
            yearMonth:this.props.yearMonth,
            areaId:arg.areaId,
            searchAreaType:arg.searchAreaType,
            callBack:(res)=>{
                this.props.dispatch({
                     type:'LOADDATA',
                     data:res.datas
                });
            }
        })
    }
	render(){
		return(
			<div className="root">
                <HeaderBar decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>
                <Main {...this.props} data={this.props.initData}/>
                <FooterBar uri={this.props.uri} dispatch={this.props.dispatch}/>
				{
					this.props.showProvicen ? <Provicen fn={this._fn.bind(this)} {...this.props} dataSources={this.props.provicenData}/> :null
				}
			</div>
		)
	}
}


import Chart from './index/chart.js';
import Classify from './index/classify.js';
import Concept from  './index/concept.js';
import Breed from './index/breed.js';

class Main extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        loadIndex(this.props.dispatch,{
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            searchAreaType:1,
            callBack:(res)=>{
                this.props.dispatch({
                     type:'LOADDATA',
                     data:res.datas
                });
            }
        });
    }
	render(){
		return(
			<div className="scroll-content ionic-scroll has-header has-tabs">
                        <Chart dataSources={this.props.data.businessCwm}/>
                        <Classify dataSources={this.props.data.businessSales}/>
                        <Concept dataSources={this.props.data.businessConcept}/>
                        <Breed dataSources={this.props.data.businessBreedUp}/>
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
        initData:state.index.data,
        searchAreaType:state.provicen.searchAreaType

	}
}
export default connect(select)(Index);