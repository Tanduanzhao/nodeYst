import React,{Component} from 'react';
import {connect} from 'react-redux';
import FooterBar from './footerBar';
import {Link} from 'react-router';
import {loadUserInfo} from './function/ajax';

var Slider = require('react-slick');

 class Home extends Component{
	render(){
		const settings = {
			className: '',
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false
		};
		return(
			<div className="root">
				<Slider {...settings}>
					<div>
						<img src="/images/produce_Item01.jpg" alt=""/>
					</div>
					<div>
						<img src="/images/produce_Item02.jpg" alt=""/>
					</div>
					<div>
						<img src="/images/free/free_01.jpg" alt=""/>
					</div>
					<div>
						<img src="/images/free/free_02.jpg" alt=""/>
					</div>
					<div>
						<img src="/images/free/free_03.jpg" alt=""/>
					</div>
					<div>
						<img src="/images/free/free_04.jpg" alt="" style={{width:"100%"}}/>
					</div>
				</Slider>
				<FooterBar {...this.props}/>
			</div>
		)
	}
}

function select(state){
	return{
		userInfo:state.userInfo
	}
}
export default connect(select)(Home);
