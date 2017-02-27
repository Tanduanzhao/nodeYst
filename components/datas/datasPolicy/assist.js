/*
    辅助用药
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadAssistFilter,loadAssistAll} from './../../function/ajax';
import PolicySonFilter from './../../filterPage/policySonFilter.js';
import EmptyComponent from './../../common/emptyComponent';
import Loading from './../../common/loading';
import More from './../../common/more';
import HeaderBar from './../../common/headerbar.js';

class Assist extends Component{
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
        //传入默认数据到仓库
        this.props.dispatch({
            type:'DEFAULTASSIST',
            areaId:this.props.policy.areaId,
            gradeId:this.props.params.gradeId,
            catalogEditionId:this.props.params.catalogEditionId,
            searchName:this.props.policy.searchName
        });
        this._loadSlider();
    }
    //加载筛选条件
    _loadSlider(){
        loadAssistFilter({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADASSISTMENU',
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
        loadAssistAll({
            searchName:this.props.assist.searchName,
            areaId:JSON.stringify(this.props.assist.areaId),
            gradeId:this.props.assist.gradeId,
            catalogEditionId:this.props.assist.catalogEditionId,
            pageNo:this.props.assist.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADASSISTDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                setTimeout(()=>{
                    if(this.props.assist.datas.length == res.totalSize){
                        this.setState({
                            isInfinite:true
                        });
                    }else{
                        this.props.dispatch({
                            type:'PAGEADDASSIST'
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
            type:'CHANGEASSIST',
            areaId:args.areaId,
            gradeId:args.gradeId,
            catalogEditionId:args.catalogEditionId
        });
        this._hideFilter();
        this.setState({
            isInfinite:false
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    
    componentDidMount(){
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName)
            return false
        }
        this._isNeedLoadData()
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:41});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)});
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:41})
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
            type:'CHANGEASSISTSEARCHNAME',
            searchName:key
        });
        this.props.dispatch({
            type:'CHANGEASSIST',
            areaId:['0']
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
            type:'RESETASSIST'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="辅助用药" showSearch={this.showSearch.bind(this)} showFilter={this._showFilter.bind(this)}
                                           showIntro={this.showIntro.bind(this)} />
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        <div className="card" style={{marginTop:0}}>
                            {
                                this.props.assist.datas.length==0 ? <EmptyComponent/> :this.props.assist.datas.map((ele)=>{
                                    return(
                                        <div key={Math.random(2)}>
                                            <LinkBar title={{c:ele.grade +" ("+ele.publishDate+")",p:ele.areaName}}/>
                                            <div className="item" style={{boxSizing:'content-box',padding:' 8px'}}>
                                                {
                                                    ele.lists.length == 0 ? <EmptyComponent/> : <table style={{tableLayout : 'fixed'}} className="table-border" width="100%">
                                                        <thead>
                                                            <tr>
                                                                <th style={{padding:"0.2rem"}}>药品名称</th>
                                                                <th style={{padding:"0.2rem"}}>剂型</th>
                                                                <th style={{padding:"0.2rem"}} width="60px">规格</th>
                                                                <th style={{padding:"0.2rem"}}>包装</th>
                                                                <th style={{padding:"0.2rem"}}>生产企业</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                ele.lists.map((v)=>{
                                                                    return(
                                                                        <tr key={Math.random(1)}>
                                                                            <td className="item-text-wrap">{v.productName || null}</td>
                                                                            <td className="item-text-wrap">{v.prepName || null}</td>
                                                                            <td className="item-text-wrap">{v.spec || null}</td>
                                                                            <td className="item-text-wrap">{v.drugPack || null}</td>
                                                                            <td className="item-text-wrap">{v.manufacturerName || null}</td>
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
                    <More {...this.props}/>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter dataSources={this.props.assist.filters} areaId={this.props.assist.areaId} areaName={this.props.assist.areaName} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
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
//          <input ref="searchName" type="search" placeholder={this.props.assist.searchName}/>
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
                    <i className="fa fa-fw fa-map-pin"></i> 省份：{this.props.title.p}
                </div>
        )
	}
}
function select(state){
    return{
        search:state.search,
        policy:state.policy,
        assist:state.assist,
        isVip:state.userInfo.isVip
    }
}
Assist.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Assist);