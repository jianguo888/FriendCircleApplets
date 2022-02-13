<p align="center">
    <img src="https://gitee.com/Kindear/BlogAssets/raw/master/cnblogs/20200415203158.png"/>


![](https://img.shields.io/badge/build-passing-brightgreen)![](https://img.shields.io/badge/progress-100%25-blue)![](https://img.shields.io/badge/维护状态-停止维护-red)

**M朋友圈(组件版/云开发)**

`@feature`

- [x] 朋友圈发布
- [x] 朋友圈点赞
- [x] 朋友圈评论
- [x] 朋友圈回复评论
- [x] 点赞撤销
- [x] 评论删除
- [x] 已发布朋友圈删除
- [x] 评论内容安全审核校验

`@Notice`

#### 安装部署

> 小程序导入

使用微信小程序开发者工具导入，并修改配置文件

1.小程序配置文件`project.config.json`

~~~json
"appid": "",
"projectname": ""
~~~

2.修改项目配置文件(见下)

3.上传并部署全部云函数

4.新建`POST`  ,`LIKE` ,`COMMENT`云数据库集合

5.重新编译项目即可

#### 配置文件

> `core/config.js`

```js
module.exports = {
  //云环境ID
  CloudID:'dev-tool-0gx69s0m12d6add1',
  //文本内容安全校验 是否开启
  ContentSafe:true,
  //朋友圈查询 页面大小 -- 建议配置 20 以下
  PageSize:10
}
```



#### PR & Branch

欢迎开发者提交`PR`



> 作者

- [kindear](kindear@foxmail.com)

`@answer`

- 部署有问题可在`issue`提出
- 作者提供有偿技术支持 [Kindear](tencent://message/?uin=1025584691&Site=http://www.xxx.com&Menu=yes)

