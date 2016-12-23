import React,{Component} from 'react';
import ClassifySingle from './classifySingle.js';
import LinkBar from './linkBar.js';
import EmptyComponent from '../common/emptyComponent';
export default class Classify extends Component{
	render(){
        console.log(this.props.dataSources.length,'this.props.dataSources');
        if(this.props.dataSources.length != 0){
            return(
                <div className="list item-divider item-text-wrap" style={{wordBreak: 'break-all'}}>
                    <LinkBar link="rise/classify" title="分类排行榜" icon="classify"/>
                    <div className="row item" style={{ padding: '10px',fontSize: ' .6rem',color: '#0894ec'}}>
                        <div className="col text-left">一级分类</div>
                        <div className="col text-center">市场规模(万)</div>
                        <div className="col text-center">增长额(万)</div>
                        <div className="col col-flex-last text-center">增长率</div>
                    </div>
                    <div className="border horizontal list">
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