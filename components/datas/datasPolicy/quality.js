/*
    质量层次
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadQualityFilter,loadQualityAll,loadQualityFilterForm} from './../../function/ajax';
import PolicySonFilter from './../../filterPage/policySonFilter.js';
import EmptyComponent from './../../common/emptyComponent';
import Loading from './../../common/loading';
import More from './../../common/more';
import HeaderBar from './../../common/headerbar.js';
import ScrollLoading from './../../common/scrollLoading';

class Quality extends Component{
    constructor(props){
        super(props);
        this._loadSlider = this._loadSlider.bind(this);
        this._hideFilter = this._hideFilter.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._loadData = this._loadData.bind(this);
        this.state={
            isShowFilter:false,
            isSrollLoading:false,
            isLoading:true,
            isLoadData:true,
            infinite:true
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
        //if(this.state.isInfinite) return false;
        loadQualityAll({
            searchName:this.props.quality.searchName,
            qualityLevelTypeId:this.props.quality.qualityLevelTypeIds.length == 0 ? "" : JSON.stringify(this.props.quality.qualityLevelTypeIds),
            pageNo:this.props.quality.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADQUALITYDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false,
                    isLoadData:false,
                    isSrollLoading:true
                });
                setTimeout(()=>{
                    if(this.props.quality.datas.length >= res.totalSize){
                        this.setState({
                            infinite:false,
                            isSrollLoading:false
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
    _showFilter() {
        if (this.props.isVip == '0') {
            this.context.router.push('/pay/vip');
            return false;
        } else {
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
            type:'CHANGEQUALITY',
            gradeId:args.gradeId,
            qualityLevelTypeIds:args.qualityLevelTypeIds
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
            type:'DEFAULTQUALITY',
            gradeId:this.props.params.gradeId,
            searchName:this.props.policy.searchName
        });
        this._loadSlider();
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        //this.setState({
        //    isInfinite:false
        //});
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        setTimeout(()=>{
            this._loadData();
        });
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:42});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)})
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:42});
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
            type:'CHANGEQUALITYSEARCHNAME',
            searchName:key
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
            type:'RESETQUALITY'
        });
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="质量层次" showSearch={this.showSearch.bind(this)} showFilter={this._showFilter.bind(this)}
                                           showIntro={this.showIntro.bind(this)} />
                <div ref="main" className="scroll-content has-header">
                    <div className="list">
                        {
                            this.props.quality.datas.length == 0  && !this.state.isLoading ? <EmptyComponent/> : <div className="card" style={{marginTop:0}}>
                                <ul className="list">
                                    {
                                        this.props.quality.datas.map((ele)=>{
                                            var trandName = (()=>{
                                                var string = "";
                                                if( ele.trandName !="无"|| ele.trandName==null || ele.trandName==undefined || typeof  ele.trandName !== 'undefined' ){
                                                    string += "（";
                                                    string +=ele.trandName;
                                                    string += " ）";
                                                }else{
                                                    string = "";
                                                }
                                                return string;
                                            })();
                                            return(
                                                <li className="item def-padding" key={Math.random(1)} style={{borderBottom:"4px solid #ddd"}}>
                                                    <div className="item item-text-wrap" >
                                                        <h2>{ele.productName}
                                                            {
                                                                (ele.trandName == '无' || typeof ele.trandName === 'undefined') ? null : ('('+ele.trandName+')')
                                                            }
                                                        </h2>
                                                        <p>剂型/规格：{ele.prepName} / {ele.spec}</p>
                                                        <p>生产企业：{ele.manufacturerName}</p>
                                                    </div>
                                                    <table className="table-border" width="100%">
                                                        <tbody>
                                                            {
                                                                ele.grades.map((ele)=>{
                                                                    return(
                                                                        <tr  key={Math.random(0)}>
                                                                            <td>
                                                                                {
                                                                                    ele.qualityLevelTypeNames.map((ele)=>{
                                                                                        return(
                                                                                            <div key={Math.random(1)} style={{marginBottom: '5px'}}>
                                                                                                <span className="tag">{ele}</span>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </td>
                                                                            <td className="item-text-wrap">
                                                                                <p>
                                                                                    来源：{ele.grade}
                                                                                    （{ele.publishDate}）
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                    {
                        this.props.quality.datas.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                    <More {...this.props}/>
                </div>
                {
                    !this.state.isShowFilter ? null : <PolicySonFilter origins={this.props.quality.origins} levels={this.props.quality.levels} qualityLevelTypeIds={this.props.quality.qualityLevelTypeIds} fn={this._fn.bind(this)} cancelButton={this._hideFilter}/>
                }
                {
                    this.state.isLoading ? <Loading/> : null
                }
            </div>
        )
    }
}

function select(state){
    return{
        search:state.search,
        policy:state.policy,
        quality:state.quality,
        isVip:state.userInfo.isVip
    }
}
Quality.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Quality);