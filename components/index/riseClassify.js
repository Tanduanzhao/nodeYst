import React,{Component} from 'react';
import {connect} from 'react-redux';
import HeaderBar from './../common/headerbar.js';
import Provicen from './../provicen.js';
import {loadListClassifyProduct} from './../function/ajax.js';

import Loading from './../common/loading';
import EmptyComponent from './../common/emptyComponent';
import ScrollLoading from './../common/scrollLoading';
import {Link} from 'react-router';
class RiseClassify extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pageNo:1,
            infinite:true,
            isLoading:true,
            isSrollLoading:false,
            isLoadData:true,
            sord:"desc",
            sordActive:0,
            sidx:"sales"
        };
        this._reSet = this._reSet.bind(this);
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _increaseHandle(){
        switch(this.props.areaId){
            case "ZZOQD0000000000000000000000020" :  if(this.props.yearMonth == 2015){return false} break;
            case "ZZOQD0000000000000000000000011" :  if(this.props.yearMonth == 2016){return false} break;
            case "ZZOQD0000000000000000000000002" :  if(this.props.yearMonth == 2016){return false} break;
            case "ZZOQD0000000000000000000000016" :  if(this.props.yearMonth == 2015){return false} break;
            case "ZZOQD0000000000000000000000005" :  if(this.props.yearMonth == 2014){return false} break;
            case "ZZOQD0000000000000000000000013" :  if(this.props.yearMonth == 2014){return false} break;
            case "ZZOQD0000000000000000000000015" :  if(this.props.yearMonth == 2014){return false} break;
            case "ZZOQD0000000000000000000000017" :  if(this.props.yearMonth == 2014){return false} break;
            case "ZZOQD0000000000000000000000018" :  if(this.props.yearMonth == 2013){return false} break;
            case "ZZOQD0000000000000000000000019" :  if(this.props.yearMonth == 2013){return false} break;
        }
        this.ele.addEventListener('scroll', this._infiniteScroll);
        //if(this.props.yearMonth == 2016){return false}
        this.setState({
            isLoading:true
        })
        this._reSet();
		this.props.dispatch((dispatch)=>{
            dispatch({
                type:'INCREASE'
            });
            setTimeout(()=> this._loadData());
        })
	}
	_decreaseHandle(){
        this.ele.addEventListener('scroll', this._infiniteScroll);
        this.setState({
            isLoading:true
        })
        this._reSet();
		this.props.dispatch((dispatch)=>{
            dispatch({
                type:'DECREASE'
            });
            setTimeout(()=> this._loadData());
        })
	}
    _reSet(){
        this.setState({
            pageNo:1,
            data:[]
        })
    }
    //排序
    sort(sordActive,sidx){
        this.ele.addEventListener('scroll', this._infiniteScroll);
        if(this.state.sord=="desc"){
            this.setState({
                sord:"asc"
            });
        }else{
            this.setState({
                sord:"desc"
            });
        }
        this.setState({
            isLoading:true,
            data:[],
            pageNo:1,
            sordActive:sordActive,
            sidx:sidx
        });
        setTimeout(()=> this._loadData());
    }

    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadListClassifyProduct(dispatch,{
                yearMonth:getState().data.yearMonth,
                areaId:this.props.areaId,
                salesId:this.props.params.sid,
                searchAreaType:getState().provicen.searchAreaType,
                pageNo:this.state.pageNo,
                sord:this.state.sord,
                sidx:this.state.sidx,
                callBack:(res)=>{
                    this.setState({
                        pageNo:this.state.pageNo+1,
                        data:this.state.data.concat(res.datas),
                        //infinite:false,
                        isSrollLoading:true,
                        isLoading:false,
                        isLoadData:false
                    })
                    if(this.state.data.length >= res.totalSize ){
                        this.setState({
                            infinite:false,
                            isSrollLoading:false
                        });
                    }else {
                        this.setState({
                            infinite:true
                        });
                    }
                }
            });
        })
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoadData) return false;
            this.setState({
                isLoadData:true
            });
            setTimeout(()=>this._loadData())
        }
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
       
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'UNSHOW'
        })
        this.ele.removeEventListener('scroll',this._infiniteScroll);
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} decreaseHandle={this._decreaseHandle.bind(this)} increaseHandle={this._increaseHandle.bind(this)} titleName="分类排行榜"/>
                <div ref="content" className="scroll-content  has-header market">
                    {
                        this.state.data.length == 0 && !this.state.isLoading ? <EmptyComponent/> : <Main {...this.props} data={this.state.data} sort={this.sort.bind(this)} sord={this.state.sord} sordActive={this.state.sordActive}/>
                    }
                    {
                        this.state.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                </div>
                {
                    this.state.isLoading ? <Loading/> : null
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
        return(
            <div className="list card item-text-wrap" style={{ margin: '0',wordBreak: 'break-all'}}>
                <div className="row item" style={{ padding: '16px 10px',fontSize: ' .6rem',color: '#0894ec'}}>
                    <div className="col">一级分类</div>
                    <div className="col text-center" onClick={()=>{this.props.sort(0,"sales")}}>市场规模(万)<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 0) ? styles.active : null}></i></div>
                    <div className="col text-center" onClick={()=>{this.props.sort(1,"changeCost")}}>增长额(万)<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 1) ? styles.active : null}></i></div>
                    <div className="col col-flex-last text-center" onClick={()=>{this.props.sort(2,"change")}}>增长率<i className={this.props.sord=="desc" ?"fa fa-sort-desc":"fa fa-sort-up"} style={(this.props.sordActive == 2) ? styles.active : null}></i></div>
                </div>
                <div className="border horizontal list">
                    {
                        this.props.data.map((ele,index)=> <List {...this.props} dataSources={ele} key={Math.random()}/>)
                    }
                </div>
            </div>
        )
    }
}

class List extends Component{
    resetnextdata(){
        this.props.dispatch({
            type:'RESETOPTIONALCLASSIFY'
        })
    }
    render(){
        var string = null;
        var change = (()=>{
            if (this.props.dataSources.change == "" || typeof this.props.dataSources.change == 'undefined') {
                string=""
            }else if (this.props.dataSources.change >= 0 ) {
                string= <div className="col   col-flex-last text-center assertive">{this.props.dataSources.change}%</div>
            } else {
                string= <div className="col   col-flex-last text-center balanced">{this.props.dataSources.change}%</div>
            }
            return string;
        })();
        var changeCost = (()=>{
            if (this.props.dataSources.changeCost >= 0 ) {
                string=  <div  className="col  text-center  assertive">{this.props.dataSources.changeCost}</div>
            } else {
                string=   <div  className="col  text-center balanced">{this.props.dataSources.changeCost}</div>
            }
            return string;
        })();
        return(
            <Link to={`/optional/classify/${this.props.dataSources.salesId}/${this.props.dataSources.salesName}`} onClick={this.resetnextdata.bind(this)} className="row item" style={{ padding: '16px 10px',fontSize: '.6rem'}}>
                <div className="col" style={{fontSize: '.6rem'}}>
                    <span className="tag" style={{background: '#fea512'}}>{this.props.dataSources.icoType}</span>
                    {this.props.dataSources.salesName}
                </div>
                <div  className="col  text-center">{this.props.dataSources.sales}</div>
                {changeCost}
                {change}
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

const styles = {
    active:{
        display:'inline-block'
    }
}