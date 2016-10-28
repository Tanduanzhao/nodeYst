import React,{Component} from 'react';
import {Link} from 'react-router';
export default class ReportList extends Component {
	constructor(props){
		super(props);
		this.state={
			showPopup:false
		};
	}
	render(){
		var string = null;
		var tag = (()=>{
			if(this.props.BuyReportList || this.props.dataSources.buyReport == 1){
				string = <i className="item-icon">点击查看</i>;
			}else{
				if(this.props.dataSources.costStatus == "1"){
					string = <i className="item-icon">报告试读</i>;
				}else{
					string = <i className="item-icon">点击查看</i>;
				}
			}
			return string;
		})();
		if(this.props.reportTag || this.props.BuyReportList){
			var number = (()=>{
				if(this.props.dataSources.costStatus == "1"){
					string = <span style={{textAlign:"left"}}>{this.props.dataSources.number}人购买</span>;
				}else{
					string =<span style={{textAlign:"left"}}>{this.props.dataSources.number}人查看</span>;
				}
				return string;
			})();
		}else{
			var number = (()=>{
				if(this.props.dataSources.costStatus == "1"){
					string = <span style={{textAlign:"left"}}>{this.props.dataSources.num}人购买</span>;
				}else{
					string =<span style={{textAlign:"left"}}>{this.props.dataSources.num}人查看</span>;
				}
				return string;
			})();
		}
		if(this.props.dataSources.price == null || this.props.dataSources.price == undefined){
			this.state= {
				price: 0
			}
		}else{
			this.state= {
				price: this.props.dataSources.price
			}
		}
		//let isCanViewReport = false;
		//if(this.props.dataSources.costStatus == '1' && this.props.dataSources.buyReport == '0'){
		//	isCanViewReport = false;
		//}else{
		//	isCanViewReport = true;
		//}
		return(
			<div>
				{
					//isCanViewReport ?
						<Link to={`/pdf/${this.props.dataSources.id}/${this.props.dataSources.title}`}  className="item">
						<div  className="item-left">
							<img src={this.props.dataSources.mainImg} alt=""/>
						</div>
						<div className="item-right">
							<h3>{this.props.dataSources.title}</h3>
							<p>¥{this.state.price}</p>
							<div className="item-right-footer">
								{number}
								{tag}
							</div>
						</div>
					</Link>
					//:<a onClick={()=>this.props.openProductView(this.props.dataSources.id)}  className="item">
					//		<div  className="item-left">
					//			<img src={this.props.dataSources.mainImg} alt=""/>
					//		</div>
					//		<div className="item-right">
					//			<h3>{this.props.dataSources.title}</h3>
					//			<p>¥{this.state.price}</p>
					//			<div className="item-right-footer">
					//				{number}
					//				{tag}
					//			</div>
					//		</div>
					//	</a>
				}
			</div>
		)
	}
}
