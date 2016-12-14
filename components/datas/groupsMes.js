/*
    数据-目录分组产品信息
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCatalogInfo} from '../function/ajax';
import FilterGroups from '../filterPage/filterGroups';
import {Link} from 'react-router';
import EmptyComponent from '../common/emptyComponent';
class GroupsMes extends Component{
    constructor(props){
        super(props);
        this.state= {
            isShowFilter:false,
            loading: false,
            request:true
        }
        this._loadData = this._loadData.bind(this);
    }
    componentDidMount(){
        this.props.dispatch({
            type:'CHANGEGTOUPSMESLOADDATE',
            searchName:this.props.params.searchName,
            catalogId:this.props.params.id
        });
        this.ele = this.refs.content;
        setTimeout(()=> {
            this._loadData();
        });
    }
    //加载数据
    _loadData(){
        getCatalogInfo({
            searchName:this.props.groupsMes.searchName||null,
            pageNo:this.props.groupsMes.pageNo||null,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.props.dispatch({
                        type:'LOADGTOUPSMESDATA',
                        data:this.props.groupsMes.data.concat(res.datas),
                        pageNo:this.props.groupsMes.pageNo+1
                    });
                }
            }
        });
    }

    //筛选
    _fn(args){
        this.props.dispatch({
            type:'LOADGTOUPSMESDATA',
            data:[],
            pageNo:1
        });
        this.props.dispatch({
            type:'CHANGEFA',
            columnBigType:args.columnBigType
        });
        this.setState({
            isShowFilter:false
        });
        setTimeout(()=> {
            this._toggleFilter.bind(this);
            this._loadData()
        });
    }

    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }
    _searchHandle(){
        this.props.dispatch({
            type:'LOADGTOUPSMESDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this._loadData(),100);
    }

    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETGTOUPSMES'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}  showProvicenHandle={this._toggleFilter.bind(this)} loading={this.state.loading}/>
                <div ref="content" className="scroll-content has-header">
                    <ul className="list product-view">
                        <div>
                            <h2>目录ID:30626</h2>
                            <li  className="card" style={{ marginBottom:0}}>
                                <ul className="list">
                                    <li>药交产品ID：118190</li>
                                    <li>物价产品ID：MED0000311887</li>
                                    <li>产品名称：注射用头孢呋辛钠 <span className="btn" style={{padding:"2px 3px"}}>dddd</span></li>
                                    <li>剂型：溶媒结晶粉针剂</li>
                                    <li>规格：3.0g</li>
                                    <li>包装规格：1支/瓶</li>
                                    <li>包装材质：空</li>
                                    <li>规格属性：无</li>
                                    <li>生产企业：深圳立健药业有限公司</li>
                                    <li>报名企业：深圳立健药业有限公司</li>
                                    <li>备注：***</li>
                                </ul>
                            </li>
                        </div>
                        <h2 className="item item-divider" style={{ backgroundColor:" #f5f5f5"}}>头孢呋辛相关分组</h2>
                        <div>
                            <h2>目录ID:30626</h2>
                            <li  className="card">
                                <ul className="list">
                                    <li>药交产品ID：118190</li>
                                    <li>物价产品ID：MED0000311887</li>
                                    <li>产品名称：注射用头孢呋辛钠 <span className="btn" style={{padding:"2px 3px"}}>dddd</span></li>
                                    <li>剂型：溶媒结晶粉针剂</li>
                                    <li>规格：3.0g</li>
                                    <li>包装规格：1支/瓶</li>
                                    <li>包装材质：空</li>
                                    <li>规格属性：无</li>
                                    <li>生产企业：深圳立健药业有限公司</li>
                                    <li>报名企业：深圳立健药业有限公司</li>
                                    <li>备注：***</li>
                                </ul>
                            </li>
                        </div>
                    </ul>
                </div>
                {
                    this.state.isShowFilter?<FilterGroups {...this.props} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}/> : null
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
        if (this.props.data.length != 0) {
            return (
                <ul className="list product-view">
                    {
                        this.props.data.map((ele, index)=> <List dataSources={ele} key={index}/>)
                    }
                </ul>
            )
        } else {
            return <EmptyComponent/>
        }
    }
}
class List extends Component{
    render(){
        return(
            <div>
                <h2>产品名称： sss</h2>
                <li  className="card">
                    <ul className="list">
                        <li>剂型/规格：sss</li>
                        <li>批准文号/注册证号：sss</li>
                        <li>生产企业：sss</li>
                    </ul>
                </li>
            </div>
        )
    }
}

class HeaderBar extends Component{
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGEDRUGSMESEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.groupsMesSearchName.value))
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons"  onClick={this.props.showProvicenHandle} style={{ fontSize: '.75rem'}}>
                    <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
                    <span  style={{margin:' 0 5px'}}>筛选</span>
                </div>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="groupsMesSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
                </label>
                <button className="button button-clear" onClick={this.props.searchHandle}>
                    搜索
                </button>
            </div>
        )
    }
}

function select(state){
    return{
        groupsMes:state.groupsMes
    }
}

export default connect(select)(GroupsMes);
