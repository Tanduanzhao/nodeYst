import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadIndex,loadProvince,loadWx,loadJssdk,getMarketInfo} from './../../function/ajax.js';
import {url2obj} from './../../function/common';

import Loading from './../../common/loading';
import HeaderBar from './../../common/headerBar.js';
import FooterBar from './../../common/footerBar.js';
import SliderBar from './../../sliderBar.js';
import Provicen from './../../provicen.js';

class MarketAll extends Component{
	constructor(props) {
	  super(props);
      this.state ={
          loading:true,
          isOther:"",
      }
	}
    componentDidMount(){
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
        //loadProvince(this.props.dispatch);
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
                        //this.props.dispatch({
                        //    type:'CHANGEDATA',
                        //    yearMonth:res.datas.yearMonth
                        //});
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
            loading:true
        });
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
    }

	render(){
		return(
			<div className="root">
                <HeaderBar decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} {...this.props}/>
                <div ref="content" className="scroll-content ionic-scroll has-header has-footer market card" style={{margin: 0}}>
                    {
                        this.state.loading ? <Loading/> : null
                    }
                    <Main loading={this.state.loading} {...this.props} data={this.props.initData}/>
                </div>
                <FooterBar {...this.props}/>
				{
					this.props.showProvicen ? <Provicen fn={this._fn.bind(this)} {...this.props} dataSources={this.props.provicenData}/> :null
				}
			</div>
		)
	}
}

import Map from './../tests/map.js';
import Chart from './../../index/chart.js';
import Classify from './../classify.js';
import Factory from  './../tests/factory.js';
import Breed from './../../index/breed.js';

class Main extends Component{
    constructor(props){
        super(props);
    }
	render(){
        var module = this.props.loading ? <loading/>
                : [<Map key="map"  areaName={this.props.data.areaName} dataSources={this.props.data.businessCwmMarket}/>,
                <Chart key="chart" dataSources={this.props.data.businessCwm}/>,
                <Classify key="classify" dataSources={this.props.data.businessSales}/>,
                <Breed key="breed" dataSources={this.props.data.businessBreedUp}/>,
                <Factory key="factory" dataSources={this.props.data.businessFactory}/>];
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
export default connect(select)(MarketAll);