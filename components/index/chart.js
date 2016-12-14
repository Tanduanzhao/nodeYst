import React,{Component} from 'react';

import ChartSingle from './chartSingle.js';
import EmptyComponent from '../common/emptyComponent'
export default class Chart extends Component{
	render(){
        if(this.props.dataSources.length != 0){
            return(
                <div className="row">
                    {
                        this.props.dataSources.map((ele) => {
                            return (
                                <ChartSingle data = {ele} key={ele.cwmName}/>
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