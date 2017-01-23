/**
 * Created by Administrator on 2017/1/16.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
class RouterPath extends Component{
    constructor(props){
        super(props);
        console.log(this.props.router,'route');
    }
    componentWillMount(){
        let path = this.props.router;
        if(this.props.params.path == this.props.router){
            path = '/'
        }else{
             path = '/'+this.props.params.path;
            this.props.dispatch({
                type:'CHANGEROUTER',
                path:this.props.params.path
            })
        }
        this.context.router.replace(path);
    }
    render(){
        return(
            <div>test</div>
        )
    }
}
function select(state){
    return{
        router:state.router
    }
}
RouterPath.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(RouterPath);