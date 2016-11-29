import React,{Component} from 'react';
import {connect} from 'react-redux';
import {insertLikeReport,getBusinessFeedBackInfo,insertBusinessFeedBackInfo,keepReport,cancelKeepReport} from './function/ajax';
import Loading from './loading';
import CollectPrompt from './collectPrompt';
class subscribeContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            isKeep:false,
            showPromptMes:false,
            showPrompt:false,
            isLike:false
        }
        this.state = {
            report:{
                content:null,
                title:null
            },
            isLoading:true,
            reportVersion:"total",
            showPopup:false,
            id:this.props.params.id,
            isKeep:false,
            showPromptMes:false
        }
    }
    componentDidMount(){
        getBusinessFeedBackInfo({
            callBack:(res)=>{
                if((typeof res.datas) != 'undefined'){
                    this.props.dispatch({
                        type:'LOADSUBSCRIBECONTRNTDATA',
                        message:res.datas
                    });
                }
            }
        });
    }
    keepReport(){
        clearInterval(setTimeout);
        if(this.state.isKeep != 1){
            keepReport({
                reportId:this.props.params.id,
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
            console.log("ssss")
            cancelKeepReport({
                reportId:this.props.params.id,
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
        console.log("linkArtcle")
        if(this.state.isLike != 1){
            insertLikeReport({
                reportId:this.props.params.id,
                callBack:(res)=> {
                    if (res.state == 1)
                        this.setState({
                            isLike: 1
                        })
                }
            })
        }else{
            insertLikeReport({
                reportId:this.props.params.id,
                callBack:(res)=>{
                    if(res.state==1)
                        this.setState({
                            isLike:0
                        })
                }
            })
        }
    }
    _sendMessage(){
        console.log(this.refs.subscribeTextarea.value)
        insertBusinessFeedBackInfo({
            feedContent:this.refs.subscribeTextarea.value,
            callBack:(res)=>{
                if(res.state == 1){
                    res.datas.feedContent = this.refs.subscribeTextarea.value
                    this.props.dispatch({
                        type:'LOADSUBSCRIBECONTRNTDATA',
                        message:res.datas
                    });
                    this.refs.subscribeTextarea.value = null;
                }else{
                    alert('网络故障');
                }
            }
        })
    }
    componentWillUnmount(){
        this.props.dispatch({
            type:'RESETSUBSCRIBECONTRNT'
        });
    }
    render(){
        console.log(this.props.subscribeContent.data,"datasss")
        return(
            <div className="root">
                {
                    this.state.showPrompt ? <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
                <div className="bar bar-positive bar-header">
                    <h4 className="title">
                        <button className="button title_button" onClick={this.keepReport.bind(this)}>
                            <i className={(this.state.isKeep != 1) ? "fa fa-star-o fa-2x": "fa fa-star fa-2x"}></i>
                        </button>
                        吴炳洪 ･《老吴专栏》</h4>
                </div>
                <div  ref="content" className="scroll-content has-header padding report-content">
                    <div className="nestedHTML">
                        Nullam tempor tortor in cursus gravida. Sed fermentum quam eu libero condimentum tincidunt. Suspendisse potenti. Sed consectetur, nunc sit amet auctor venenatis, eros lectus interdum urna, et gravida augue augue in purus.
                    </div>
                    <div className="foot">
                        <div className="product-details-collect">
                            <i className="fa fa-eye"></i>4567人查看
                            <i onClick={this.likeArticle.bind(this)} className={(this.state.isLike != 1) ? "fa fa-thumbs-o-up thumbs-up": "fa fa-thumbs-up thumbs-up-color thumbs-up"}></i><span onClick={this.likeArticle.bind(this)}>123人点赞</span>
                        </div>
                        <div className="item list-title">
                            <h3>我要留言</h3>
                        </div>
                        <div className="comments">
                            <textarea name="" id="" cols="30" rows="10" ref="subscribeTextarea"></textarea>
                            <button onClick={this._sendMessage.bind(this)}>提交</button>
                        </div>
                        <div className="item list-title">
                            <h3>用户留言</h3>
                        </div>
                        <ul  className="list new_report">
                            {
                                this.props.subscribeContent.data.map((ele)=>{
                                    return (ele.isReplay == 1) ? <List key={Math.random()} {...this.props}  feedContent = {ele.feedContent}/> : (<List key={Math.random()}  {...this.props}  feedContent = {ele.feedContent} imgUrl={ele.headImageUrl}/>)
                                })
                            }
                        </ul>
                    </div>
                </div>
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
                    <img src={this.props.imgUrl} alt=""/>
                </div>
                <div className="item-right">
                    <h3 className="item-nowrap title">微信昵称</h3>
                    <div className="article" style={{fontSize:".6rem"}}>
                        {this.props.feedContent}
                    </div>
                    <div className="introduce">yyyy-mm-dd</div>
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