/*
	品种影响力排行榜
*/ 
import React,{Component} from 'react';

import List from '../common/list.js';
import LinkBar from './linkBar.js';

export default class Breed extends Component{
	render(){
        if(this.props.dataSources){
            return(
                <div className="list card">
                    <LinkBar link="/rise/breed" title="品种影响力排行榜"/>
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