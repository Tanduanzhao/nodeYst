import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadIndex,loadProvince,loadWx,loadJssdk,getMarketInfo,loadReportList} from './../function/ajax.js';
import {url2obj} from './../function/common';

import Loading from './../common/loading';
import HeaderBar from './../common/headerbar.js';
import FooterBar from './../common/footerBar.js';
import SliderBar from './../sliderBar.js';
import Provicen from './../provicen.js';

class MarketAll extends Component{
	constructor(props) {
	  super(props);
      this.state ={
          loading:true,
          isOther:"",
          active:'market',
          parentName:this.props.areaName
      }
	}
    componentDidMount(){
        if(this.props.search.smallType == "搜索首页"){
            this.props.dispatch({
                type:'RESETSEARCH'
            });
            switch(this.props.areaId){
                case "ZZOQD0000000000000000000000020" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:50}); break;
                case "ZZOQD0000000000000000000000011" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:51}); break;
                case "ZZOQD0000000000000000000000002" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:52}); break;
                case "ZZOQD0000000000000000000000016" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:53}); break;
                case "ZZOQD0000000000000000000000005" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:54}); break;
                case "ZZOQD0000000000000000000000013" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:55}); break;
                case "ZZOQD0000000000000000000000015" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:56}); break;
                case "ZZOQD0000000000000000000000017" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:57}); break;
                case "ZZOQD0000000000000000000000018" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:58}); break;
                case "ZZOQD0000000000000000000000019" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:59}); break;
            }
        }
        this.ele = this.refs.content;
        if(this.props.areaId=="ZZOQD0000000000000000000000013"){
            this.setState({
                isOther:1
            });
            this.props.dispatch({
                type:'CHANGEDATA',
                yearMonth:2014
            });
        }else{
            this.props.dispatch({
                type:'CHANGEDATA',
                yearMonth:2015
            });
        }
        loadProvince(this.props.dispatch);
        if(this.props.initData.length != 0){
            setTimeout(()=>{
                loadIndex(this.props.dispatch,{
                    yearMonth: this.props.yearMonth,
                    areaId:this.props.areaId,
                    isOther:this.state.isOther || "",
                    searchAreaType:this.props.searchAreaType,
                    callBack:(res)=>{
                        this.props.dispatch({
                            type:'LOADDATA',
                            data:res.datas
                        });
                        this.props.dispatch({
                            type:'CHANGEIdAREAID',
                            areaName: res.datas.areaName
                        });
                        this.setState({
                            loading:false
                        });
                    }
                });
            });
        }
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'UNSHOW'
        })
    }
    //显示简介
    showIntro(){
        switch(this.state.parentName){
            case "广东省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:50}); break;
            case "江苏省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:51}); break;
            case "北京市" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:52}); break;
            case "山东省" :  this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:53}); break;
            default : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:60}); break;
        }
        setTimeout(()=>{
            this.context.router.push("/market/marketIntro/"+ this.props.search.smallType);
        })
    }
    //显示地市刷选
    showProvicenHandle(){
        this.props.dispatch({
            type:'SHOW'
        });
    }
    //切换时间 增加年份
	_increaseHandle(){
        if(this.props.yearMonth==2015){return false}
        this.setState({
            loading:true
        })
        var yearMonth = this.props.yearMonth;
		this.props.dispatch((dispatch)=>{
            loadIndex(dispatch,{
                yearMonth:++yearMonth,
                areaId:this.props.areaId,
                searchAreaType:this.props.searchAreaType,
                isOther:this.state.isOther || "",
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

    //切换时间 减少年份
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
            loading:true,
            isOther:"",
            parentName:arg.parentName
        });
        setTimeout(()=>{
            loadIndex(this.props.dispatch,{
                yearMonth:this.props.yearMonth,
                areaId:arg.areaId,
                searchAreaType:arg.searchAreaType,
                isOther:this.state.isOther || "",
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
        })
    }
	render(){
		return(
			<div className="root">
                <HeaderBar {...this.props} decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} showProvicenHandle={this.showProvicenHandle.bind(this)} showIntro={this.showIntro.bind(this)}  titleName={`${this.props.areaName}医院市场`}/>
                <div ref="content" className="scroll-content has-header has-footer market card" style={{margin: 0}}>
                    {
                        this.state.loading ? <Loading/> : null
                    }
                    <Main loading={this.state.loading} {...this.props} data={this.props.initData}/>
                </div>
                <FooterBar {...this.props} active={this.state.active} />
				{
					this.props.showProvicen ? <Provicen fn={this._fn.bind(this)} {...this.props} dataSources={this.props.provicenData}/> :null
				}
			</div>
		)
	}
}

import Map from './map.js';
import Chart from './chart.js';
import Classify from './classify.js';
import Factory from  './factory.js';
import Breed from './breed.js';

class Main extends Component{
    constructor(props){
        super(props);
    }
	render(){
        var module = this.props.loading ? <loading/>
                : [<Map key="map"  {...this.props} areaName={this.props.data.areaName} dataSources={this.props.data.businessCwmMarket}/>,
                <Chart key="chart" {...this.props} dataSources={this.props.data.businessCwm}/>,
                <Classify key="classify" {...this.props} dataSources={this.props.data.businessSales}/>,
                <Breed key="breed" {...this.props} dataSources={this.props.data.businessBreedUp}/>,
                <Factory key="factory" {...this.props} dataSources={this.props.data.businessFactory}/>];
		return(
			<div>
			    {module}
			</div>
			
		)
	}
}


function select(state){
	return{
        search:state.search,
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
MarketAll.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(MarketAll);