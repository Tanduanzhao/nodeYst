import React,{Component} from 'react';
import ClassifySingle from './classifySingle.js';
import LinkBar from './linkBar.js';
import EmptyComponent from '../emptyComponent';
export default class Classify extends Component{
	render(){
        console.log(this.props.dataSources.length,'this.props.dataSources');
        if(this.props.dataSources.length != 0){
            return(
                <div className="list card">
                    <LinkBar link="rise/classify" title="分类涨幅榜"/>
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
                    <LinkBar link="rise/classify" title="分类涨幅榜"/>
                    <EmptyComponent/>
                </div>
            )
        }
	}
}