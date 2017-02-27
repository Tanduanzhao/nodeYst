/*
    数据简介
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
class DataInrto extends Component{
    componentDidMount(){
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}/>
                <Main {...this.props}/>
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
               <div className="title">数据简介</div>
            </div>
        )
    }
}
class Main extends Component{
    render(){
        return(
            <div className="scroll-content has-header padding bg-fff center-secondary">
                <p>
                    药市通数据模块分为“入市价”、“中标数据”、“政策准入数据”和“产品数据”四个栏目（共计17个数据库），数据人员每月定期从国家食品药品监督管理局、国家药品供应保障综合管理信息平台、各省市药械采购中心、各省市人力资源和社会保障局等网站采集公开信息并进行处理更新。
                    数据目前更新至2016年9月30日。
                </p>
                <img src="/images/dataIntro01.jpg" alt=""/>
                <h3>
                    一、广东省入市价
                </h3>
                <p>
                    现收录2014年至今广东省药品交易平台官方公布的入市价数据50734条， “广东省最小制剂入市价”展示的是平台最近一次公布的入市价，“最低五省均值”和“最低三省均值”的计算取值于2016年9月以前在执行的各省项目中最低价格排名均值。（ 注：本次统计中最低五省价格、最低三省均值及最低五省均值不包含军区、广东省价格。）
                </p>
                <h3>
                    二、中标数据
                </h3>
                <p>
                    现收录2008年至今各省中标数据1153990条。
                </p>
                <img src="/images/dataIntro02.jpg" alt=""/>
                <h3> 三、政策准入数据  </h3>
                <p>
                    政策准入数据分为“质量层次”、“基本药物目录”、“医保目录”、“辅助用药”、“低价药目录”和“抗菌药物目录”六个部分。
                </p>
                <h4>3.1 质量层次</h4>
                <p>
                    现收录《关于公示2015年江苏省药品集中采购申报资质审核情况的通知》2826条数据，类型包括“专利”、“过期专利”、“国家科技奖”、“一类新药”、“国家中药保密处方”、“首仿”、“美国认证”、“欧盟认证”及“日本认证”。
                </p>
                <h4>3.2 基本药物目录</h4>
                <p>
                    现收录国家、各省增基药数据32044条，涵盖2009版和2012版基本药物目录。。
                </p>
                <h4>3.3 医保目录</h4>
                <p>
                    现收录国家、各省增医保数据97521条，涵盖2009版医保目录。
                </p>
                <h4>3.4 辅助用药</h4>
                <p>
                    现收录安徽省、内蒙古自治区、四川省、云南省、苏州市五个省市已公布的辅助用药数据306条。
                </p>
                <h4>3.5 低价药目录</h4>
                <p>
                    现收录国家、各省增低价药数据7843条。
                </p>
                <h4>3.6 抗菌药物目录</h4>
                <p>
                    现收录各省抗菌药物数据4695条。
                </p>
                <img src="/images/dataIntro03.jpg" alt=""/>
                <h3>四、产品数据   </h3>
                <p>
                    现收录产品数据175019条，可按“西药”、“中成药”及“生物制品”三个类型查询国家食品药品监督管理局批准注册的国产药品和进口药品数据，如果该产品为广东省交易品种，则数据展示相应的“目录ID”、“目录名称”、“目录类型”。
                </p>
                <img className="contribute-footer" src="/images/dataIntro04.jpg" alt=""/>
            </div>
        )
    }
}
function select(state){
    return{}
}
export default connect(select)(DataInrto);
