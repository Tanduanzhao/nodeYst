import React,{Component} from 'react';
import {Link} from 'react-router';
export default class FactorySingle extends Component{
	render(){
        var string = null;
        var change = (()=>{
            if (this.props.data.change == "" ) {
                string=""
            } else if(this.props.data.change >= 0){
                string=<span className="col col-flex-last text-center assertive">{this.props.data.change}%</span>
            }else {
                string=<span className="col col-flex-last text-center balanced">{this.props.data.change}%</span>
            }
            return string;
        })();
        var changeCost = (()=>{
            if (this.props.data.changeCost >= 0 ) {
                string=<span className="col text-center assertive">{this.props.data.changeCost}</span>
            } else {
                string=<span className="col text-center balanced">{this.props.data.changeCost}</span>
            }
            return string;
        })();
        if(this.props.data){
            const sid = this.props.data.salesId || this.props.data.conceptId;
            return(
            <Link to={`/market/marketSearch/marketSearchDetail/${encodeURIComponent(encodeURIComponent(this.props.data.factoryAbbrCl))}/${this.props.data.id}`} className="row item" style={{ padding: '10px',fontSize: '.6rem'}}>
                    <h3 className="col"  style={{fontSize: '.6rem'}}>{this.props.data.factoryAbbrCl}</h3>
                    <div className="col text-center">{this.props.data.sales}</div>
                    {changeCost}
                    {change}
                </Link>
            )
        }else{
            return(
                <div>null</div>
            )
        }
		
	}
}