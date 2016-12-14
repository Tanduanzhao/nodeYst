/*
    数据-目录分组
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $ from 'jquery';
import {getCatalogList} from '../function/ajax';
import FilterGroups from '../filterPage/filterGroups';

class Groups extends Component{
    constructor(props){
        super(props);
        //console.log(FilterGroups);
        this.state={
            isShowFilter:false,
            groups:true
        }
        this._loadData = this._loadData.bind(this);
        //this._infiniteScroll = this._infiniteScroll.bind(this);
    }

    componentDidMount(){
        this.ele = this.refs.content;
        //this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }
    _loadData(){
        getCatalogList({
            searchName:null,
            pageNo:null,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.props.dispatch({
                        type:'LOADMARKETTDATA',
                        data:this.props.marketPrice.data.concat(res.datas),
                        pageNo:this.props.marketPrice.pageNo+1
                    });
                }
            }
        });
    }

    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }

    _searchHandle(){
        this.props.dispatch({
            type:'LOADGTOUPSDATA',
            data:[],
            pageNo:1
        });
        setTimeout(()=> this._loadData(),100);
    }
    _fn(args){
        this.props.dispatch({
            type:'LOADGTOUPSDATA',
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
    render(){
        return(
            <div className="root">
                <Header searchHandle={this._searchHandle.bind(this)} showFilter={this._toggleFilter.bind(this)} {...this.props}/>
                <Main/>
                {
                    this.state.isShowFilter ? <FilterGroups {...this.props} groups={this.state.groups} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}/> : null
                }
            </div>
        )
    }
}

class Header extends Component{
    _showFilterHandle(){
        this.props.showFilter()
    }
    _changeHandle(){
        this.props.dispatch({
          type:'CHANGEGROUPSSEARCHNAME',
            searchName:encodeURI(encodeURI(this.refs.groupsSearchName.value))
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons"  onClick={this._showFilterHandle.bind(this)} style={{ fontSize: '.75rem'}}>
                  <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
                  <span  style={{margin:' 0 5px'}}>筛选</span>
                </div>
                <label className="item-input-wrapper">
                  <i className="icon ion-ios-search placeholder-icon"></i>
                  <input ref="groupsSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入目录ID或目录名称"/>
                </label>
                <button className="button button-clear" onClick={this.props.searchHandle}>
                   搜索
                </button>
            </div>
        )
    }
}

//Main
class Main extends Component{
    render(){
        return(
            <div className="list">
                <div className="item item-divider">
                    目录ID:30626
                    <span className="item-note calm">
                      厂家数:1
                    </span>
                </div>
                <Link  to={`/datas/groupsMes/111/tddd`} className="item item-icon-right">
                    
                    <p>目录名称: 头孢呋辛-注射用无菌粉末-3.0g</p>
                    <p>目录类型: 第三层次</p>
                    <p>分组依据: 第三层次</p>
                    <i className="icon item-note stable ion-ios-arrow-right"></i>
                </Link>
                <div className="item item-divider">
                    目录ID:30626
                    <span className="item-note calm">
                      厂家数:1
                    </span>
                </div>
                <div className="item item-icon-right">
                    <p>目录名称: 头孢呋辛-注射用无菌粉末-3.0g</p>
                    <p>目录类型: 第三层次</p>
                    <p>分组依据: 第三层次</p>
                    <i className="icon item-note stable ion-ios-arrow-right"></i>
                </div>
                <div className="item item-divider">
                    目录ID:30626
                    <span className="item-note calm">
                      厂家数:1
                    </span>
                </div>
                <div className="item item-icon-right">
                    <p>目录名称: 头孢呋辛-注射用无菌粉末-3.0g</p>
                    <p>目录类型: 第三层次</p>
                    <p>分组依据: 第三层次</p>
                    <i className="icon item-note stable ion-ios-arrow-right"></i>
                </div>
            </div>
        )
    }
}
function select(state){
    return{
        groups:state.groups,
    }
}

export default connect(select)(Groups);