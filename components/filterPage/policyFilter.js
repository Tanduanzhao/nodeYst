import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class Filter extends Component{
    constructor(props) {
	  super(props);
	  this.state = {
	  	areaId:this.props.hospitalFilter.areaId,
	  	areaName:this.props.hospitalFilter.areaName,
        searchAreaType:this.props.hospitalFilter.searchAreaType,
        yearMonth:this.props.hospitalFilter.yearMonth,
        hospitalLevel:this.props.hospitalFilter.hospitalLevel,
          municipality:this.props.hospitalFilter.municipality,
          hospital:this.props.hospitalFilter.hospital
	  };
	}
    _cancelButton(){
        this.props.dispatch({
            type:'UNSHOWFILTER'
        })
    }
    _sureButton(){
        this.props.fn(this.state);
    }
    _spanhandleClick(id,e,t){
		this.setState({
			areaId :id,
			areaName: e,
            searchAreaType:t
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
                            {
                                this.props.dataSources.map((ele)=>{
                                  if(true){
                                    return(
                                        <div key={ele.id}>
                                            <h3 className="list-horizontal-title"><span>{ele.areaName}</span></h3>
                                            <ul className="list-horizontal-block">
                                                {
                                                    ele.children.map((v)=>{
                                                      if (this.state.municipality == 1){
                                                        if( v.municipality != null && v.municipality != undefined){
                                                          return <li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.areaName,v.searchAreaType)} key={v.id}>{v.areaName}</li>
                                                        }
                                                      }else{
                                                        return <li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.areaName,v.searchAreaType)} key={v.id}>{v.areaName}</li>
                                                      }
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                  }
                                })
                            }
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