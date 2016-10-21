import React,{Component} from 'react';
export default class Picture extends Component{
    constructor(props){
        super(props);
        this.state={
            url:this.props.params.url
        };
    }
    render(){
        return(
            <div className="root">
                <div  className="scroll-iframe" style={{width:'100%',height:'100%',overflowScrolling:'touch',overFlow:'auto'}}>
                    <iframe ref='frame' style={{display:'flex',overFlow:'auto'}} width="100%" height="100%" name="iFrame1" width="100%" scrolling="yes" src={this.state.url}>

                    </iframe>
                </div>
            </div>
        )
    }
}