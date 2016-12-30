import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {loadProvince,getHQFirstPage,loadBidListContent,loadReportList,getFirstPageProlist} from './function/ajax.js';

import Loading from './common/loading';
import FooterBar from './common/footerBar.js';
import FilterMarketProvinces from './filterPage/filterMarketProvinces';
import EmptyComponent from './common/emptyComponent';

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowFilter:false,
            isLoading: true,
            isOpacity: true,
            opacityNum: 0,
            marketItemTopBg:0,
            infinite:true,
            yearMonth:this.props.stores.yearMonth
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this._searchHandle = this._searchHandle.bind(this);
    }

    //加载页面数据
    _loadData(){
        this.setState({
            isLoading:true
        });
        loadReportList({
            columnId:4,
            areaId:this.props.areaId,
            yearMonth:this.state.yearMonth,
            pageNo:this.props.stores.pageNo,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.setState({
                        isLoading:false
                    });
                    this.props.dispatch({
                        type:'LOADMARKETATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    //this.props.dispatch({
                    //    type:'CHANGEDATA',
                    //    yearMonth:res.datas.yearMonth || 2015
                    //});
                    setTimeout(()=>{
                        if(res.totalSize <= this.props.stores.data.length){
                            this.setState({
                                infinite:false
                            });
                        }else{
                            this.setState({
                                infinite:true
                            });
                        }
                    })
                }
            }
        });
    }

    //搜索方法
    _searchHandle(searchKeys){
        this.props.dispatch({
            type:'CHANGEMARKETSEARCHSEARCHNAME',
            searchName:searchKeys
        });
        this.props.dispatch({
            type:'LOADMARKETSEARCHDATA',
            data:[],
            pageNo:1
        });
        this.context.router.push('market/marketSearch');
    }

    //显示/取消筛选方法
    _toggleFilter(){
        this.setState({
            isShowFilter:!this.state.isShowFilter
        })
    }

    //筛选方法
    _fn(args){
        //this.props.dispatch({
        //    type:'LOADMARKETATA',
        //    data:[],
        //    pageNo:1
        //});
        this.props.dispatch({
            type:'CHANGEDATA',
            yearMonth:args.yearMonth
        });
        this.props.dispatch({
            type:'CHANGEMARKETPROVICENID',
            areaId:args.areaId
        });
        this.props.dispatch({
            type:'CHANGEMARKETPROVICENNAME',
            areaName:args.areaName
        });
        this.setState({
            areaId:args.areaId,
            searchAreaType:args.searchAreaType
        });
        setTimeout(()=> {
            this._toggleFilter();
            //this._loadData();
        });
    }

    //滚动加载
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite){
            if(this.state.isLoading) return false;
            this.setState({
                isLoading:true
            });
            this._loadData();
        }
        if(this.ele.scrollTop>=this.refs.headerImg.clientHeight){
            this.setState({
                isOpacity:false,
                opacityNum:1
            });
        }else{
            this.setState({
                isOpacity:true,
                opacityNum:this.ele.scrollTop/this.refs.headerImg.clientHeight
            })
        }
    }

    marketAll(reportUrl){
        this.props.dispatch({
            type: 'CHANGE',
            areaId:reportUrl,
            searchAreaType: 0
        });
        setTimeout(()=> {
            this.context.router.push("/marketAll");
        });
    }
    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        //loadProvince(this.props.dispatch);
        getFirstPageProlist(this.props.dispatch)
        this._loadData();
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETMARKETATA'
        })
    }

	render(){
		return(
            <div className="root">
                {
                    this.state.isShowFilter ? <FilterMarketProvinces {...this.props}  fn={this._fn.bind(this)}  hideFilter={this._toggleFilter.bind(this)} areaId={this.props.areaId} areaName={this.props.areaName} dataSources={this.props.marketProvice}/> :null
                }
                <HeaderBar {...this.props} opacityNum={this.state.opacityNum} isOpacity={this.state.isOpacity} searchHandle={this._searchHandle}  showFilter={this._toggleFilter.bind(this)} />
                <div ref="content"  className="scroll-content scroll-report has-footer">
                    <div>
                        <div className="header-img" ref="headerImg">
                            <img width="100%" src="../images/market_bg.jpg"/>
                        </div>
                        {
                            (this.props.stores.data.length == 0 && !this.state.isLoading)
                                ? <EmptyComponent/>
                                :  <Main ref="main" {...this.props}  marketAll={this.marketAll.bind(this)}  dataSource={this.props.stores.data} />
                        }
                    </div>
                </div>
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <FooterBar {...this.props}/>
            </div>
		)
	}
}

class HeaderBar extends Component{
    render(){
        return(
            <div className={`bar bar-header bar-positive item-input-inset ${this.props.isOpacity ? 'bar-opacity' : null}`} style={{backgroundColor:`rgba(56,126,245,${this.props.opacityNum})`}}>
                <div className="buttons"  onClick={this.props.showFilter} style={{ fontSize: '.75rem'}}>
                    <img src="/images/filter.png" style={{width:'1.125rem',height: '1.125rem'}} />
                    <span  style={{margin:' 0 5px'}}>筛选</span>
                </div>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="searchName" type="search" placeholder="输入产品关键字查看各省销售数据"/>
                </label>
                <button className="button button-clear" onClick={()=>this.props.searchHandle(this.refs.searchName.value)}>
                    搜索
                </button>
            </div>
        )
    }
}

class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ul className="list market">
                {
                    this.props.dataSource.map((ele,index)=>{
                        return <List key={ele.id+Math.random()} {...this.props} marketItemTopBg={index} dataSource={ele}/>
                    })
                }
            </ul>
        )
    }
}

class List extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <li className="item def-padding market-item item-text-wrap">
                <div  className={(this.props.marketItemTopBg%2)==0?"item item-divider market-item-top orange-bg":"item item-divider market-item-top blue-bg"} style={{background:'url',border: 0}}>
                    {this.props.dataSource.title}
                    <Link onClick={()=>{this.props.marketAll(this.props.dataSource.reportUrl)}} style={{ float: 'right',fontSize: '.65rem'}}>
                        查看市场 >
                    </Link>
                </div>
                <Link to={`/market/marketIntro/${this.props.dataSource.id}`} className="item market-item-center" >
                    <h5>栏目摘要</h5>
                    <p>
                        {this.props.dataSource.reportDigest}
                    </p>
                    <div className="market-item-bottom" >
                        <i className="eye-icon"></i>查看全文
                    </div>
                </Link>
            </li>
        )
    }
}

function select(state){
	return{
        stores:state.market,
        areaId:state.marketProvice.areaId,
        yearMonth:state.data.yearMonth,
        provicenData:state.provicen.data,
        marketProvice:state.marketProvice.data,
        isVip:state.userInfo.isVip,
        areaName:state.marketProvice.areaName,
	}
}
Market.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(Market);