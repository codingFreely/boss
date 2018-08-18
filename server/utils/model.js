const mongoose = require('mongoose')
//
const DB_URL = 'mongodb://localhost:27017/boss'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log(`mongodb connect success on ${DB_URL}`)
})

const models ={
  user:{
    user:{type:String,require:true},
    pwd:{type:String,require:true},
    type:{type:String,require:true},
    //头像
    avatar:{type:String},
    desc:{type:String},
    //职位名称
    title:{type:String},
    company:{type:String},
    money:{type:String}
  },
  chat:{
    'chatid':{'type':String, require:true},
		'from':{'type':String,'require':true},
		'to':{'type':String,'require':true},
		'read':{'type':Boolean,default:false},
		'content':{'type':String,'require':true,'default':''},
		'create_time':{'type':Number,'default':Date.now}
  }
}

for (let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]),m)//第三个参数为数据库映射的表名,如果不传自动映射的表名为{m+"s"}
}

module.exports = {
  getModel(name){
    return mongoose.model(name)
  }
}