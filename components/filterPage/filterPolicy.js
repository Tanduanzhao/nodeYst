import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterPolicy extends Component{
    constructor(props) {
	  super(props);
	  this.state = {
          areaId:this.props.areaId,
          areaName:this.props.areaName
      };
      console.log(this.props.dataSources);
	}
    _cancelButton(){
        this.props.cancelButton();
    }
    _sureButton(){
        this.props.fn(this.state);
    }
    _spanhandleClick(id,e,t){
		this.setState({
			areaId :id,
			areaName: e
		})
	}
    render(){
        return(
            <div className="modal-backdrop">
                <div className="modal-backdrop-bg"></div>
                <div className="modal">
                    <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
                    <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
                       <h2 className="item item-divider">区域选择</h2>
                       <div className="list padding">
                            <ul className="list-horizontal-block">
                                {
                                    this.props.dataSources.map((v)=>{
                                        return <li style={(v.areaId == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.areaId,v.areaName)} key={v.areaId}>{v.areaName}</li>
                                    })
                                }
                            </ul>
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}
const styles = {
	active:{
		backgroundColor:'#0284D0',
		color:'#fff'
	},
    fTitle:{
        color:'#000',
        fontWeight:'bold'
    }
}