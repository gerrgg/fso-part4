(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},23:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(16),u=n.n(c),l=n(1),o=n.n(l),s=n(6),i=n(4),p=n(2),m=(n(23),function(e){var t=e.blog,n=e.setShow,a=e.handleLike,c=e.handleDelete,u=e.user;return console.log(t.user,u),r.a.createElement("div",{className:"details"},r.a.createElement("p",null,"URL: ",t.url),r.a.createElement("p",null,"Likes: ",t.likes,r.a.createElement("button",{onClick:function(){return a(t)}},"Like")),r.a.createElement("p",null,"User: ",t.user?t.user.username:null),r.a.createElement("button",{onClick:function(){return n(!1)}},"Hide"),t.user.id===u.id?r.a.createElement("button",{onClick:function(){return c(t.id)}},"Delete"):null)}),f=function(e){var t=e.blog,n=e.handleLike,c=e.handleDelete,u=e.user,l=Object(a.useState)(!1),o=Object(p.a)(l,2),s=o[0],i=o[1];return r.a.createElement("div",{className:"blog"},t.title," - ",t.author?t.author:"No Author",s&&t.user?r.a.createElement(m,{blog:t,setShow:i,handleLike:n,handleDelete:c,user:u}):r.a.createElement("button",{onClick:function(){return i(!s)},style:{marginLeft:5}},"View"))},v=n(5),d=n.n(v),b="http://localhost:3003/api/blogs",g=null,h={getAll:function(){return d.a.get(b).then((function(e){return e.data}))},setToken:function(e){g="bearer ".concat(e)},create:function(){var e=Object(i.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,d.a.post(b,t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(i.a)(o.a.mark((function e(t,n){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.put("".concat(b,"/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n={headers:{Authorization:g}},d.a.delete("".concat(b,"/").concat(t),n);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(e){var t=e.blogs,n=e.setBlogs,c=e.setNotification,u=e.user,l=Object(a.useState)(""),s=Object(p.a)(l,2),m=s[0],f=s[1],v=Object(a.useState)(""),d=Object(p.a)(v,2),b=d[0],g=d[1],E=Object(a.useState)(""),k=Object(p.a)(E,2),w=k[0],O=k[1],j=function(){var e=Object(i.a)(o.a.mark((function e(a){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.prev=1,e.next=4,h.create({title:m,author:b,url:w,user:u});case 4:r=e.sent,n(t.concat(r)),c({message:"".concat(r.title," by ").concat(r.author," created!"),type:"success"}),setTimeout((function(){c({})}),5e3),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),c({message:"Creating blog failed",type:"error"});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("form",{onSubmit:j},r.a.createElement("p",null,"Title:",r.a.createElement("input",{type:"text",value:m,name:"title",onChange:function(e){var t=e.target;return f(t.value)}})),r.a.createElement("p",null,"Author:",r.a.createElement("input",{type:"text",value:b,name:"author",onChange:function(e){var t=e.target;return g(t.value)}})),r.a.createElement("p",null,"Url:",r.a.createElement("input",{type:"text",value:w,name:"url",onChange:function(e){var t=e.target;return O(t.value)}})),r.a.createElement("input",{type:"submit",value:"Create"}))},k=function(e){var t=e.handleLogin,n=e.username,a=e.setUsername,c=e.password,u=e.setPassword;return r.a.createElement("form",{id:"loginForm",onSubmit:t},r.a.createElement("h1",null,"Login"),r.a.createElement("p",null,"Username",r.a.createElement("input",{type:"text",value:n,name:"Username",onChange:function(e){var t=e.target;return a(t.value)}})),r.a.createElement("p",null,"Password",r.a.createElement("input",{type:"text",value:c,name:"Password",onChange:function(e){var t=e.target;return u(t.value)}})),r.a.createElement("button",{type:"submit"},"login"))},w=function(e){var t=e.notification;return t.message?r.a.createElement("p",{className:"notifications ".concat(t.type)},t.message):null},O=function(e){var t=Object(a.useState)(!1),n=Object(p.a)(t,2),c=n[0],u=n[1],l={display:c?"none":""},o={display:c?"":"none"},s=function(){u(!c)};return r.a.createElement("div",null,r.a.createElement("div",{style:l},r.a.createElement("button",{onClick:s},e.buttonLabel)),r.a.createElement("div",{style:o},e.children,r.a.createElement("button",{onClick:s},"cancel")))},j={login:function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("http://localhost:3003/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()};var y=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)({}),l=Object(p.a)(u,2),m=l[0],v=l[1],d=Object(a.useState)(""),b=Object(p.a)(d,2),g=b[0],y=b[1],x=Object(a.useState)(""),S=Object(p.a)(x,2),C=S[0],L=S[1],U=Object(a.useState)(null),N=Object(p.a)(U,2),I=N[0],A=N[1];Object(a.useEffect)((function(){h.getAll().then((function(e){return c(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedInUser");if(e){var t=JSON.parse(e);A(t),h.setToken(t.token)}}),[]),console.log(n);var D=function(){var e=Object(i.a)(o.a.mark((function e(t){var n,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(s.a)(Object(s.a)({},t),{},{likes:t.likes+1,user:t.user.id}),e.prev=1,e.next=4,h.update(t.id,n);case 4:return e.next=6,h.getAll();case 6:a=e.sent,c(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(i.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.remove(t);case 3:c(n.filter((function(e){return e.id!==t}))),v({message:"blog deleted",type:"success"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),B=function(){return r.a.createElement("h2",null,"Free Speech",r.a.createElement("span",{role:"img","aria-label":"parrot"},"\ud83e\udd10"))},J=function(e){var t=e.user;return r.a.createElement("div",{id:"logout"},r.a.createElement("strong",null,t.name," is logged in"),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){return window.localStorage.removeItem("loggedInUser"),void A(null)}},"Logout"))},P=function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,j.login({username:g,password:C});case 4:n=e.sent,window.localStorage.setItem("loggedInUser",JSON.stringify(n)),h.setToken(n.token),A(n),y(""),L(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),v({message:"Invalid username/password combination",type:"error"}),setTimeout((function(){v({})}),5e3);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(B,null),r.a.createElement(w,{notification:m}),null===I?r.a.createElement(k,{handleLogin:P,username:g,setUsername:y,password:C,setPassword:L}):function(){var e=n.sort((function(e,t){return e.likes<t.likes}));return r.a.createElement("div",null,r.a.createElement(J,{user:I}),r.a.createElement("div",{className:"blogs"},r.a.createElement("h3",null,"Blogs"),r.a.createElement(O,{buttonLabel:"Create Blog"},r.a.createElement(E,{blogs:n,setBlogs:c,setNotification:v,user:I})),e.map((function(e){return r.a.createElement(f,{key:e.id,blog:e,handleLike:D,handleDelete:T,user:I})}))))}())};u.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.0aaf3035.chunk.js.map