import React,{Component} from 'react';
export default class Popup extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}>
                <div className="backdrop visible active"></div>
                <div className="popup-container popup-showing active">
                    <div className="popup"  style={{borderRadius: '5px'}}>
                        <div className="popup-body"  style={{ padding: '20px 10px',fontSize: '18px', textAlign: 'center'}}>
                            <span>{this.props.content}</span>
                        </div>
                        <div className="popup-buttons">
                            <button onClick={this.props.popupSure} className="button ng-binding button-positive">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}