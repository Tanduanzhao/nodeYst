import React,{Component} from 'react';
import HeaderBar from './headerBar.js';
import FooterBar from './footerBar.js';
import SliderBar from './sliderBar.js';
import Provicen from './provicen.js';

import {connect} from 'react-redux';
import {httpAddress} from './config.js';
import {loadIndex,loadProvince,loadWx,loadJssdk} from './function/ajax.js';
import {url2obj} from './function/common';

import Loading from './loading';

class Index extends Component{
	constructor(props) {
	  super(props);
      this.state ={
          loading:true,
          isOpacity:true,
          opacityNum:0,
      }
      this._infiniteScroll = this._infiniteScroll.bind(this);
	}
    _infiniteScroll(){
        if(this.ele.scrollTop>=this.refs.headerImg.clientHeight){
            this.setState({
                isOpacity:false,
                opacityNum:1
            });
        }else{
            this.setState({
                isOpacity:true,
                opacityNum:this.ele.scrollTop/this.refs.headerImg.clientHeight
            })
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
//        console.dir(this.refs.headerImg);
        this.ele.addEventListener('scroll',this._infiniteScroll);
        loadProvince(this.props.dispatch);
        if(this.props.initData.length!=0){
            loadIndex(this.props.dispatch,{
                yearMonth:this.props.yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:(res)=>{
                    this.props.dispatch({
                        type:'LOADDATA',
                        data:res.datas
                    });
                    this.props.dispatch({
                        type:'CHANGEDATA',
                        yearMonth:res.datas.yearMonth
                    });
                    this.setState({
                        loading:false
                    });
                }
            });
        }
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'UNSHOW'
        })
    }
    
	_increaseHandle(){
        this.setState({
            loading:true
        })
        var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:++yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:(res)=>{
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'INCREASE'
                    });
                    this.props.dispatch({
                        type:'CHANGEDATA',
                        yearMonth:res.datas.yearMonth
                    });
                    this.setState({
                        loading:false
                    })
                }
            })
        })
	}
	_decreaseHandle(){
		var yearMonth = this.props.yearMonth;
        this.setState({
            loading:true
        });
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:--yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                callBack:(res)=>{
                    dispatch({
                         type:'LOADDATA',
                         data:res.datas
                    });
                    dispatch({
                        type:'DECREASE'
                    });
                    this.props.dispatch({
                        type:'CHANGEDATA',
                        yearMonth:res.datas.yearMonth
                    });
                    this.setState({
                        loading:false
                    })
                }
            })
        })
	}
    _fn(arg){
        this.setState({
            loading:true
        });
        loadIndex(this.props.dispatch,{
            yearMonth:this.props.yearMonth,
            areaId:arg.areaId,
            searchAreaType:arg.searchAreaType,
            callBack:(res)=>{
                this.props.dispatch({
                     type:'LOADDATA',
                     data:res.datas
                });
                this.props.dispatch({
                    type:'CHANGEDATA',
                    yearMonth:res.datas.yearMonth
                });
                this.setState({
                    loading:false
                })
            }
        })
    }
	render(){
        
		return(
			<div className="root">
                <HeaderBar opacityNum={this.state.opacityNum} isOpacity={this.state.isOpacity} decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>
                <div ref="content" className="scroll-content ionic-scroll has-tabs">
                    <div>
                        <div className="header-img" ref="headerImg">
                            <img width="100%" src="../images/index_bg.jpg"/>
                        </div>
                        <Main loading={this.state.loading} {...this.props} data={this.props.initData}/>
                    </div>
                </div>
                <FooterBar {...this.props}/>
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
        super(props);
    }
	render(){
        var module = this.props.loading ? <loading/> : [<Chart key="chart" dataSources={this.props.data.businessCwm}/>,
                <Classify key="classify" dataSources={this.props.data.businessSales}/>,
                <Concept key="concept" dataSources={this.props.data.businessConcept}/>,
                <Breed key="breed" dataSources={this.props.data.businessBreedUp}/>];
		return(
			<div>
			    {module}
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