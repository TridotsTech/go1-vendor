var w=(g,h,r)=>new Promise((u,l)=>{var v=i=>{try{a(r.next(i))}catch(f){l(f)}},m=i=>{try{a(r.throw(i))}catch(f){l(f)}},a=i=>i.done?u(i.value):Promise.resolve(i.value).then(v,m);a((r=r.apply(g,h)).next())});import{_ as P}from"./AppSidebar.e6135d3f.js";import{u as U,n as b,r as D,c as C,F as N,B as G,o as d,f as c,p as o,g as p,w as x,v as R,q as n,j as V,S as J,T as M,x as q,Q as S,W as I,V as _,X as Q,N as T,Y as W,Z as X,y as Y,$ as Z,a0 as F}from"./vendor.df9a4b93.js";import"./index.ba59bafc.js";const H={class:"flex h-screen w-screen"},K={class:"h-full border-r bg-gray-50"},ee={class:"h-full w-full flex flex-col overflow-auto"},te={class:"flex-1 flex flex-col h-full"},se={class:"mb-2 border-b p-4 flex justify-between"},ae={class:"flex mt-4 mb-4 px-5 justify-between"},oe={class:"flex"},le={class:"ml-6 mt-1"},ne={key:0,class:"flex-1 flex flex-col px-5 overflow-auto"},re={key:0},ie={key:1},de={class:"text-black text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},ce={key:2},ue={class:"font-small text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}},pe={class:"w-full mt-2"},me={class:"flex justify-between items-center"},ye={__name:"Addresses",setup(g){const h=U(),r=b([]),u=b([]),l=D({}),v=b(""),m=b(20),a=C({url:"go1_vendor.apidata.get_address",params:{field_filters:JSON.stringify(l)},method:"GET"}),i=C({url:"go1_vendor.api.get_address",method:"GET"}),f=()=>{h.push({name:"New Addresses"})},$=()=>w(this,null,function*(){const t=(yield i.fetch()).fields;r.value=[],u.value=[],u.value.push({fieldname:"name",fieldtype:"Data",options:null,label:"ID"}),r.value.push({label:"Name",key:"name",width:2}),t.forEach(s=>{s.in_list_view&&r.value.push({label:s.label,key:s.fieldname,width:s.width}),s.in_standard_filter&&u.value.push(s)})}),j=e=>{e&&e.name?h.push({name:"Addresses Detail",params:{id:e.name}}):console.error("Row data is invalid:",e)};N(m,e=>{a.limit=e,a.fetch()}),N(l,e=>{a.params={field_filters:JSON.stringify(l)},a.fetch();for(let t in e)(e[t]===null||e[t]==="")&&delete e[t]});const E=e=>{switch(e){case"Draft":return{theme:"red"};case"Overdue":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Return":return{theme:"orange"};default:return{theme:"gray"}}},O=()=>{Object.keys(l).forEach(e=>{delete l[e]}),a.fetch()},z=e=>({Select:Z,Color:_,Date:F,Link:_,TextEditor:_,Data:_,ReadOnly:"ReadOnlyComponent"})[e.fieldtype]||_,A=e=>({Select:{options:B(e.options),placeholder:e.label},Link:{size:"sm",variant:"subtle",type:"select",options:v.value,placeholder:e.label},Date:{size:"sm",placeholder:e.label},Data:{size:"sm",variant:"subtle",placeholder:e.label},TextEditor:{placeholder:e.label,variant:"subtle"}})[e.fieldtype]||{},B=e=>e?e.split(`
`).map(t=>({label:t,value:t})):[],L=(e=1e3)=>w(this,null,function*(){try{const t=yield fetch(`/api/resource/Country?fields=["country_name"]&limit=${e}`);if(!t.ok)throw new Error("Network response was not ok");const s=yield t.json();v.value=s.data.map(y=>y.country_name)||[]}catch(t){console.error("Error fetching priorities:",t)}});return G(()=>w(this,null,function*(){yield L(),$(),a.fetch()})),(e,t)=>(d(),c("div",H,[o("div",K,[p(P)]),o("div",ee,[o("div",te,[o("div",se,[t[3]||(t[3]=o("span",null,"Addresses",-1)),o("div",null,[p(n(V),{variant:"solid",theme:"gray",size:"sm",label:"Button",loading:!1,loadingText:null,disabled:!1,onClick:f},{default:x(()=>t[2]||(t[2]=[R(" + Create ")])),_:1})])]),o("div",ae,[o("div",oe,[(d(!0),c(J,null,M(u.value,s=>(d(),c("div",{class:"p-1 w-36",key:s.fieldname},[(d(),q(I(z(s)),S({ref_for:!0},A(s),{modelValue:l[s.fieldname],"onUpdate:modelValue":y=>l[s.fieldname]=y}),null,16,["modelValue","onUpdate:modelValue"]))]))),128))]),o("div",le,[p(n(V),{variant:"subtle",theme:"gray",size:"sm",onClick:O},{default:x(()=>t[4]||(t[4]=[R(" Reset ")])),_:1})])]),n(a).data?(d(),c("div",ne,[p(n(W),{class:"flex-1 overflow-auto",columns:r.value,rows:n(a).data,options:{getRowRoute:s=>({name:"Addresses Detail",params:{id:s.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found",description:"Create a new record to get started",button:{label:"New Record",variant:"solid",onClick:()=>console.log("New Record")}}},"row-key":"name",onRowClick:j},{cell:x(({item:s,row:y,column:k})=>[k.key==="status"?(d(),c("div",re,[p(n(Q),S(E(s),{size:"sm",label:s}),null,16,["label"])])):k.key==="naming_series"?(d(),c("div",ie,[o("span",de,T(s),1)])):(d(),c("div",ce,[o("span",ue,T(s),1)]))]),_:1},8,["columns","rows","options"]),o("div",pe,[o("div",me,[p(n(X),{modelValue:m.value,options:{rowCount:n(a).data.length,totalCount:n(a).data.length},"onUpdate:modelValue":t[0]||(t[0]=s=>m.value=s),onLoadMore:t[1]||(t[1]=s=>n(a).fetch()),class:"w-full"},null,8,["modelValue","options"])])])])):Y("",!0)])])]))}};export{ye as default};
