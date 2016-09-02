/*
    概念涨幅榜
*/

import React,{Component} from 'react';

import ClassifySingle from  './classifySingle.js';
import LinkBar from './linkBar.js';
export default class Concept extends Component{
    componentDidMount(){
        console.log(this.refs);
    }
	render(){
		var data = [
			{
				salesName:'其他用药1',
				icoType:201,
				changeCost:'+21',
				change:'+41.77'
			},
			{
				salesName:'其他用药2',
				icoType:201,
				changeCost:'+21',
				change:'+41.77'
			},
			{
				salesName:'其他用药3',
				icoType:201,
				changeCost:'+21',
				change:'+41.77'
			},
			{
				salesName:'其他用药4',
				icoType:201,
				changeCost:'+21',
				change:'+41.77'
			},
			{
				salesName:'其他用药5',
				icoType:201,
				changeCost:'+21',
				change:'+41.77'
			}
		];
        
        if(this.props.dataSources){
            return(
                <div className="list card">
                    <LinkBar title="概念涨幅榜"/>
                    <div className="row horizontal">
                        {
                            this.props.dataSources.map((ele)=>{
                                return <ClassifySingle data={ele} key={ele.id}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar title="概念涨幅榜"/>
                    <div>null</div>
                </div>
            )
        }
	}
}