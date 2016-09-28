/*
    质量层次
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';

class Quality extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}/>
                <div className="scroll-content has-header">
                    <div className="list">
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
            <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.quality.areaName}</span></button>
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

function select(state){
    return{
        policy:state.policy,
        quality:state.quality
    }
}

export default connect(select)(Quality);