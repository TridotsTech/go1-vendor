var g=(y,v,n)=>new Promise((u,o)=>{var m=r=>{try{f(n.next(r))}catch(_){o(_)}},a=r=>{try{f(n.throw(r))}catch(_){o(_)}},f=r=>r.done?u(r.value):Promise.resolve(r.value).then(m,a);f((n=n.apply(y,v)).next())});import{_ as E,a as z}from"./AppHeader.5d85f85a.js";import{u as L,y as w,r as P,c as k,D as C,A as B,o as c,f as d,n as l,g as p,K as I,R as D,S as U,N as A,P as R,Y as G,W as h,w as S,t as J,p as i,j as M,x as H,L as N,Z as K,$ as W,T as Y,a0 as Z,a1 as q}from"./vendor.c4b27f65.js";import"./index.294163e1.js";const Q={class:"flex h-screen w-screen"},X={class:"h-full border-r bg-gray-50"},F={class:"h-full w-full flex flex-col overflow-auto"},ee={class:"flex-1 flex flex-col h-full"},te={class:"flex mt-4 mb-4 px-5 justify-between"},se={class:"flex"},ae={class:"ml-6 mt-1"},oe={key:0,class:"flex-1 flex flex-col px-5 overflow-auto"},le={key:0},ne={key:1},re={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ie={key:2},ce={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},de={class:"w-full mt-2"},ue={class:"flex justify-between items-center"},he={__name:"PurchaseInvoice",setup(y){const v=L(),n=w([]),u=w([]),o=P({}),m=w(20),a=k({url:"go1_vendor.apidata.get_purchaseinvoice",params:{field_filters:JSON.stringify(o)},method:"GET"}),f=k({url:"go1_vendor.api.get_invoice",method:"GET"}),r=()=>g(this,null,function*(){const s=(yield f.fetch()).fields;n.value=[],u.value=[],u.value.push({fieldname:"name",fieldtype:"Data",options:null,label:"ID"}),n.value.push({label:"Name",key:"name",width:2},{label:"Status",key:"status",width:1}),s.forEach(t=>{t.in_list_view&&n.value.push({label:t.label,key:t.fieldname,width:t.width}),t.in_standard_filter&&u.value.push(t)})}),_=e=>{e&&e.name?v.push({name:"Supplier Invoice Details",params:{id:e.name}}):console.error("Row data is invalid:",e)};C(m,e=>{a.limit=e,a.fetch()}),C(o,e=>{a.params={field_filters:JSON.stringify(o)},a.fetch();for(let s in e)(e[s]===null||e[s]==="")&&delete e[s]},{deep:!0});const V=e=>{switch(e){case"Draft":return{theme:"red"};case"Overdue":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Return":return{theme:"orange"};default:return{theme:"gray"}}},$=()=>{Object.keys(o).forEach(e=>{delete o[e]}),a.fetch()},O=e=>({Select:Z,Color:h,Date:q,Link:h,TextEditor:h,Data:h,ReadOnly:"ReadOnlyComponent"})[e.fieldtype]||h,T=e=>({Select:{options:j(e.options),placeholder:e.label},Link:{size:"sm",variant:"subtle",placeholder:e.label},Date:{size:"sm",placeholder:e.label},Data:{size:"sm",variant:"subtle",placeholder:e.label},TextEditor:{placeholder:e.label,variant:"subtle"}})[e.fieldtype]||{},j=e=>e?e.split(`
`).map(s=>({label:s,value:s})):[];return B(()=>{r(),a.fetch()}),(e,s)=>(c(),d("div",Q,[l("div",X,[p(E)]),l("div",F,[l("div",ee,[p(z),I(e.$slots,"default"),l("div",te,[l("div",se,[(c(!0),d(D,null,U(u.value,t=>(c(),d("div",{class:"p-1 w-36",key:t.fieldname},[(c(),A(G(O(t)),R({ref_for:!0},T(t),{modelValue:o[t.fieldname],"onUpdate:modelValue":b=>o[t.fieldname]=b}),null,16,["modelValue","onUpdate:modelValue"]))]))),128))]),l("div",ae,[p(i(M),{variant:"subtle",theme:"gray",size:"sm",onClick:$},{default:S(()=>s[2]||(s[2]=[J(" Reset ")])),_:1})])]),i(a).data?(c(),d("div",oe,[p(i(K),{class:"flex-1 overflow-auto",columns:n.value,rows:i(a).data,options:{getRowRoute:t=>({name:"Supplier Invoice Details",params:{id:t.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found",description:"Create a new record to get started",button:{label:"New Record",variant:"solid",onClick:()=>console.log("New Record")}}},"row-key":"name",onRowClick:_},{cell:S(({item:t,row:b,column:x})=>[x.key==="status"?(c(),d("div",le,[p(i(H),R(V(t),{size:"sm",label:t}),null,16,["label"])])):x.key==="naming_series"?(c(),d("div",ne,[l("span",re,N(t),1)])):(c(),d("div",ie,[l("span",ce,N(t),1)]))]),_:1},8,["columns","rows","options"]),l("div",de,[l("div",ue,[p(i(W),{modelValue:m.value,options:{rowCount:i(a).data.length,totalCount:i(a).data.length},"onUpdate:modelValue":s[0]||(s[0]=t=>m.value=t),onLoadMore:s[1]||(s[1]=t=>i(a).fetch()),class:"w-full"},null,8,["modelValue","options"])])])])):Y("",!0)])])]))}};export{he as default};