/*
 报告模块
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import Provicen from './provicen';
import Filter from './filter';
class Produce extends Component{
    render(){
        return(
          <div className="root">
              <HeaderBar {...this.props}/>
              <Main {...this.props}/>
              <FooterBar {...this.props}/>
          </div>
        )
    }
}
class HeaderBar extends Component{
    _showProvicenHandle(){
        this.props.dispatch({
            type:'SHOWFILTER'
        });
    }
    render(){
        return(
          <div className="bar bar-header bar-positive item-input-inset">
              <div className="buttons">
                  <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-th-large  fa-2x" aria-hidden="true" style={{display:"block"}}></i></button>
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
          <div>
              <div className="scroll-content has-header row produce-cards">
                  <div className="col-50">
                      <Link to="/produce/charge">
                          <img src="/images/produce_Item01.jpg" style={{display:'block',width: "100%"}}/>
                          <h3>慢阻肺患者的用药图谱.</h3>
                          <div className="produce-card-price">¥200</div>
                          <p className="produce-card-footer">
                              <span style={{textAlign:'left'}}>4342人订阅</span>
                              <i className="produce-card-icon">点击进入</i>
                          </p>
                      </Link>
                  </div>
                  <div className="col-50">
                      <Link to="/produce/free">
                          <img src="/images/produce_Item02.jpg" style={{display:'block',width: "100%"}}/>
                          <h3>一致性评价市场分析---抗生素篇.</h3>
                          <div className="produce-card-price">¥0</div>
                          <p  className="produce-card-footer">
                              <span style={{textAlign:'left'}}>4322人订阅</span>
                              <i className="produce-card-icon">点击进入</i>
                          </p>
                      </Link>
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
        hospitalFilter:state.Produce,
        searchAreaType:state.provicen.searchAreaType
    }
}

export default connect(select)(Produce);