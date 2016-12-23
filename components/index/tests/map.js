import React,{Component} from 'react';

import MapSingle from './mapSingle.js';
import EmptyComponent from '../../common/emptyComponent'
export default class Map extends Component{
	render(){
        if(this.props.dataSources.length != 0){
            return(
                <div className="row item" style={{padding:'9px'}}>
                    {
                        this.props.dataSources.map((ele) => {
                            return (
                                <MapSingle data = {ele}  areaName={this.props.areaName} key={ele.id}/>
                            )
                        })
                    }
                </div>
            )
        }else{
            return (<EmptyComponent/>)
        }
		
	}
}