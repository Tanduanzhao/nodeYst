/*
    医院列表
*/
import React,{Component} from 'react';
export default class HospitalList extends Component{
    render(){
        return(
            <div className="root">
                <HeaderBar/>
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header item-input-inset">
                <button className="button button-clear">
                    Cancel
                </button>
                <label className="item-input-wrapper">
                    <i className="icon ion-ios-search placeholder-icon"></i>
                    <input type="search" placeholder="Search"/>
                </label>
                <button className="button button-clear">
                    Cancel
                </button>
            </div>
        )
    }
}