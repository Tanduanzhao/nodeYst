import React,{Component} from 'react';
import {Link} from 'react-router';
export default class SubscribeList extends Component {
	constructor(props){
		super(props);
	}
	_unSubScribe(e){
		e.preventDefault();
		e.stopPropagation();
		this.props.showPopup(this.props.dataSources.id,this.props.dataSources.title);
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
					<div className="item-right-footer">
						<span>{this.props.dataSources.subscribeNum}人订阅</span>
						{
							this.props.dataSources.isSubscribe == 1 || this.props.isSubscribe == this.props.dataSources.id
								?<span className="item-button energized-bg" style={{background: '#ddd'}}>已订阅</span>
								:<span className="item-button energized-bg" onClick={this._unSubScribe.bind(this)}>订阅</span>
						}
					</div>
				</div>
			</Link>
		)
	}
}
