=========

##项目结构   
            |- actions                      处理器
                |- index.js                 首页逻辑
            |- app.js                       node配置根文件
            |- bin                          node启动目录
            |- build.js                     react根目录
            |-webpack.config.js             webpack配置文件
            |- components                   公共组件
                |- config
                    |- variable.js          变量
                |-  datas                   数据模块目录
                     |-  bidList.js         中标数据
                     |-  bidListall.js      中标数据总汇
                     |-  marketPrice.js     入市价
                     |-  more.js            更多按钮
                     |-  product.js         产品数据
                |- function                 函数目录
                        |-  ajax.js         请求数据文件
                        |-  common.js       公共方法文件
                        |-  token.js        微信授权
                |- index                    行情模块目录
                        |-  breed.js
                |- anti.js                  抗菌药物
                |- assist.js                辅助用药
                |- base.js                  基药
                |- box.js                   宝箱活动组件
                |- center.js                我的模块文件
                |- collect.js               收藏页面文件
                |- collectpopup.js          取消收藏弹框
                |- config.js                URL配置文件
                |- contribute.js            帮助中心
                |- dataIntro.js             数据简介
                |- data.js                  数据模块
                |- emptyComponent.js        空数据显示界面
                |- feedBack.js              意见反馈
                |- filter.js                筛算界面
                |- filterBidList.js         中标数据筛算界面
                |- filterPolicy.js          政策准入筛算界面
                |- filterProduct.js         产品数据筛算界面
                |- filterPurchase.js        已购报告筛算界面
                |- filterReport.js          报告筛算界面
                |- footerBar.js             底部工具栏
                |- footerBarIcon.js         底部工具栏图标
                |- headerBar.js             头部工具栏图标
                |- help.js                  帮助中心
                |- home.js                  首页模块
                |- index.js                 行情模块
                |- insurance.js             医保
                |- loading.js               加载界面
                |- lowPrice.js              低价药
                |- normalHeaderbar.js
            |-  reducer                     reducer目录
            |-  routes                      路由文件目录
            |-  scss                        样式文件目录
            |-  views                       模版文件目录
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

