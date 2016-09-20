import React,{Component} from 'react';
export default class List extends Component{
	render(){
		var string = null;
		var change = (()=>{
			if (this.props.data.change == "" ) {
				string=""
			}else if (this.props.data.change >= 0 ) {
				string=<div className="col-20 assertive">{this.props.data.change}%</div>
			} else {
				string=<div className="col-20 balanced">{this.props.data.change}%</div>
			}
			return string;
		})();
		var changeCost = (()=>{
			if (this.props.data.changeCost >= 0 ) {
				string=<div className="col-20 assertive">{this.props.data.changeCost}</div>
			} else {
				string=<div className="col-20 balanced">{this.props.data.changeCost}</div>
			}
			return string;
		})();
		return(
			<div className="row item list-line text-center">
				<div className="col text-left">{this.props.data.genericName}<span className="tag">{this.props.data.icoType}</span></div>
				<div className="col-20">{this.props.data.sales}万</div>
				{changeCost}
				{change}
			</div>
		)
	}
}