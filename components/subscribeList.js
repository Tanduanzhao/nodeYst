import React,{Component} from 'react';
import {Link} from 'react-router';
export default class SubscribeList extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Link className="item" to={`/subscribePageAll/${this.props.dataSources.id}`}>
				<div className="item-left">
					<img src={this.props.dataSources.mainImg} alt=""/>
				</div>
				<div className="item-right">
					<h3 className="item-nowrap title">{this.props.dataSources.title}</h3>
					<div className="introduce">{this.props.dataSources.columnBriefContent}</div>
					<div className="article">
						<div className="energized">{this.props.dataSources.publishDate} <span>更新</span></div>《{this.props.dataSources.reportTitle}》
					</div>
				</div>
			</Link>
		)
	}
}
