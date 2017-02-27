/*
 论坛模块
 */
import $ from 'jquery';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {HTTPURL} from './config.js';
import {baseUserSynchronous} from './function/ajax';
class Community extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.iframepage.src = HTTPURL+'/bbs/forum.php';
    }

    render() {
        return (
            <div className="root">
                <div className="scroll-content">
                    <iframe ref="iframepage" width='100%' height='100%'></iframe>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        stores: state.userInfo,
        userInfo: state.userInfo
    }
}
export default connect(select)(Community);