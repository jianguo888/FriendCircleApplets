// 云函数入口文件
const cloud = require('wx-server-sdk')
const timeutil = require('./timeutil');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const LIKE_TABLE = 'LIKE'
// 云函数入口函数
exports.main = async (event, context) => {
  let action = event.action
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  switch(action){
    case 'add':{
      let data = event.data
      data.date = timeutil.TimeCode();
      return await db.collection(LIKE_TABLE).add({
        data:data
      })
      break
    }
    case 'query':{
      let data = event.data
      return await db.collection('LIKE').where(data).orderBy('date','desc').get()
      break
    }
    case 'delete':{
      return await db.collection('LIKE').where({
        openid:openid,
        postid:event.data.postid
      }).remove();
      break
    }
  }
}