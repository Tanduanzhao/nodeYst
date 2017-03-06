/*
    抗菌药物
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadAntiFilter,loadAntiAll} from './../../function/ajax';
import PolicySonFilter from './../../filterPage/policySonFilter.js';
import EmptyComponent from './../../common/emptyComponent';
import Loading from './../../common/loading';
import More from './../../common/more';
import HeaderBar from './../../common/headerbar.js';
import ScrollLoading from './../../common/scrollLoading';

class Anti extends Component{
    constructor(props){
        super(props);
        this._loadSlider = this._loadSlider.bind(this);
        this._hideFilter = this._hideFilter.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._loadData = this._loadData.bind(this);
        this.state={
            isShowFilter:false,
            isLoading:true,
            isSrollLoading:false,
            isLoadData:true,
            infinite:true
        }
    }
    //加载筛选条件
    _loadSlider(){
        loadAntiFilter({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADANTIMENU',
                    datas:res.datas
                })
            }
        })
    }
    _loadData(){
        loadAntiAll({
            searchName:this.props.anti.searchName,
            areaId:JSON.stringify(this.props.anti.areaId),
            gradeId:this.props.anti.gradeId,
            catalogEditionId:this.props.anti.catalogEditionId,
            pageNo:this.props.anti.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADANTIDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false,
                    isLoadData:false,
                    isSrollLoading:true
                });
                setTimeout(()=>{
                    if(this.props.anti.datas.length >= res.totalSize){
                        this.setState({
                            infinite:false,
                            isSrollLoading:false
                        });
                    }else{
                        this.props.dispatch({
                            type:'PAGEADDANTI'
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
            type:'CHANGEANTI',
            areaId:args.areaId,
            gradeId:args.gradeId,
            catalogEditionId:args.catalogEditionId
        });
        this._hideFilter();
        this.setState({
            isLoading:true,
            infinite:true
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    
    componentDidMount(){
        //传入默认数据到仓库
        this.props.dispatch({
            type:'DEFAULTANTI',
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
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        setTimeout(()=>{this._loadData()});
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:39});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)});
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:39});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        })
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
     //判断屏幕是否加载满
    _isNeedLoadData(){
        if(this.ele.scrollHeight-this.ele.scrollTop <= this.ele.clientHeight && this.state.infinite){
            if(this.state.isLoadData) return false;
            this.setState({
                isLoadData:true
            });
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
            type:'CHANGEANTISEARCHNAME',
            searchName:key
        });
        this.props.dispatch({
            type:'CHANGEANTI',
            areaId:['0']
        });
        this.setState({
            isLoading:true,
            infinite:true
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETANTI'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="抗菌药物" showSearch={this.showSearch.bind(this)} showFilter={this._showFilter.bind(this)}
                                           showIntro={this.showIntro.bind(this)} />
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        <div className="card" style={{marginTop:0}}>
                            {
                                this.props.anti.datas.length == 0 && !this.state.isLoading ? <EmptyComponent/> :this.props.anti.datas.map((ele)=>{
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                ele.lists.map((v)=>{
                                                                    return(
                                                                        <tr key={Math.random(1)}>
                                                                            <td className="item-text-wrap">{v.productName || null}</td>
                                                                            <td className="item-text-wrap">{v.antibioLevel || null}</td>
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
                    {
                        this.props.anti.datas.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                    <More {...this.props}/>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter dataSources={this.props.anti.filters} areaId={this.props.anti.areaId} areaName={this.props.anti.areaName} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
                }
                {
                    !this.state.isLoading ? null :<Loading/>
                }
            </div>
        )
    }
}

//class HeaderBar extends Component{
//  _showProvicenHandle(){
//    this.props.showFilter();
//  }
//  _changeHandle(){
//      this.props.searchAction(this.refs.searchName.value);
//  }
//  render(){
//    return(
//      <div className="bar bar-header bar-positive item-input-inset">
//        <div className="buttons">
//            <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i></button>
//        </div>
//        <label className="item-input-wrapper">
//          <i className="icon ion-ios-search placeholder-icon"></i>
//          <input ref="searchName" type="search" placeholder={this.props.anti.searchName}/>
//        </label>
//        <button className="button button-clear" onClick={this._changeHandle.bind(this)}>
//           搜索
//        </button>
//      </div>
//    )
//  }
//}
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
        search:state.search,
        policy:state.policy,
        anti:state.anti,
        isVip:state.userInfo.isVip
    }
}
Anti.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Anti);