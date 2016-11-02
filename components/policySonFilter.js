/*
    政策准入下面所有子栏目的筛选条件
*/
import React,{Component} from 'react';
import NormalHeaderBar from './normalHeaderBar';
import {valINarr} from './function/common';
export default class PolicySonFilter extends Component {
    constructor(props) {
	  super(props);
      this.__filterChioce = this.__filterChioce.bind(this);
	  this.state = {
          areaId:this.props.areaId || null,
          gradeId:this.props.gradeId || null,
          catalogEditionName:this.props.catalogEditionName || '',
          catalogEditionId:this.props.catalogEditionId || '',
          qualityLevelTypeIds:this.props.qualityLevelTypeIds,
          levels:this.props.levels,
          origins:this.props.origins,
          areaName:this.props.areaName || null,
          keys:[],//存储数据键
          gList:[],
          cList:[]
      };
	}
    
    _cancelButton(){
        this.props.cancelButton();
    }
    _sureButton(){
        this.props.fn(this.state);
    }
    _ahandleClick(id,index){
        console.log(this.state.keys);
        if(id == 0){
            console.log(this.state.keys);
            console.log(this.state.keys.indexOf('0') != -1);
            if(this.state.keys.indexOf(0) != -1){
                this.setState({
                    keys: []
                });
            }else{
                this.setState({
                    keys: []
                });
                let preAll = [];

                this.props.dataSources.forEach((e,i)=>{
                    preAll.push(i);
                })
                this.setState({
                    keys:preAll
                });
            }
        }else{
            if(this.state.keys.indexOf(0) != -1){
                this.setState({
                    keys:[index]
                });
            }else{
                this.setState({
                    keys:[]
                });
                this.setState({
                    keys:valINarr(this.state.keys,index)
                });
            }

        }
        setTimeout(()=>{
            this.__filterChioce(this.state.keys);
        })
        
        
	}
    __filterChioce(keys){
        var areaIdArray = [],cListArray = [],gListArray = [];
        for(let k=0;k<keys.length;k++){
            areaIdArray.push(this.props.dataSources[keys[k]].areaId);

            if(typeof this.props.dataSources[keys[k]].catalogEditions != 'undefined'){

                if(this.props.dataSources[keys[k]].catalogEditions.length !=0){

                    for(let c=0;c<this.props.dataSources[keys[k]].catalogEditions.length;c++){

                        if(this.props.dataSources[keys[k]].catalogEditions[c].grades.length!=0){

                            for(let d=0;d<this.props.dataSources[keys[k]].catalogEditions[c].grades.length;d++){
                                gListArray.push(this.props.dataSources[keys[k]].catalogEditions[c].grades[d]);   
                            }
                        }
                        if(cListArray.length>0){
                            let isInArr = false;
                            for(let e=0;e<cListArray.length;e++){
                                if(this.props.dataSources[keys[k]].catalogEditions[c].catalogEditionName == cListArray[e].catalogEditionName){
                                    isInArr = true
                                }
                            }
                            if(!isInArr){
                                cListArray.push(this.props.dataSources[keys[k]].catalogEditions[c]);
                            }


                        }else{
                            cListArray.push(this.props.dataSources[keys[k]].catalogEditions[c]);
                        }
                    }
                }
            }else{
                for(let c=0;c<this.props.dataSources[keys[k]].grades.length;c++){
                    if(this.props.dataSources[keys[k]].grades.length !=0){
                        if(cListArray.length>0){
                            let isInArr = false;
                            for(let e=0;e<cListArray.length;e++){
                                if(this.props.dataSources[keys[k]].catalogEditions[c].catalogEditionName == cListArray[e].catalogEditionName){
                                    isInArr = true
                                }
                            }
                            if(!isInArr){
                                cListArray.push(this.props.dataSources[keys[k]].catalogEditions[c]);
                            }


                        }else{
                            gListArray.push(this.props.dataSources[keys[k]].grades[c]);
                        }
                    }
                }
            }

        }
        this.setState({
            areaId:areaIdArray,
            cList:cListArray,
            gList:gListArray
        });
    }
    
    
    
