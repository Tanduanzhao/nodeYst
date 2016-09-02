import React,{Component} from 'react';
export default class SliderBar extends Component{
	render(){
		return(
			<div className="sliderBar">
				<ul>
					{
						this.props.provicen.map(function(ele){
							return <li key={ele}>{ele}</li>
						})
					}
				</ul>
			</div>
		)
	}
}