/*
    数据-入市价数据源
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FilterDataSources from '../filterPage/filterDataSources';
import {getProvinceList,getEntryPriceSource} from '../function/ajax';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
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
            pageNum:1,
            provinceIds:['0'],
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
            if(this.state.isLoading) return false;
            this.setState({
                isLoading:true
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
        })
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
                    console.log(this.props.dataSource);
                })
            }
        })
    }
    _loadData(){
        getEntryPriceSource({
            searchName:this.props.dataSource.searchName,
            pageNum:this.state.pageNum,
            provinceId:JSON.stringify(this.state.provinceIds),
            callBack:(res)=>{
                this.setState({
                    isLoading:false
                });
                this.props.dispatch({
                    type:'LOADDATASDATASOURCE',
                    datas:res.datas
                });
                setTimeout(()=>{
                    if(res.totalSize <= this.props.dataSource.datas.length){
                        this.setState({
                            infinite:false,
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
    
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadProvince();
        this._loadData();
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETDATASOURCE'
        })
    }
    render(){
        return(
            <div className="root">
                <Header searchHandle={this._searchHandle} showFilter={this._toggleFilter.bind(this)} {...this.props}/>
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        (this.props.dataSource.datas.length == 0 && !this.state.isLoading) ? <EmptyComponent/> : <Main dataSource={this.props.dataSource.datas}/>
                    }
                </div>
                {
                    this.state.isShowFilter ? <FilterDataSources provinceIds={this.state.provinceIds} provinces={this.props.dataSource.provinces} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)} /> : null
                }
            </div>
        )
    }
}

class Header extends Component{
    _showFilterHandle(){
        this.props.showFilter()
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
                  <input ref="groupsSearchName" type="search" placeholder="多个条件请用空格区分"/>
                </label>
                <button className="button button-clear" onClick={()=>{this.props.searchHandle(this.refs.groupsSearchName.value)}}>
                   搜索
                </button>
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
                        return <List key={ele.id} dataSource={ele}/>
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
                    <p>规格: {this.props.dataSource.规格}</p>
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
        dataSource:state.dataSources,
        isVip:state.userInfo.isVip
    }
}

DataSources.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(DataSources);