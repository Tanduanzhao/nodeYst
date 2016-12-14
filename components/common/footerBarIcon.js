import React, {
	Component
}
from 'react';
import {Link} from 'react-router';
export
default class FooterBarIcon extends Component {
	render() {
		return (
			<Link to={`${this.props.uri}`} onClick={this.props.fn} style={this.props.style} className="tab-item">
				<i className={"ion-"+this.props.icon + " icon"}></i>
				<span>{this.props.title}</span>
			</Link>
		)
	}
}