/*
    医保
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadInsuranceFilter,loadInsuranceAll} from './../../function/ajax';
import PolicySonFilter from './../../filterPage/policySonFilter.js';
import EmptyComponent from './../../common/emptyComponent';
import Loading from './../../common/loading';
import More from './../../common/more';

class Insurance extends Component{
    constructor(props){
        super(props);
        this._loadSlider = this._loadSlider.bind(this);
        this._hideFilter = this._hideFilter.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._loadData = this._loadData.bind(this);
        this.state={
            isShowFilter:false,
            isLoading:false,
            isInfinite:false
        }
    }
    componentWillMount(){
        this._loadSlider();
    }
    //加载筛选条件
    _loadSlider(){
        loadInsuranceFilter({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADINSURANCEMENU',
                    datas:res.datas
                })
            }
        })
    }
    _loadData(){
        if(this.state.isInfinite) return false;
        this.setState({
            isLoading:true
        });
        loadInsuranceAll({
            searchName:this.props.insurance.searchName,
            areaId:JSON.stringify(this.props.insurance.areaId),
            gradeId:this.props.insurance.gradeId,
            catalogEditionId:this.props.insurance.catalogEditionId,
            pageNo:this.props.insurance.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADINSURANCEDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                setTimeout(()=>{
                    if(this.props.insurance.datas.length == res.totalSize){
                        this.setState({
                            isInfinite:true
                        });
                    }else{
                        this.props.dispatch({
                            type:'PAGEADDINSURANCE'
                        })
                    }
                },10);
            }
        })
    }
    _showFilter(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else {
            this.setState({
                isShowFilter: true
            })
        }
    }
    
    _hideFilter(){
        this.setState({
            isShowFilter:false
        })
    }
    _fn(args){
        this.props.dispatch({
            type:'CHANGEINSURANCE',
            areaId:args.areaId,
            gradeId:args.gradeId,
            catalogEditionId:args.catalogEditionId
        });
        this.setState({
            isInfinite:false
        });
        this._hideFilter();
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    
    componentDidMount(){
        //传入默认数据到仓库
        this.props.dispatch({
            type:'DEFAULTINSURANCE',
            areaId:this.props.policy.areaId,
            gradeId:this.props.params.gradeId,
            catalogEditionId:this.props.params.catalogEditionId,
            searchName:this.props.policy.searchName
        });
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        setTimeout(()=>{
            this._isNeedLoadData();
        },10);
    }
     //判断屏幕是否加载满
    _isNeedLoadData(){
        if(this.ele.scrollHeight-this.ele.scrollTop <= this.ele.clientHeight && !this.state.isLoading){
            this._loadData();
        }
    }
    
    //搜索点击查询对应数据
    _searchDatas(key){
        if(this.props.isVip == '0'){
           this.context.router.push('/pay/vip');
            return false;
        }
        this.props.dispatch({
            type:'CHANGEINSURANCESEARCHNAME',
            searchName:key
        });
        this.setState({
            isInfinite:false
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETINSURANCE'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar showFilter={this._showFilter.bind(this)} searchAction = {this._searchDatas.bind(this)} {...this.props}/>
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        <div className="card" style={{marginTop:0}}>
                            {
                                this.props.insurance.datas.length==0 ? <EmptyComponent/> :this.props.insurance.datas.map((ele)=>{
                                    return(
                                        <div key={Math.random(2)}>
                                            <LinkBar title={{c:ele.grade +" ("+ele.publishDate+")",g:ele.catalogEditionName,p:ele.areaName}}/>
                                            <div className="item" style={{boxSizing:'content-box'}}>
                                                {
                                                    ele.lists.length == 0 ? <EmptyComponent/> : <table className="table-border" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th>药品名称</th>
                                                                <th>剂型</th>
                                                                <th>医保类别</th>
                                                                <th>医保编号</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                ele.lists.map((v)=>{
                                                                    return(
                                                                        <tr key={Math.random(1)}>
                                                                            <td className="item-text-wrap">{v.productName || null}</td>
                                                                            <td className="item-text-wrap">{v.prepName || null}</td>
                                                                            <td className="item-text-wrap">{v.pqriType || null}</td>
                                                                            <td className="item-text-wrap">{v.pqriCode || null}</td>
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
                    <More/>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter dataSources={this.props.insurance.filters} areaId={this.props.insurance.areaId} areaName={this.props.insurance.areaName} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
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
          <input ref="searchName" type="search" placeholder={this.props.insurance.searchName}/>
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
                    <i className="fa fa-fw fa-file-text-o"></i> 文号：{this.props.title.c}<br/>
                    <i className="fa fa-fw fa-calendar-check-o"></i> 目录版本：{this.props.title.g}<br/>
                    <i className="fa fa-fw fa-map-pin"></i> 省份：{this.props.title.p}
                </div>
        )
	}
}
function select(state){
    return{
        policy:state.policy,
        insurance:state.insurance,
        isVip:state.userInfo.isVip
    }
}
Insurance.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Insurance);