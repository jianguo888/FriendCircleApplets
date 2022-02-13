// 云函数入口文件
const cloud = require('wx-server-sdk')
const timeutil = require('./timeutil');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const PAGE_SIZE = 20
// 云函数入口函数
exports.main = async (event, context) => {
  let action = event.action
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  switch(action){
    case 'add':{
      let data = event.data
      
      console.log(data)
      data.openid = openid
      data.date = timeutil.TimeCode();
      return await db.collection('POST').add({
        data:data
      })
      break
    }
    case 'query':{
      let data = event.data
      let step = event.step
      let size = event.size
      return await db.collection('POST').where(data).skip(step).orderBy('date','desc').limit(size).get()
      break
    }
    case 'delete':{
      let docid = event.docid
      db.collection('LIKE').where({
        postid:docid
      }).remove()
      return await db.collection('POST').doc(docid).remove()
      break
    }
  }
}