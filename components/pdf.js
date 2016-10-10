import React,{Component} from 'react';
export default class Pdf extends Component{
    constructor(props){
        super(props);
        
    }
    componentWillMount(){
        
//        if(/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())){
//           this.url = `http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId=${this.props.params.id}`;
//        }
//        this.url = `/pdf?file=http://yst-test.immortalshealth.com/pub/resources/reports/test.pdf`;
    }
    componentDidMount(){
        console.dir(this.refs.frame)
    }
    render(){
        this.url = `http://yst-test.immortalshealth.com/pdfjs-1.1.114-dist/web/viewer.html?file=http://yst-test.immortalshealth.com/modm/pub/getPubPdf?reportId%3D${this.props.params.id}`;
        return(
            <div className="root">
                <div style={{width:'100%',height:'100%',overflowScrolling:'touch',overFlow:'auto'}}>
                    <iframe ref='frame' style={{display:'block',overFlow:'auto'}} width="100%" height="100%" name="iFrame1" width="100%" scrolling="yes" src={this.url}></iframe>
                </div>
            </div>
        )
    }
}