(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5968],{7170:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/result",function(){return n(14811)}])},95202:function(e,t,n){"use strict";n.r(t);var i=n(10797),r=n(35944),o=n(67294),c=n(15664),a=n(39101),l=n(91446),s=n(19574),d=n(27417),u=n(88791),h=function(){var e=(0,o.useState)(!1);e[0],e[1];var t=(0,o.useState)(0),n=t[0],h=t[1],f=(0,o.useState)(5),p=f[0],m=f[1],g=(0,o.useState)("CRN"),Z=g[0],C=g[1],T=(0,o.useState)("asc"),b=T[0],S=T[1],w=(0,o.useState)([]),y=w[0],k=w[1],v=(0,o.useState)([]),x=v[0],N=v[1],_=(0,o.useState)([]),R=_[0],E=_[1];(0,o.useEffect)(function(){fetch("http://localhost:5000/api/get_cart",{credentials:"include"}).then(function(e){if(!e.ok)throw Error("HTTP error: ".concat(e.status));return e.json()}).then(function(e){"items"in e?E(e.items):E([]),console.log("Selected results:",R)}).catch(function(e){console.error("Failed to fetch from get_cart:",e)})},[R]);var D=function(e){var t=e.page,i=void 0===t?{index:n,size:p}:t,r=e.sort,o=void 0===r?{field:Z,direction:b}:r,c=i.index,a=i.size,l=o.field,s=o.direction;h(c),m(a),C(l),S(s)},X=(0,o.useState)(!1),B=X[0],I=X[1],z=function(){I(!B),N(B?[]:y.map(function(e){return e.CRN}))},O=function(e){var t=x.includes(e)?x.filter(function(t){return t!==e}):(0,i.Z)(x).concat([e]);N(t)},P=function(){E(R.filter(function(e){return!x.includes(e.CRN)}));var e=R.filter(function(e){return x.includes(e.CRN)});N([]),fetch("http://localhost:5000/api/del_cart",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({delItems:e})}).then(function(e){if(!e.ok)throw Error("HTTP error: ".concat(e.status));return e.json()}).then(function(e){console.log("Items removed from cart:",e)}).catch(function(e){console.error("Failed to fetch del_cart:",e)})},j=function(){fetch("http://localhost:5000/api/clear_cart",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include"}).then(function(e){if(!e.ok)throw Error("HTTP error: ".concat(e.status));return e.json()}).catch(function(e){console.error("Failed to fetch del_cart:",e)}),N([]),E([])};(0,o.useEffect)(function(){console.log("Triggered"),k(R.sort(function(e,t){var n=e[Z]<t[Z];return"desc"==b?n?1:-1:n?-1:1}).slice(n*p,(n+1)*p))},[Z,b,n,p,R]);var F=R?R.length:0,L=[{field:"CRN",name:(0,r.tZ)(c.i,{content:"The CRN, or id for the course",children:(0,r.tZ)("span",{children:"CRN"})}),sortable:!0,truncateText:!0},{field:"Course",name:(0,r.tZ)(c.i,{content:"The course code, dept + lvl",children:(0,r.tZ)("span",{children:"Course"})}),sortable:!0,truncateText:!0},{field:"*Campus",name:(0,r.tZ)(c.i,{content:"The campus, eg Main, Distance/Web",children:(0,r.tZ)("span",{children:"Campus"})}),sortable:!0,truncateText:!0},{field:"Days",name:(0,r.tZ)(c.i,{content:"The days of the week on which the course takes place",children:(0,r.tZ)("span",{children:"Days"})}),sortable:!0,truncateText:!0},{field:"Time",name:(0,r.tZ)(c.i,{content:"The time of day in which the course takes place",children:(0,r.tZ)("span",{children:"Time"})}),sortable:!0,truncateText:!0},{field:"Location",name:(0,r.tZ)(c.i,{content:"The building / medium where the class meets",children:(0,r.tZ)("span",{children:"Location"})}),sortable:!0},{name:(0,r.tZ)(a.D,{id:"selectAllCheckbox",label:"Select all rows",checked:B,onChange:z}),width:"32px",render:function(e){return(0,r.tZ)(a.D,{id:e.CRN.toString(),checked:x.includes(e.CRN),onChange:function(){return O(e.CRN)}})}},];return(0,r.BX)("div",{children:[(0,r.tZ)(l.n,{items:y,columns:L,pagination:{pageIndex:n,pageSize:p,totalItemCount:F,pageSizeOptions:[5,10,15]},sorting:{sort:{field:Z,direction:b}},onChange:D,rowProps:function(e){var t;return{style:e.cF?{border:"1px solid red",backgroundColor:"lightcoral"}:{}}}}),x.length>0&&(0,r.tZ)(s.Gv,{justifyContent:"flexEnd",children:(0,r.tZ)(d.J,{grow:!1,children:(0,r.BX)(u.g2,{onClick:P,children:["Delete selected ",x.length>1?"items":"item"]})})}),(0,r.tZ)(u.g2,{color:"danger",onClick:j,children:"Delete all items"}),(0,r.tZ)("br",{}),(0,r.tZ)("i",{children:"Red entries indicate a time conflict among your selections."}),(0,r.tZ)("br",{}),(0,r.tZ)("i",{children:"To remove an item from your cart, select it, and click Delete Item(s)."}),(0,r.tZ)("br",{}),(0,r.BX)("i",{children:["Delete all items will remove ",(0,r.tZ)("strong",{children:"ALL"})," items from your cart (Not Recommended)."]})]})};t.default=h},14811:function(e,t,n){"use strict";n.r(t);var i=n(10797),r=n(35944),o=n(67294),c=n(15664),a=n(53196),l=n(55670),s=n(39101),d=n(91446),u=n(19574),h=n(27417),f=n(88791),p=n(76210),m=n(66537),g=n(18797),Z=n(22153),C=n(42037),T=n(37151),b=n(95202),S={borderRadius:"25px",border:"1px solid #666666",padding:"5px",top:"auto",bottom:"auto"},w=function(e){var t=e.resultData,n=(0,o.useState)(!1),w=n[0],y=n[1],k=function(){y(!1),F([])},v=(0,o.useState)(0),x=v[0],N=v[1],_=(0,o.useState)(10),R=_[0],E=_[1],D=(0,o.useState)("Title"),X=D[0],B=D[1],I=(0,o.useState)("asc"),z=I[0],O=I[1],P=(0,o.useState)([]),j=P[0],F=P[1],L=(0,o.useState)(t||[]),A=L[0],J=L[1];(0,o.useEffect)(function(){J(t)},[t]);var H=(0,o.useState)(A),W=H[0],G=H[1],M=function(e){var t=e.page,n=void 0===t?{index:x,size:R}:t,i=e.sort,r=void 0===i?{field:X,direction:z}:i,o=n.index,c=n.size,a=r.field,l=r.direction;N(o),E(c),B(a),O(l)},V=(0,o.useState)(!1),Y=V[0],q=V[1],K=function(){q(!Y),F(Y?[]:W.map(function(e){return e.CRN}))},Q=function(e){var t=j.includes(e)?j.filter(function(t){return t!==e}):(0,i.Z)(j).concat([e]);F(t)},U=function(){fetch("http://localhost:5000/api/add_to_cart",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({addItems:j.map(function(e){return A.find(function(t){return t.CRN===e})})})}).then(function(e){if(!e.ok)throw Error("HTTP error: ".concat(e.status));return e.json()}).then(function(e){console.log("Items added to cart:",e)}).catch(function(e){console.error("Failed to fetch in add_to_cart:",e)}),setTimeout(function(){y(!0)},1e3)};(0,o.useEffect)(function(){console.log("Triggered"),G(A.sort(function(e,t){var n=e[X]<t[X];return"desc"==z?n?1:-1:n?-1:1}).slice(x*R,(x+1)*R))},[X,z,x,R,A]);var $=A.length,ee=[{field:"CRN",name:(0,r.tZ)(c.i,{content:"The CRN, or id for the course",children:(0,r.tZ)("span",{children:"CRN"})}),width:"64px",sortable:!0,truncateText:!0},{field:"Title",name:(0,r.tZ)(c.i,{content:"The full name of the course",children:(0,r.tZ)("span",{children:"Title"})}),sortable:!0},{field:"Course",name:(0,r.tZ)(c.i,{content:"The course code, dept + lvl",children:(0,r.tZ)("span",{children:"Course"})}),sortable:!0},{field:"Instructor",name:(0,r.tZ)(c.i,{content:"The teacher(s) of the course",children:(0,r.tZ)("span",{children:"Instructor"})}),sortable:!0},{field:"Days",name:(0,r.tZ)(c.i,{content:"The days of the week on which the course takes place",children:(0,r.tZ)("span",{children:"Days"})}),sortable:!0,truncateText:!0},{field:"Time",name:(0,r.tZ)(c.i,{content:"The time of day in which the course takes place",children:(0,r.tZ)("span",{children:"Time"})}),sortable:!0,truncateText:!0},{field:"Location",name:(0,r.tZ)(c.i,{content:"The building / medium where the class meets",children:(0,r.tZ)("span",{children:"Location"})}),sortable:!0,truncateText:!0},{field:"Occupancy",name:(0,r.tZ)(c.i,{content:"The number of taken/open spaces in the course",children:(0,r.tZ)("span",{children:"Enrolled/Seats"})}),width:"100px",render:function(e,t){return(0,r.BX)(a.a,{children:[t.Enroll," / ",t.Seats]})}},{field:"Waitlist",name:(0,r.tZ)(c.i,{content:"The number of waitlist spaces taken",children:(0,r.tZ)("span",{children:"Waitlist"})}),width:"64px",render:function(e,t){return(0,r.tZ)(a.a,{children:t.Waitlist})}},{field:"Catalog",name:(0,r.tZ)(c.i,{content:"The course catalog page",children:(0,r.tZ)("span",{children:"Catalog"})}),render:function(e,t){return(0,r.tZ)(l.p,{href:t.Catalog,target:"_blank",children:"Link"})}},{name:(0,r.tZ)(s.D,{id:"selectAllCheckbox",label:"Select all rows",checked:Y,onChange:K}),width:"32px",render:function(e){return(0,r.tZ)(s.D,{id:e.CRN.toString(),checked:j.includes(e.CRN),onChange:function(){return Q(e.CRN)}})}},];return(0,r.BX)("div",{children:[(0,r.tZ)(d.n,{items:W,columns:ee,pagination:{pageIndex:x,pageSize:R,totalItemCount:$,pageSizeOptions:[10,20]},sorting:{sort:{field:X,direction:z}},onChange:M}),j.length>0&&(0,r.BX)(u.Gv,{justifyContent:"flexEnd",children:[(0,r.tZ)(h.J,{children:(0,r.tZ)(a.a,{children:(0,r.BX)("h4",{style:{color:"#0079A5"},children:["Finally, add your selections to your cart",(0,r.tZ)("strong",{children:"→"})]})})}),(0,r.BX)(h.J,{grow:!1,children:[(0,r.BX)(f.g2,{onClick:U,children:["Add selected ",j.length>1?"items":"item"," to cart"]}),w&&(0,r.BX)(p.w,{style:S,onClose:k,children:[(0,r.tZ)(m.t,{children:(0,r.tZ)(g.I,{children:"Your Cart of Courses:"})}),(0,r.tZ)(Z.F,{size:"m"}),(0,r.tZ)(C.D,{children:(0,r.tZ)(b.default,{})}),(0,r.BX)(T.s,{children:[(0,r.tZ)(f.g2,{onClick:k,iconType:"cross",color:"primary",fill:!0,children:"Continue Building"}),(0,r.tZ)(f.g2,{href:"./calendar",iconType:"indexOpen",color:"primary",children:"View on My Calendar"})]})]})]})]}),(0,r.tZ)(Z.F,{size:"m"}),(0,r.tZ)(Z.F,{size:"m"})]})};t.default=w}},function(e){e.O(0,[69173,66622,70232,49774,92888,40179],function(){return e(e.s=7170)}),_N_E=e.O()}]);