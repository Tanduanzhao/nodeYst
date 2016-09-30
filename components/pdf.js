import React,{Component} from 'react';
export default class Pdf extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="root">
                <iframe width="100%" height="100%" src={`http://yst-test.immortalshealth.com/pdf?file=${encodeURIComponent("http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId="+this.props.params.id)}`}></iframe>
            </div>
        )
    }
}