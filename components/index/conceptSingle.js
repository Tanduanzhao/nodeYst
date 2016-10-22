/*
    分类涨幅榜品种信息
*/

import React,{Component} from 'react';
export default class ConceptSingle extends Component{
	render(){
        var string = null;
        var change = (()=>{
            if (this.props.data.change == "" ) {
                string=""
            } else if (this.props.data.change >= 0 ) {
                string=<span className="col assertive">{this.props.data.change}%</span>
            } else {
                string=<span className="col balanced">{this.props.data.change}%</span>
            }
            return string;
        })();
        var tag = (()=>{
          if(this.props.data.icoType){
            string = <span className= 'tag' >{this.props.data.icoType}</span>;
          }else{
            string = "";
          }
          return string;
        })();
        var changeCost = (()=>{
            if (this.props.data.changeCost >= 0 ) {
                string=<span className="col assertive">{this.props.data.changeCost}</span>
            } else {
                string=<span className="col balanced">{this.props.data.changeCost}</span>
            }
            return string;
        })();
        if(this.props.data){
            const cid = this.props.data.conceptId;
            return(
                <div className="col text-center">
                    <h3>
                      {tag}
                      {this.props.data.conceptName}
                    </h3>
                    <h5 className="text zb">{this.props.data.sales}万</h5>
                    <div className="row footer-row">
                        {changeCost}
                        {change}
                    </div>
                </div>
            )
        }else{
            return(
                <div>null</div>
            )
        }
		
	}
}