/*
 中标数据列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router';
import {getAllBidList,getBidAreaInfo,getProjectStatus} from '../function/ajax.js';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
import FilterBidList from '../filterPage/filterBidList';

import More from './../common/more';
class BidListAll extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            provinceId:this.props.bidList.provinceId
        };

        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _loadData(){
        this.setState({
            loading:true
        });
        this.props.dispatch({
            type:'requestall'
        });
        getAllBidList({
            codeProId:this.props.params.id,
            areaId:JSON.stringify(this.props.bidList.areaId),
            sidx:this.props.bidList.sidx,
            sord:this.props.bidList.sord,
            pageNo:this.props.bidList.pageNo,
            searchName:this.props.bidList.searchName,
            searchProductStatus:this.props.bidList.searchProductStatus,
            callBack:(res)=>{
                this.setState({
                    loading:false
                });
                this.props.dispatch({
                    type:'requestssall'
                });
                if (res){
                    console.log(res.datas);
                    this.props.dispatch({
                        type:'LOADBIFLISTCONTENTDATAALL',
                        data:this.props.bidList.data.concat(res.datas.items),
                        areas:res.datas.areas,
                        specAttrName:res.datas.specAttrName,
                        pageNo:this.props.bidList.pageNo+1
                    });
                    if(res.totalSize <= this.props.bidList.data.length){
                        this.props.dispatch({
                            type:'UNINFINITE'
                        });
                    }else{
                        this.props.dispatch({
                            type:'INFINITE'
                        });
                    }
                }
            }
        });
    }
    _fn(args){
        this.setState({
            loading:true
        });
        this.props.dispatch((dispatch) => {
            dispatch({
                type:'LOADBIFLISTCONTENTDATAALL',
                data:[],
                pageNo:1
            });
            dispatch({
                type:'UNSHOWFILTERPBIDLIST'
            });
            dispatch({
                type:'CHANGEBIDLISTFILTERALL',
                sord:args.sord,
                sidx:args.sidx,
                areaId:args.areaId,
                searchAreaType:args.searchType,
                active:args.active,
                searchProductStatus:args.searchProductStatus,
            });
            setTimeout(()=>{
                this._loadData();
            },100);
        })
    }
    _searchHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                loading:true
            });
            this.props.dispatch({
                type:'LOADBIFLISTCONTENTDATAALL',
                data:[],
                pageNo:1,
            });
            setTimeout(()=> this._loadData(),100);
        }
    }
    _showProvicenHandle(){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.props.dispatch({
                type:'SHOWFILTERBIDLIST'
            });
        }
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.bidList.infinite && this.props.bidList.request){
            this._loadData();
        }
    }
    componentDidMount(){
        console.log("componentDidMountprovinceId")
        //this.props.dispatch({
        //    type:'RESETBIDLISTAREAId',
        //    areaId:this.props.bidList.provinceId
        //});
        if(this.props.params.productName){
            this.props.dispatch({
                type:'LOADBIFLISTCONTENTDATAALL',
                data:[],
                pageNo:1,
            });
            this.props.dispatch({
                type:'RESETBIDLISTAREAId',
                areaId:["0"]
            });
            this.props.dispatch({
                type:'mpAreaID'
            });
        }
        this.props.dispatch({
            type:'CHANGEBIDLISTTITLEORREPORTKEY',
            searchName:this.props.params.productName? (this.props.params.productName+" "+this.props.params.prepName+" "+this.props.params.spec+" "+this.props.params.manufacturerName):null
        });
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        if(this.props.params.productName || this.props.bidList.data.length == 0) {
            this._loadData();
            getBidAreaInfo({
                pageNo: this.props.bidList.pageNo,
                searchName: this.props.bidList.searchName,
                callBack: (res)=> {
                    this.props.dispatch({
                        type: 'getBidAreaInfo',
                        getBidAreaInfo: res.datas,
                    });
                }
            });
            getProjectStatus({
                callBack: (res)=> {
                    this.props.dispatch({
                        type: 'getProjectStatus',
                        getProjectStatus: res.datas,
                    });
                }
            });
        }

    }
    componentWillUnmount(){
        this.ele.removeEventListener('scroll',this._infiniteScroll);
        this.props.dispatch({
            type:'RESETBIDLISTALL'
        })
    }

    render(){
        return (
            <div className="root" style={{"overflow":"auto"}}>
                {
                    this.state.loading ? <Loading/> : null
                }
                <HeaderBar {...this.props}  loading={this.state.loading} _searchHandle={this._searchHandle.bind(this)} _showProvicenHandle={this._showProvicenHandle.bind(this)}/>
                <div ref="content" className="scroll-content has-header marketall">
                    <Main {...this.props} data={this.props.bidList.data} loading={this.state.loading}/>
                    <More {...this.props}/>
                </div>
                {
                    this.props.bidList.isShowFilter&&!this.state.loading? <FilterBidList fn={this._fn.bind(this)}  dataSources={this.props.provicenData} {...this.props}/> : null
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
        console.log(this.props.data);
        var specAttrName = (()=>{
            if(this.props.bidList.specAttrName != ""&& this.props.bidList.specAttrName != null&&this.props.bidList.specAttrName != undefined ){
                var children="";
                children+="（" ;
                children+=this.props.bidList.specAttrName;
                children+= "）";
            }else{
                children="";
            }
            return children;
        })();
        var bidList = 0;
        if(this.props.data.length != 0){
            return(
                <div>
                    <div className="market-list card defmargin">
                        <div className="list-left">
                            <p>剂型：{decodeURI(decodeURI(this.props.params.prepName))}</p>
                            <p>规格：{decodeURI(decodeURI(this.props.params.spec))}{specAttrName}</p>
                            <p>生产企业：{decodeURI(decodeURI(this.props.params.manufacturerName))}</p>
                        </div>
                        <Link  to={`/datas/bidList/${this.props.params.productName}/${this.props.params.prepName}/${this.props.params.spec}/${this.props.params.manufacturerName}`} className="list-right btn" > 查看原始数据</Link>
                        <div className="row market-price">
                            中标省份数：{this.props.bidList.areas}
                        </div>
                    </div>
                    <h3 className="item item-divider bidall">
                        <div className="row">
                            <div className="col-40">省份</div>
                            <div className="col-60">最小制剂中标价（公布时间）</div>
                        </div>
                    </h3>
                    <ul className="list">
                    {
                        this.props.data.map((ele,index)=> <List dataSources={ele} key={`bidList_${bidList++}+${ele.id}`}/>)
                    }
                    </ul>
                </div>
            )
        }else{
            return <EmptyComponent/>
        }
    }
}
class HeaderBar extends Component{
    _changeHandle(){
        this.props.dispatch({
            type:'CHANGEBIDLISTTITLEORREPORTKEY',
            searchName:encodeURI(encodeURI(this.refs.bidListSearchName.value))
        })
    }
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <div className="buttons"  onClick={this.props._showProvicenHandle} style={{ fontSize: '.75rem',zIndex:'99999'}}>
                    {
                        //<button className="button" onClick={this.props._showProvicenHandle}>
                        //    <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
                        //</button>
                    }
                    <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
                    <span  style={{margin:' 0 5px'}}>筛选</span>
                </div>
                <div className="title"> {decodeURI(decodeURI(this.props.params.productName))}</div>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
            <li className="item item-text-wrap">
                <div className="row" style={(this.props.dataSources.productStatus!=0)?null:{color:"#999"}}>
                    <div className="col-40">{this.props.dataSources.areaName}</div>
                    <div className="col-60">{this.props.dataSources.bidPrice}({this.props.dataSources.publishDate})</div>
                </div>
            </li>
        )
    }
}

function select(state){
    return{
        provicenData:state.provicen.data,
        bidList:state.bidListall,
        isVip:state.userInfo.isVip,
        //provicenId:state.bidList.provinceId
    }
}
BidListAll.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(BidListAll);