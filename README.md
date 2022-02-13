

**朋友圈(组件版/云开发)**

- [x] 朋友圈发布

- [x] 朋友圈点赞

- [x] 朋友圈评论

- [x] 朋友圈回复评论

- [x] 点赞撤销

- [x] 评论删除

- [x] 已发布朋友圈删除

- [x] 评论内容安全审核校验

  



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
  CloudID:'',
  //文本内容安全校验 是否开启
  ContentSafe:true,
  //朋友圈查询 页面大小 -- 建议配置 20 以下
  PageSize:10
}
```

> 作者：坚果
>
> 公众号："[大前端之旅](https://mp.weixin.qq.com/s/aJvihD4dzEJyOV3q6_Zeng)"
>
> 华为云享专家，InfoQ签约作者，阿里云专家博主，51CTO博客首席体验官，[开源项目GVA成员之一](https://www.gin-vue-admin.com/)，专注于大前端技术的分享，包括Flutter,小程序,安卓，VUE，JavaScript。
>
> - 个人网站：[http://jianguojs.cn/](http://jianguojs.cn/)
>
> - Github:[https://github.com/ITmxs](https://github.com/ITmxs)
> - Gitee:[https://gitee.com/itmxs/](https://gitee.com/itmxs/)
> - 掘金：[https://juejin.cn/user/3843548384077192](https://juejin.cn/user/3843548384077192)
> - 知乎：[大前端之旅](https://www.zhihu.com/people/yimi-yang-guang-96-65)
> - InfoQ:[https://www.infoq.cn/u/jianguo/publish](https://www.infoq.cn/u/jianguo/publish)
> - 51CTO博客[https://blog.51cto.com/jianguo](https://blog.51cto.com/jianguo)
> - CSDN:[https://blog.csdn.net/qq_39132095](https://blog.csdn.net/qq_39132095)



## 截图

![image-20220213131927596](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220213131927596.png)

![image-20220213131943133](https://luckly007.oss-cn-beijing.aliyuncs.com/images/image-20220213131943133.png)
