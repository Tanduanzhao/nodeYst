import React,{Component} from 'react';
import ClassifySingle from './classifySingle.js';
import LinkBar from './linkBar.js';
export default class Classify extends Component{
	render(){
        if(this.props.dataSources){
            return(
                <div className="list card">
                    <LinkBar title="分类涨幅榜"/>
                    <div className="row horizontal">
                        {
                            this.props.dataSources.map((ele)=>{
                                return <ClassifySingle data={ele} key={ele.salesName}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar title="分类涨幅榜"/>
                    <div>null</div>
                </div>
            )
        }
	}
}