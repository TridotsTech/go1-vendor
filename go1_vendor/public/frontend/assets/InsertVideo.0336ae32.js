import{_ as v,j as _,a9 as C,ac as k,e as r,o as u,f,K as w,a6 as x,a7 as B,g as t,w as l,n as y,t as n,L as U,N as h,T as g,R as N}from"./vendor.c4b27f65.js";const F={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addVideoDialog:{url:"",file:null,show:!1}}},components:{Button:_,Dialog:C,FileUploader:k},methods:{openDialog(){this.addVideoDialog.show=!0},onVideoSelect(i){let e=i.target.files[0];!e||(this.addVideoDialog.file=e)},addVideo(i){this.editor.chain().focus().insertContent(`<video src="${i}"></video>`).run(),this.reset()},reset(){this.addVideoDialog=this.$options.data().addVideoDialog}}},I={class:"flex items-center space-x-2"},S=["src"];function A(i,e,L,R,o,a){const s=r("Button"),p=r("FileUploader"),V=r("Dialog");return u(),f(N,null,[w(i.$slots,"default",x(B({onClick:a.openDialog}))),t(V,{options:{title:"Add Video"},modelValue:o.addVideoDialog.show,"onUpdate:modelValue":e[2]||(e[2]=d=>o.addVideoDialog.show=d),onAfterLeave:a.reset},{"body-content":l(()=>[t(p,{"file-types":"video/*",onSuccess:e[0]||(e[0]=d=>o.addVideoDialog.url=d.file_url)},{default:l(({file:d,progress:c,uploading:m,openFileSelector:D})=>[y("div",I,[t(s,{onClick:D},{default:l(()=>[n(U(m?`Uploading ${c}%`:o.addVideoDialog.url?"Change Video":"Upload Video"),1)]),_:2},1032,["onClick"]),o.addVideoDialog.url?(u(),h(s,{key:0,onClick:()=>{o.addVideoDialog.url=null,o.addVideoDialog.file=null}},{default:l(()=>e[3]||(e[3]=[n(" Remove ")])),_:2},1032,["onClick"])):g("",!0)])]),_:1}),o.addVideoDialog.url?(u(),f("video",{key:0,src:o.addVideoDialog.url,class:"mt-2 w-full rounded-lg",type:"video/mp4",controls:""},null,8,S)):g("",!0)]),actions:l(()=>[t(s,{variant:"solid",onClick:e[1]||(e[1]=d=>a.addVideo(o.addVideoDialog.url))},{default:l(()=>e[4]||(e[4]=[n(" Insert Video ")])),_:1}),t(s,{onClick:a.reset},{default:l(()=>e[5]||(e[5]=[n("Cancel")])),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var j=v(F,[["render",A]]);export{j as default};
