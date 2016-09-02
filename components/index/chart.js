import React,{Component} from 'react';

import ClassifySingle from './classifySingle.js';
export default class Chart extends Component{
	render(){
        if(this.props.dataSources){
            return(
                <div className="row">
                    {
                        this.props.dataSources.map((ele) => {
                            return (
                                <ClassifySingle data = {ele} key={ele.cwmName}/>
                            )
                        })
                    }
                </div>
            )
        }else{
            return (<div>null</div>)
        }
		
	}
}