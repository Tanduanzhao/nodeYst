import React,{Component} from 'react';
export default class NormalHeaderBar extends Component{
	render(){
		return(
			<div className="bar bar-header bar-positive">
				<div className="buttons">
                    <button className="button" onClick={this.props.cancelButton}>取消</button>
                </div>
				<h1 className="title">{this.props.title}</h1>
				<div className="buttons">
                    <button className="button" onClick={this.props.sureButton}>确定</button>
                </div>
			</div>
		)
	}
}