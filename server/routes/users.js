var express = require('express');
var router = express.Router();
const model = require('../utils/model')
const User = model.getModel('user')
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
  User.find({},function(err,doc){
    res.json(doc)
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
      res.json({code:1,msg:"用户名或密码错误"})
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
    var data = Object.assign({},req.body)
    return res.json({code:0,data:data})
  })
})
//密码加密
function md5(pwd){
  var mixinStr = "jack.zhang.md5"
  return utils.md5(utils.md5(pwd+mixinStr))
}
module.exports = router;
