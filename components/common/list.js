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
					<span className="assertive" style={{marginLeft:'1rem'}}>增长额： {this.props.data.changeCost}%</span>
			} else {
				string =
					<span className="balanced" style={{marginLeft:'1rem'}}>增长额： {this.props.data.changeCost}%</span>
			}
			return string;
		})();
		return (
			<li className="item">
				<div>
					{this.props.data.genericName}
					<span className="tag">{this.props.data.icoType}</span>
					{change}
				</div>
				<p>
					<span>销售额：{this.props.data.sales}万</span>
					{changeCost}
				</p>
			</li>
		)
	}
}
