var g=(y,v,i)=>new Promise((u,o)=>{var p=r=>{try{f(i.next(r))}catch(_){o(_)}},a=r=>{try{f(i.throw(r))}catch(_){o(_)}},f=r=>r.done?u(r.value):Promise.resolve(r.value).then(p,a);f((i=i.apply(y,v)).next())});import{_ as E,a as z}from"./AppHeader.5d85f85a.js";import{u as L,y as w,r as q,c as k,D as C,A as B,o as c,f as d,n,g as m,K as P,R as D,S as Q,N as U,P as R,p as l,Y as A,W as h,w as N,t as G,j as J,x as M,L as V,Z as H,$ as I,T as K,a0 as W,a1 as Y}from"./vendor.c4b27f65.js";import"./index.294163e1.js";const Z={class:"flex h-screen w-screen"},X={class:"h-full border-r bg-gray-50"},F={class:"h-full w-full flex flex-col overflow-auto"},ee={class:"flex-1 flex flex-col h-full"},te={class:"flex mt-4 mb-4 px-5 justify-between"},se={class:"flex"},ae={class:"ml-6 mt-1"},oe={key:0,class:"flex-1 flex flex-col px-5 overflow-auto"},le={key:0},ne={key:1},re={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ie={key:2},ce={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},de={class:"w-full mt-2"},ue={class:"flex justify-between items-center"},he={__name:"RequestQuotation",setup(y){const v=L(),i=w([]),u=w([]);let o=q({});const p=w(20),a=k({url:"go1_vendor.apidata.get_quotation",params:{field_filters:JSON.stringify(o)},method:"GET"}),f=k({url:"go1_vendor.api.get_request",method:"GET"}),r=()=>g(this,null,function*(){const s=(yield f.fetch()).fields;u.value=[],u.value.push({fieldname:"name",fieldtype:"Data",options:null,label:"ID"}),i.value.push({label:"Name",key:"name",width:2},{label:"Status",key:"status",width:1}),s.forEach(t=>{t.in_list_view&&i.value.push({label:t.label,key:t.fieldname,width:t.width}),t.in_standard_filter&&u.value.push(t)})}),_=e=>{e&&e.name?v.push({name:"Request Quotation Details",params:{id:e.name}}):console.error("Row data is invalid:",e)};C(p,e=>{a.limit=e,a.fetch()}),C(o,e=>{a.params={field_filters:JSON.stringify(o)},a.fetch();for(let s in e)(e[s]===null||e[s]==="")&&delete e[s];console.log("hit",o)},{deep:!0});const $=e=>{switch(e){case"Draft":return{theme:"red"};case"Overdue":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Return":return{theme:"orange"};default:return{theme:"gray"}}},S=()=>{Object.keys(o).forEach(e=>{delete o[e]}),a.fetch()},O=e=>({Select:W,Color:h,Date:Y,Link:h,TextEditor:h,Data:h,ReadOnly:"ReadOnlyComponent"})[e.fieldtype]||h,T=e=>({Select:{options:j(e.options),placeholder:e.label},Link:{size:"sm",variant:"subtle",placeholder:e.label},Date:{size:"sm",placeholder:e.label},Data:{size:"sm",variant:"subtle",placeholder:e.label},TextEditor:{placeholder:e.label,variant:"subtle"}})[e.fieldtype]||{},j=e=>e?e.split(`
`).map(s=>({label:s,value:s})):[];return B(()=>{r(),a.fetch()}),(e,s)=>(c(),d("div",Z,[n("div",X,[m(E)]),n("div",F,[n("div",ee,[m(z),P(e.$slots,"default"),n("div",te,[n("div",se,[(c(!0),d(D,null,Q(u.value,t=>(c(),d("div",{class:"p-1 w-36",key:t.fieldname},[(c(),U(A(O(t)),R({ref_for:!0},T(t),{modelValue:l(o)[t.fieldname],"onUpdate:modelValue":b=>l(o)[t.fieldname]=b}),null,16,["modelValue","onUpdate:modelValue"]))]))),128))]),n("div",ae,[m(l(J),{variant:"subtle",theme:"gray",size:"sm",onClick:S},{default:N(()=>s[2]||(s[2]=[G(" Reset ")])),_:1})])]),l(a).data?(c(),d("div",oe,[m(l(H),{class:"flex-1 overflow-auto",columns:i.value,rows:l(a).data,options:{getRowRoute:t=>({name:"Request Quotation Details",params:{id:t.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found",description:"Create a new record to get started",button:{label:"New Record",variant:"solid",onClick:()=>console.log("New Record")}}},"row-key":"name",onRowClick:_},{cell:N(({item:t,row:b,column:x})=>[x.key==="status"?(c(),d("div",le,[m(l(M),R($(t),{size:"sm",label:t}),null,16,["label"])])):x.key==="naming_series"?(c(),d("div",ne,[n("span",re,V(t),1)])):(c(),d("div",ie,[n("span",ce,V(t),1)]))]),_:1},8,["columns","rows","options"]),n("div",de,[n("div",ue,[m(l(I),{modelValue:p.value,options:{rowCount:l(a).data.length,totalCount:l(a).data.length},"onUpdate:modelValue":s[0]||(s[0]=t=>p.value=t),onLoadMore:s[1]||(s[1]=t=>l(a).fetch()),class:"w-full"},null,8,["modelValue","options"])])])])):K("",!0)])])]))}};export{he as default};
