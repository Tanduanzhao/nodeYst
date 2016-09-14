/*
  收费报告
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

export default class  Charge extends Component{
    render(){
        return(
          <div className="root charge-views">
                <div className="charge-header">
                    <img src="/images/charge-title.jpg" alt=""/>
                  <div className="title-bar">
                    <span className="title-text">慢阻肺患者的用药图谱</span>
                    <img src="/images/charge_header_logo.png" alt="" className="title-logo"/>
                  </div>
                </div>
                <div className="charge-main">
                    <h2 className="item">
                        报告摘要
                    </h2>
                <p className="charge-main-p">
                    慢性阻塞性肺疾病（简称慢阻肺）是一种严重危害人类健康的常见病、多发病，严重影响患者的生命质量，病死率较高，并给患者及其家庭以及社会带来沉重的经济负担。世界银行和世界卫生组织的资料表明，至2020年，慢阻肺将位居世界疾病经济负担的第5位。
                </p>
                  <p className="charge-main-p">
                  药物治疗用于预防和控制症状，减少急性加重的频率和严重程度，提高运动耐力和生命质量。本文以华南某医院住院患者2015年的用药为基础，通过图表分析抗感染药物、激素类药、呼吸系统药物等类型药品的临床使用情况。
                  </p>
                  <h2 className="item">
                    报告目录
                  </h2>
                  <div className="charge-main-content">
                    <p>
                      <i className="fa fa-play-circle"></i>
                      二级：各类药品金额比重
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      抗感染药物金额分类比重
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      呼吸系统药物金额分类比重
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      各类药品使用人数比重
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      各类药品使用人数比重
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      各类抗菌药物平均使用天数和医嘱使用率
                    </p>
                    <p>
                      <i className="fa fa-play-circle"></i>
                      各类呼吸系统药物使用率
                    </p>
                  </div>
                </div>
                <div className="bar bar-footer row charge-footer">
                  <a href="#" className="col-50">¥200</a>
                  <a href="#" className="col-50 buy">报告购买</a>
                 </div>
          </div>
        )
    }
}