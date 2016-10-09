=========

##项目结构   
            |- actions              处理器  
                |- index.js         首页逻辑
            |- app.js               node配置根文件
            |- bin                  node启动目录
            |- build.js             react根目录
            |- components           公共组件

##2016年9月12日



##2016年9月14日
###注意点


#####FooterBar组件必须具备routes属性，通过父组件去传递


```javascript
     FooterBar.propTypes = {
         routes:React.PropTypes.array.isRequired
     }
```  
##2016-09-21
####* 新增emptyComponent组件作为没有数据的时候显示的界面
* 参数：message  默认为：没有数据

##2016-10-09
####* 存在问题
* 中标数据、入市价页面滚动加载需要判断上一次请求是否完成，没有完成不进行下一次加载
* 中标数据没有显示默认省份-广东省
* 从中标数据到入市价页面跳转没有代入当前药品名称
* 中标数据时间mm-yy-dd没有从后台提取字段，目前为静态
* 中标数据以及入市价页面返回的时候会reset所有条件进行初始化数据，这里需要在componentDidMount的时候判断reducer里面是否有数据，有数据的情况不进行加载

