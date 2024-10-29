import{_ as p,j as I,a9 as D,ab as h,e as d,o as m,f as u,K as _,a6 as v,a7 as y,g as n,w as s,n as r,L as b,T as w,t as c,R as C}from"./vendor.c4b27f65.js";const k={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addImageDialog:{url:"",file:null,show:!1}}},components:{Button:I,Dialog:D},methods:{openDialog(){this.addImageDialog.show=!0},onImageSelect(t){let e=t.target.files[0];!e||(this.addImageDialog.file=e,h(e).then(i=>{this.addImageDialog.url=i}))},addImage(t){this.editor.chain().focus().setImage({src:t}).run(),this.reset()},reset(){this.addImageDialog=this.$options.data().addImageDialog}}},x={class:"relative cursor-pointer rounded-lg bg-gray-100 py-1 focus-within:bg-gray-200 hover:bg-gray-200"},B={class:"absolute inset-0 select-none px-2 py-1 text-base"},S=["src"];function V(t,e,i,N,a,o){const g=d("Button"),f=d("Dialog");return m(),u(C,null,[_(t.$slots,"default",v(y({onClick:o.openDialog}))),n(f,{options:{title:"Add Image"},modelValue:a.addImageDialog.show,"onUpdate:modelValue":e[2]||(e[2]=l=>a.addImageDialog.show=l),onAfterLeave:o.reset},{"body-content":s(()=>[r("label",x,[r("input",{type:"file",class:"w-full opacity-0",onChange:e[0]||(e[0]=(...l)=>o.onImageSelect&&o.onImageSelect(...l)),accept:"image/*"},null,32),r("span",B,b(a.addImageDialog.file?"Select another image":"Select an image"),1)]),a.addImageDialog.url?(m(),u("img",{key:0,src:a.addImageDialog.url,class:"mt-2 w-full rounded-lg"},null,8,S)):w("",!0)]),actions:s(()=>[n(g,{variant:"solid",onClick:e[1]||(e[1]=l=>o.addImage(a.addImageDialog.url))},{default:s(()=>e[3]||(e[3]=[c(" Insert Image ")])),_:1}),n(g,{onClick:o.reset},{default:s(()=>e[4]||(e[4]=[c(" Cancel ")])),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var L=p(k,[["render",V]]);export{L as default};
