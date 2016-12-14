/*
    数据-目录分组
*/
import React,{Component} from 'react';
import {Link} from 'react-router';
import FilterGroups from '../filterPage/filterGroups';

export default class Groups extends Component{
    constructor(props){
        super(props);
        console.log(FilterGroups);
        this.state={
            isShowFilter:false
        }
    }
    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }
    
    _fn(arg){
        this._toggleFilter.bind(this);
    }
    render(){
        return(
            <div className="root">
                <Header showFilter={this._toggleFilter.bind(this)} {...this.props}/>
                <Main/>
                {
                    this.state.isShowFilter ? <FilterGroups {...this.props} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}/> : null
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
          type:'CHANGETITLEORGROUPSKEY',
          titleOrReportKey:encodeURI(encodeURI(this.refs.hospitalSearchName.value))
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
                  <input ref="hospitalSearchName" onChange={this._changeHandle.bind(this)} type="search" placeholder="请输入搜索关键词"/>
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