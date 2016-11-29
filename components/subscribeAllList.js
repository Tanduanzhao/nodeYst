import React,{Component} from 'react';
import {Link} from 'react-router';
export default class SubscribeAllList extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Link className="item" to={`/subscribePageList/${this.props.id}`}>
				<div className="item-left">
					<img src={this.props.dataSources.mainImg} alt=""/>
				</div>
				<div className="item-right">
					<h3 className="item-nowrap title">{this.props.dataSources.title}</h3>
					<p className="introduce" style={{fontSize:".6rem"}}>一句话简介    In at lorem quam. Curabitur in massa tristique, laoreet quam in, mattis neque. Donec sagittis gravida ipsum sit amet consequat. Vivamus a efficitur sapien. Vestibulum in ultrices lorem. Integer ultricies ipsum et risus efficitur, vitae posuere nibh mollis. Vestibulum cursus elementum augue, a bibendum tellus eleifend a. Praesent viverra tortor sit amet varius ornare. Vivamus maximus neque id enim suscipit vestibulum.
					</p>
				</div>
			</Link>
		)
	}
}
