import React,{Component} from 'react';
export default class ChartSingle extends Component{
	render(){
        
        if(this.props.data){
            const sid = this.props.data.salesId || this.props.data.conceptId;
            return(
                
                <div className="col text-center">
                    <h3><span className="tag">{this.props.data.icoType}</span>{this.props.data.cwmName}</h3>
                    <h5 className="text zb">{this.props.data.sales}万</h5>
                    <div className="row footer-row">
                        <span className="col balanced">{this.props.data.changeCost}</span>
                        <span className="col assertive">{this.props.data.change}%</span>
                    </div>
                </div>
            )
        }else{
            return(
                <div>null</div>
            )
        }
		
	}
}