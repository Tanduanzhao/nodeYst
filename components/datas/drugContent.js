/*
 药品详情信息
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadDrugContent} from '../function/ajax.js';
import Loading from '../loading';
class drugContent extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true
        };
    }
    _loadData(){
        this.props.dispatch((dispatch,getState)=>{
            loadDrugContent(dispatch,{
                salesId:this.props.params.sid,
                callBack:(res)=>{
                    this.props.dispatch({
                        type:'DRUGCONTENTDATA',
                        drugContentData:res.datas
                    });
                    this.setState({
                        loading:false
                    });
                }
            });
        })
    }
    componentDidMount(){
        this._loadData();
    }
    render(){
        var ybypFlag = (()=>{
            if(this.props.drugContentData.ybypFlag == 1){
                var children=<span className="tag">医</span>;
            }
            return children;
        })();
        var jbywFlag = (()=>{
            if(this.props.drugContentData.jbywFlag == 1){
                var children=<span className="tag">基</span>;
            }
            return children;
        })();
        var djypFlag = (()=>{
            if(this.props.drugContentData.djypFlag == 1){
                var children=<span className="tag">低</span>;
            }
            return children;
        })();
        if(this.state.loading) {
            return <Loading/>
        }else {
            return (
                <div className="root" style={{"overflow":"auto"}}>
                    <div className="drugContent-header">
                        <img src="/images/drugContent_title.jpg" alt=""/>
                    </div>
                    <div className="drugContent-main">
                        <div className="drugContent-main-title">产品基本信息</div>
                        <div className="message">
                            <div>产品名称：
                                <span className="prodName prod-name">{this.props.drugContentData.prodName}</span>
                                {ybypFlag}{jbywFlag}{djypFlag}
                            </div>
                            <div>剂型：{this.props.drugContentData.dosSname}</div>
                            <div>规格{this.props.drugContentData.spec}</div>
                            <div>规格属性：{this.props.drugContentData.specAttr}</div>
                            <div>转换比：{this.props.drugContentData.standConvert}</div>
                            <div>包材：{this.props.drugContentData.wrapName}</div>
                            <div>生产企业：{this.props.drugContentData.scqy}</div>
                        </div>
                        <div className="drugContent-main-title">
                            <span className="cityName">{this.props.drugContentData.cityName}</span> 覆盖医院数
                        </div>
                        <div className="message">
                            <div>三级：{this.props.drugContentData.prodLevel3Count}
                                / {this.props.drugContentData.level3Count}</div>
                            <div>二级：{this.props.drugContentData.prodLevel2Count}
                                / {this.props.drugContentData.level2Count}</div>
                            <div>一级及一级以下：{this.props.drugContentData.prodLevel1Count}
                                / {this.props.drugContentData.level1Count}</div>
                        </div>
                        <div className="drugContent-main-btn">
                            <span>说明书</span>
                            <span>学术资料</span>
                            <span>招商广告</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function select(state){
    return{
        searchAreaType:state.provicen.searchAreaType,
        drugContentData:state.drugContent.drugContentData
    }
}
export default connect(select)(drugContent);