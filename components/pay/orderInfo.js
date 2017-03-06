/*
 数据-目录分组
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {requestUnifiedorderPayService,getCustomerScorePay} from '../function/ajax';
import {onBridgeReady} from './../function/common';
import Loading from '../common/loading';
import HeaderBar from './../common/headerbar.js';
import EmptyComponent from '../common/emptyComponent';

class OrderInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            isShowFilter:false,
            isLoading:true,
            infinite:true,
            isCheckbox:false,
            datas:""
        };
        this._loadData = this._loadData.bind(this);
    }
    _fun(){
        setTimeout(()=> {
            this.context.router.goBack()
        });
    }
    //支付
    _sandboxPayService(id,price,self){
        requestUnifiedorderPayService({id:id,discount:price,fun:()=>{this._fun()},callBack:onBridgeReady})
    }
    _loadData(){
        getCustomerScorePay({
            reportId: this.props.stores.vipLevel == 0 ? this.props.params.id : "vip",
            productId: this.props.stores.vipLevel == 0 ?  "" : this.props.params.id,
            callBack: (res)=> {
                this.setState({
                    isLoading:false,
                    datas:res.datas
                });
            }
        });
    }
    componentDidMount(){
        this.ele = this.refs.content;
        this._loadData();
    }
    componentWillUnmount(){
        this.props.dispatch({
            type: 'RESETORDERINFO'
        });
    }
    render(){
        let vipImg = (()=>{
            switch(this.props.stores.vipLevel){
                case 1: return  'level1_crown.png';
                case 2: return  'level2_crown.png';
                case 3: return  'level3_crown.png';
                case 4: return  'level4_crown.png';
            }
        })();
        return(
            <div className="root">
                <div className="bar bar-positive bar-header">
                    <h4 className="title" style={{ letterSpacing: '-0.4px'}}>
                        订单详情
                    </h4>
                </div>
                {
                    this.state.isLoading ? <Loading/> : null
                }
                <div ref="content" className="scroll-content has-header item-text-wrap bg-gray">
                    {
                        this.props.stores.vipLevel == 0
                            ?   <div className="list card-list flex">
                                    <div className="item-left" style={{height: '5rem', width: '5rem'}}>
                                        <img src={this.state.datas.mainImg} alt=""/>
                                    </div>
                                    <div className="item-right">
                                        <h3 className="card-list-title">{this.state.datas.title}</h3>
                                        <div className="price"><i>¥</i>{this.state.datas.price}</div>
                                    </div>
                                </div>
                            :    <div className="list card-list flex flex-align"  style={{ minHeight: '70px'}}>
                                    <span className="flex flex-align"><img className="vipImg" src={`/images/${vipImg}`} alt=""/>{this.state.datas.title}</span>
                                    <span className="price"><i>¥</i>{this.state.datas.price}</span>
                                </div>
                    }
                    <div className="card-list productInfo clear-padding">
                        <div className="list">
                            <div className="item" style={{lineHeight: 1}}>
                                商品类型
                                <span className="item-note tar"  style={{lineHeight: 1}}>
                                     { this.props.stores.vipLevel == 0 ? "电子版分析报告" : this.state.datas.productType}
                                </span>
                            </div>
                            <div className="item">
                                    商品备注
                                <span className="item-note taj">
                                    {this.state.datas.productRemark}
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.datas.score == 0
                            ?   <div className="list card-list">
                                    当前可用积分为<span className="focus">0</span>，努力赚点积分来抵扣吧~
                                </div>
                            :   <div className="list card-list flex flex-align">
                                    <span>你有<i className="focus">{this.state.datas.score}</i>积分，可用<i className="focus">{this.state.datas.deductionScore}</i>积分抵扣<i className="focus">{ this.state.datas.discount}</i>元</span>
                                    {
                                        this.state.isCheckbox ? <img onClick={()=>{this.setState({isCheckbox:false})}} src="/images/checkbox.jpg" alt="" style={{width:'1.3rem'}}/>
                                            : <img onClick={()=>{this.setState({isCheckbox:true})}} src="/images/checkbox_blank.jpg" alt="" style={{width:'1.3rem'}}/>
                                    }
                                </div>
                    }
                </div>
                <div onClick={this._sandboxPayService.bind(this,this.props.params.id,this.state.isCheckbox ? this.state.datas.discount : 0)} className="bar bar-footer bar-positive row btn-bar">
                    <div className="col-50 btn btn-price tal">合计: <span className="price"> <i>¥</i>{this.state.isCheckbox ? this.state.datas.payNum : this.state.datas.price}</span></div>
                    <div className="col-50 btn">提交订单</div>
                </div>
            </div>
        )
    }
}
function select(state){
    return{
        stores:state.orderInfo
    }
}
export default connect(select)(OrderInfo);

OrderInfo.contextTypes = {
    router:React.PropTypes.object.isRequired
}
