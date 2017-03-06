/*
 广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getAccountManagerlist,checkedAccountManager} from '../function/ajax';
import Provicen from '../provicen';
import {Link} from 'react-router';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
import ScrollLoading from '../common/scrollLoading';
class ManagerList extends Component{
    constructor(props){
        super(props);
        this.state= {
            loading: true,
            isSrollLoading:false,
            isLoadData:true,
            request:true,
            id:null
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this._checkbox = this._checkbox.bind(this);
    }

    //滚动加载
    _infiniteScroll(){
      if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && !this.props.stores.infinite){
          if(this.state.isLoadData) return false;
          this.setState({
              isLoadData:true
          });
          setTimeout(()=> this._loadData())
        }
    }

    //搜索方法
    _searchHandle(searchKeys){
        if(this.props.isVip == '0'){
            this.context.router.push('/pay/vip');
            return false;
        }else{
            this.setState({
                loading:true
            })
            this.props.dispatch({
                type:'CHANGEMANAGERLISTSEARCHNAME',
                searchName:searchKeys
            })
            this.props.dispatch({
                type:'LOADMANAGERLISTDATA',
                data:[],
                pageNo:1
            });
            setTimeout(()=> this._loadData());
        }
    }

    //加载页面数据
    _loadData(){
        //this.setState({
        //    loading:true
        //});
        //this.setState({
        //    request:false
        //});
        getAccountManagerlist({
            userId:this.props.userInfo.id,
            searchName:encodeURI(encodeURI(this.props.stores.searchName)) || "",
            pageNo:this.props.stores.pageNo,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    loading:false,
                    isLoadData:false,
                    isSrollLoading:true
                });
                if (res){
                    if(res.pageNo >= res.totalPage){
                        this.setState({
                            isSrollLoading:false
                        });
                        this.props.dispatch({
                            type:'UNINFINITEDRUG'
                        });
                    }else{
                        this.props.dispatch({
                            type:'INFINITEDRUG'
                        });
                    }
                    this.props.dispatch({
                        type:'LOADMANAGERLISTDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                };
                for(let i=0;i<res.datas.length;i++){
                    if(res.datas[i].isCheck == 1){
                        this.setState({
                            id:res.datas[i].accountManagerId
                        });
                        return;
                    }
                }
                //this.setState({
                //    request:true
                //});
            }
        });
    }

    //选中客户经理
    _checkbox(id){
      if(this.state.id == id){
          this.setState({
              id:null
          })
      }else{
          this.setState({
              id:id
          })
      }
    }
    //绑定客户经理
    _determine(){
        if(this.state.accountManagerId != ""){
            checkedAccountManager({
                userId:this.props.userInfo.id,
                accountManagerId:this.state.id,
                callBack:(res)=>{}
            })
        }
        this.context.router.push('/center');
    }

    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESEMANAGERLIST'
        })
    }

    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props} searchHandle={this._searchHandle.bind(this)}/>
                {
                    this.state.loading?<Loading/>: null
                }
                <div ref="content" className="scroll-content has-header has-footer">
                    {
                        (this.props.stores.data.length == 0 && !this.state.loading) ? <EmptyComponent/> :  <Main {...this.props} data={this.props.stores.data}  id={this.state.id} index={this.state.index} checkbox={this._checkbox} checked={this.state.checked} loading={this.state.loading}/>
                    }
                    {
                        this.props.stores.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                </div>
                <a href="javascript:void(0)" className="bar bar-footer bar-assertive row purchase-report" style={{justifyContent: "center",background: '#387ef5'}} onClick={this._determine.bind(this)}>确定</a>
            </div>
        )
    }
}
class Main extends Component{
    render(){
        return(
            <div className="list new_report item-text-wrap">
                {
                    this.props.data.map((ele,i)=> <List  key={Math.random()} {...this.props} dataSources={ele}/>)
                }
            </div>
        )
    }
}

class List extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <a href="javascript:void(0)" className="item item-checkbox">
                <div className="item-left" style={{ height: '3.5rem',width: '3.5rem',borderRadius: '50%'}}>
                    <img src={this.props.dataSources.imgUrl} alt=""/>
                </div>
                <div className="item-right" style={{ marginLeft: '10px'}} >
                    <h3 className="item-nowrap">{this.props.dataSources.name}</h3>
                    <div className="introduce">服务人数: {this.props.dataSources.customerNum}</div>
                    <div>
                        {
                            this.props.dataSources.speciallyList.map((ele,index)=>{
                                return (
                                    ele==''? null : <span   key={Math.random()} className="tag" style={{background:'#ffc900'}}>{ele}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <i className="icon ion-android-checkbox manager-list-icon" style={this.props.id == this.props.dataSources.accountManagerId  ? {color:'#387ef5'}:null} onClick={()=>{this.props.checkbox(this.props.dataSources.accountManagerId)}}></i>
            </a>

        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive item-input-inset">
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input ref="searchName" type="search" defaultValue={this.props.stores.searchName} placeholder="请绑定您的客户经理ID"/>
                </label>
                <button className="button button-clear" onClick={()=>{this.props.searchHandle(this.refs.searchName.value)}}>
                    搜索
                </button>
            </div>
        )
    }
}

ManagerList.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{
        uri:state.router.uri,
        stores:state.managerList,
        isVip:state.userInfo.isVip,
        userInfo:state.userInfo
    }
}

export default connect(select)(ManagerList);