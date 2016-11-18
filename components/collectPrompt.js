import React,{Component} from 'react';
export default class CollectPrompt extends Component{
    render(){
        return(
            <div style={{
               position: 'absolute',left: '50%',bottom: '85px',zIndex: '98', color: '#fff',fontSize: '12px',display: 'inline-block', background: '#333',padding: '6px 0',borderRadius: '5px',width: '60px', marginLeft: '-30px',textAlign: 'center',letterSpacing: '1px'}}>
                {this.props.showPromptMes}
            </div>
        )
    }
}