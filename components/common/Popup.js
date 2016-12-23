import React, {Component}from 'react';
import {glodBox,cashBox} from './../function/ajax';
export default class Popup extends Component {
	render(){
		return(
			<div style={{width:'100%',height:'100%'}}>
				<div className="backdrop visible active"></div>
				<div className="popup-container popup-showing active">
					<div className="popup">
						<div className="popup-body">
							<span> 尊敬的用户：您好！感谢对药市通的关注，恭喜您获得三天会员的免费体验资格，点击页面下方领取新人福利，药市通｢行情｣、｢数据｣模块任意查询。</span>
						</div>
						{
							//<div className="popup-buttons">
							//	<button onClick={this.props.popupCancel} className="button ng-binding button-default">未支付</button>
							//	<button onClick={this.props.popupSure} className="button ng-binding button-positive">已支付</button>
							//</div>
						}

					</div>
				</div>
			</div>
		)
	}
}