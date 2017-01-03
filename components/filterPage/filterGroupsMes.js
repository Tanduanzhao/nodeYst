import React,{Component} from 'react';
import NormalHeaderBar from './../common/normalHeaderBar';
export default class FilterGroups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      min:null,
      max:null,
      catalogId:this.props.catalogId,
      catalogTypeId:this.props.catalogTypeId
    };
  }
  _cancelButton(){
    this.props.hideFilter()
  }
  _sureButton(){
    this.props.fn(this.state);
  }
  _itemHandler(id){
      this.setState({
          catalogTypeId : (this.state.catalogTypeId == id ? null : id)
      })
  }
  render(){
    return(
      <div className="modal-backdrop">
        <div className="modal-backdrop-bg"></div>
        <div className="modal">
          <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
          <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
            <h2 className="item item-divider">目录类型</h2>
              <ul className="list">
                {
                    this.props.types.map((ele)=>{
                        return <li className="item" key={ele.catalogTypeId} style={(this.state.catalogTypeId == ele.catalogTypeId) ? styles.active : null} onClick={this._itemHandler.bind(this,ele.catalogTypeId)}>{ele.catalogType}</li>
                    })
                }
              </ul>
          </div>
        </div>
      </div>
    )
  }
}
const styles = {
  active:{
    backgroundColor:'#0284D0',
    color:'#fff'
  },
  fTitle:{
    color:'#000',
    fontWeight:'bold'
  }
}