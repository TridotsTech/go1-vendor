var A=(h,_,o)=>new Promise((m,i)=>{var c=t=>{try{v(o.next(t))}catch(r){i(r)}},p=t=>{try{v(o.throw(t))}catch(r){i(r)}},v=t=>t.done?m(t.value):Promise.resolve(t.value).then(c,p);v((o=o.apply(h,_)).next())});import{_ as B,a as E}from"./AppHeader.5d85f85a.js";import{u as O,y as d,c as T,A as $,o as k,f as q,n,g as a,K as N,p as s,W as u,a3 as z,j as P}from"./vendor.c4b27f65.js";import"./index.294163e1.js";const W={class:"flex h-screen w-screen"},D={class:"h-full border-r bg-gray-50"},L={class:"flex-1 flex flex-col h-full overflow-auto"},R={class:"grid grid-cols-1 md:grid-cols-2 gap-6 p-10 overflow-auto"},H={class:"p-2"},I={class:"p-2"},J={class:"flex justify-end gap-4 mt-4"},Q={__name:"New Addresses",setup(h){const _=O(),o=d(""),m=d(""),i=d(""),c=d(""),p=d(""),v=d(""),t=d(""),r=d(""),f=d(""),V=d(""),y=d(!1),g=d(!1),S=[{label:"Billing",value:"Billing"},{label:"Shipping",value:"Shipping"},{label:"Office",value:"Office"},{label:"Personal",value:"Personal"},{label:"Postal",value:"Postal"},{label:"Shop",value:"Shop"},{label:"Subsidiary",value:"Subsidiary"},{label:"Warehouse",value:"Warehouse"},{label:"Current",value:"Current"},{label:"Permanent",value:"Permanent"},{label:"Other",value:"Other"}],U=()=>{o.value="",m.value="",i.value="",c.value="",p.value="",v.value="",t.value="",r.value="",f.value="",V.value="",y.value=!1,g.value=!1},C=()=>A(this,null,function*(){const b=[{value:o.value,message:"Address Title is required."},{value:m.value,message:"Address Type is required."},{value:i.value,message:"Address line1 is required."},{value:p.value,message:"City is required."},{value:r.value,message:"Country is required."}];for(const{value:e,message:x}of b)if(!e){alert(x);return}const l={address_title:o.value,address_type:m.value,city:p.value,address_line1:i.value,address_line2:c.value,state:v.value,pincode:t.value,country:r.value,email_id:f.value,phone:V.value,is_primary_address:y.value,is_shipping_address:g.value};try{const e=yield fetch("/api/resource/Address",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(l)});if(!e.ok){const x=yield e.text();throw new Error(`Error creating address: ${x}`)}_.push({name:"Addresses"})}catch(e){console.error("Error creating address:",e)}}),w=T({url:"go1_vendor.api.get_supplier",cache:["data"],auto:!0}),j=()=>A(this,null,function*(){try{const b=yield w.fetch()}catch(b){console.error("Error fetching data:",b)}});return $(()=>{j()}),(b,l)=>(k(),q("div",W,[n("div",D,[a(B)]),n("div",L,[a(E),N(b.$slots,"default"),n("div",R,[n("div",null,[a(s(u),{type:"text",size:"md",variant:"subtle",label:"Address Title",modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=e=>o.value=e),class:"mb-5"},null,8,["modelValue"]),n("div",null,[a(s(u),{type:"select",size:"md",options:S,variant:"subtle",label:"Address Type * ",modelValue:m.value,"onUpdate:modelValue":l[1]||(l[1]=e=>m.value=e),class:"mb-5"},null,8,["modelValue"])]),a(s(u),{type:"text",size:"md",variant:"subtle",label:"Address Line 1 * ",modelValue:i.value,"onUpdate:modelValue":l[2]||(l[2]=e=>i.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{type:"text",size:"md",variant:"subtle",label:"Address Line 2",modelValue:c.value,"onUpdate:modelValue":l[3]||(l[3]=e=>c.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{type:"text",size:"md",variant:"subtle",label:"City * ",modelValue:p.value,"onUpdate:modelValue":l[4]||(l[4]=e=>p.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{type:"text",size:"md",variant:"subtle",label:"State",modelValue:v.value,"onUpdate:modelValue":l[5]||(l[5]=e=>v.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{type:"text",size:"md",variant:"subtle",label:"Country * ",modelValue:r.value,"onUpdate:modelValue":l[6]||(l[6]=e=>r.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{size:"md",variant:"subtle",label:"Postal Code * ",modelValue:t.value,"onUpdate:modelValue":l[7]||(l[7]=e=>t.value=e),class:"mb-5"},null,8,["modelValue"])]),n("div",null,[a(s(u),{type:"email",size:"md",variant:"subtle",label:"Email",modelValue:f.value,"onUpdate:modelValue":l[8]||(l[8]=e=>f.value=e),class:"mb-5"},null,8,["modelValue"]),a(s(u),{size:"md",variant:"subtle",label:"Phone * ",modelValue:V.value,"onUpdate:modelValue":l[9]||(l[9]=e=>V.value=e),class:"mb-5"},null,8,["modelValue"]),n("div",H,[a(s(z),{size:"sm",modelValue:y.value,"onUpdate:modelValue":l[10]||(l[10]=e=>y.value=e),label:"Preferred Billing Address"},null,8,["modelValue"])]),n("div",I,[a(s(z),{size:"sm",modelValue:g.value,"onUpdate:modelValue":l[11]||(l[11]=e=>g.value=e),label:"Preferred Shipping Address"},null,8,["modelValue"])])])]),n("div",J,[a(s(P),{variant:"subtle",theme:"gray",size:"md",label:"Discard",onClick:U}),a(s(P),{variant:"solid",theme:"gray",size:"md",label:"Submit",onClick:C})])])]))}};export{Q as default};