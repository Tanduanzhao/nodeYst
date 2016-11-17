/*
 中标数据列表
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from 'react-router';
import {getAllBidList,getBidAreaInfo,getProjectStatus} from '../function/ajax.js';
import Loading from '../loading';
import EmptyComponent from '../emptyComponent';
import FilterBidList from '../filterBidList';

import More from './more';
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
            type:'request'
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
                    type:'requestss'
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADBIFLISTCONTENTDATAALL',
                        data:this.props.bidList.data.concat(res.datas),
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
                type:'CHANGEBIDLISTFILTER',
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
            this.context.router.push('/vip');
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
            this.context.router.push('/vip');
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
        console.log(this.props.isVip,"isVip")
        console.log(this.state.provinceId,"componentDidMountprovinceId")
        this.props.dispatch({
            type:'RESETBIDLISTAREAId',
            areaId:this.props.bidList.provinceId
        });
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
            //this.props.dispatch({
            //    type:'areaIdall'
            //});
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
            setTimeout(()=> {
                this._loadData();
            }, 10);
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
        //this.props.dispatch({
        //    type:'LOADBIFLISTCONTENTDATA',
        //    data:[],
        //    pageNo:1,
        //});
        this.props.dispatch({
            type:'UNSHOWFILTERPBIDLIST'
        })
        this.ele.removeEventListener('scroll',this._infiniteScroll);
        this.props.dispatch({
            type:'UNSHOWFILTERPRODUCE'
        });
        this.props.dispatch({
            type:'UNCHANGEBIDLISTTITLEORREPORTKEY'
        })
        this.props.dispatch({
            type:'RESETBIDLIST'
        })
    }

    render(){
        return (
            <div className="root" style={{"overflow":"auto"}}>
                <HeaderBar {...this.props}  loading={this.state.loading} _searchHandle={this._searchHandle.bind(this)} _showProvicenHandle={this._showProvicenHandle.bind(this)}/>
                <div ref="content" className="scroll-content has-header">
                    <Main {...this.props} data={this.props.bidList.data} loading={this.state.loading}/>
                    <More {...this.props}/>
                </div>
                {
                    this.props.bidList.isShowFilter&&!this.state.loading? <FilterBidList fn={this._fn.bind(this)}  dataSources={this.props.provicenData} {...this.props}/> : null
                }
                {
                    this.state.loading ? <Loading/> : null
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
        var bidList = 0;
        if(this.props.data.length != 0){
            return(
                <div>
                    <div className="market-list card">
                        <div className="list-left">
                            <p>剂型：{this.props.data.prepName}</p>
                            <p>规格：{this.props.data.prepName}</p>
                            <p>生产企业：{this.props.data.prepName}</p>
                        </div>
                        <Link  className="list-right btn"> 查看各省中标价</Link>
                        <div className="row market-price">
                            中标省份数：19
                        </div>
                    </div>
                    <h3 className="item item-divider home-item-title">
                        <strong>最新报告</strong>
                    </h3>
                    {
                        this.props.data.map((ele,index)=> <List dataSources={ele} key={`bidList_${bidList++}+${ele.id}`}/>)
                    }
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
                <div className="buttons">
                    <button className="button" onClick={this.props._showProvicenHandle}>
                        <i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i>
                    </button>
                </div>
                <div className="title"> {decodeURI(decodeURI(this.props.params.productName))}</div>
            </div>
        )
    }
}
class List extends Component{
    render(){
        return(
                <ul className="list">
                    <li className="item">
                        <div className="row">
                            <div className="col-40">sss</div>
                            <div className="col-60">dddd</div>
                        </div>
                    </li>
                    <li className="item">ddd</li>
                    <li className="item">ddd</li>
                    <li className="item">ddd</li>
                    <li className="item">ddd</li>
                </ul>
        )
    }
}

function select(state){
    return{
        provicenData:state.provicen.data,
        bidList:state.bidListall,
        isVip:state.userInfo.isVip,
        provicenId:state.bidList.provinceId
    }
}
BidListAll.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(BidListAll);