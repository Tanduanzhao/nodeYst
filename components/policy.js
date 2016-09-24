/*
    政策准入
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import LinkBar from './index/linkBar';
class Policy extends Component{
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}/>
                <div className="scroll-content has-header">
                    <div className="bar bar-header">
                        <h3 className="title"><i className="fa fa-cube"></i> 阿奇霉素</h3>
                    </div>
                    <div className="scroll-content has-header">
                        <Main {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

class HeaderBar extends Component{
  _showProvicenHandle(){
    this.props.dispatch({
      type:'SHOWFILTERPRODUCE'
    });
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
        <div className="buttons">
            <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.policy.areaName}</span></button>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="hospitalSearchName" type="search" placeholder="请输入搜索关键词"/>
        </label>
        <button className="button button-clear">
           搜索
        </button>
      </div>
    )
  }
}

class Main extends Component{
    render(){
        return(
            <div className="list">
                <LinkBar title="质量层次" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-tag
"></i> 来源：关于公示2015年江苏省药品集中采购申报资质审核情况的通知（2016-09-09）
                    </div>
                    <ul className="list">
                        <li className="item">
                            <h2>阿奇霉素胶囊（舒美特）</h2>
                            <p>剂型/规格：胶囊剂 / 0.25g(25万单位)</p>
                            <p>生产企业：克罗地亚PLIVA CROATIA Ltd.</p>
                            <p><span className="tag">过期认证</span><span className="tag">欧盟认证</span></p>
                        </li>
                        <li className="item">
                            <h2>阿奇霉素胶囊（舒美特）</h2>
                            <p>剂型/规格：胶囊剂 / 0.25g(25万单位)</p>
                            <p>生产企业：克罗地亚PLIVA CROATIA Ltd.</p>
                            <p><span className="tag">过期认证</span><span className="tag">欧盟认证</span></p>
                        </li>
                    </ul>
                </div>
                <LinkBar title="基药（2012版）" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-file-text-o"></i> 文号：人社部发[2009]159号（2016-09-09）
                    </div>
                    <div className="item">
                        <table className="table-border" width="100%">
                            <thead>
                                <tr>
                                    <th>药品名称</th>
                                    <th>剂型</th>
                                    <th>规格</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>肠溶胶囊</td>
                                    <td>0.25g（25万单位）</td>
                                </tr>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>颗粒剂</td>
                                    <td>0.1g（10万单位）</td>
                                </tr>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>肠溶片</td>
                                    <td>0.25g（25万单位）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LinkBar title="医保（2009版）" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-file-text-o"></i> 文号：人社部发[2010]286号（2016-09-09）
                    </div>
                    <div className="item">
                        <table className="table-border" width="100%">
                            <thead>
                                <tr>
                                    <th>药品名称</th>
                                    <th>剂型</th>
                                    <th>医保类别</th>
                                    <th>医保编号</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>注射剂</td>
                                    <td>乙类</td>
                                    <td>★（60）</td>
                                </tr>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>口服常释剂型</td>
                                    <td>甲类</td>
                                    <td>60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LinkBar title="辅助用药" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-file-text-o"></i> 文号：卫药秘[2015]593号（2016-09-09）
                    </div>
                    <div className="item">
                        <table className="table-border" width="100%">
                            <thead>
                                <tr>
                                    <th>药品名称</th>
                                    <th>剂型</th>
                                    <th>规格</th>
                                    <th>包装</th>
                                    <th>生产企业</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>艾迪注射液</td>
                                    <td>注射剂</td>
                                    <td>10ml</td>
                                    <td>1支/支</td>
                                    <td style={{whiteSpace:'normal'}}>贵州益佰制药股份有限公司</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LinkBar title="低价药" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-file-text-o"></i> 文号：发改价格[2014]856号（2016-09-09）
                    </div>
                    <div className="item">
                        <table className="table-border" width="100%">
                            <thead>
                                <tr>
                                    <th>药品名称</th>
                                    <th>剂型</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>阿昔洛韦</td>
                                    <td>注射剂</td>
                                </tr>
                                <tr>
                                    <td>阿奇霉素</td>
                                    <td>片剂（胶囊）、滴眼剂、乳膏剂</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LinkBar title="抗菌药物（2012版）" link="#"/>
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-file-text-o"></i> 文号：粤卫办[2012]35号（2016-09-09）
                    </div>
                    <div className="item">
                        <table className="table-border" width="100%">
                            <thead>
                                <tr>
                                    <th>药品名称</th>
                                    <th>限制范围</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>阿奇霉素<span className="tag">口服</span></td>
                                    <td>限制使用级</td>
                                </tr>
                                <tr>
                                    <td>阿奇霉素<span className="tag">注射</span></td>
                                    <td>限制使用级</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        )
    }
}

function select(state){
    return {
        policy:state.policy
    }
}

export default connect(select)(Policy);