    _lhandleClick(id){
        console.log(id);
        this.setState({
            qualityLevelTypeIds:valINarr(this.state.qualityLevelTypeIds,id)
        })
    }
    _chandleClick(id){
		this.setState({
			catalogEditionName :id
		})
	}
    _ghandleClick(id){
		if(this.state.gradeId == id){
            this.setState({
                gradeId :''
            });
        }else{
            this.setState({
                gradeId :id
            });
        }
	}
    componentDidMount(){
        console.log(this.props.dataSources);
        if(!this.props.qualityLevelTypeIds){
            //匹配目录
            for(let i=0;i<this.props.dataSources.length;i++){
                if(this.props.dataSources[i].areaId == this.props.areaId[0]){
                    console.log(this.props.dataSources[i].areaId,"dataSources");
                    console.log(this.props.areaId[0],"areaId");
                    this.setState({
                        keys:this.state.keys.concat([i])
                    });
                    if(this.props.dataSources[i].catalogEditions.length != 0){
                        this.setState({
                            cList:this.props.dataSources[i].catalogEditions
                        });
                        for(let n=0;n<this.props.dataSources[i].catalogEditions.length;n++){
                            if(this.props.dataSources[i].catalogEditions[n].grades.length != 0){
                                this.setState({
                                    gList:this.props.dataSources[i].catalogEditions[n].grades
                                });
                                break;
                            }
                        }
                    }
                    break;
                }
            };
        }
    }
    render(){
        return(
            <div className="modal-backdrop">
                <div className="modal-backdrop-bg"></div>
                <div className="modal">
                    <NormalHeaderBar cancelButton={this._cancelButton.bind(this)} sureButton={this._sureButton.bind(this)} title="请选择"/>
                    {
                       !this.props.qualityLevelTypeIds ? 
                           <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
                               <h2 className="item item-divider">区域选择</h2>
                               <div className="list padding">
                                    <ul className="list-horizontal-block">
                                        {
                                            this.props.dataSources.map((v,index)=>{
                                                return <li style={(this.state.areaId.indexOf(v.areaId) != -1 && v.areaId !='') ? styles.active : null} onClick={this._ahandleClick.bind(this,v.areaId,index)} key={v.areaId}>{v.areaName}</li>
                                            })
                                        }
                                    </ul>
                               </div>
                               {
                                    this.state.cList.length == 0 ? null :
                                        <div>
                                               <h2 className="item item-divider">目录版本</h2>
                                               <div className="list padding">
                                                    <ul className="list-horizontal-block">
                                                        {
                                                            this.state.cList.map((v)=>{
                                                                return <li style={(v.catalogEditionName == this.state.catalogEditionName) ? styles.active : null} onClick={this._chandleClick.bind(this,v.catalogEditionName)} key={Math.random(1)}>{v.catalogEditionName}</li>
                                                            })
                                                        }
                                                    </ul>
                                               </div>
                                        </div>
                                }
                                {
                                    this.state.gList.length == 0 ? null : 
                                        <div>
                                               <h2 className="item item-divider">文号</h2>
                                               <div className="list padding">
                                                    <ul className="list-horizontal-block">
                                                        {
                                                            this.state.gList.map((v)=>{
                                                                return <li style={(v.gradeId == this.state.gradeId) ? styles.active : null} onClick={this._ghandleClick.bind(this,v.gradeId)} key={Math.random(1)}>{v.grade}</li>
                                                            })
                                                        }
                                                    </ul>
                                               </div>
                                        </div>
                                }
                            </div> :
                            <div className="scroll-content has-header" style={{backgroundColor:'#fff'}}>
                                {
                                    this.state.levels.length ==0 ? null : <div>
                                        <h2 className="item item-divider">质量层次</h2>
                                        <div className="list padding">
                                            <ul className="list-horizontal-block">
                                                {
                                                    this.state.levels.map((v)=>{
                                                        return <li style={(this.state.qualityLevelTypeIds.indexOf(v.qualityLevelTypeId) != -1) ? styles.active : null} onClick={this._lhandleClick.bind(this,v.qualityLevelTypeId)} key={Math.random(1)}>{v.qualityLevelTypeName}</li>
                                                    })
                                                }
                                            </ul>
                                       </div>
                                    </div>
                                }
                                {
                                    this.state.origins.length ==0 ? null : <div>
                                        <h2 className="item item-divider">来源</h2>
                                        <div className="list padding">
                                            <ul>
                                                {
                                                    this.state.origins.map((v)=>{
                                                        return <li style={(v.gradeId == this.state.gradeId) ? styles.active : null} onClick={this._chandleClick.bind(this,v.gradeId)} key={Math.random(1)}>{v.grade}</li>
                                                    })
                                                }
                                            </ul>
                                       </div>
                                    </div>
                                }
                            </div>
                       
                    }
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