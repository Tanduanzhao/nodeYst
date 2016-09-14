/*
    药品信息
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadSingleClassifyProduct} from '../function/ajax.js';
class drugContent extends Component{
    render(){
        return(
            <div className="root ">
                <div className="drugContent-header" >
                    <img src="/images/drugContent_title.jpg" alt=""/>
                </div>
                <div className="drugContent-main">
                    <div className="drugContent-main-title">产品基本信息</div>
                    <div className="message">
                        <div>产品名称：
                            <span className="prodName prod-name">A群C群脑膜炎球菌多糖疫苗</span>
                            <i className="icon-base color-blue">基</i>
                            <i className="icon-base color-red">医</i>
                            <i className="icon-base color-green">低</i>
                        </div>
                        <div>剂型：<span className="dosSname">冻干粉针剂</span></div>
                        <div>规格：<span className="spec">1mg</span></div>
                        <div>规格属性：<span className="specAttr">无</span></div>
                        <div>转换比：<span className="standConvert">1</span></div>
                        <div>包材：<span className="wrapName">配溶媒</span></div>
                        <div>生产企业：<span className="scqy">赛诺菲</span></div>
                    </div>
                    <div className="drugContent-main-title">
                        <span className="cityName">加载中...</span> 覆盖医院数
                    </div>
                    <div className="message">
                        <div>三级：<span className="prodLevel3Count">8</span> / <span className="level3Count">9</span></div>
                        <div>二级：<span className="prodLevel2Count">33</span> / <span className="level2Count">41</span></div>
                        <div>一级及一级以下：<span className="prodLevel1Count">256</span> / <span className="level1Count">337</span></div>
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

function select(state){
	return{
		showProvicen:state.index.showProvicen,
		areaId:state.provicen.areaId,
		areaName:state.provicen.areaName,
        provicenData:state.provicen.data,
		yearMonth:state.data.yearMonth,
		uri:state.router.uri,
        searchAreaType:state.provicen.searchAreaType

	}
}
export default connect(select)(drugContent);