import React,{Component} from 'react';
import {Link} from 'react-router';
export default class LinkBar extends Component{
	render(){
        console.log(this.props.link,'this.props.link');
		return(
                <div className="item">
                    <strong>{this.props.title}</strong>
                    <Link style={styles.more} to={this.props.link}><i className="icon ion-android-more-horizontal"></i></Link>
                </div>
        )
	}
}
const styles ={
    more:{
        position:'absolute',
        right:'1rem',
        fontSize:'1.2rem'
    }
}