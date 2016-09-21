/*
 医院列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadListHospital} from '../function/ajax';
import Provicen from '../provicen';
import Filter from '../filter';
import Loading from '../loading';
class HospitalList extends Component{
    constructor(props){
        super(props);
        this.state={
            searchName:this.props.hospitalFilter.searchName,
            data:this.props.hospitalFilter.data,
            pageNo:this.props.hospitalFilter.pageNo,
            infinite:this.props.hospitalFilter.infinite,
            yearMonth:this.props.hospitalFilter.yearMonth,
            areaId:this.props.hospitalFilter.areaId,
            areaName:this.props.hospitalFilter.areaName,
            searchAreaType:this.props.hospitalFilter.searchAreaType,
            loading:true
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _fn(args){
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADHOSPITALDATA',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTER'
            });
            dispatch({
                type:'CHANGEHOSPITALFILTER',
                areaId:args.areaId,
                areaName:args.areaName,
                searchAreaType:args.searchType,
                yearMonth:args.yearMonth,
                hospitalLevel:args.hospitalLevel
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadListHospital(dispatch,{
                searchName:this.props.hospitalFilter.searchName,
                yearMonth:this.props.hospitalFilter.yearMonth,
                areaId:this.props.hospitalFilter.areaId,
                pageNo:this.props.hospitalFilter.pageNo,
                hospitalLevel:this.props.hospitalFilter.hospitalLevel,
                callBack:(res)=>{
                    dispatch({
                        type:'LOADHOSPITALDATA',
                        data:this.props.hospitalFilter.data.concat(res.datas),
                        pageNo:this.props.hospitalFilter.pageNo+1
                    });
                    if(res.totalSize <= this.props.hospitalFilter.data.length){
                        dispatch({
                            type:'UNINFINITE'
                        });
                    }else{
                        dispatch({
                            type:'INFINITE'
                        });
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
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.hospitalFilter.infinite){
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
              <HeaderBar fn={this._loadData} {...this.props}/>
              <div ref="content" className="scroll-content has-header hl-content">
                  <Main data={this.props.hospitalFilter.data} loading={this.state.loading}/>
              </div>
              {
                  this.props.hospitalFilter.isShowFilter ? <Filter fn={this._fn.bind(this)} {...this.props}dataSources={this.props.provicenData}/> :null
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
            return(
                <ul className="list">
                    {
                        this.props.data.map((ele,index)=> <List dataSources={ele} key={ele.id}/>)
                    }
                </ul>
            )
        }
    }
}
class List extends Component{
    render(){
        var string = null;
        var tag = (()=>{
            if(this.props.dataSources.hosLevel){
                string = <span className= 'tag' >{this.props.dataSources.hosLevel}</span>;
            }else{
                string = "";
            }
            return string;
        })();
        return(
          <li className="item">
              <h2>
                  {this.props.dataSources.hosName}
                  {tag}
              </h2>
          </li>
        )
    }
}

class HeaderBar extends Component{
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTER'
        });
    }
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGEHOSPITALSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
        })
    }
    _searchHandle(){
        this.props.dispatch({
            type:'LOADHOSPITALDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this.props.fn(),100);
    }
    componentUnMount(){
        this.props.dispatch({
            type:'CLEARHOSPITALSEARCHNAME'
        })
    }
    render(){
        return(
          <div className="bar bar-header bar-positive item-input-inset">
              <div className="buttons">
                  <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.hospitalFilter.areaName}</span></button>
              </div>
              <label className="item-input-wrapper">
                  <i className="icon ion-ios-search placeholder-icon"></i>
                  <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
              </label>
              <button className="button button-clear" onClick={this._searchHandle.bind(this)}>
                  搜索
              </button>
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
        hospitalFilter:state.hospital,
        searchAreaType:state.provicen.searchAreaType
    }
}

export default connect(select)(HospitalList);