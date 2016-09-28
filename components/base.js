/*
    基药
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadBaseFilter,loadBaseAll} from './function/ajax';
import PolicySonFilter from './policySonFilter.js';
import EmptyComponent from './emptyComponent';
import Loading from './loading';

class Base extends Component{
    constructor(props){
        super(props);
        this._loadSlider = this._loadSlider.bind(this);
        this._hideFilter = this._hideFilter.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._loadData = this._loadData.bind(this);
        this.state={
            isShowFilter:false,
            isLoading:false
        }
    }
    componentWillMount(){
        
    }
    //加载筛选条件
    _loadSlider(){
        loadBaseFilter({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADBASEMENU',
                    datas:res.datas
                })
            }
        })
    }
    _loadData(){
        this.setState({
            isLoading:true
        });
        loadBaseAll({
            searchName:this.props.base.searchName,
            areaId:JSON.stringify(this.props.base.areaId),
            gradeId:this.props.base.gradeId,
            catalogEditionId:this.props.base.catalogEditionId,
            pageNo:this.props.base.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADBASEDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
            }
        })
    }
    _showFilter(){
        this.setState({
            isShowFilter:true
        })
    }
    
    _hideFilter(){
        this.setState({
            isShowFilter:false
        })
    }
    _fn(args){
        this.props.dispatch({
            type:'CHANGEBASE',
            areaId:args.areaId,
            gradeId:args.gradeId,
            catalogEditionId:args.catalogEditionId
        });
        this._hideFilter();
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    
    componentDidMount(){
        //传入默认数据到仓库
        this.props.dispatch({
            type:'DEFAULTBASE',
            areaId:this.props.policy.areaId,
            gradeId:this.props.params.gradeId,
            catalogEditionId:this.props.params.catalogEditionId,
            searchName:this.props.policy.searchName
        });
        this._loadSlider();
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        setTimeout(()=>{
            this._isNeedLoadData();
        });
    }
     //判断屏幕是否加载满
    _isNeedLoadData(){
        if(this.ele.scrollHeight-this.ele.scrollTop <= this.ele.clientHeight && this.props.policy.loadState <= 6 && !this.state.isLoading){
            this._loadData();
        }
    }
    //搜索点击查询对应数据
    _searchDatas(key){
        this.props.dispatch({
            type:'CHANGEINSURANCESEARCHNAME',
            searchName:key
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    render(){
        return(
            <div className="root">
                <HeaderBar showFilter={this._showFilter.bind(this)} searchAction = {this._searchDatas.bind(this)} {...this.props}/>
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        <div className="card" style={{marginTop:0}}>
                            {
                                this.props.base.datas.length==0 ? <EmptyComponent/> :this.props.base.datas.map((ele)=>{
                                    return(
                                        <div key={Math.random(2)}>
                                            <LinkBar title={ele.grade +" ("+ele.publishDate+")"}/>
                                            <div className="item">
                                                {
                                                    ele.lists.length == 0 ? <EmptyComponent/> : <table className="table-border" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th>药品名称</th>
                                                                <th>剂型</th>
                                                                <th>规格</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                ele.lists.map((v)=>{
                                                                    return(
                                                                        <tr key={Math.random(1)}>
                                                                            <td>{v.productName || null}</td>
                                                                            <td>{v.prepName || null}</td>
                                                                            <td>{v.spec || null}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter dataSources={this.props.base.filters} areaId={this.props.base.areaId} areaName={this.props.base.areaName} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
                }
                {
                    !this.state.isLoading ? null :<Loading/>
                }
            </div>
        )
    }
}

class HeaderBar extends Component{
  _showProvicenHandle(){
    this.props.showFilter();
  }
  _changeHandle(){
      this.props.searchAction(this.refs.searchName.value);
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
        <div className="buttons">
            <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i></button>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="searchName" type="search" placeholder="请输入搜索关键词"/>
        </label>
        <button className="button button-clear" onClick={this._changeHandle.bind(this)}>
           搜索
        </button>
      </div>
    )
  }
}
class LinkBar extends Component{
	render(){
		return(
                <div className="item item-divider item-text-wrap">
                    <i className="fa fa-file-text-o"></i> 文号：{this.props.title}
                </div>
        )
	}
}
function select(state){
    return{
        policy:state.policy,
        base:state.base
    }
}

export default connect(select)(Base);