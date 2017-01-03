/*
    概念涨幅榜
*/

import React,{Component} from 'react';

import FactorySingle from './factorySingle.js';
import LinkBar from './linkBar.js';
import EmptyComponent from '../common/emptyComponent';
export default class Factory extends Component{
	render(){
        if(this.props.dataSources.length != 0){
            return(
                <div className="list card item-divider item-text-wrap"  style={{marginTop: 0,wordBreak: 'break-all'}}>
                    <LinkBar link="rise/factory" title="厂家影响力排行榜" icon="factory"/>
                    <div className="row item" style={{ padding: '10px',color: '#0894ec',fontSize: '.6rem'}}>
                        <div className="col text-left">厂家</div>
                        <div className="col text-center">市场规模(万)</div>
                        <div className="col text-center">增长额(万)</div>
                        <div className="col col-flex-last text-center">增长率</div>
                    </div>
                    <div className="border horizontal list">
                        {
                            this.props.dataSources.map((ele)=>{
                                return <FactorySingle data={ele} key={ele.id+Math.random()}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar link="/rise/factory" title="厂家影响力排行榜"/>
                    <EmptyComponent/>
                </div>
            )
        }
	}
}