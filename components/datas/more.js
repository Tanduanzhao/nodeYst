import React, {Component}from 'react';
import {Link} from 'react-router';
export default class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:false
		};
	}
	render() {
		return (
				<div className="more"  onClick={()=>{(this.state.show)?this.setState({show:false}): this.setState({show:true})}}>
					<div><i className="icon ion-android-more-horizontal"></i></div>
					<div className="more-content" style={(this.state.show) ? styles.active :styles.hidden}>
						<div className="more-footer">
							<ul className="column">
								<Link to="/home">
									<img src="/images/column_more_home.jpg" alt=""/>
									首页
								</Link>
								<Link to="/report">
									<img src="/images/column01.jpg" alt=""/>
									报告
								</Link>
								<Link to="/">
									<img src="/images/column_more_report.jpg" alt=""/>
									行情
								</Link>
								<Link to="/datas/marketPrice">
									<img src="/images/column07.jpg" alt="" className="price-icon"/>
									入市价
								</Link>
								<Link to="/hospitalList">
									<img src="/images/column02.jpg" alt=""/>
									中标数据
								</Link>
								<Link to="/datas/policy">
									<img src="/images/column03.jpg" alt=""/>
									政策准入
								</Link>
								<Link to="/datas/bidList">
									<img src="/images/column05.jpg" alt=""/>
									产品数据
								</Link>
							</ul>
						</div>
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