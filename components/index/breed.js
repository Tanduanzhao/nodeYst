/*
	品种影响力排行榜
*/ 
import React,{Component} from 'react';

import List from '../common/list.js';
import LinkBar from './linkBar.js';
import BreedSingle from './breedSingle.js';
import EmptyComponent from '../common/emptyComponent';
export default class Breed extends Component{
    constructor(props) {
        super(props);
        this.state ={
            dataSources:this.props.dataSources
        }
    }
	render(){
        if(this.props.dataSources.length != 0){
            return(
                <div className="list item-divider item-text-wrap"  style={{marginTop: 0,wordBreak: 'break-all'}}>
                    <LinkBar {...this.props} link="/rise/breed" title="品种影响力排行榜" icon="breed"/>
                    <div className="row item" style={{ padding: '10px',color: '#0894ec',fontSize: '.6rem'}}>
                        <div className="col text-left">通用名</div>
                        <div className="col text-center">市场规模(万)</div>
                        <div className="col text-center">增长额(万)</div>
                        <div className="col col-flex-last text-center">增长率</div>
                    </div>
                    <div className="border horizontal list">
                        {
                            this.state.dataSources.map((ele)=>{
                                return <BreedSingle data={ele} key={ele.id}/>
                            })
                        }
                    </div>
                </div>
            )
        }else{
            return(
                <div className="list card">
                    <LinkBar {...this.props} link="/rise/breed" title="品种影响力排行榜"/>
                    <EmptyComponent/>
                </div>
            )
        }
	}
}