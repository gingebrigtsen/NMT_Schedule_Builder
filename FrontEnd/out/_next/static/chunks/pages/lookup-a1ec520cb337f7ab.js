(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[39515],{95792:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lookup",function(){return n(90268)}])},90268:function(e,t,n){"use strict";n.r(t);var r=n(47568),i=n(70655),c=n(35944),o=n(67294),l=n(70917),a=n(9008),s=n.n(a),h=n(22153),d=n(19574),u=n(27417),f=n(53196),p=n(94956),Z=n(99667),m=n(48034),g=n(99979),y=n(88791),C=n(5276),b=n(17658),S=n(14811),T=(0,l.iv)("borderRadius:'25px',border:'1px solid #666666',padding:'5px',top:'auto',bottom:'auto',"),v=(0,l.iv)("line-height:1.75;"),k=function(){var e=(0,o.useState)([]),t=e[0],n=e[1],l=(0,o.useState)([]),a=l[0],k=l[1],B=(0,o.useState)([{label:"0000 Lvl Pilot/Misc."},{label:"1000 Lvl Freshman"},{label:"2000 Lvl Sophomore"},{label:"3000 Lvl Junior"},{label:"4000 Lvl Senior"},{label:"5000 Lvl Graduate"},]),w=B[0],x=B[1];(0,o.useEffect)(function(){var e;(e=(0,r.Z)(function(){var e,t,r,c,o;return(0,i.__generator)(this,function(e){switch(e.label){case 0:return e.trys.push([0,3,,4]),[4,fetch("/conf.json")];case 1:return[4,e.sent().json()];case 2:return n((t=e.sent()).p_term.map(function(e){return{label:e[0]}})),k(t.p_subj.map(function(e){return{label:"".concat(e[0]," ").concat(e[1])}})),[3,4];case 3:return o=e.sent(),console.error("Error fetching conf.json data:",o),[3,4];case 4:return[2]}})}),function(){return e.apply(this,arguments)})()},[]);var X=(0,o.useState)(""),_=X[0],z=X[1],N=function(e){z(e.target.value)},E=(0,o.useState)([]),J=E[0],j=E[1],F=function(){var e={query:_,terms:t.filter(function(e){return e.checked}),subjects:a.filter(function(e){return e.checked}),levels:w.filter(function(e){return e.checked})};fetch("http://localhost:5000/api/serve_query",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return console.log("Response headers:",e.headers),e.json()}).then(function(e){console.log("Search results:",e),j(e)}).catch(function(e){console.error("Error searching:",e)});var n=document.getElementById("resultElement");n?setTimeout(function(){n.scrollIntoView({behavior:"smooth"})},1e3):console.error('Failed to find element with id "resultElement"')};return(0,c.BX)(c.HY,{children:[(0,c.tZ)(s(),{children:(0,c.tZ)("title",{children:"NMT Course Lookup"})}),(0,c.BX)(b.Z,{children:[(0,c.tZ)(h.F,{size:"l"}),(0,c.BX)(d.Gv,{css:T,children:[(0,c.tZ)(u.J,{children:(0,c.BX)(f.a,{children:[(0,c.tZ)("h3",{children:"NMT Course Lookup"}),(0,c.tZ)("p",{children:"Search by term, department, type/location, instructor, etc. Find the right classes for you and your degree program here!"})]})}),(0,c.tZ)(u.J,{children:(0,c.tZ)(p.K,{size:300,hasShadow:!0,allowFullScreen:!0,alt:"NMTLogo",css:{borderRadius:"25px"},url:"/images/logo.jpg",caption:"NMT"})}),(0,c.tZ)(u.J,{children:(0,c.BX)(f.a,{textAlign:"right",children:[(0,c.tZ)("h3",{children:"Create your schedule"}),(0,c.tZ)("p",{children:"Add courses to your cart to keep track of them, and track them on your calendar -- lookout for time conflicts."})]})})]}),(0,c.tZ)(h.F,{size:"m"}),(0,c.tZ)(f.a,{textAlign:"center",children:(0,c.tZ)("h3",{children:"Course Lookup"})}),(0,c.tZ)(h.F,{size:"m"}),(0,c.tZ)(f.a,{children:(0,c.BX)("h4",{style:{color:"#0079A5"},children:["Search Option 1 (Specify the Term, and search for a Subject, and/or Level)",(0,c.tZ)("strong",{children:"↴"})]})}),(0,c.BX)(d.Gv,{justifyContent:"spaceBetween",css:{height:200},children:[(0,c.BX)(u.J,{children:[(0,c.tZ)(Z.yR,{size:"xs",css:v,children:(0,c.tZ)("span",{children:"Term"})}),(0,c.tZ)(C._,{"aria-label":"termSelection",options:t,onChange:function(e){return n(e)},children:function(e){return(0,c.tZ)(c.HY,{children:e})}})]}),(0,c.BX)(u.J,{children:[(0,c.tZ)(Z.yR,{size:"xs",css:v,children:(0,c.tZ)("span",{children:"Subject / Program"})}),(0,c.tZ)(C._,{"aria-label":"termSelection",options:a,onChange:function(e){return k(e)},children:function(e){return(0,c.tZ)(c.HY,{children:e})}})]}),(0,c.BX)(u.J,{children:[(0,c.tZ)(Z.yR,{size:"xs",css:v,children:(0,c.tZ)("span",{children:"Course Level"})}),(0,c.tZ)(C._,{"aria-label":"termSelection",options:w,onChange:function(e){return x(e)},children:function(e){return(0,c.tZ)(c.HY,{children:e})}})]})]}),(0,c.tZ)(h.F,{size:"m"}),(0,c.tZ)(m.Gt,{margin:"s",size:"half"}),(0,c.BX)(d.Gv,{justifyContent:"spaceBetween",children:[(0,c.tZ)(u.J,{children:(0,c.tZ)(f.a,{children:(0,c.BX)("h4",{style:{color:"#0079A5"},children:["Search Option 2 (Specify the term, & Search for a phrase over all course listings)",(0,c.tZ)("strong",{children:"→"})]})})}),(0,c.BX)(u.J,{children:[(0,c.tZ)(Z.yR,{size:"xs",css:v,children:(0,c.tZ)("span",{children:"Term"})}),(0,c.tZ)(C._,{"aria-label":"termSelection",options:t,onChange:function(e){return n(e)},children:function(e){return(0,c.tZ)(c.HY,{children:e})}})]}),(0,c.tZ)(u.J,{children:(0,c.tZ)(g.n,{placeholder:"Search for Anything...","aria-label":"Search",onChange:N})})]}),(0,c.tZ)(m.Gt,{margin:"s",size:"half"}),(0,c.tZ)(h.F,{size:"m"}),(0,c.BX)(d.Gv,{justifyContent:"spaceBetween",children:[(0,c.tZ)(u.J,{children:(0,c.tZ)(f.a,{children:(0,c.BX)("h4",{style:{color:"#0079A5"},children:["Click search to get your results",(0,c.tZ)("strong",{children:"→"})]})})}),(0,c.tZ)(u.J,{children:(0,c.tZ)(y.g2,{size:"s",color:"primary",iconType:"search",onClick:F,children:"Search"})}),(0,c.tZ)(u.J,{})]}),(0,c.tZ)(m.Gt,{margin:"s",size:"half"}),(0,c.tZ)(f.a,{textAlign:"center",children:(0,c.tZ)("h3",{children:"Your Results:"})}),(0,c.tZ)(f.a,{children:(0,c.BX)("h4",{style:{color:"#0079A5"},children:["Select your chosen courses using the checkboxes",(0,c.tZ)("strong",{children:"→"})]})}),(0,c.tZ)(d.Gv,{justifyContent:"spaceBetween",children:(0,c.tZ)(u.J,{id:"resultElement",children:(0,c.tZ)(S.default,{resultData:J})})}),(0,c.tZ)(h.F,{size:"l"}),(0,c.tZ)(h.F,{size:"l"}),(0,c.tZ)(h.F,{size:"l"})]})]})};t.default=k},14811:function(e,t,n){"use strict";n.r(t);var r=n(10797),i=n(35944),c=n(67294),o=n(15664),l=n(53196),a=n(55670),s=n(39101),h=n(91446),d=n(19574),u=n(27417),f=n(88791),p=n(76210),Z=n(66537),m=n(18797),g=n(22153),y=n(42037),C=n(37151),b=n(95202),S={borderRadius:"25px",border:"1px solid #666666",padding:"5px",top:"auto",bottom:"auto"},T=function(e){var t=e.resultData,n=(0,c.useState)(!1),T=n[0],v=n[1],k=function(){v(!1),O([])},B=(0,c.useState)(0),w=B[0],x=B[1],X=(0,c.useState)(10),_=X[0],z=X[1],N=(0,c.useState)("Title"),E=N[0],J=N[1],j=(0,c.useState)("asc"),F=j[0],R=j[1],L=(0,c.useState)([]),A=L[0],O=L[1],G=(0,c.useState)(t||[]),I=G[0],D=G[1];(0,c.useEffect)(function(){D(t)},[t]);var P=(0,c.useState)(I),Y=P[0],H=P[1],M=function(e){var t=e.page,n=void 0===t?{index:w,size:_}:t,r=e.sort,i=void 0===r?{field:E,direction:F}:r,c=n.index,o=n.size,l=i.field,a=i.direction;x(c),z(o),J(l),R(a)},W=(0,c.useState)(!1),q=W[0],V=W[1],K=function(){V(!q),O(q?[]:Y.map(function(e){return e.CRN}))},Q=function(e){var t=A.includes(e)?A.filter(function(t){return t!==e}):(0,r.Z)(A).concat([e]);O(t)},U=function(){fetch("http://localhost:5000/api/add_to_cart",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({addItems:A.map(function(e){return I.find(function(t){return t.CRN===e})})})}).then(function(e){if(!e.ok)throw Error("HTTP error: ".concat(e.status));return e.json()}).then(function(e){console.log("Items added to cart:",e)}).catch(function(e){console.error("Failed to fetch in add_to_cart:",e)}),setTimeout(function(){v(!0)},1e3)};(0,c.useEffect)(function(){console.log("Triggered"),H(I.sort(function(e,t){var n=e[E]<t[E];return"desc"==F?n?1:-1:n?-1:1}).slice(w*_,(w+1)*_))},[E,F,w,_,I]);var $=I.length,ee=[{field:"CRN",name:(0,i.tZ)(o.i,{content:"The CRN, or id for the course",children:(0,i.tZ)("span",{children:"CRN"})}),width:"64px",sortable:!0,truncateText:!0},{field:"Title",name:(0,i.tZ)(o.i,{content:"The full name of the course",children:(0,i.tZ)("span",{children:"Title"})}),sortable:!0},{field:"Course",name:(0,i.tZ)(o.i,{content:"The course code, dept + lvl",children:(0,i.tZ)("span",{children:"Course"})}),sortable:!0},{field:"Instructor",name:(0,i.tZ)(o.i,{content:"The teacher(s) of the course",children:(0,i.tZ)("span",{children:"Instructor"})}),sortable:!0},{field:"Days",name:(0,i.tZ)(o.i,{content:"The days of the week on which the course takes place",children:(0,i.tZ)("span",{children:"Days"})}),sortable:!0,truncateText:!0},{field:"Time",name:(0,i.tZ)(o.i,{content:"The time of day in which the course takes place",children:(0,i.tZ)("span",{children:"Time"})}),sortable:!0,truncateText:!0},{field:"Location",name:(0,i.tZ)(o.i,{content:"The building / medium where the class meets",children:(0,i.tZ)("span",{children:"Location"})}),sortable:!0,truncateText:!0},{field:"Occupancy",name:(0,i.tZ)(o.i,{content:"The number of taken/open spaces in the course",children:(0,i.tZ)("span",{children:"Enrolled/Seats"})}),width:"100px",render:function(e,t){return(0,i.BX)(l.a,{children:[t.Enroll," / ",t.Seats]})}},{field:"Waitlist",name:(0,i.tZ)(o.i,{content:"The number of waitlist spaces taken",children:(0,i.tZ)("span",{children:"Waitlist"})}),width:"64px",render:function(e,t){return(0,i.tZ)(l.a,{children:t.Waitlist})}},{field:"Catalog",name:(0,i.tZ)(o.i,{content:"The course catalog page",children:(0,i.tZ)("span",{children:"Catalog"})}),render:function(e,t){return(0,i.tZ)(a.p,{href:t.Catalog,target:"_blank",children:"Link"})}},{name:(0,i.tZ)(s.D,{id:"selectAllCheckbox",label:"Select all rows",checked:q,onChange:K}),width:"32px",render:function(e){return(0,i.tZ)(s.D,{id:e.CRN.toString(),checked:A.includes(e.CRN),onChange:function(){return Q(e.CRN)}})}},];return(0,i.BX)("div",{children:[(0,i.tZ)(h.n,{items:Y,columns:ee,pagination:{pageIndex:w,pageSize:_,totalItemCount:$,pageSizeOptions:[10,20]},sorting:{sort:{field:E,direction:F}},onChange:M}),A.length>0&&(0,i.BX)(d.Gv,{justifyContent:"flexEnd",children:[(0,i.tZ)(u.J,{children:(0,i.tZ)(l.a,{children:(0,i.BX)("h4",{style:{color:"#0079A5"},children:["Finally, add your selections to your cart",(0,i.tZ)("strong",{children:"→"})]})})}),(0,i.BX)(u.J,{grow:!1,children:[(0,i.BX)(f.g2,{onClick:U,children:["Add selected ",A.length>1?"items":"item"," to cart"]}),T&&(0,i.BX)(p.w,{style:S,onClose:k,children:[(0,i.tZ)(Z.t,{children:(0,i.tZ)(m.I,{children:"Your Cart of Courses:"})}),(0,i.tZ)(g.F,{size:"m"}),(0,i.tZ)(y.D,{children:(0,i.tZ)(b.default,{})}),(0,i.BX)(C.s,{children:[(0,i.tZ)(f.g2,{onClick:k,iconType:"cross",color:"primary",fill:!0,children:"Continue Building"}),(0,i.tZ)(f.g2,{href:"./calendar",iconType:"indexOpen",color:"primary",children:"View on My Calendar"})]})]})]})]}),(0,i.tZ)(g.F,{size:"m"}),(0,i.tZ)(g.F,{size:"m"})]})};t.default=T}},function(e){e.O(0,[69173,11905,66622,94956,70232,51857,95329,36954,17658,49774,92888,40179],function(){return e(e.s=95792)}),_N_E=e.O()}]);