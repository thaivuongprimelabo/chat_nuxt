(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{156:function(t,e,o){"use strict";o.r(e);o(70);!firebase.apps.length&&firebase.initializeApp({apiKey:"AIzaSyBF6T-HeFPb1cLfq-jFfIpj2So7RbwViGo",authDomain:"testfirebase9999.firebaseapp.com",projectId:"testfirebase9999"});var r=firebase.firestore().collection("users"),n={data:function(){return{form:{email:"",password:""},userList:[]}},mounted:function(){console.log("mounted")},created:function(){var t=this;r.get().then(function(e){e.forEach(function(e){t.userList.push(e.data())})})},methods:{onLogin:function(){var t=this;r.where("email","==",this.form.email).where("password","==",$.md5(this.form.password)).get().then(function(e){e.forEach(function(e){var o=e.data();if(o.online)return alert("Your account is using"),!1;localStorage.setItem("key",e.id),o.online=1,r.doc(e.id).set(o),t.$router.replace("/user/chatbox")})}).catch(function(t){console.log("Error getting documents: ",t)})},onRegister:function(){this.$router.replace("/user/register")}}},l=o(18),component=Object(l.a)(n,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-6 col-md-offset-3"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-md-12"},[o("form",{attrs:{id:"submitForm"},on:{submit:function(e){return e.preventDefault(),t.onLogin(e)}}},[o("div",{staticClass:"panel panel-primary"},[t._m(0),t._v(" "),o("div",{staticClass:"panel-body"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-12"},[o("div",{staticClass:"form-group"},[o("div",{staticClass:"input-group"},[t._m(1),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",attrs:{type:"email",id:"email",placeholder:"Please input email",required:""},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"form-group"},[o("div",{staticClass:"input-group"},[t._m(2),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",attrs:{type:"password",id:"password",placeholder:"Please input password",required:""},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})])])])])]),t._v(" "),o("div",{staticClass:"panel-footer"},[o("button",{staticClass:"btn btn-primary",attrs:{type:"submit",id:"btnLogin"}},[t._v("Login")]),t._v(" "),o("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:this.onRegister}},[t._v("Register")])])])])])])])])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-heading"},[e("i",{staticClass:"glyphicon glyphicon-user"}),this._v(" "),e("h6",{staticClass:"panel-title"},[this._v("Login")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("i",{staticClass:"glyphicon glyphicon-envelope"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"input-group-addon"},[e("i",{staticClass:"glyphicon glyphicon-lock"})])}],!1,null,null,null);e.default=component.exports}}]);