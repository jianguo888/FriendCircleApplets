const cloud = require('wx-server-sdk')
const timeutil = require('./timeutil');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

const COMMENT_TABLE = 'COMMENT';
// 云函数入口函数
exports.main = async (event, context) => {
  let action = event.action
  switch (action) {
    case 'add': {
      let data = event.data
      data.date = timeutil.TimeCode()
      return await db.collection(COMMENT_TABLE).add({
        data: data
      })
      break
    }
    case 'query': {
      let data = event.data
      return await db.collection(COMMENT_TABLE).where(data).orderBy('date', 'asc').get()
      break
    }
    case 'delete': {
      let docid = event.docid
      return await db.collection(COMMENT_TABLE).doc(docid).remove()
      break
    }
  }
}