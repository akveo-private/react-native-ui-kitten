(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{184:function(e,t,n){"use strict";var a,c=n(0),r=n.n(c),s=n(21),o=n(151),u=n(14),i=n.n(u),l=n(182),m=n(8),b=m.a.create({container:{flex:1,padding:16},button:{marginBottom:10}}),h=m.a.create({container:{flex:1,padding:16},button:{marginBottom:10}}),d=m.a.create({container:{flex:1,padding:16},button:{marginBottom:10}}),k=n(18),g=n.n(k),y=m.a.create({container:{flex:1,padding:16},checkbox:{marginBottom:16}}),f=m.a.create({container:{flex:1,padding:16},checkbox:{marginBottom:16}}),E=n(3),p=n.n(E),T=n(4),B=n.n(T),O=n(6),x=n.n(O),S=n(5),U=n.n(S),N=n(7),C=n.n(N),w=n(124),j=[{name:"ButtonSimpleUsage"},{name:"ButtonStatus"},{name:"ButtonSize"},{name:"CheckboxSimpleUsage"},{name:"CheckboxStatus"}],v=function(e){function t(){var e,n;p()(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=x()(this,(e=U()(t)).call.apply(e,[this].concat(c)))).onItemPress=function(e){},n.renderItem=function(e){return r.a.createElement(w.Link,{routeName:e.item.name},r.a.createElement(s.f,{title:e.item.name,onPress:n.onItemPress}))},n}return C()(t,e),B()(t,[{key:"render",value:function(){return r.a.createElement(s.e,{data:j,renderItem:this.renderItem})}}]),t}(r.a.Component),z=(a={},i()(a,"Home",v),i()(a,"ButtonSimpleUsage",(function(){return r.a.createElement(s.d,{style:b.container},r.a.createElement(s.b,{style:b.button},"BUTTON"),r.a.createElement(s.b,{style:b.button,disabled:!0},"BUTTON"))})),i()(a,"ButtonStatus",(function(){return r.a.createElement(s.d,{style:d.container},r.a.createElement(s.b,{style:d.button,status:"primary"},"BUTTON"),r.a.createElement(s.b,{style:d.button,status:"success"},"BUTTON"),r.a.createElement(s.b,{style:d.button,status:"info"},"BUTTON"),r.a.createElement(s.b,{style:d.button,status:"warning"},"BUTTON"),r.a.createElement(s.b,{style:d.button,status:"danger"},"BUTTON"),r.a.createElement(s.b,{style:d.button,status:"basic"},"BUTTON"))})),i()(a,"ButtonSize",(function(){return r.a.createElement(s.d,{style:h.container},r.a.createElement(s.b,{style:h.button,size:"tiny"},"BUTTON"),r.a.createElement(s.b,{style:h.button,size:"small"},"BUTTON"),r.a.createElement(s.b,{style:h.button,size:"medium"},"BUTTON"),r.a.createElement(s.b,{style:h.button,size:"large"},"BUTTON"),r.a.createElement(s.b,{style:h.button,size:"giant"},"BUTTON"))})),i()(a,"CheckboxSimpleUsage",(function(){var e=Object(c.useState)(!1),t=g()(e,2),n=t[0],a=t[1],o=Object(c.useState)(!1),u=g()(o,2),i=u[0],l=u[1],m=Object(c.useState)(!1),b=g()(m,2),h=b[0],d=b[1],k=function(e,t){switch(t){case 1:a(e);break;case 2:l(e);break;case 3:d(e)}};return r.a.createElement(s.d,{style:y.container},r.a.createElement(s.c,{style:y.checkbox,checked:n,onChange:function(e){return k(e,1)}}),r.a.createElement(s.c,{style:y.checkbox,disabled:!0,checked:i,onChange:function(e){return k(e,2)}}),r.a.createElement(s.c,{style:y.checkbox,indeterminate:!0,checked:h,onChange:function(e){return k(e,3)}}))})),i()(a,"CheckboxStatus",(function(){var e=Object(c.useState)(!1),t=g()(e,2),n=t[0],a=t[1],o=Object(c.useState)(!1),u=g()(o,2),i=u[0],l=u[1],m=Object(c.useState)(!1),b=g()(m,2),h=b[0],d=b[1],k=Object(c.useState)(!1),y=g()(k,2),E=y[0],p=y[1],T=Object(c.useState)(!1),B=g()(T,2),O=B[0],x=B[1],S=Object(c.useState)(!1),U=g()(S,2),N=U[0],C=U[1],w=function(e,t){switch(t){case 1:a(e);break;case 2:l(e);break;case 3:d(e);break;case 4:p(e);break;case 5:x(e);break;case 6:C(e)}};return r.a.createElement(s.d,{style:f.container},r.a.createElement(s.c,{style:f.checkbox,status:"primary",checked:n,onChange:function(e){return w(e,1)}}),r.a.createElement(s.c,{style:f.checkbox,status:"success",checked:i,onChange:function(e){return w(e,2)}}),r.a.createElement(s.c,{style:f.checkbox,status:"info",checked:h,onChange:function(e){return w(e,3)}}),r.a.createElement(s.c,{style:f.checkbox,status:"warning",checked:E,onChange:function(e){return w(e,4)}}),r.a.createElement(s.c,{style:f.checkbox,status:"danger",checked:O,onChange:function(e){return w(e,5)}}),r.a.createElement(s.c,{style:f.checkbox,status:"basic",checked:N,onChange:function(e){return w(e,6)}}))})),a),I=Object(l.createStackNavigator)(z,{initialRouteName:"Home",headerMode:"none"}),P=Object(w.createBrowserApp)(I,{history:"hash"});t.a=function(){return r.a.createElement(s.a,{mapping:o.mapping,theme:o.light},r.a.createElement(P,null))}},186:function(e,t,n){e.exports=n(247)}},[[186,1,2]]]);
//# sourceMappingURL=../../e23ff00345f3f90a23a9.map