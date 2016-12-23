/*
    数据-目录分组产品信息
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getCatalogInfo,getCatalogTypeList} from '../function/ajax';
import FilterGroupsMes from '../filterPage/filterGroupsMes';
import {Link} from 'react-router';
import Loading from '../common/loading';
import More from './../common/more';
import EmptyComponent from '../common/emptyComponent';
class GroupsMes extends Component{
    constructor(props){
        super(props);
        this.state= {
            isShowFilter:false,
            isLoading:true,
            infinite:true,
            pageNum:1,
            catalogId:this.props.params.id,
            catalogTypeId:null,
            tongyongmingZl:encodeURI(encodeURI(this.props.params.searchName))
        }
        this._searchHandle = this._searchHandle.bind(this);
        this._loadData = this._loadData.bind(this);
        this._loadTypes = this._loadTypes.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
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
            type:'CHANGEGROUPSMESSEARCHNAME',
            searchName:searchKeys
        });
        this.setState({
            pageNum:1,
            isLoading:true,
            tongyongmingZl:null,
            catalogId:null,
            infinite:true
        });
        setTimeout(()=>{
            this._loadData();
        })
    }
    _fn(args){
        this.props.dispatch({
            type:'RESETDATAGROUPSMES'
        });
        this.setState({
            catalogTypeId:args.catalogTypeId,
            catalogId:null,
            isLoading:true,
            tongyongmingZl:null,
            pageNum:1,
            infinite:true
        });
        setTimeout(()=> {
            this._toggleFilter();
            this._loadData();
        });
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this.props.dispatch({
            type:'CHANGEGROUPSMESSEARCHNAME',
            searchName:this.props.params.searchName
        })
        setTimeout(()=>{
            this._loadData();
            this._loadTypes();
        });
    }
    _loadTypes(){
        getCatalogTypeList({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADGROUPSMESTYPES',
                    datas:res.datas
                })
            }
        })
    }
    //加载数据
    _loadData(){
        getCatalogInfo({
            searchName:encodeURI(encodeURI(this.props.groupsMes.searchName)),
            catalogId:this.state.catalogId,
            catalogTypeId:this.state.catalogTypeId,
            tongyongmingZl:this.state.tongyongmingZl,
            pageNum:this.state.pageNum,
            callBack:(res)=>{
                this.setState({
                    isLoading:false
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADGTOUPSMESDATA',
                        datas:res.datas.catalogDatas,
                    });
                    this.props.dispatch({
                        type:'LOADGTOUPSMESOTHERDATA',
                        datas:res.datas.otherDatas,
                    });
                    setTimeout(()=>{
                        if(res.totalSize <= this.props.groupsMes.otherDatas.length){
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
            }
        });
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETGTOUPSMES'
        });
    }
    render(){
        console.log(this.props.groupsMes,'p');
        return(
            <div className="root">
                <Header searchName={this.props.groupsMes.searchName} searchHandle={this._searchHandle} showFilter={this._toggleFilter.bind(this)} {...this.props}/>
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        (this.props.groupsMes.otherDatas.length == 0 && !this.state.isLoading && this.props.groupsMes.datas == 'undefined') ? <EmptyComponent/> : <Main title={this.props.params.searchName} dataSource={{datas:this.props.groupsMes.datas,otherDatas:this.props.groupsMes.otherDatas}}/>
                    }
                </div>
                <More {...this.props}/>
                {
                    this.state.isShowFilter ? <FilterGroupsMes catalogTypeId={this.state.catalogTypeId} types={this.props.groupsMes.types} fn={this._fn.bind(this)} hideFilter={this._toggleFilter.bind(this)}/> : null
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
        console.log(this.props.dataSource.datas);
        return (
            <div className="product-view">
                {
                    (typeof this.props.dataSource.datas != 'object') ? null : 
                        <div  className="list">
                            <h2 className="item item-divider">目录ID:{this.props.dataSource.datas.catalogId}</h2>
                            <div className="list">
                               {
                                    this.props.dataSource.datas.catalogInfoList.map((ele)=>{
                                        return <List key={ele.yjProdId} dataSource={ele}/>
                                    })
                                }
                            </div>
                            
                        </div>
                }
                {    
                    (this.props.dataSource.datas == 'undefined' || this.props.dataSource.otherDatas.length == 0 || typeof this.props.dataSource.datas != 'object') ? null : <h2 className="item item-divider" style={{ backgroundColor:" #f5f5f5"}}>{this.props.title}相关分组</h2>
                }
                <ul className="list">
                    {
                        this.props.dataSource.otherDatas.map((ele, index)=>{
                            return (
                                <div className="list" key={ele.catalogId}>
                                    <h2>目录ID:{ele.catalogId}</h2>
                                    {
                                        ele.relatedInfoList.map((e)=>{
                                            return <List dataSource={e} key={Math.random()}/>
                                        })
                                    }
                                </div>
                            )
                            
                           
                        })
                    }
                </ul>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <li className="item item-text-wrap">
                <p>药交产品ID：{this.props.dataSource.yjProdId}</p>
                <p className="item-text-wrap">物价产品ID：{this.props.dataSource.wjProdId}</p>
                <p>产品名称：{this.props.dataSource.prodName} <span className="btn" style={{padding:"2px 3px"}}>{this.props.dataSource.iconGeneric}</span></p>
                <p>剂型：{this.props.dataSource.dosName}</p>
                <p>规格：{this.props.dataSource.spec}</p>
                <p>包装规格：{this.props.dataSource.baozhuangSpec}</p>
                <p>包装材质：{this.props.dataSource.wrapName}</p>
                <p>规格属性：{this.props.dataSource.specAttr}</p>
                <p>生产企业：{this.props.dataSource.factoryName}</p>
                <p>报名企业：{this.props.dataSource.baomingFac}</p>
                {
                    (this.props.dataSource.remark != '') ? <p>备注：{this.props.dataSource.remark}</p> : null
                }
            </li>
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
                    <input ref="searchName" type="search" placeholder={decodeURI(decodeURI(this.props.searchName))}/>
                </label>
                <button className="button button-clear" onClick={()=> this.props.searchHandle(this.refs.searchName.value)}>
                    搜索
                </button>
            </div>
        )
    }
}

function select(state){
    return{
        groupsMes:state.groupsMes,
        isVip:state.userInfo.isVip,
    }
}

GroupsMes.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(GroupsMes);
