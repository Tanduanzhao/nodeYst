import React,{Component} from 'react';
export default class List extends Component {
	render() {
		var string = null;
		var change = (()=> {
			if (this.props.data.change == "") {
				string = ""
			} else if (this.props.data.change >= 0) {
				string = <span className="item-note assertive">{this.props.data.change}%</span>
			} else {
				string = <span className="item-note balanced  ">{this.props.data.change}%</span>
			}
			return string;
		})();
		var changeCost = (()=> {
			if (this.props.data.changeCost >= 0) {
				string =
					<span className="assertive" style={{marginLeft:'1rem'}}>增长额： {this.props.data.changeCost}万</span>
			} else {
				string =
					<span className="balanced" style={{marginLeft:'1rem'}}>增长额： {this.props.data.changeCost}万</span>
			}
			return string;
		})();
		return (
		<li class="row item item-text-wrap" style={{whiteSpace: 'normal',wordBreak:'break-all'}}>
			<div class="col-33"><span className="tag">{this.props.data.icoType}</span>{this.props.data.genericName}</div>
			<div class="col-25">{change}</div>
			<div class="col-25">{this.props.data.sales}</div>
			<div class="col">{changeCost}</div>
		</li>
		)
	}
}
