/*
	品种影响力排行榜
*/ 
import React,{Component} from 'react';

import List from '../common/list.js';
import LinkBar from './linkBar.js';

export default class Breed extends Component{
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
                    <LinkBar title="品种影响力排行榜"/>
                    <div className="row horizontal">
                        {
                            this.props.dataSources.map((ele)=>{
                                return <List data={ele} key={ele.id}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar title="品种影响力排行榜"/>
                    <div>null</div>
                </div>
            )
        }
	}
}