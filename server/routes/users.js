var express = require('express');
var router = express.Router();
const model = require('../utils/model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

const _filter = {pwd:0,__v:0}//用于查询结果筛选字段
/* GET users listing. */
router.get('/info', function(req, res, next) {
  var {userid} = req.cookies;
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(e,d){
    if(!d){
      res.json({code:1,msg:"后端错误"})
    }
    return res.json({code:0,data:d})
  })
});
router.get('/list', function(req, res, next) {
  var {type} = req.query;
  User.find({type},function(err,docs){
    if(err){
      res.json({code:1})
    }
    res.json({code:0,data:docs})
  })
});
router.post('/register',function(req,res){
  var {user,pwd,type} = req.body
  User.findOne({user},function(e,d){
    if(d){
      res.json({code:1,msg:"用户名已存在"})
    }
    var userModel = new User({user,pwd:md5(pwd),type})//使用这种方式而不使用create是因为create存储不能拿到存入的doc
    userModel.save(function(e,d){
      if(e){
        res.json({code:1,msg:'新增用户失败，插入数据不成功'})
      }
      var {user,type,_id} = d
      res.cookie('userid',_id)
      res.json({code:0,data:{user,type,_id}})
    })
  })
})

router.post('/login',function(req,res){
  var {user,pwd} = req.body
  User.findOne({user,pwd:md5(pwd)},_filter,function(e,d){
    if(!d){
      return res.json({code:1,msg:"用户名或密码错误"})
    }
    res.cookie('userid',d._id)//登陆成功设置cookie
    return res.json({code:0,data:d})
  })
})

router.post('/update',function(req,res){
  var {userid} = req.cookies;
  if(!userid){
    return res.json({code:1})
  }
  User.findByIdAndUpdate({_id:userid},req.body,function(e,d){
    if(e){
      res.json({code:1,msg:"更新信息失败"})
    }
    var data = Object.assign({},{
			user:d.user,
			type:d.type
		},req.body)
    return res.json({code:0,data:data})
  })
})

router.post('/getmsglist',function(req,res){
  var userid = req.cookies.userid;
  User.find({},function(err,usersdoc){
    var users = {}
		usersdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
    Chat.find({"$or":[{from:userid},{to:userid}]},function(err,msglist){
      if(!err){
        res.json({code:0,msglist,users})
      }
    })
  })
})

router.post('/readmsg',function(req,res){
  const from = req.body.from;
  const userid = req.cookies.userid;
  Chat.update({from,to:userid},{"$set":{read:true}},{'multi':true},function(err,doc){
    if(!err){
       return res.json({code:0,num:doc.nModified})
    }
    return res.json({code:1,msg:'修改失败'})
  })
})
//密码加密
function md5(pwd){
  var mixinStr = "jack.zhang.md5"
  return utils.md5(utils.md5(pwd+mixinStr))
}
module.exports = router;
