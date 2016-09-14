/*
   免费报告
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
export default class  Free extends Component{
    render(){
        return(
          <div className="root free-views">
              <img src="/images/free/free_01.jpg" alt=""/>
              <img src="/images/free/free_02.jpg" alt="" />
              <img src="/images/free/free_03.jpg" alt="" />
              <img src="/images/free/free_04.jpg" alt="" />
              <img src="/images/free/free_05jpg" alt="" />
              <img src="/images/free/free_06jpg" alt="" />
          </div>
        )
    }
}
