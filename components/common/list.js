import React,{Component} from 'react';
export default class List extends Component{
	render(){
		return(
			<div className="row item list-line text-center">
				<div className="col text-left">{this.props.data.genericName}<span className="tag">{this.props.data.icoType}</span></div>
				<div className="col-20">{this.props.data.sales}万</div>
				<div className="col-20">{this.props.data.changeCost}</div>
				<div className="col-20">{this.props.data.change}%</div>
			</div>
		)
	}
}