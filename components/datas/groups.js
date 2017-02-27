/*
    数据-目录分组
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getCatalogList,getCatalogTypeList} from '../function/ajax';
import FilterGroups from '../filterPage/filterGroups';
import Loading from '../common/loading';
import More from './../common/more';
import HeaderBar from './../common/headerbar.js';
import EmptyComponent from '../common/emptyComponent';

class Groups extends Component{
    constructor(props){
        super(props);
        this.state={
            isShowFilter:false,
            isLoading:true,
            infinite:true,
            pageNum:1,
            catalogTypeId:null,
            min:null,
            max:null
        }
        this._loadData = this._loadData.bind(this);
        this._loadTypes = this._loadTypes.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoading) return false;
            this.setState({
                isLoading:true
            });
            this._loadData();
        }
    }
    
    _toggleFilter(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }

    _searchDatas(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }
        this.props.dispatch({
            type:'CHANGEGROUPSSEARCHNAME',
            searchName:encodeURI(encodeURI(searchKeys))
        });
        this.setState({
            pageNum:1,
            isLoading:true,
            infinite:true
        });
        setTimeout(()=>{
            this._loadData();
        })
    }
    _fn(args){
        this.props.dispatch({
            type:'RESETDATAGROUPS'
        });
        this.setState({
            min:args.min,
            max:args.max,
            pageNum:1,
            isLoading:true,
            catalogTypeId:args.catalogTypeId,
            infinite:true
        });
        setTimeout(()=> {
            this._toggleFilter();
            this._loadData();
        });
    }
    _loadTypes(){
        getCatalogTypeList({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADGROUPSTYPES',
                    datas:res.datas
                })
            }
        })
    }
    _loadData(){
        getCatalogList({
            searchName:this.props.groups.searchName,
            pageNum:this.state.pageNum,
            catalogTypeId:this.state.catalogTypeId,
            max:this.state.max,
            min:this.state.min,
            callBack:(res)=>{
                this.setState({
                    isLoading:false
                });
                this.props.dispatch({
                    type:'LOADGTOUPSDATA',
                    datas:res.datas
                });
                setTimeout(()=>{
                    if(res.totalSize <= this.props.groups.datas.length){
                        this.setState({
                            infinite:false
                        });
                    }else{
                        this.setState({
                            infinite:true,
                            pageNum:this.state.pageNum+1
                        });
                    }
                })
            }
        })
    }
    //显示简介
    showIntro(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:31});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)});
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:31});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        });
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }

    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadTypes();
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        this._loadData();
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETGTOUPS'
        })
        if(!this.props.search.searchLinkType){
            this.props.dispatch({
                type:"RESETSEARCH"
            });
        }
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} titleName="目录分组"  showSearch={this.showSearch.bind(this)} showFilter={this._toggleFilter.bind(this)} showIntro={this.showIntro.bind(this)} />
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        (this.props.groups.datas.length == 0 && !this.state.isLoading) ? <EmptyComponent/> : <Main dataSource={this.props.groups.datas}/>
                    }
                </div>
                <More {...this.props}/>
                {
                    this.state.isShowFilter ? <FilterGroups min={this.state.min} max={this.state.max} catalogTypeId={this.state.catalogTypeId} types={this.props.groups.types} {...this.props} groups={this.state.groups} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}/> : null
                }
            </div>
        )
    }
}

//Main
class Main extends Component{
    render(){
        return(
                <div className="list">
                    {
                        this.props.dataSource.map((ele)=>{
                            return <List key={ele.catalogId} dataSource={ele}/>
                        })
                    }
                </div>
        )
    }
}

class List extends Component{
    render(){
        return(
            <Link to={`/datas/groupsMes/${this.props.dataSource.catalogId}/${this.props.dataSource.tongyongmingZl}`}>
                <div className="item item-divider">
                    目录ID:{this.props.dataSource.catalogId}
                    <span className="item-note calm">
                      厂家数:{this.props.dataSource.factoryNumber}
                    </span>
                </div>
                <div className="item item-icon-right item-text-wrap">
                    <p>目录名称: {this.props.dataSource.catalogName}</p>
                    <p>目录类型: {this.props.dataSource.catalogType}</p>
                    <i className="icon item-note stable ion-ios-arrow-right"></i>
                </div>
            </Link>
        )
    }
}
function select(state){
    return{
        search:state.search,
        groups:state.groups,
        isVip:state.userInfo.isVip
    }
}

Groups.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Groups);