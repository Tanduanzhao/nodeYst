/*
 广东省入市价
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {myCustomerList} from '../function/ajax';
import Provicen from '../provicen';
import {Link} from 'react-router';
import Loading from '../common/loading';
import EmptyComponent from '../common/emptyComponent';
class ClientList extends Component{
    constructor(props){
        super(props);
        this.state= {
            isLoading: true,
            //request:true,
            totalSize:0,
            vipNum:0,
            id:null
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
        this._checkbox = this._checkbox.bind(this);
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

    //加载页面数据
    _loadData(){
        //this.setState({
        //    isLoading:true
        //});
        //this.setState({
        //    request:false
        //});
        myCustomerList({
            //userId:this.props.userInfo.id,
            //searchName:encodeURI(encodeURI(this.props.stores.searchName)) || "",
            pageNo:this.props.stores.pageNo,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                this.setState({
                    isLoading:false
                });
                if (res){
                    if(res.pageNo >= res.totalPage){
                        this.props.dispatch({
                            type:'UNINFINITEDRUG'
                        });
                    }else{
                        this.props.dispatch({
                            type:'INFINITEDRUG'
                        });
                    }
                    this.props.dispatch({
                        type:'LOADCLIENTLISTDATA',
                        data:this.props.stores.data.concat(res.datas),
                        pageNo:this.props.stores.pageNo+1
                    });
                    this.setState({
                        totalSize:res.totalSize,
                        vipNum:res.datas[0].vipNum
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

    //渲染完成后调用
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this._loadData();
    }

    //组件移除前调用方法
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETCLIENTLIST'
        })
    }

    render(){
        console.log(this.state.vipNum);
        console.log(this.state.vipNum== 0);
        return(
            <div className="root">
                <HeaderBar {...this.props} totalSize={this.state.totalSize}/>
                {
                    this.state.vipNum == 0? null:
                    <div className="bar bar-subheader bar-stable">
                        <h3 className="title" style={{ fontSize: '12px'}}>当前已有{this.state.vipNum}个客户开通会员</h3>
                    </div>
                }
                {
                    this.state.isLoading?<Loading/>: null
                }
                <div ref="content"  className={this.state.vipNum ==0?"scroll-content  has-header":"scroll-content  has-subheader"}>
                    {
                        (this.props.stores.data.length == 0 && !this.state.isLoading)
                            ? <EmptyComponent/>
                            :  <Main {...this.props} data={this.props.stores.data}  id={this.state.id} index={this.state.index} checkbox={this._checkbox} checked={this.state.checked}/>
                    }
                </div>
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
                <div className="item-right" style={{ marginLeft: '15px'}} >
                    <div>
                        {this.props.dataSources.customerName}
                        {
                            (()=>{
                                switch(this.props.dataSources.vipType){
                                    case 0:return <img className="user-level" src="/images/mass.png" alt=""/>;
                                    case 1:return <img className="user-level" src="/images/vipLogo.png" alt=""/>;
                                    case 2:return <img className="user-level" src="/images/superVipLogo.png" alt=""/>;
                                    default : return <img className="user-level" src="/images/mass.png" alt=""/>;
                                }
                            })()
                        }
                        {
                            this.props.dataSources.vipType != 0
                                ? <div className="vip-time">到期时间:{this.props.dataSources.vipEndDate}</div>
                                :null
                        }
                    </div>
                </div>
            </a>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
                <div className="title">客户列表（{this.props.totalSize}）</div>
            </div>
        )
    }
}

ClientList.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{
        uri:state.router.uri,
        stores:state.clientList,
        isVip:state.userInfo.isVip,
        userInfo:state.userInfo
    }
}

export default connect(select)(ClientList);