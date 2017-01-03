import React,{Component} from 'react';
import {Link} from 'react-router';
export default class LinkBar extends Component{
	render(){
        var icon = (()=>{
            switch(this.props.icon){
                case "breed": return  <i className="breed_icon"></i>;
                case "factory":return <i className="factory_icon"></i>;
                default : return <i className="classify_icon"></i>;
            }
        })();
		return(
                <div className="item item-divider market-item-top" style={{color:'#444'}}>
                    {icon}
                    {this.props.title}
                    <Link style={styles.more} to={this.props.link}>查看更多 ></Link>
                </div>
        )
	}
}
const styles ={
    more:{
        position:'absolute',
        right:'1rem',
        //fontSize:'1.2rem'
        color:'#a1a1a1'
    }
}