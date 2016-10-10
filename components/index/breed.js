/*
	品种影响力排行榜
*/ 
import React,{Component} from 'react';

import List from '../common/list.js';
import LinkBar from './linkBar.js';
import EmptyComponent from '../emptyComponent';
export default class Breed extends Component{
	render(){
        if(this.props.dataSources.length != 0){
            return(
                <div className="list card">
                    <LinkBar link="/rise/breed" title="品种影响力排行榜"/>
                    <div className="border horizontal list">
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
                    <LinkBar link="/rise/breed" title="品种影响力排行榜"/>
                    <EmptyComponent/>
                </div>
            )
        }
	}
}