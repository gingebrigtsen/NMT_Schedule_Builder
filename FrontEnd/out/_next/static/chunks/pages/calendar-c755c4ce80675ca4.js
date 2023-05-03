(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[54844],{63317:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/calendar",function(){return n(2274)}])},40942:function(e,t,n){"use strict";n.r(t);var r=n(41799),i=n(69396),o=n(35944),l=n(67294),c=n(5883),a=n(51246),s=n(10737),d=n(14738),u=(0,n(16829).Z)("div",{target:"ej0wuu00"})("height:auto;padding:10px;"),h={plugins:[a.Z,s.Z,d.ZP],headerToolbar:{left:"",center:"",right:""},initialView:"timeGridWeek",eventContent:function(e){var t=e.event.extendedProps.details,n=t?t.join("\n"):"";return(0,o.BX)("div",{title:n,children:[e.event.title,(0,o.tZ)("br",{})]})},eventBackgroundColor:"#555555",eventBorderColor:"#333333",slotEventOverlap:!1,slotLabelFormat:{hour:"numeric",minute:"2-digit"},slotDuration:"00:30:00",weekNumbers:!1,views:{timeGridWeek:{allDaySlot:!1,slotMinTime:"06:00:00",slotMaxTime:"22:00:00"}},dayHeaderFormat:{weekday:"short"}},p=function(){var e=(0,l.useState)([]),t=e[0],n=e[1];return(0,l.useEffect)(function(){fetch("http://localhost:5000/api/get_events",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){n(e.items)})},[]),(0,o.tZ)(u,{children:(0,o.tZ)(c.Z,(0,i.Z)((0,r.Z)({height:768},h),{events:t}))})};t.default=p},2274:function(e,t,n){"use strict";n.r(t);var r=n(47568),i=n(70655),o=n(35944),l=n(67294),c=n(70917),a=n(9008),s=n.n(a),d=n(22153),u=n(19574),h=n(27417),p=n(53196),Z=n(94956),f=n(99667),y=n(88791),g=n(76210),v=n(66537),m=n(18797),C=n(42037),w=n(37151),b=n(40942),x=n(17658),B=(0,c.iv)("borderRadius:'25px',border:'1px solid #666666',padding:'5px',top:'auto',bottom:'auto',"),T=(0,c.iv)("line-height:1.75;"),X=function(){var e,t=(0,l.useState)([]),n=t[0],c=t[1];(0,l.useEffect)(function(){fetch("http://localhost:5000/api/get_cart",{credentials:"include"}).then(function(e){return e.json()}).then(function(e){c(e.items)})},[]);var a=(e=(0,r.Z)(function(){var e;return(0,i.__generator)(this,function(t){switch(t.label){case 0:e=n.map(function(e){return e.CRN}).join(" "),t.label=1;case 1:return t.trys.push([1,3,,4]),[4,navigator.clipboard.writeText(e)];case 2:return t.sent(),alert("Copy to Clipboard: Success"),[3,4];case 3:return t.sent(),alert("Copy to Clipboard: Failed"),[3,4];case 4:return R(),[2]}})}),function(){return e.apply(this,arguments)}),X=(0,l.useState)(!1),k=X[0],N=X[1],_=(0,l.useState)(!1),z=_[0],F=_[1],E=function(){N(!1)},R=function(){F(!1)};return(0,o.BX)(o.HY,{children:[(0,o.tZ)(s(),{children:(0,o.tZ)("title",{children:"My Course Calendar"})}),(0,o.BX)(x.Z,{children:[(0,o.tZ)(d.F,{size:"m"}),(0,o.BX)(u.Gv,{css:B,children:[(0,o.tZ)(h.J,{children:(0,o.BX)(p.a,{children:[(0,o.tZ)("h3",{children:"Your Term Calendar"}),(0,o.tZ)("p",{children:"View all your selected courses in an easy to read calendar format! Easily identify time conflicts and other issues."})]})}),(0,o.tZ)(h.J,{children:(0,o.tZ)(Z.K,{size:300,hasShadow:!0,allowFullScreen:!0,alt:"NMTLogo",css:{borderRadius:"25px"},url:"/images/logo.jpg",caption:"NMT"})}),(0,o.tZ)(h.J,{children:(0,o.BX)(p.a,{textAlign:"right",children:[(0,o.tZ)("h3",{children:"Keep on track"}),(0,o.tZ)("p",{children:"Update your cart at any time to automatically update the calendar here, and use the buttons below to export your CRNs to Banweb and register."})]})})]}),(0,o.tZ)(d.F,{size:"m"}),(0,o.BX)(p.a,{textAlign:"center",children:[(0,o.BX)("h3",{children:["Your ",(0,o.tZ)("i",{children:"Tentative"})," Course Calendar"]}),(0,o.tZ)("p",{children:"*Note: this is not an official calendar, and you must still use Banweb to register"}),(0,o.tZ)("p",{children:"*Note: you'll need to refresh the page to update the calendar if you make changes to your cart."})]}),(0,o.tZ)(d.F,{size:"m"}),(0,o.tZ)(u.Gv,{css:B,children:(0,o.tZ)(h.J,{children:(0,o.tZ)(b.default,{})})}),(0,o.tZ)(p.a,{textAlign:"center",children:(0,o.BX)("p",{children:[(0,o.tZ)("i",{children:"Pssst!"})," Hover over events on the calendar to reveal more details."]})}),(0,o.tZ)(d.F,{size:"m"}),(0,o.tZ)(p.a,{textAlign:"center",children:(0,o.tZ)("h4",{children:"Exporting Your Schedule"})}),(0,o.BX)(u.Gv,{children:[(0,o.tZ)(h.J,{}),(0,o.BX)(h.J,{children:[(0,o.tZ)(f.yR,{size:"xs",css:T,children:(0,o.tZ)("span",{children:"Tentative Schedule:"})}),(0,o.tZ)(y.g2,{href:"",size:"s",color:"primary",iconType:"calendar",onClick:function(){return N(!0)},children:"Export Calendar"}),k&&(0,o.BX)(g.w,{css:B,onClose:E,id:"calModal",children:[(0,o.tZ)(v.t,{children:(0,o.tZ)(m.I,{children:"Exporting your Calendar"})}),(0,o.tZ)(d.F,{size:"m"}),(0,o.tZ)(C.D,{children:(0,o.tZ)(p.a,{textAlign:"center",children:(0,o.tZ)("h4",{children:"The best way to save your calendar for later is to take a screenshot/snip of it."})})}),(0,o.tZ)(w.s,{children:(0,o.tZ)(y.g2,{onClick:E,iconType:"cross",color:"primary",size:"s",fill:!0,children:"Close"})})]})]}),(0,o.BX)(h.J,{children:[(0,o.tZ)(f.yR,{size:"xs",css:T,children:(0,o.tZ)("span",{children:"Banweb Registration:"})}),(0,o.tZ)(y.g2,{href:"",size:"s",color:"primary",iconType:"apmTrace",onClick:function(){return F(!0)},children:"Export CRNs"}),z&&(0,o.BX)(g.w,{css:B,onClose:R,id:"banModal",children:[(0,o.tZ)(v.t,{children:(0,o.tZ)(m.I,{children:"Exporting your CRNs for Registration"})}),(0,o.tZ)(d.F,{size:"m"}),(0,o.tZ)(C.D,{children:(0,o.BX)(p.a,{textAlign:"center",children:[(0,o.tZ)("h4",{children:"Copy your selected CRNs, and enter them directly into Banweb to register for courses."}),(0,o.tZ)("p",{children:"Find the fields to enter CRNs at Student and Financial Aid / Registration / Add/Drop Classes"}),(0,o.tZ)("p",{children:"You can copy them directly, with the Copy to Clipboard button below"})]})}),(0,o.BX)(w.s,{children:[(0,o.tZ)(y.g2,{onClick:R,iconType:"cross",color:"primary",fill:!0,children:"Close"}),(0,o.tZ)(y.g2,{onClick:a,iconType:"save",color:"primary",children:"Copy to Clipboard"})]})]})]}),(0,o.tZ)(h.J,{})]}),(0,o.tZ)(d.F,{size:"l"}),(0,o.tZ)(d.F,{size:"l"}),(0,o.tZ)(d.F,{size:"l"})]})]})};t.default=X},47568:function(e,t,n){"use strict";function r(e,t,n,r,i,o,l){try{var c=e[o](l),a=c.value}catch(s){n(s);return}c.done?t(a):Promise.resolve(a).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(i,o){var l=e.apply(t,n);function c(e){r(l,i,o,c,a,"next",e)}function a(e){r(l,i,o,c,a,"throw",e)}c(void 0)})}}n.d(t,{Z:function(){return i}})}},function(e){e.O(0,[11069,69173,11905,66622,94956,70232,51857,92915,17658,49774,92888,40179],function(){return e(e.s=63317)}),_N_E=e.O()}]);