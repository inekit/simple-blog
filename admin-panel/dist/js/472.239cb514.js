(self["webpackChunk_coreui_coreui_free_vue_admin_template"]=self["webpackChunk_coreui_coreui_free_vue_admin_template"]||[]).push([[472],{4234:function(e){let t={year:"numeric",month:"long",day:"numeric"};e.exports={dateFormatter:e=>new Date(e).toLocaleDateString("ru-RU",t),getAgeStr(e){return e>12?`${Math.trunc(e/12)} лет ${e%12} месяцев`:`${e} месяцев`}}},9472:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return V}});var i=a(3396);function o(e,t,a,o,l,s){const r=(0,i.up)("AddPostModal"),d=(0,i.up)("Table");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i.Wm)(r,{visible:l.formVisible,formData:l.formData,mode:e.formMode},null,8,["visible","formData","mode"]),(0,i.Wm)(d,{fields:l.tableFieldNames,postData:s.get,actions:l.dataActions,rows:l.rows,editMode:"form",name:"Посты"},null,8,["fields","postData","actions","rows"])])}var l=a(9242),s=a(7139);const r={class:"border p-2 mt-3 preview-container"},d=["src"],n=["onUpdate:modelValue"],m=["onClick"];function p(e,t,a,o,p,u){const c=(0,i.up)("CButton"),h=(0,i.up)("CModalTitle"),f=(0,i.up)("CModalHeader"),w=(0,i.up)("CFormInput"),g=(0,i.up)("CFormTextarea"),_=(0,i.up)("CModalBody"),D=(0,i.up)("CModalFooter"),C=(0,i.up)("CForm"),b=(0,i.up)("CModal");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(c,{color:"primary",onClick:u.addNewPost},{default:(0,i.w5)((()=>[(0,i.Uk)("Добавить пост")])),_:1},8,["onClick"]),(0,i.Wm)(b,{size:"xl",backdrop:"static",alignment:"center",visible:a.visible,onClose:u.closeModal},{default:(0,i.w5)((()=>[(0,i.Wm)(C,{novalidate:"",validated:p.formValid,ref:"add-file-form",onChange:e.wregert,onSubmit:t[2]||(t[2]=(0,l.iM)((e=>"new"===a.mode?u.addNewing():u.editNewing()),["prevent"])),class:"add-user",style:{display:"'none'"}},{default:(0,i.w5)((()=>[(0,i.Wm)(f,null,{default:(0,i.w5)((()=>[(0,i.Wm)(h,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)("new"===a.mode?"Добавить пост":"Редактировать пост"),1)])),_:1})])),_:1}),(0,i.Wm)(_,null,{default:(0,i.w5)((()=>[(0,i.Wm)(w,{class:"mb-3",modelValue:a.formData.title,"onUpdate:modelValue":t[0]||(t[0]=e=>a.formData.title=e),placeholder:"Заголовок",id:"inputHeader","aria-describedby":"inputGroupPrepend",feedbackValid:"Все ок",maxlength:"255",feedbackInvalid:"Введите корректный заголовок",required:""},null,8,["modelValue"]),(0,i.Wm)(g,{style:(0,s.j5)([{display:"md2"===p.textEditMode?"block":"none"},{"margin-bottom":"1rem"}]),modelValue:p.textMd2,"onUpdate:modelValue":t[1]||(t[1]=e=>p.textMd2=e),label:"Текст статьи",placeholder:"Напишите что-нибудь",rows:"20",id:"inputText","aria-describedby":"inputGroupPrepend",required:""},null,8,["style","modelValue"]),(0,i.Wm)(w,{type:"file",accept:"image/*",multiple:"multiple",ref:"file",onChange:u.previewMultiImage,class:"mb-3",label:"Превью",placeholder:"Изображения"},null,8,["onChange"]),(0,i._)("div",r,[p.preview_list?.length?((0,i.wg)(!0),(0,i.iD)(i.HY,{key:0},(0,i.Ko)(p.preview_list,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("img",{src:e.src,class:"img-fluid"},null,8,d),(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":e=>p.preview_list[t].alt=e},null,8,n),[[l.nr,p.preview_list[t].alt]]),(0,i._)("button",{onClick:(0,l.iM)((e=>u.dropImage(t)),["prevent"])},"Х",8,m)])))),128)):(0,i.kq)("",!0)])])),_:1}),(0,i.Wm)(D,null,{default:(0,i.w5)((()=>[(0,i.Wm)(c,{color:"secondary",onClick:u.closeModal},{default:(0,i.w5)((()=>[(0,i.Uk)(" Отменить ")])),_:1},8,["onClick"]),(0,i.wy)((0,i.Wm)(c,{color:"primary",type:"submit"},{default:(0,i.w5)((()=>[(0,i.Uk)("Добавить пост")])),_:1},512),[[l.F8,"new"===a.mode]]),(0,i.wy)((0,i.Wm)(c,{color:"primary",type:"submit"},{default:(0,i.w5)((()=>[(0,i.Uk)("Редактировать пост")])),_:1},512),[[l.F8,"edit"===a.mode]])])),_:1})])),_:1},8,["validated","onChange"])])),_:1},8,["visible","onClose"])],64)}a(7658);var u=a(6265),c=a.n(u),h=a(7123);const f=c().create({withCredentials:!0});var w={components:{},props:{mode:{required:!0,type:String,validator:e=>["new","edit"].includes(e.toLowerCase())},visible:!1,formData:{title:"",text:"",description:"",image_list:[]}},data(){return{textMd2:"",textEditMode:"md2",formValid:!1,preview_list:[]}},updated(){this.textMd2=this.formData.text,this.preview_list=this.formData.image_list?.filter((e=>e.file_name))?.map((({file_name:e,alt:t})=>({file_name:e,src:`${this.$store.state.imagesServer}/img/post-${this.formData.id}/${e}`,alt:t})))},async mounted(){},methods:{addNewPost(){h.Z.$emit("addNewPost")},previewMultiImage(e){var t=e.target,a=t.files.length,i=0;if(this.formData.preview=t.files[0],this.preview_list||(this.preview_list=[]),this.formData.image_list||(this.formData.image_list=[]),t.files)while(a--){var o=new FileReader;o.onload=e=>{this.preview_list.push({src:e.target.result,alt:""})},this.formData.image_list.push(t.files[i]),o.readAsDataURL(t.files[i]),i++}},reset(){this.formData.image_list=[],this.preview_list=[]},dropImage(e){this.formData.image_list?.splice(e,1),this.preview_list?.splice(e,1)},closeModal(){h.Z.$emit("closeModal")},constractFromData(e){if(!this.formData.title||!this.textMd2)throw new Error;var t=new FormData;return t.append("title",this.formData.title),t.append("text",this.textMd2),this.formData.image_list?.forEach((e=>{t.append("images[]",e?.file_name??e??null)})),this.preview_list?.forEach((e=>{t.append("alts[]",JSON.stringify(Object.assign(e,{src:null})))})),e&&t.append("id",this.formData.id),t},addNewing(){try{const e=this.constractFromData();f.post(this.$store.state.publicPath+"/api/admin/posts",e,{headers:{"Content-Type":"multipart/form-data"}}).then((()=>{h.Z.$emit("postAdded")})).catch((e=>{h.Z.$emit("noresponse",e)}))}catch(e){this.formValid=!0}},editNewing(){try{const e=this.constractFromData(!0);f.put(this.$store.state.publicPath+"/api/admin/posts",e,{headers:{"Content-Type":"multipart/form-data"}}).then((()=>{h.Z.$emit("postEdited")})).catch((e=>{h.Z.$emit("noresponse",e)}))}catch(e){this.formValid=!0}}}},g=a(89);const _=(0,g.Z)(w,[["render",p],["__scopeId","data-v-3ed83245"]]);var D=_;const C={key:1},b={class:"d-grid gap-2 d-md-flex justify-content-md-center"};function v(e,t,a,o,l,r){const d=(0,i.up)("CCardHeader"),n=(0,i.up)("CTableHeaderCell"),m=(0,i.up)("CTableRow"),p=(0,i.up)("CTableHead"),u=(0,i.up)("CFormInput"),c=(0,i.up)("CTableDataCell"),h=(0,i.up)("CButton"),f=(0,i.up)("CTableBody"),w=(0,i.up)("CTable"),g=(0,i.up)("CCardBody"),_=(0,i.up)("CCard"),D=(0,i.up)("CCol"),v=(0,i.up)("CRow"),y=(0,i.up)("CPaginationItem"),k=(0,i.up)("CPagination");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)(v,null,{default:(0,i.w5)((()=>[(0,i.Wm)(D,{md:12},{default:(0,i.w5)((()=>[(0,i.Wm)(_,{class:"mb-4"},{default:(0,i.w5)((()=>[(0,i.Wm)(d,null,{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(a.name),1)])),_:1}),(0,i.Wm)(g,null,{default:(0,i.w5)((()=>[(0,i.Wm)(w,{align:"middle",class:"mb-0 border",hover:"",responsive:""},{default:(0,i.w5)((()=>[(0,i.Wm)(p,{color:"light"},{default:(0,i.w5)((()=>[(0,i.Wm)(m,null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.fieldNames,(e=>((0,i.wg)(),(0,i.j4)(n,{key:e+"header",class:"text-center"},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(e),1)])),_:2},1024)))),128)),(0,i.Wm)(n,{class:"text-center"},{default:(0,i.w5)((()=>[(0,i.Uk)("Действия")])),_:1})])),_:1})])),_:1}),(0,i.Wm)(f,null,{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(r.transformData(a.rows),((o,d)=>((0,i.wg)(),(0,i.j4)(m,{key:d+"row"},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o,((e,t)=>((0,i.wg)(),(0,i.j4)(c,{key:t+"row",class:"text-center"},{default:(0,i.w5)((()=>[l.updatingId===a.rows[d]?.id?((0,i.wg)(),(0,i.j4)(u,{key:0,modelValue:l.formData[a.fields[t]?.name],"onUpdate:modelValue":e=>l.formData[a.fields[t]?.name]=e},null,8,["modelValue","onUpdate:modelValue"])):((0,i.wg)(),(0,i.iD)("span",C,(0,s.zw)(e),1))])),_:2},1024)))),128)),(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[(0,i._)("div",b,[l.updatingId===a.rows[d]?.id?((0,i.wg)(),(0,i.j4)(h,{key:0,color:"primary",size:"md",onClick:e=>r.editRow(d)},{default:(0,i.w5)((()=>[(0,i.Uk)(" Сохранить")])),_:2},1032,["onClick"])):(0,i.kq)("",!0),l.updatingId===a.rows[d]?.id?((0,i.wg)(),(0,i.j4)(h,{key:1,color:"light",size:"md",onClick:t[0]||(t[0]=e=>l.updatingId=!1)},{default:(0,i.w5)((()=>[(0,i.Uk)(" Отменить")])),_:1})):((0,i.wg)(!0),(0,i.iD)(i.HY,{key:2},(0,i.Ko)(a.actions,((t,a)=>((0,i.wg)(),(0,i.j4)(h,{key:a+"action",color:t?.color,size:"sm",onClick:i=>r.chooseAction(a,t,d,e.j,e.column)},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(a),1)])),_:2},1032,["color","onClick"])))),128))])])),_:2},1024)])),_:2},1024)))),128)),(0,i.Wm)(m)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),(0,i.Wm)(k,{"aria-label":"Page navigation example"},{default:(0,i.w5)((()=>[(0,i.Wm)(y,{onClick:r.previousPage},{default:(0,i.w5)((()=>[(0,i.Uk)("Назад")])),_:1},8,["onClick"]),(0,i.Wm)(y,{disabled:""},{default:(0,i.w5)((()=>[(0,i.Uk)((0,s.zw)(l.page),1)])),_:1}),(0,i.Wm)(y,{onClick:r.nextPage},{default:(0,i.w5)((()=>[(0,i.Uk)("Далее")])),_:1},8,["onClick"])])),_:1})],64)}var y=a(4234),k={props:{name:{type:String},fields:[],actions:[],rows:[],postData:{type:Function,default:()=>{}},updateRow:{type:Function,default:()=>{}},editMode:{type:String,default:"inline"}},data(){return{fieldNames:[],perPage:10,page:1,updatingId:!1,formData:{}}},async mounted(){this.fieldNames=this.fields.map((e=>"object"===typeof e?e.title??e.name:e)),await this.postData(this.perPage,this.page)},methods:{dateFormatter:y.dateFormatter,chooseAction(e,t,a){t&&(console.log("Изменить"===e&&"inline"===this.editMode,a),"Изменить"===e&&"inline"===this.editMode?(this.updatingId=this.rows[a]?.id,this.formData=this.rows[a]):t?.action(this.rows[a]))},async nextPage(){const e=await this.postData(this.perPage,this.page+1);e?.length>0&&this.page++},previousPage(){this.page>1&&this.page--,this.postData(this.perPage,this.page)},toPage(e){this.page=e,this.postData(this.perPage,this.page)},editRow(e){this.updatingId=!1,this.updateRow(this.rows[e]?.id,this.formData)},transformData(e){return e?.map(this.transformDataEl)},transformDataEl(e){let t=[];for(let a of this.fields){const i=a.name.split(".")??a.split(".");let o=e;i?.forEach((e=>o=o?.[e])),"publication_date"===a?.name&&(o=(0,y.dateFormatter)(o)),"text"===a?.name&&(o=o.substr(0,100)),t.push(o??"")}return t}}};const M=(0,g.Z)(k,[["render",v]]);var W=M;const $=c().create({withCredentials:!0,credentials:"include"});var P={name:"Posts",components:{AddPostModal:D,Table:W},props:["tag","project"],data(){return{myApi:$,formVisible:!1,formData:{},rows:[],dataActions:{"Изменить":{action:this.change,color:"warning"},"Удалить":{action:this.delete,color:"danger"}},tableFieldNames:[{name:"title",title:"Название"},{name:"publication_date",title:"Дата добавления"}]}},created(){h.Z.$on("addNewPost",(()=>{this.formMode="new",this.formData={project_name:this.$route.params.projectName,tags_array:this.$route.params.tag?new Set([this.$route.params.tag]):new Set},this.formVisible=!0})),h.Z.$on("closeModal",(()=>{this.formVisible=!1,this.formData={}})),h.Z.$on("postAdded",(()=>{this.formVisible=!1,this.get(),this.formData={}})),h.Z.$on("postEdited",(()=>{this.formVisible=!1,this.get(),this.formData={}}))},methods:{change(e){this.formVisible=!0,e.tags_array=new Set(e.tags_array),this.formData=e,console.log(e),this.formMode="edit"},get(e,t){return console.log(this.tag),$.get(this.$store.state.publicPath+"/api/admin/posts/",{params:{take:e??10,page:t??1,tagsArray:this.$route.params.tag?[this.$route.params.tag]:void 0,projectName:this.$route.params.projectName}}).then((e=>(e.data?.length>0&&(this.rows=e.data),e.data))).catch((e=>(h.Z.$emit("noresponse",e),!1)))},delete(e){const t=confirm("Вы действительно хотите удалить пост?");if(t)return $.delete(this.$store.state.publicPath+"/api/admin/posts/",{data:{id:e.id}}).then((()=>{this.get(),h.Z.$emit("postDeleted")})).catch((e=>{h.Z.$emit("noresponse",e)}))}}};const x=(0,g.Z)(P,[["render",o]]);var V=x}}]);
//# sourceMappingURL=472.239cb514.js.map