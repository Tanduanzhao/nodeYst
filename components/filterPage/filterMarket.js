import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar.js';
export default class FilterMarket extends Component{
	constructor(props) {
	  super(props);
		this.state = {
			areaId: this.props.areaId,
			areaName: this.props.areaName,
			yearMonth: this.props.yearMonth,
			searchAreaType: this.props.searchAreaType
		};
	}

	//确定筛算
	_sureButton(){
        this.props.fn(this.state);
	}

	//取消筛算
	_cancelButton(){
		this.props.hideFilter()
	}

	_spanhandleClick(id,e,t){
		this.setState({
			areaId :id,
			areaName: e,
            searchAreaType:t
		})
	}

	_changeYearMonth(){
		console.log(this.refs.maxFactoryNumber.value,"value");
		this.props.dispatch({
			type:'CHANGEFACTORYNUMBER',
			min:this.refs.minFactoryNumber.value,
			max:this.refs.maxFactoryNumber.value
		})
	}
	//切换时间 增加年份
	increaseHandle(){
		if(this.state.yearMonth==2015){return false}
		this.setState({
			yearMonth: ++this.state.yearMonth
		})
	}

	//切换时间 减少年份
	decreaseHandle(){
		this.setState({
			yearMonth: --this.state.yearMonth
		})
	}
	render(){
		return(
			<div className="modal-backdrop">
                <div className="modal-backdrop-bg"></div>
                    <div className="modal">
                        <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
                        <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
							<h2 className="item item-divider">时间</h2>
							<div className="list padding market-time-icon">
								<div className="buttons">
									<button onClick={this.decreaseHandle.bind(this)} className="button button-icon icon ion-arrow-left-b"></button>
									<div className="button time">{this.state.yearMonth}</div>
									<button onClick={this.increaseHandle.bind(this)} className="button button-icon icon ion-arrow-right-b"></button>
								</div>
							</div>
							<h2 className="item item-divider">省份</h2>
                            {
                                this.props.dataSources.map((ele)=>{
                                    return(
                                        <div key={ele.id} className="padding">
                                            <h3 className="list-horizontal-title"><span>{ele.areaName}</span></h3>
                                            <ul className="list-horizontal-block">
                                            {
                                                ele.children.map((v)=>{
                                                    return	<li style={(v.id == this.state.areaId) ? styles.active : null} onClick={this._spanhandleClick.bind(this,v.id,v.showAreaName,v.searchAreaType)} key={v.id}>{v.areaName}</li> 
                                                })
                                            }
                                            </ul>
                                        </div>
                                    )
                                })
                            }
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
	}
}

