import React,{Component} from 'react';
export default class Popup extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%',position: 'absolute',top:'0',left:'0'}}>
                <div className="backdrop visible active"></div>
                <div className="popup-container popup-showing active">
                    <div className="popup">
                        <div className="popup-body">
                            <span>您已经进入报告购买，感谢您购买！</span>
                        </div>
                        <div className="popup-buttons">
                            <button onClick={this.props.popupCancel} className="button ng-binding button-default">未支付</button>
                            <button onClick={this.props.popupSure} className="button ng-binding button-positive">已支付</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}