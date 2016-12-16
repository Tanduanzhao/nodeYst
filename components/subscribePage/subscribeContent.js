import React,{Component} from 'react';
import {connect} from 'react-redux';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import {insertLikeReport,selectReportReplys,insertReplyReport,keepReport,cancelKeepReport,selectReportDetail} from './../function/ajax';
import Loading from './../common/loading';
import GotTop from './../common/sideBar';
import CollectPrompt from './../collectPrompt';
class subscribeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: {
                content: null,
                title: null
            },
            pageNo: 1,
            isLike: 0,
            likeNum: 0,
            infinite: true,
            isLoading: true,
            reportVersion: "total",
            showPopup: false,
            id: this.props.params.id,
            isKeep: false,
            request: true,
            showPromptMes: false,
            sendMessage:false
        }
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }
    _loadData(){
        this.setState({
            request:false
        });
        selectReportReplys({
            reportId:this.props.params.reportId,
            columnId:this.props.params.id,
            pageNo:this.state.pageNo,
            callBack:(res)=>{
                if(res.state == 1){
                    this.props.dispatch({
                        type:'LOADSUBSCRIBECONTRNTDATASS',
                        message:res.datas
                    });
                    if(this.state.sendMessage){
                        this.props.dispatch({
                            type:'LOADSUBSCRIBECONTRNTDATA',
                            message:res.datas
                        });
                        this.refs.subscribeTextarea.value = null
                    }
                    if(res.totalSize <= this.props.subscribeContent.data.length){
                        this.setState({
                            infinite:false
                        })
                    }else{
                        this.setState({
                            pageNo:this.state.pageNo+1
                        })
                    }
                    this.setState({
                        request:true,
                        sendMessage:false
                    });
                }else{
                    alert('网络故障');
                }
            }
        })
    }
    componentDidMount() {
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll', this._infiniteScroll);
        this.setState({
            isLoading: true
        });
        selectReportDetail({
            reportId: this.props.params.reportId,
            columnId: this.props.params.id,
            callBack: (res)=> {
                if ((typeof res.datas) != 'undefined') {
                    this.props.dispatch({
                        type: 'LOADSUBSCRIBECONTRNTDATAVVV',
                        message: res.datas
                    });
                    this.setState({
                        isLike: res.datas.isLike,
                        likeNum: res.datas.likeNum,
                        isKeep: res.datas.isKeep,
                        isLoading: false
                    })
                }
            }
        });
        this._loadData();
    }

    _infiniteScroll() {
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        console.log( this.state.pageNo  , "pageNo");
        if (this.ele.firstChild.clientHeight-2 - this.ele.scrollTop <= document.body.clientHeight - this.ele.offsetTop && this.state.infinite && this.state.request) {
            this._loadData();
        }
    }

    keepReport() {
        clearInterval(setTimeout);
        if (this.state.isKeep != 1) {
            keepReport({
                reportId: this.props.params.reportId,
                callBack: (res)=> {
                    if (res.state == 1)
                        this.setState({
                            isKeep: 1,
                            showPrompt: 1,
                            showPromptMes: "已收藏"
                        })
                    setTimeout(()=> {
                        this.setState({
                            showPrompt: 0
                        })
                    }, 1000)
                }
            })
        } else {
            cancelKeepReport({
                reportId: this.props.params.reportId,
                callBack: (res)=> {
                    if (res.state == 1)
                        this.setState({
                            isKeep: 0,
                            showPrompt: 1,
                            showPromptMes: "取消收藏"
                        })
                    setTimeout(()=> {
                        this.setState({
                            showPrompt: 0
                        })
                    }, 1000)
                }
            })
        }
    }

    likeArticle() {
        if (this.state.isLike != 1) {
            insertLikeReport({
                reportId: this.props.params.reportId,
                callBack: (res)=> {
                    if (res.state == 1)
                        this.setState({
                            isLike: 1,
                            likeNum: this.state.likeNum + 1
                        })
                }
            })
        }
    }

    _sendMessage() {
        if (this.refs.subscribeTextarea.value == "") {
            return false
        }
        insertReplyReport({
            reportId: this.props.params.reportId,
            replyContent: this.refs.subscribeTextarea.value,
            callBack: (res)=> {
                this.setState({
                    pageNo: 1,
                    sendMessage:true,
                    infinite: true
                });
                setTimeout(()=> {
                    this._loadData();
                });
            }
        });

    }

    scrollTop(){
        this.ele.scrollTop=0
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'RESETSUBSCRIBECONTRNT'
        });
    }

    render() {
        let isVideo = this.props.params.id == 3 && this.props.subscribeContent.dataAll.videoUrl;
        return (
            <div className="root">
                {
                    this.state.showPrompt ?
                        <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
                {
                    this.state.isLoading ? <Loading /> : null
                }
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        {
                            //<button className="button title_button" onClick={this.keepReport.bind(this)}>
                            //    <i className={(this.state.isKeep != 1) ? "fa fa-star-o fa-2x": "fa fa-star fa-2x"}></i>
                            //</button>
                        }
                        {this.props.subscribeContent.dataAll.title} </h4>
                </div>
                {
                    isVideo ? <VideoComponent src={this.props.subscribeContent.dataAll.videoUrl}/> : null
                }
                <div ref="content"
                     className={this.props.params.id==3?"scroll-content has-header marginTop":"scroll-content has-header"}>
                    <div>
                        <div className="reportTitle">
                            {this.props.params.typeName}
                            <span>——</span> {this.props.subscribeContent.dataAll.reportTitle}
                            <div className="columnTitle">
                                <span>{this.props.subscribeContent.dataAll.publishDate}</span>
                                {
                                    this.props.subscribeContent.dataAll.columnName?
                                        <span>{this.props.subscribeContent.dataAll.columnName}</span>:null
                                }
                                {this.props.params.id == 2 ?
                                    <span>{this.props.subscribeContent.dataAll.columnTitle}</span> : null}
                                {this.props.params.id == 3 ?
                                    <span>{this.props.subscribeContent.dataAll.columnMainContent}</span> : null}
                            </div>
                        </div>
                        <div className="nestedHTML"
                             dangerouslySetInnerHTML={{__html:this.props.subscribeContent.dataAll.reportContent}}>
                        </div>
                        <div className="foot">
                            <div className="product-details-collect">
                                <i className="fa fa-eye"></i>{this.props.subscribeContent.dataAll.readNum}人查看
                                <i onClick={this.likeArticle.bind(this)}
                                   className={(this.state.isLike != 1) ? "fa fa-thumbs-o-up thumbs-up": "fa fa-thumbs-up thumbs-up-color thumbs-up"}></i><span
                                onClick={this.likeArticle.bind(this)}>{this.state.likeNum}人点赞</span>
                            </div>
                            <div className="item list-title">
                                <h3><i className="comment_icon"></i> 我要留言</h3>
                            </div>
                            <div className="comments">
                                <textarea name="" id="" cols="30" rows="10" ref="subscribeTextarea"
                                          placeholder="说点什么吧......"></textarea>
                                <button onClick={this._sendMessage.bind(this)}>提交</button>
                            </div>
                            <div className="item list-title ">
                                <h3><i></i> 用户留言</h3>
                            </div>
                            <ul className="list new_report">
                                {
                                    this.props.subscribeContent.data.map((ele)=> {
                                        return (ele.isReplay == 1)
                                            ? <List key={Math.random()} {...this.props} feedContent={ele.feedContent}/>
                                            : (<List key={Math.random()}  {...this.props} feedContent={ele.feedContent} dataSources={ele}/>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <GotTop {...this.props} scrollTop={this.scrollTop.bind(this)} keepReport={this.keepReport.bind(this)}   {...this.props}  isKeep={this.state.isKeep}/>
            </div>
        )
    }
}
class VideoComponent extends Component {
    render() {
        console.log(this.props.src, "src");
        return (
            <div className="has-header" style={{width:'100%',position:'relative'}}>
                <Video style={{width:'100%',height:'auto'}} controls playsInline="true">
                    <source src={this.props.src}/>
                    <Overlay />
                </Video>
            </div>
        )
    }
}

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="item item-row">
                <div className="item-left" style={{height: '2rem',width:'2rem'}}>
                    <img src={this.props.dataSources.userHeadImageUrl} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">
                        { decodeURI(decodeURI(this.props.dataSources.userAlias))}
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
    router: React.PropTypes.object.isRequired
}

function select(state) {
    return {
        subscribeContent: state.subscribeContent
    }
}

export default connect(select)(subscribeContent);