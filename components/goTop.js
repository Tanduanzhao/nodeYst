import React, {Component}from 'react';
import {Link} from 'react-router';
export default class Gotop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false
		};
	}
	render() {
		return (
				<div className="more"  style={{bottom:'50px',right:'25px',background:'#cdcdcd'}} onClick={()=>{(this.state.show)?this.setState({show:false}): this.setState({show:true})}}>
					<div onClick={this.props.scrollTop} style={{textAlign: 'left',letterSpacing: '1px',width: '40px',marginLeft: '10px',fontSize: '12px',lineHeight: '18px',marginTop:'3px'}}>
						返回 <br/>
						顶部
					</div>
				</div>
		)
	}
}
const styles = {
	active:{
		display:'block',
		color:'#000'
	},
	hidden:{
		display:'none',
		color:'#000'
	}
}