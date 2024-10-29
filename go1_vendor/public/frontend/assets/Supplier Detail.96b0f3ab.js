var w=(y,f,d)=>new Promise((i,m)=>{var _=a=>{try{r(d.next(a))}catch(c){m(c)}},g=a=>{try{r(d.throw(a))}catch(c){m(c)}},r=a=>a.done?i(a.value):Promise.resolve(a.value).then(_,g);r((d=d.apply(y,f)).next())});import{_ as S,a as R}from"./AppHeader.5d85f85a.js";import{y as o,r as k,c as B,A as C,o as x,f as p,n as t,g as h,K as H,L as l,w as L,t as M,p as N,x as Q,R as T,S as D,V as $}from"./vendor.c4b27f65.js";import"./index.294163e1.js";const q={class:"flex h-screen w-screen"},E={class:"h-full border-r bg-gray-50"},I={class:"flex-1 flex flex-col h-full overflow-auto"},O={class:"main-content justify-items-center grid grid-cols-1 py-10 overflow-auto"},z={class:"grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5"},F={class:"px-3 py-3 border-b"},G={class:"flex justify-between items-center"},J={class:"text-xl text-cyan-600 font-semibold"},K={class:"grid grid-cols-1 p-3"},U={class:"grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800"},P={class:"flex flex-col gap-1"},W={class:"text-sm font-semibold"},X={class:"flex flex-col gap-1"},Y={class:"text-sm font-semibold"},Z={class:"flex flex-col gap-1"},tt={class:"text-sm font-semibold"},st={class:"flex flex-col gap-1"},et={class:"text-sm font-semibold"},lt={class:"flex flex-col gap-1"},ot={class:"text-sm font-semibold"},at={class:"flex flex-col gap-1"},nt={class:"text-sm font-semibold"},dt={class:"flex flex-col gap-1"},it=["innerHTML"],rt={class:"grid grid-cols-1"},ct={class:"w-full"},mt={class:"w-full text-xs text-left whitespace-nowrap"},ut={class:"px-3 py-2 w-1/2 text-md font-medium"},xt={class:"px-3 py-2 text-center text-md font-medium"},pt={class:"px-3 py-2 text-md font-medium"},ft={class:"px-3 py-2 text-right text-md font-medium"},_t={class:"px-3 py-2 text-right text-md font-medium"},gt={class:"grid grid-cols-1 p-3"},vt={class:"grid grid-cols-1 gap-10 md:grid-cols-2"},ht={class:"flex flex-col w-full gap-3"},yt={class:"flex justify-between items-center"},bt={class:"text-sm font-medium"},wt={class:"flex justify-between items-center"},Tt={class:"text-sm font-medium"},Dt={class:"grid grid-cols-1"},Vt={class:"w-full"},jt={class:"w-full text-xs text-left whitespace-nowrap"},At={class:"px-3 py-2 w-1/2 text-md font-medium"},St={class:"px-3 py-2 text-center text-md font-medium"},Rt={class:"px-3 py-2 text-md font-medium"},kt={class:"px-3 py-2 text-center text-md font-medium"},Bt={class:"px-3 py-2 text-right text-md font-medium"},Qt={__name:"Supplier Detail",setup(y){const f=o(""),d=o(""),i=o(""),m=o([]),_=o([]),g=o(""),r=o(""),a=o(""),c=o(""),v=o(""),b=o(""),V=k({}),j=B({url:"go1_vendor.apidata.get_supplierquotation",params:{field_filters:JSON.stringify(V)},method:"GET"});C(()=>w(this,null,function*(){try{const n=$().params.id,e=(yield j.fetch()).find(u=>u.name===n);e&&(f.value=e.name,i.value=e.status,d.value=e.transaction_date,g.value=e.supplier,r.value=e.valid_till,a.value=e.supplier_address,c.value=e.address_display,v.value=e.total,b.value=e.total_taxes_and_charges,m.value=e.items||[],_.value=e.taxes||[])}catch(n){console.error("Error fetching order details:",n)}}));const A=n=>n==="Cancelled"?"green":n==="Completed"?"blue":n==="Draft"?"red":n==="Closed"?"orange":"gray";return(n,s)=>(x(),p("div",q,[t("div",E,[h(S)]),t("div",I,[h(R),H(n.$slots,"default"),t("div",O,[t("div",z,[t("div",F,[t("div",G,[t("span",J,l(f.value),1),h(N(Q),{variant:"subtle",theme:A(i.value),size:"md",label:"Badge"},{default:L(()=>[M(l(i.value),1)]),_:1},8,["theme"])])]),t("div",K,[s[7]||(s[7]=t("div",{class:"mb-5 text-lg font-medium"},[t("h1",null," Details: ")],-1)),t("div",U,[t("div",P,[s[0]||(s[0]=t("span",{class:"text-gray-600 text-sm"},"Date Value",-1)),t("span",W,l(d.value),1)]),t("div",X,[s[1]||(s[1]=t("span",{class:"text-gray-600 text-sm"},"Input Value",-1)),t("span",Y,l(i.value),1)]),t("div",Z,[s[2]||(s[2]=t("span",{class:"text-gray-600 text-sm"},"Total Value",-1)),t("span",tt,l(v.value),1)]),t("div",st,[s[3]||(s[3]=t("span",{class:"text-gray-600 text-sm"},"Supplier",-1)),t("span",et,l(g.value),1)]),t("div",lt,[s[4]||(s[4]=t("span",{class:"text-gray-600 text-sm"},"Due Date Value",-1)),t("span",ot,l(r.value),1)]),t("div",at,[s[5]||(s[5]=t("span",{class:"text-gray-600 text-sm"},"Supplier Address",-1)),t("span",nt,l(a.value),1)]),t("div",dt,[s[6]||(s[6]=t("span",{class:"text-gray-600 text-sm"},"Address",-1)),t("span",{class:"text-sm font-semibold",innerHTML:c.value},null,8,it)])])]),t("div",rt,[t("div",ct,[t("table",mt,[s[8]||(s[8]=t("colgroup",null,[t("col"),t("col"),t("col"),t("col"),t("col")],-1)),s[9]||(s[9]=t("thead",null,[t("tr",{class:"bg-gray-100"},[t("th",{class:"p-3 w-1/2 text-md font-normal"},"Item code"),t("th",{class:"p-3 text-md font-normal"},"Quantity"),t("th",{class:"p-3 text-md font-normal"},"UOM"),t("th",{class:"p-3 text-md font-normal text-right"},"Rate"),t("th",{class:"p-3 text-md font-normal text-right"},"Amount")])],-1)),t("tbody",null,[(x(!0),p(T,null,D(m.value,(e,u)=>(x(),p("tr",{key:u,class:"border-b border-gray-200"},[t("td",ut,l(e.item_code),1),t("td",xt,l(e.qty),1),t("td",pt,l(e.uom),1),t("td",ft,l(e.rate),1),t("td",_t,l(e.amount),1)]))),128))])])])]),t("div",gt,[t("div",vt,[s[12]||(s[12]=t("div",null,null,-1)),t("div",ht,[t("div",yt,[s[10]||(s[10]=t("span",{class:"text-gray-600 text-sm font-medium"},"Tax Amount",-1)),t("span",bt,l(b.value),1)]),t("div",wt,[s[11]||(s[11]=t("span",{class:"text-gray-600 text-sm font-medium"},"Total",-1)),t("span",Tt,l(v.value),1)])])])]),t("div",Dt,[t("div",Vt,[t("table",jt,[s[13]||(s[13]=t("colgroup",null,[t("col"),t("col"),t("col"),t("col"),t("col")],-1)),s[14]||(s[14]=t("thead",null,[t("tr",{class:"bg-gray-100"},[t("th",{class:"p-3 w-1/2 text-md font-normal"},"Type"),t("th",{class:"p-3 text-md font-normal"},"Account Head"),t("th",{class:"p-3 text-md font-normal"},"Tax Rate"),t("th",{class:"p-3 text-md font-normal"},"Amount"),t("th",{class:"p-3 text-md font-normal text-right"},"Total")])],-1)),t("tbody",null,[(x(!0),p(T,null,D(_.value,(e,u)=>(x(),p("tr",{key:u,class:"border-b border-gray-200"},[t("td",At,l(e.charge_type),1),t("td",St,l(e.account_head),1),t("td",Rt,l(e.rate),1),t("td",kt,l(e.tax_amount),1),t("td",Bt,l(e.total),1)]))),128))])])])])])])])]))}};export{Qt as default};