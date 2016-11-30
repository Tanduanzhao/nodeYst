import React,{Component} from 'react';
import {Link} from 'react-router';
export default class SubscribeAllList extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Link className="item" to={`/subscribePageList/${this.props.id}/${this.props.dataSources.id}`}>
				<div className="item-left">
					<img src={this.props.dataSources.mainImg} alt=""/>
				</div>
				<div className="item-right">
					<h3 className="item-nowrap title">{this.props.dataSources.typeName}</h3>
					<p className="introduce" style={{fontSize:".6rem"}}>
						{this.props.dataSources.typeBriefContent}
					</p>
				</div>
			</Link>
		)
	}
}
