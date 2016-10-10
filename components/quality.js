/*
    质量层次
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadQualityFilter,loadQualityAll,loadQualityFilterForm} from './function/ajax';
import PolicySonFilter from './policySonFilter.js';
import EmptyComponent from './emptyComponent';
import Loading from './loading';
import More from './datas/more';

class Quality extends Component{
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
    //加载筛选条件
    _loadSlider(){
        loadQualityFilter({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADQUALITYMENU',
                    datas:res.datas
                })
            }
        });
        loadQualityFilterForm({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'loadQUALITYMENUFORM',
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
        
        loadQualityAll({
            searchName:this.props.quality.searchName,
            gradeId:this.props.quality.gradeId,
            qualityLevelTypeId:JSON.stringify(this.props.quality.qualityLevelTypeIds),
            pageNo:this.props.quality.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADQUALITYDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                setTimeout(()=>{
                    if(this.props.quality.datas.length == res.totalSize){
                        this.setState({
                            isInfinite:true
                        });
                    }else{
                        this.props.dispatch({
                            type:'PAGEADDQUALITY'
                        })
                    }
                },10);
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
            type:'CHANGEQUALITY',
            gradeId:args.gradeId,
            qualityLevelTypeIds:args.qualityLevelTypeIds
        });
        this._hideFilter();
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    
    componentDidMount(){
        
        //传入默认数据到仓库
        this.props.dispatch({
            type:'DEFAULTQUALITY',
            gradeId:this.props.params.gradeId,
            searchName:this.props.policy.searchName
        });
        this._loadSlider();
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        this.setState({
            isInfinite:false
        });
        setTimeout(()=>{
            this._isNeedLoadData();
        });
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
           this.context.router.push('/vip');
            return false;
        }
        this.props.dispatch({
            type:'CHANGEBASESEARCHNAME',
            searchName:key
        });
        setTimeout(()=>{
            this._loadData();
        },100);
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETQUALITY'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar showFilter={this._showFilter.bind(this)} searchAction = {this._searchDatas.bind(this)} {...this.props}/>
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        {
                            this.props.quality.datas.length == 0 ? <EmptyComponent/> : <div className="card" style={{marginTop:0}}>
                                <div className="item item-divider item-text-wrap">
                                    <i className="fa fa-tag
            "></i> 来源：{this.props.quality.datas[0].grade}（{this.props.quality.datas[0].publishDate}）
                                </div>
                                <ul className="list">
                                    {
                                        this.props.quality.datas[0].lists.map((ele)=>{
                                            return(
                                                <li className="item" key={Math.random(1)}>
                                                    <h2>{ele.productName}（{ele.trandName}）</h2>
                                                    <p>剂型/规格：{ele.prepName} / {ele.spec}</p>
                                                    <p>生产企业：{ele.manufacturerName}</p>
                                                    <p>
                                                        {
                                                            ele.qualityLevelTypes.map((ele)=>{
                                                                return(
                                                                    <span className="tag" key={Math.random(1)}>{ele}</span>
                                                                )
                                                            })
                                                        }
                                                    </p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                    <More/>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter origins={this.props.quality.origins} levels={this.props.quality.levels} qualityLevelTypeIds={this.props.quality.qualityLevelTypeIds} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
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
          <input ref="searchName" type="search" placeholder={this.props.quality.searchName}/>
        </label>
        <button className="button button-clear" onClick={this._changeHandle.bind(this)}>
           搜索
        </button>
      </div>
    )
  }
}

function select(state){
    return{
        policy:state.policy,
        quality:state.quality,
        isVip:state.userInfo.isVip
    }
}
Quality.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Quality);