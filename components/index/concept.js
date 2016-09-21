/*
    概念涨幅榜
*/

import React,{Component} from 'react';

import ConceptSingle from  './conceptSingle.js';
import LinkBar from './linkBar.js';
import EmptyComponent from '../emptyComponent';
export default class Concept extends Component{
	render(){
        
        if(this.props.dataSources.length != 0){
            return(
                <div className="list card">
                    <LinkBar link="rise/concept" title="概念涨幅榜"/>
                    <div className="row horizontal">
                        {
                            this.props.dataSources.map((ele)=>{
                                return <ConceptSingle data={ele} key={ele.id}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar link="rise/concept" title="概念涨幅榜"/>
                    <EmptyComponent/>
                </div>
            )
        }
	}
}