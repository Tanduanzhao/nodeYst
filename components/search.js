/*
    全局搜索
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {indexList,getIndexHistory,saveIndexLog,getHotIndex,loadReportList} from './function/ajax';
import {contrastName} from './function/common';
import {Link} from 'react-router';
import EmptyComponent from './common/emptyComponent';
import Provicen from './provicen';
import Loading from './common/loading';
import ReportList from './reportList';

class Search extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: true,
            history:true,
            historyDatas:[],
            search:false,
            hotData:[],
            //smallType:'',
            //searchType:0,
            hotReport:[],
            pushReport:[],
            pageNo:1,
            showPopup:false,
            reportTag:true,
            searchNull:true
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }

    //滚动加载
    _infiniteScroll(){
      if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.stores.infinite){
          if(this.state.isLoading) return false;
          this.setState({
              isLoading:true
          });
            this._loadData();
        }
    }
    //搜索方法
    _searchHandle(searchKeys){
        if(this.props.isVip == '0' && (this.props.stores.searchType  == 1 || this.props.stores.smallType != "搜索首页")){
            this.setState({
                showPopup:true
            });
            this.props.dispatch({
                type:'SEARCHLINKTYPR'
            });
            return false;
        }
        this.refs.header.refs.searchName.value=searchKeys;
        this.setState({
            isLoading:true
        });
        this.props.dispatch({
            type:'CHANGESEARCHNAME',
            searchName:searchKeys
        });
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:true
        });
        if(searchKeys != ""){
            setTimeout(()=>{
                    saveIndexLog({
                        userId:this.props.userInfo.id,
                        searchName:this.props.stores.searchName,
                        smallType:this.props.stores.smallType,
                        callBack:(res)=>{}
                    });
                }
            )
        }
        if(this.props.stores.smallType == "搜索首页"){
            this.setState({
                searchNull:true
            });
            this.props.dispatch({
                type:'CHANGESEARCHTYPE',
                searchType:1
            });
            setTimeout(()=>{this._loadData()});
            return false
        }
        if(searchKeys == ""){
            this.props.dispatch({
                type:'CHANGESMALLNULL'
            })
        }
        setTimeout(()=> this.context.router.goBack());
    }

    //加载页面数据
    _loadData(){
        indexList({
            searchName:encodeURI(encodeURI(this.props.stores.searchName)),
            pageNo:1,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    isLoading:false
                });
                if (res){
                    this.props.dispatch({
                        type:'LOADSEARCHDATA',
                        data:res.datas,
                        pageNo:1
                    });
                    for (var i in res.datas){
                        if( res.datas[i].BigList.length != 0){
                            this.setState({
                                searchNull:false
                            })
                        }
                    }
                }
            }
        });
    }
    //获取热门搜索
    getHotData(){
         getHotIndex({
             pageNo:this.state.pageNo,
             callBack: (res)=> {
                 if (res) {
                     this.setState({
                         hotData: res.datas,
                         isLoading:false,
                         pageNo:this.state.pageNo == res.totalPage ? 1 : this.state.pageNo+1
                     });
                }
             }
         });
    }
    //获取热门搜索
    getPushData(){
        //读取热门报告
        loadReportList({
            pageNo:1,
            reportType:0,
            costStatus:0,
            pageSize:5,
            searchType:2,
            callBack:(res)=>{
                if(res){
                    this.setState({
                        loading:false,
                        hotReport:res.datas
                    });
                }
            }
        });
        //读取推荐报告
        loadReportList({
            pageNo:1,
            reportType:0,
            costStatus:0,
            pageSize:5,
            callBack:(res)=>{
                if(res){
                    this.setState({
                        loading:false,
                        pushReport:res.datas
                    });
                }
            }
        });
    }

    //搜索指定内容
    searchPush(){
        this.props.dispatch({
            type:'CHANGESEARCHTYPE',
            searchType:2
        });
        this.getPushData();
    }
    //搜索指定内容
    searchPushWord(searchName){
        this.props.dispatch({
            type:'CHANGESEARCHTYPE',
            searchType:1
        });
        this.refs.header.refs.searchName.value=searchName;
        this.props.dispatch({
            type:'CHANGESEARCHNAME',
            searchName: searchName
        });
        setTimeout(()=>{this._loadData()})
    }
    //关闭历史记录
    closeHistory(){
        this.setState({
            history:false
        });
    }
    //搜索结果链接
    saechLink(smallType,areaId,areaName,yearMonth){
        if(this.props.isVip == '0'){
            this.setState({
                showPopup:true
            });
            this.props.dispatch({
                type:'SEARCHLINKTYPR'
            });
            return false;
        }
        let searchName="";
        if(this.props.stores.searchName != ""){
            searchName="/"+this.props.stores.searchName;
        }
        this.props.dispatch({type: 'SAVESEARCHVALUE',searchValue: this.props.stores.searchName});
        this.props.dispatch({type: 'SEARCHLINKTYPR'});
        switch(smallType){
            case "11" : this.context.router.push('/report');break;
            case "21" : this.context.router.push('subscribePageAll/6');break;
            case "22" : this.context.router.push('/subscribePageAll/2');break;
            case "23" : this.context.router.push('/subscribePageAll/5');break;
            case "31" : this.context.router.push('/datas/groups');break;
            case "32" : this.context.router.push('/datas/dataSources');break;
            case "33" : this.context.router.push('/datas/policy');break;
            case "34" : this.context.router.push('/datas/bidList');break;
            case "35" : this.context.router.push('/datas/marketPrice');break;
            case "36" : this.context.router.push('/datas/product');break;
            case "37" : this.context.router.push('/datas/policy/base');break;
            case "38" : this.context.router.push('/datas/policy/insurance');break;
            case "39" : this.context.router.push('/datas/policy/anti');break;
            case "40" : this.context.router.push('/datas/policy/lowPrice');break;
            case "41" : this.context.router.push('/datas/policy/assist');break;
            case "42" : this.context.router.push('/datas/policy/quality');break;
            case "50" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "51" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "52" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "53" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "54" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "55" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "56" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "57" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "58" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
            case "59" : return (()=>{this.props.dispatch({type: 'CHANGE', areaId:areaId});this.props.dispatch({type: 'CHANGEDATA',yearMonth:yearMonth});setTimeout(()=>{this.context.router.push('/market/marketSearch/marketSearchDetail'+searchName)})})();
        }
    }
    _popupCancel(){
        this.setState({
            showPopup:false
        })
    }
    _popupSure() {
        this.setState({
            showPopup: false
        });
        this.context.router.push('/pay/vip');
    }
    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        let goSearch = true;
        if(this.props.stores.searchLinkType){
            this.setState({
                searchNull:false
            });
            if(this.props.stores.clickSearch){
                goSearch = false;
                this.props.dispatch({
                    type:'CHANGESEARCHTYPE',
                    searchType:1
                });
                this.props.dispatch({
                    type:'CHANGESMALLTYPE',
                    smallType:"搜索首页"
                });
                this.props.dispatch({
                    type:'CHANGESEARCHNAME',
                    searchName:this.props.stores.searchValue
                });
            }
        }
        if(goSearch && this.props.stores.smallType != "搜索首页"){
            this.props.dispatch({
                type:'CHANGESEARCHTYPE',
                searchType:0
            })
        }
        getIndexHistory({
            userId:this.props.userInfo.id,
            smallType:this.props.stores.smallType,
            pageNo:this.props.stores.pageNo,
            callBack:(res)=>{
                if (res) {
                    this.setState({
                        historyDatas: res.datas
                    });
                }
            }
        });
        this.getHotData();
        return false
    }

    //组件移除前调用方法
    componentWillUnmount(){

    }

    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}  ref="header" searchHandle={this._searchHandle.bind(this)}/>
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header">
                    {
                        (()=>{
                            switch(this.props.stores.searchType){
                                case 1 : return this.state.searchNull && !this.state.isLoading ? <EmptyComponent/> : <SearchContent {...this.props} saechLink={this.saechLink.bind(this)}/>;
                                default : return <Main {...this.props} {...this.state} data={this.props.stores.data} clickHistory={this._searchHandle.bind(this)} searchPush={this.searchPush.bind(this)} closeHistory={this.closeHistory.bind(this)} getHotData={this.getHotData.bind(this)} searchPushWord={this._searchHandle.bind(this)} />;
                            }
                        })()
                    }
                </div>
                {
                    this.state.showPopup ? <Popup  {...this.props} popupCancel={this._popupCancel.bind(this)} popupSure={this._popupSure.bind(this)}/> : null
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
        return(
            <div className="search">
                {
                    this.props.history && this.props.historyDatas.length != 0
                        ?
                        <ul  className="list list-card">
                            <li className="item item-icon-right" style={{padding:'5px 16px',fontSize: '.7rem'}}>历史搜索<i onClick={this.props.closeHistory} className="icon ion-close" style={{fontSize: '14px'}}></i></li>
                            {
                                this.props.historyDatas.map((ele,index)=>  <li className="item" style={{padding:'5px 16px',fontSize: '.65rem'}} key={Math.random()} onClick={()=>this.props.clickHistory(ele.content)}>{ele.content}</li>)
                            }
                        </ul>
                        :null
                }
                <div  className="list-card">
                    <h3 className="list-horizontal-title" style={{padding:'5px 16px'}}>热门搜索
                        <span className="item-note" onClick={this.props.getHotData}><i className="icon ion-arrow-swap positive" style={{fontSize: '14px',marginRight:'5px'}}></i>换一换</span>
                    </h3>
                    <ul  className="list-horizontal-block">
                        {
                            this.props.hotData.map((ele,index)=> <li key={Math.random()}
                                                                     onClick={()=>{this.props.searchPushWord(ele.content)}}
                                                                     className="item-block"
                                                                     style={(()=>{let colorArray=[{ fontSize: '.65rem',border: '1px solid #f7eac6',background: '#f8f2e3'},{fontSize: '.65rem',border: '1px solid #f8bba8',background: '#f7d1c6'},null];
                                                                     let Mathcolor=colorArray[Math.floor(Math.random()*3)];
                                                                     return Mathcolor})()}>{ele.content}</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

class SearchContent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="search">
                { this.props.stores.data.length == 0 ? null :
                    this.props.stores.data.map((ele,index)=>
                        <div key={Math.random()} className="list-card list-padding">
                            {
                                ele.BigList.length == 0 ? null :  <h3 className="item positive"><i className="icon ion-document-text list-title-icon"></i>{ele.name}</h3>
                            }
                            {
                                ele.BigList.map((ele,index)=>{
                                    return  (ele.smallList.length == 0 ? null:
                                        <p key={Math.random()} className="item item-icon-right" onClick={()=>{this.props.saechLink(ele.smallList.smallType,ele.smallList.areaId,ele.smallList.areaName,ele.smallList.yearMonth)}}  >
                                            {ele.smallName}
                                                    <span className="positive">
                                                         {
                                                             ele.smallList.num
                                                         }
                                                    </span>条
                                            <i className="icon ion-ios-arrow-right"></i>
                                        </p>)
                                })
                            }
                        </div>)
                }
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="searchName" type="search" placeholder={this.props.stores.searchName == "" ? "请输入搜索关键词" : this.props.stores.searchName}/>
                </label>
                <button className="button button-clear" onClick={()=>{this.props.searchHandle(this.refs.searchName.value)}}>
                    搜索
                </button>
            </div>
        )
    }
}

class Popup extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}>
                <div className="backdrop visible active"></div>
                <div className="popup-container popup-showing active">
                    <div className="popup"  style={{padding: '20px 0',borderRadius: '5px'}}>
                        <div style={{lineHeight: 2,padding: '10px 20px'}}>
                            尊敬的用户：<br/>
                                    <div style={{textIndent: '1rem'}}>欲知更多数据详情，请购买会员，感谢对药市通的支持</div>
                        </div>
                        <div  className="popup-foot" >
                            <button onClick={this.props.popupCancel}>取消</button>
                            <button onClick={this.props.popupSure} style={{background: '#387ef5'}}>开通会员</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state){
    return{
        uri:state.router.uri,
        stores:state.search,
        userInfo:state.userInfo,
        isVip:state.userInfo.isVip
    }
}

export default connect(select)(Search);

Search.contextTypes = {
    router:React.PropTypes.object.isRequired
}