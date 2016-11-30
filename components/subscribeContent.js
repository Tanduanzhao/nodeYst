import React,{Component} from 'react';
import {connect} from 'react-redux';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import {insertLikeReport,selectReportReplys,insertReplyReport,keepReport,cancelKeepReport,selectReportDetail} from './function/ajax';
import Loading from './loading';
import CollectPrompt from './collectPrompt';
class subscribeContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            report:{
                content:null,
                title:null
            },
            pageNo:1,
            isLike:0,
            likeNum:0,
            infinite:true,
            isLoading:true,
            reportVersion:"total",
            showPopup:false,
            id:this.props.params.id,
            isKeep:false,
            request:true,
            showPromptMes:false
        }
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll',this._infiniteScroll);
        this.setState({
            isLoading:true
        });
        selectReportDetail({
            reportId:this.props.params.reportId,
            columnId:this.props.params.id,
            callBack:(res)=>{
                if((typeof res.datas) != 'undefined'){
                    this.props.dispatch({
                        type:'LOADSUBSCRIBECONTRNTDATAVVV',
                        message:res.datas
                    });
                    this.setState({
                        isLike:res.datas.isLike,
                        likeNum:res.datas.likeNum,
                        isKeep:res.datas.isKeep,
                        isLoading:false
                    })
                }
            }
        });
        selectReportReplys({
            reportId:this.props.params.reportId,
            columnId:this.props.params.id,
            pageNo:this.state.pageNo,
            callBack:(res)=>{
                if(res.state == 1){
                    this.props.dispatch({
                        type:'LOADSUBSCRIBECONTRNTDATA',
                        message:res.datas
                    });
                    if(this.state.pageNo != res.totalPage-1){
                        this.setState({
                            pageNo:this.state.pageNo+1
                        })
                    }else{
                        this.setState({
                            infinite:false
                        })
                    }
                }else{
                    alert('网络故障');
                }
            }
        })
    }
    _infiniteScroll(){
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if(this.ele.firstChild.clientHeight-this.ele.scrollTop <= document.body.clientHeight-this.ele.offsetTop && this.state.infinite && this.state.request){
            this.setState({
                request:false
            });
            selectReportReplys({
                reportId:this.props.params.reportId,
                pageNo:this.state.pageNo,
                columnId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state == 1){
                        this.props.dispatch({
                            type:'LOADSUBSCRIBECONTRNTDATASS',
                            message:res.datas                        });
                        this.setState({
                            request:true
                        });
                        if(this.state.pageNo != res.totalPage-1){
                            this.setState({
                                pageNo:this.state.pageNo+1
                            })
                        }else{
                            this.setState({
                                infinite:false
                            })
                        }

                    }else{
                        alert('网络故障');
                    }
                }
            })
        }
    }
    keepReport(){
        clearInterval(setTimeout);
        if(this.state.isKeep != 1){
            keepReport({
                reportId:this.props.params.reportId,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:1,
                            showPrompt:1,
                            showPromptMes:"已收藏"
                        })
                    setTimeout(()=>{
                        this.setState({
                            showPrompt:0
                        })
                    },1000)
                }
            })
        }else{
            cancelKeepReport({
                reportId:this.props.params.reportId,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isKeep:0,
                            showPrompt:1,
                            showPromptMes:"取消收藏"
                        })
                    setTimeout(()=>{
                        this.setState({
                            showPrompt:0
                        })
                    },1000)
                }
            })
        }
    }
    likeArticle(){
        if(this.state.isLike != 1) {
            insertLikeReport({
                reportId: this.props.params.reportId,
                callBack: (res)=> {
                    if (res.state == 1)
                        this.setState({
                            isLike: 1,
                            likeNum:this.state.likeNum+1
                        })
                }
            })
        }
        //}else{
        //    insertLikeReport({
        //        reportId:this.props.params.reportId,
        //        callBack:(res)=>{
        //            if(res.state==1)
        //                this.setState({
        //                    isLike:0
        //                })
        //        }
        //    })
        //}
    }
    _sendMessage(){
        if(this.refs.subscribeTextarea.value==""){return false}
        insertReplyReport({
            reportId:this.props.params.reportId,
            replyContent:this.refs.subscribeTextarea.value,
            callBack:(res)=>{
                this.setState({
                    pageNo:1,
                    infinite:true
                });
                setTimeout(()=>{
                    selectReportReplys({
                        reportId:this.props.params.reportId,
                        pageNo:this.state.pageNo,
                        columnId:this.props.params.id,
                        callBack:(res)=>{
                            if(res.state == 1){
                                this.props.dispatch({
                                    type:'LOADSUBSCRIBECONTRNTDATA',
                                    message:res.datas
                                });
                                if(this.state.pageNo != res.totalPage-1){
                                    this.setState({
                                        pageNo:this.state.pageNo+1
                                    })
                                }else{
                                    this.setState({
                                        infinite:false
                                    })
                                }
                                this.refs.subscribeTextarea.value=null
                            }else{
                                alert('网络故障');
                            }
                        }
                    })
                });
            }
        });

    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETSUBSCRIBECONTRNT'
        });
    }
    render(){
        console.log(this.props.subscribeContent.dataAll.videoUrl,"subscribeContent");
        let isVideo=this.props.params.id==3&&this.props.subscribeContent.dataAll.videoUrl;
        return(
            <div className="root">
                {
                    this.state.showPrompt ? <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
                {
                    this.state.isLoading ? <Loading /> : null
                }
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        <button className="button title_button" onClick={this.keepReport.bind(this)}>
                            <i className={(this.state.isKeep != 1) ? "fa fa-star-o fa-2x": "fa fa-star fa-2x"}></i>
                        </button>
                        {this.props.subscribeContent.dataAll.title} </h4>
                </div>
                {
                    isVideo?<VideoComponent src={this.props.subscribeContent.dataAll.videoUrl}/>:null
                }
                <div  ref="content" className={this.props.params.id==3?"scroll-content has-header padding marginTop":"scroll-content has-header padding"}>
                    <div>
                        <div className="reportTitle">
                            {this.props.params.typeName} <span>——</span> {this.props.subscribeContent.dataAll.reportTitle}
                            <div  className="columnTitle">
                                {this.props.subscribeContent.dataAll.columnName}
                                {this.props.params.id==2?<span>{this.props.subscribeContent.dataAll.columnTitle}</span>:null}
                                {this.props.params.id==3?<span>{this.props.subscribeContent.dataAll.columnBriefContent}</span>:null}
                            </div>
                        </div>
                        <div className="nestedHTML" dangerouslySetInnerHTML={{__html:this.props.subscribeContent.dataAll.reportContent}}>
                        </div>
                        <div className="foot">
                            <div className="product-details-collect">
                                <i className="fa fa-eye"></i>{this.props.subscribeContent.dataAll.readNum}人查看
                                <i onClick={this.likeArticle.bind(this)} className={(this.state.isLike != 1) ? "fa fa-thumbs-o-up thumbs-up": "fa fa-thumbs-up thumbs-up-color thumbs-up"}></i><span onClick={this.likeArticle.bind(this)}>{this.state.likeNum}人点赞</span>
                            </div>
                            <div className="item list-title">
                                <h3>我要留言</h3>
                            </div>
                            <div className="comments">
                                <textarea name="" id="" cols="30" rows="10" ref="subscribeTextarea" placeholder="说点什么吧......"></textarea>
                                <button onClick={this._sendMessage.bind(this)}>提交</button>
                            </div>
                            <div className="item list-title">
                                <h3>用户留言</h3>
                            </div>
                            <ul  className="list new_report">
                                {
                                    this.props.subscribeContent.data.map((ele)=>{
                                        return (ele.isReplay == 1) ? <List key={Math.random()} {...this.props}   feedContent = {ele.feedContent}/> : (<List key={Math.random()}  {...this.props}  feedContent = {ele.feedContent}  dataSources = {ele} />)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class  VideoComponent extends Component{
    render(){
        console.log(this.props.src,"src");
        return(
           <div className="has-header" style={{width:'100%',position:'relative'}}>
               <Video style={{width:'100%',height:'auto'}} controls playsInline="true">
                   <source src={this.props.src} />
                   <Overlay />
               </Video>
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
            <li className="item item-row">
                <div className="item-left" style={{height: '2rem',width:'2rem'}}>
                    <img src={this.props.dataSources.userHeadImageUrl} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">
                        { decodeURI( decodeURI(this.props.dataSources.userAlias))}
                    </h3>
                    <div className="article" style={{fontSize:".6rem"}}>
                        {this.props.dataSources.replyContent}
                    </div>
                    <div className="introduce"> {this.props.dataSources.replyDate}</div>
                </div>
            </li>
        )
    }
}
subscribeContent.contextTypes = {
    router:React.PropTypes.object.isRequired
}
function select(state){
    return{
        subscribeContent:state.subscribeContent
    }
}
export default connect(select)(subscribeContent);