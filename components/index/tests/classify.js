import React,{Component} from 'react';
import ClassifySingle from './../classifySingle.js';
import LinkBar from './../linkBar.js';
import EmptyComponent from '../../common/emptyComponent';
export default class Classify extends Component{
	render(){
        console.log(this.props.dataSources.length,'this.props.dataSources');
        if(this.props.dataSources.length != 0){
            return(
                <div className="list card">
                    <LinkBar link="rise/classify" title="分类涨幅榜"/>
                    <div className="row item" style={{ padding: '10px 0',fontSize: ' .7rem'}}>
                        <div className="col-33 text-center">一级分类</div>
                        <div className="col-25 text-center">市场规模(万)</div>
                        <div className="col-25 text-center">增长额(万)</div>
                        <div className="col text-center">增长率</div>
                    </div>
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