(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{170:function(e,n,t){e.exports=t(409)},407:function(e,n,t){},409:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(49),u=t.n(a),i=t(72),s=t(28),c=t(23),l=t(73),f=t.n(l),d=t(24);function g(){var e=Object(c.a)(["\n  background-color: ",";\n  padding: 0.8rem 1.6rem;\n  color: ",";\n  border: 1px solid #ebebeb;\n  border-radius: 0.8rem;\n  transition: none;\n  box-shadow: 0 2px 3px #999;\n  &:hover {\n    background-color: ",";\n  }\n  &:focus {\n    outline: 0;\n  }\n  &:active {\n    background-color: ",";\n    box-shadow: 0 1px 2px #666;\n    transform: translateY(2px);\n  }\n"]);return g=function(){return e},e}var h=f()("#fff"),p=f()("#0062ff");d.a.button(g(),function(e){return e.primary?p.hex():h.hex()},function(e){return e.primary?h.hex():p.hex()},function(e){return e.primary?p.lighten(.15).hex():h.darken(.15).hex()},function(e){return e.primary?p.hex():h.hex()});function m(){var e=Object(c.a)(["\n  width: 32px;\n  height: 32px;\n  margin-right: 1rem;\n  display: inline-block;\n  border: 4px #003d9280 solid;\n  border-top: 4px #0062ff solid;\n  border-radius: 50%;\n  -webkit-animation: "," 0.8s infinite ease-in-out;\n  animation: "," 0.8s infinite ease-in-out;\n"]);return m=function(){return e},e}function v(){var e=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 3rem 0;\n"]);return v=function(){return e},e}function w(){var e=Object(c.a)(["\n  from { \n    transform: rotate(0deg);\n  }\n  to { \n    transform: rotate(360deg); \n  }\n"]);return w=function(){return e},e}var b=Object(d.b)(w()),x=d.a.div(v()),E=d.a.div(m(),b,b),y=function(e){var n=e.isLoading,t=e.message,r=e.children,a=void 0===r?o.a.createElement("div",null):r;return n?o.a.createElement(x,null,o.a.createElement(E,null),t):a};function P(){var e=Object(c.a)(["\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n"]);return P=function(){return e},e}var A=d.a.div(P()),k=function(e){var n=e.children;return o.a.createElement(A,null,n)};function I(){var e=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: ",";\n"]);return I=function(){return e},e}var O=d.a.div(I(),function(e){return e.fullHeight?"100%":"fit-content"}),j=function(e){var n=e.children;return o.a.createElement(O,e,n)},S=function(e){return console.log(e),o.a.createElement(k,null,o.a.createElement(j,{fullHeight:!0},"I'm the Login Page!"))},U=function(e){return console.log(e),o.a.createElement(k,null,o.a.createElement(j,{fullHeight:!0},"I'm the Signup Page!"))},L=function(e){return console.log(e),o.a.createElement(k,null,o.a.createElement(j,{fullHeight:!0},"I'm the HomePage!"))},C=function(e){var n=e.isAuthenticated,t=e.authState;return o.a.createElement("div",{id:"App"},o.a.createElement(y,{isLoading:"loading"===t,message:"Logging user in..."},o.a.createElement(s.c,null,n||"signedIn"===t?o.a.createElement(s.a,{path:"/",render:function(){return o.a.createElement(L,e)}}):o.a.createElement(o.a.Fragment,null,o.a.createElement(s.a,{exact:!0,path:"/",render:function(){return o.a.createElement(S,e)}}),o.a.createElement(s.a,{exact:!0,path:"/signup",render:function(){return o.a.createElement(U,e)}})))))},R=t(13),W=t.n(R),H=t(29),N=t(163),_=t(164),D=t(167),M=t(165),F=t(168),B=t(25),J=t.n(B),T=t(166),Q=t(51),Y=t.n(Q),$=function(e){function n(){var e,t;Object(N.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(t=Object(D.a)(this,(e=Object(M.a)(n)).call.apply(e,[this].concat(o)))).state={config:{},isLoading:!0,userIsAuthenticated:!1,user:null,cognitoUser:null},t.getErrorMessage=function(e){return"string"===typeof e?e:e.message},t.onLogin=function(){var e=Object(H.a)(W.a.mark(function e(n,r){var o;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.Auth.signIn(n,r).then(function(e){console.log("user :::",e);var n=e.challengeName,r=e.username;return"NEW_PASSWORD_REQUIRED"===n?(t.setState({cognitoUser:e}),t.props.history.push("/password_reset?user_name=".concat(r,"&new_user=1"))):t.setState({user:e,userIsAuthenticated:!0}),e}).catch(function(e){return console.log("auth.error :::",e),"UserNotConfirmedException"===e.code&&B.Auth.resendSignUp(n).then(function(){return console.log("code resent successfully"),{error:{code:e.code,message:e.message}}}),{error:e.code?{code:e.code,message:e.message}:{message:t.getErrorMessage(e)}}});case 2:return o=e.sent,e.abrupt("return",o);case 4:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),t.onLogout=Object(H.a)(W.a.mark(function e(){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=B.Auth.userPool.getCurrentUser(),e.next=3,n.signOut();case 3:t.setState({userIsAuthenticated:!1});case 4:case"end":return e.stop()}},e)})),t.onSignUp=function(){var e=Object(H.a)(W.a.mark(function e(n,r,o){var a;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.Auth.signUp({username:n,password:r,attributes:o,validationData:[]}).then(function(e){return e}).catch(function(e){return console.log(e),{error:t.getErrorMessage(e)}});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}},e)}));return function(n,t,r){return e.apply(this,arguments)}}(),t.onForgotPassword=function(){var e=Object(H.a)(W.a.mark(function e(n){var r;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.Auth.forgotPassword(n).then(function(e){return console.log(e),e}).catch(function(e){return console.log(e),{error:t.getErrorMessage(e)}});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),t.onResetPassword=function(){var e=Object(H.a)(W.a.mark(function e(n,r,o){var a;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.Auth.forgotPasswordSubmit(n,r,o).then(function(e){return console.log(e),e}).catch(function(e){return console.log(e),{error:t.getErrorMessage(e)}});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}},e)}));return function(n,t,r){return e.apply(this,arguments)}}(),t.onNewPassword=function(e){return new Promise(function(){var n=Object(H.a)(W.a.mark(function n(r){var o,a,u;return W.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,o=t.state.cognitoUser){n.next=6;break}return t.props.history.push("/login"),r({}),n.abrupt("return");case 6:return n.next=8,B.Auth.completeNewPassword(o,e);case 8:a=n.sent,t.newPasswordContinue(a),r({}),n.next=25;break;case 13:if(n.prev=13,n.t0=n.catch(0),"InvalidParameterException"!==n.t0.code){n.next=23;break}return n.next=18,B.Auth.currentAuthenticatedUser();case 18:u=n.sent,t.newPasswordContinue(u),r({}),n.next=25;break;case 23:console.log("new password error :::",n.t0),r({error:n.t0});case 25:case"end":return n.stop()}},n,null,[[0,13]])}));return function(e){return n.apply(this,arguments)}}())},t.newPasswordContinue=function(e){var n=t.props,r=n.getConfig,o=n.history;t.setState({user:e,userIsAuthenticated:!0}),r(),o.push("/")},t}return Object(F.a)(n,e),Object(_.a)(n,[{key:"componentDidMount",value:function(){var e=this,n=this.state.config;!n||n.userPoolId||n.userPoolWebClientId||Y.a.get("/auth/config").then(function(n){var t=n.data;return e.setState({config:t,isLoading:!1})})}},{key:"render",value:function(){var e=this,n=this.state,t=n.config,r=n.cognitoUser,a=n.isLoading,u=t.userPoolId,i=t.userPoolWebClientId;!a&&J.a.configure({Auth:{region:"us-east-1",userPoolId:u,userPoolWebClientId:i,mandatorySignIn:!1,authenticationFlowType:"USER_PASSWORD_AUTH"}});var s=this.props.children;return o.a.createElement(y,{isLoading:a},o.a.createElement(T.Authenticator,{onStateChange:function(n){"signedIn"===n&&e.setState({userIsAuthenticated:!0})},hideDefault:!0},o.a.Children.map(s,function(n){return o.a.cloneElement(n,{onLogin:e.onLogin,onSignUp:e.onSignUp,onLogout:e.onLogout,isAuthenticated:e.state.userIsAuthenticated,onForgotPassword:e.onForgotPassword,onResetPassword:e.onResetPassword,onNewPassword:e.onNewPassword,cognitoUser:r})})))}}]),n}(r.Component),q=function(e){var n=e.history;return o.a.createElement(i.a,{history:n},o.a.createElement($,null,o.a.createElement(C,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(407);var z=(0,t(18).createBrowserHistory)({});u.a.render(o.a.createElement(q,{history:z}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},57:function(e,n){}},[[170,1,2]]]);
//# sourceMappingURL=main.0f96a436.chunk.js.map