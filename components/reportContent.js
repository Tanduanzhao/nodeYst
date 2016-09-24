import React,{Component} from 'react';
var PDF = require('react-pdf');
export default class ReportContent extends Component{
    render(){
        return(
            <div className="root">
                <div className="scroll-content">
                    <PDF file="http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"/>
                </div>
            </div>
        )
    }
}