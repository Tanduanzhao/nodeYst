import React,{Component} from 'react';
export default class Collectpopup extends Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}  onClick={this.props.collectPopupCancelall}>
                <div className="backdrop visible active"></div>
                <div className="popup-container popup-showing active">
                    <div className="popup">
                        <div className="popup-body list" style={{padding:'0'}}>
                            <button className="item"  onClick={this.props.collectPopupCancel} style={{width:'100%',margin:'0',padding: '8px 0 8px 15px',textAlign:'left'}}>取消收藏</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}