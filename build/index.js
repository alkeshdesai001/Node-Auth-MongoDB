!function(e){var r={};function t(n){if(r[n])return r[n].exports;var s=r[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var s in e)t.d(n,s,function(r){return e[r]}.bind(null,s));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=18)}([function(e,r,t){e.exports=t(19)},function(e,r){function t(e,r,t,n,s,o,u){try{var a=e[o](u),i=a.value}catch(e){return void t(e)}a.done?r(i):Promise.resolve(i).then(n,s)}e.exports=function(e){return function(){var r=this,n=arguments;return new Promise((function(s,o){var u=e.apply(r,n);function a(e){t(u,s,o,a,i,"next",e)}function i(e){t(u,s,o,a,i,"throw",e)}a(void 0)}))}}},function(e,r){e.exports=require("express")},function(e,r,t){"use strict";var n=t(0),s=t.n(n),o=t(1),u=t.n(o),a=t(4),i=t.n(a),c=t(7),p=t.n(c),l=t(5),f=t.n(l),d=i.a.Schema({name:{type:String,required:!0},email:{type:String,required:!0,unique:!0},password:{type:String,require:!0,select:!1},role:{type:String,enum:["user","publisher"],default:"user"}},{timestamps:!0});d.pre("save",function(){var e=u()(s.a.mark((function e(r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.hash(this.password,10);case 2:this.password=e.sent;case 3:case"end":return e.stop()}}),e,this)})));return function(r){return e.apply(this,arguments)}}()),d.methods.validatePassword=function(){var e=u()(s.a.mark((function e(r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.compare(r.toString(),this.password);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));return function(r){return e.apply(this,arguments)}}(),d.methods.signToken=function(){var e=u()(s.a.mark((function e(r){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={user:{id:this.id,name:this.name}},e.next=3,f.a.sign(t,process.env.JWT_SECRET,{expiresIn:"1m"});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e,this)})));return function(r){return e.apply(this,arguments)}}(),r.a=i.a.model("User",d)},function(e,r){e.exports=require("mongoose")},function(e,r){e.exports=require("jsonwebtoken")},function(e,r){e.exports=require("express-validator")},function(e,r){e.exports=require("bcryptjs")},function(e,r){e.exports=require("path")},function(e,r){e.exports=require("cors")},function(e,r){e.exports=require("express-mongo-sanitize")},function(e,r){e.exports=require("helmet")},function(e,r){e.exports=require("xss-clean")},function(e,r){e.exports=require("express-rate-limit")},function(e,r){e.exports=require("hpp")},function(e,r){e.exports=require("dotenv")},function(e,r,t){"use strict";var n=t(2),s=t.n(n),o=t(0),u=t.n(o),a=t(1),i=t.n(a),c=t(3),p=function(){var e=i()(u.a.mark((function e(r,t){var n,s,o,a,i,p,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.body,s=n.name,o=n.email,a=n.password,i=n.role,e.prev=1,e.next=4,c.a.findOne({email:o}).select("password");case 4:if(!(p=e.sent)){e.next=7;break}return e.abrupt("return",t.status(400).json({success:!1,error:"User already exist, try login instead"}));case 7:return p=new c.a({name:s,email:o,password:a,role:i}),e.next=10,p.save();case 10:return e.next=12,p.signToken();case 12:l=e.sent,t.status(200).json({success:!0,token:l,user:{id:p.id,name:p.name,email:p.email}}),e.next=20;break;case 16:return e.prev=16,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",t.status(500).json({success:!1,error:"Server error"}));case 20:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(r,t){return e.apply(this,arguments)}}(),l=function(){var e=i()(u.a.mark((function e(r,t){var n,s,o,a,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.body,s=n.email,o=n.password,e.prev=1,e.next=4,c.a.findOne({email:s}).select("+password");case 4:if(a=e.sent){e.next=7;break}return e.abrupt("return",t.status(400).json({success:!1,error:"Invalid Credential"}));case 7:return e.next=9,a.validatePassword(o);case 9:if(e.sent){e.next=12;break}return e.abrupt("return",t.status(400).json({success:!1,error:"Invalid Credential"}));case 12:return e.next=14,a.signToken();case 14:i=e.sent,t.status(200).json({success:!0,token:i,user:{id:a.id,name:a.name,email:a.email}}),e.next=22;break;case 18:return e.prev=18,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",t.status(500).json({success:!1,error:"Server error"}));case 22:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(r,t){return e.apply(this,arguments)}}(),f=t(6).check,d=[f("email","Please enter valid email id").isEmail().normalizeEmail(),f("name","Username is required").not().isEmpty(),f("password","Password must be minimum 6 character long").isLength({min:6}),f("role").custom((function(e){if(!["user","publisher"].includes(e))throw new Error("User role ".concat(e," is not allowed"));return!0}))],m=[f("email","Please enter valid email id").isEmail().normalizeEmail(),f("password","Password must be minimum 6 character long").isLength({min:6})],v=t(6),h=function(e,r,t){var n=Object(v.validationResult)(e);if(!n.isEmpty())return r.status(400).json({success:!1,errors:n.array()});t()},x=s.a.Router();x.post("/auth/signup",d,h,p),x.post("/auth/login",m,h,l);r.a=x},function(e,r,t){"use strict";var n=t(2),s=t.n(n),o=t(0),u=t.n(o),a=t(1),i=t.n(a),c=t(3),p=t(5),l=t.n(p),f=function(){var e=i()(u.a.mark((function e(r,t,n){var s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.headers.authorization&&r.headers.authorization.startsWith("Bearer")&&(s=r.headers.authorization.split(" ")[1]),s){e.next=4;break}return e.abrupt("return",t.status(401).json({success:!1,error:"You are not authorized to access this route"}));case 4:return e.prev=4,o=l.a.verify(s,process.env.JWT_SECRET),e.next=8,c.a.findById(o.user.id);case 8:r.user=e.sent,e.next=17;break;case 11:if(e.prev=11,e.t0=e.catch(4),!e.t0.expiredAt){e.next=16;break}return console.log(e.t0.expiredAt),e.abrupt("return",t.status(401).json({success:!1,error:"Token expired"}));case 16:return e.abrupt("return",t.status(401).json({success:!1,error:"You are not authorized to access this route"}));case 17:n(),e.next=23;break;case 20:return e.prev=20,e.t1=e.catch(0),e.abrupt("return",t.status(500).json({success:!1,error:"Server error"}));case 23:case"end":return e.stop()}}),e,null,[[0,20],[4,11]])})));return function(r,t,n){return e.apply(this,arguments)}}(),d=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return function(e,t,n){if(!r.includes(e.user.role))return t.status(401).json({success:!1,error:"You are not authorized to access this route"});n()}},m=s.a.Router();m.get("/protected",f,(function(e,r){return r.status(200).json({success:!0,msg:"Access Protected Route"})})),m.get("/admin",f,d("admin"),(function(e,r){return r.status(200).json({success:!0,msg:"User role ".concat(e.user.role," is Authorized")})})),m.get("/publisher",f,d("admin","publisher"),(function(e,r){return r.status(200).json({success:!0,msg:"User role ".concat(e.user.role," is Authorized")})})),m.get("/user",f,d("admin","user"),(function(e,r){return r.status(200).json({success:!0,msg:"User role ".concat(e.user.role," is Authorized")})}));r.a=m},function(e,r,t){"use strict";t.r(r),function(e){var r=t(2),n=t.n(r),s=t(8),o=t.n(s),u=t(4),a=t.n(u),i=t(9),c=t.n(i),p=t(10),l=t.n(p),f=t(11),d=t.n(f),m=t(12),v=t.n(m),h=t(13),x=t.n(h),b=t(14),g=t.n(b),w=t(15),y=t.n(w),j=t(17),k=t(16);y.a.config({path:"./config/config.env"});var q=n()();q.use(n.a.static(o.a.join(e,"public"))),q.use(n.a.json()),q.use(c()()),q.use(d()()),q.use(l()()),q.use(v()()),q.use(g()());var P=x()({windowMs:6e5,max:100});q.use(P),q.use("/api/v1",j.a),q.use("/api/v1",k.a);var S=process.env.PORT||5e3;a.a.connect(process.env.MONGO_URI,{useNewUrlParser:!0,useCreateIndex:!0,useFindAndModify:!1,useUnifiedTopology:!0},(function(){q.listen(S,(function(){return console.log("Server is running Port ".concat(S))}))})),process.on("unhandledRejection",(function(e,r){console.log("Error: ".concat(e.message)),process.exit(1)}))}.call(this,"/")},function(e,r){e.exports=require("regenerator-runtime")}]);