/*
    数据-入市价数据源
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FilterDataSources from '../filterPage/filterDataSources';
import {getProvinceList,getEntryPriceSource} from '../function/ajax';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
import More from './../common/more';
import HeaderBar from './../common/headerbar.js';
import ScrollLoading from './../common/scrollLoading';
class DataSources extends Component{
    constructor(props){
        super(props);
        this._loadProvince = this._loadProvince.bind(this);
        this._loadData = this._loadData.bind(this);
        this._searchHandle = this._searchHandle.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this.state={
            isShowFilter:false,
            isLoading:true,
            infinite:true,
            isSrollLoading:false,
            isLoadData:true,
            pageNum:1,
            provinceIds:['0']
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

    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoadData) return false;
            this.setState({
                isLoadData:true
            });
            this._loadData();
        }
    }
    _searchHandle(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }
        this.props.dispatch({
            type:'CHANGESEARCHDATASOURCE',
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
            type:'RESETDATADATASOURCE'
        });
        this.setState({
            provinceIds:args.provinceIds,
            pageNum:1,
            isLoading:true,
            infinite:true
        });
        setTimeout(()=> {
            this._toggleFilter();
            this._loadData();
        });
    }

    _loadProvince(){
        getProvinceList({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPROVINCEDATASOURCE',
                    datas:res.datas
                });
                setTimeout(()=>{
                    console.log(this.props.stores);
                })
            }
        })
    }
    _loadData(){
        getEntryPriceSource({
            searchName:this.props.stores.searchName,
            pageNum:this.state.pageNum,
            provinceId:JSON.stringify(this.state.provinceIds),
            callBack:(res)=>{
                this.setState({
                    isLoading:false,
                    isLoadData:false,
                    isSrollLoading:true
                });
                this.props.dispatch({
                    type:'LOADDATASDATASOURCE',
                    datas:res.datas
                });
                setTimeout(()=>{
                    if(res.totalSize <= this.props.stores.datas.length){
                        this.setState({
                            infinite:false,
                            isSrollLoading:false
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
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:32});
        setTimeout(()=>{this.context.router.push("/market/marketIntro/"+ this.props.search.smallType)})
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:32});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        })
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadProvince();
        if(this.props.search.clickSearch){
            this._searchHandle(this.props.search.searchName);
            return false
        }
        this._loadData();
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETDATASOURCE'
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
                <HeaderBar {...this.props} titleName="入市价数据源" showSearch={this.showSearch.bind(this)} showFilter={this._toggleFilter.bind(this)}
                                           showIntro={this.showIntro.bind(this)}/>
                 {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        this.props.stores.datas.length == 0 && !this.state.isLoading ? <EmptyComponent/> : <Main dataSource={this.props.stores.datas}/>
                    }
                    {
                        this.props.stores.datas.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                </div>
                <More {...this.props}/>
                {
                    this.state.isShowFilter ? <FilterDataSources provinceIds={this.state.provinceIds} provinces={this.props.stores.provinces} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)} /> : null
                }
            </div>
        )
    }
}

class Main extends Component{
    render(){
        return(
            <div className="list">
                {
                    this.props.dataSource.map((ele)=>{
                        return <List key={ele.id+Math.random()} dataSource={ele}/>
                    })
                }
            </div>
        )
    }
}

class List extends Component{
    render(){
        return(
            <div>
                <div className="item item-divider">
                    通用名:{this.props.dataSource.tongyongming}
                </div>
                <div  to={`/datas/groupsMes/111/tddd`} className="item item-icon-right">

                    <p>商品名: {this.props.dataSource.prodName}</p>
                    <p>剂型: {this.props.dataSource.dosName}</p>
                    <p>规格: {this.props.dataSource.spec}</p>
                    <p>包装数量: {this.props.dataSource.wrapNumber}</p>
                    <p>包装材质: {this.props.dataSource.wrapMaterial}</p>
                    <p>生产企业: {this.props.dataSource.factoryName}</p>
                    <p>最小制剂价格: {this.props.dataSource.unitPrice}</p>
                    <p>中标价格: {this.props.dataSource.bidPrice}</p>
                    <p>省份: {this.props.dataSource.provinceName}</p>
                    <i className="icon item-note stable ion-ios-arrow-right"></i>
                </div>
            </div>
        )
    }
}
function select(state){
    return {
        search:state.search,
        stores:state.dataSources,
        isVip:state.userInfo.isVip
    }
}

DataSources.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(DataSources);