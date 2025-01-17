import {ClickEvent} from "./glitterBundle/plugins/click-event.js";
import {Editor} from "./editor.js";
class GlobalData{
    public static  data={
        pageList:[],
        isRunning:false,
        run:()=>{
            if(GlobalData.data.isRunning){
                return
            }
            GlobalData.data.isRunning=true
            const saasConfig:{
                config: any,
                api:any
            }=(window as any).saasConfig
            saasConfig.api.getPage(saasConfig.config.appName).then((data:any)=>{
                if(data.result){
                    GlobalData.data.pageList=data.response.result.map((dd: any) => {
                        dd.page_config=dd.page_config ?? {}
                        return dd;
                    });
                }else{
                    GlobalData.data.isRunning=false
                    GlobalData.data.run()
                }
            })
        }
    }
}
ClickEvent.create(import.meta.url,{
    link: {
        title: "連結跳轉",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.bindView(()=>{
                        const id=gvc.glitter.getUUID()
                        function recursive(){
                            if(GlobalData.data.pageList.length===0){
                                GlobalData.data.run()
                                setTimeout(()=>{recursive()},200)
                            }else{
                                gvc.notifyDataChange(id)
                            }
                        }
                        recursive()



                        return {
                            bind:id,
                            view:()=>{
                                object.type=object.type??"inlink"
                                return `
                                ${Editor.h3("跳轉方式")}
                                <select class="form-control form-select" onchange="${gvc.event((e)=>{
                                    object.type=e.value
                                    gvc.notifyDataChange(id)
                                })}">
                                ${[
                                    {title:"內部連結",value:"inlink"},
                                    {title:"外部連結",value:"outlink"}
                                ].map((dd)=>{
                                    return `<option value="${dd.value}" ${(dd.value == object.type) ? `selected`:``}>${dd.title}</option>`
                                }).join('')}
</select>
                                ${(()=>{
                                    if(object.type==='inlink'){
                                        return  `<select class="form-select form-control mt-2" onchange="${gvc.event((e)=>{
                                            object.link=$(e).val()
                                        })}">
${GlobalData.data.pageList.map((dd:any)=>{
                                            object.link=object.link??dd.tag
    return `<option value="${dd.tag}" ${(object.link===dd.tag) ? `selected`:``}>${dd.name}</option>`
                                        })}
</select>`
                                    }else if(object.type==='outlink'){
                                        return gvc.glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: "",
                                            default: object.link,
                                            placeHolder: "輸入跳轉的連結",
                                            callback: (text: string) => {
                                                object.link = text
                                                widget.refreshAll()
                                            }
                                        })
                                    }else{
                                        return  ``
                                    }
                                })()}`
                            },
                            divCreate:{}
                        }
                    })
                },
                event: () => {
                    /**
                     * 網頁直接跳轉連結，如為APP則打開WEBVIEW
                     * */
                    if(object.type==='inlink'){
                        const url=new URL("./",location.href)
                        url.searchParams.set("page",object.link)
                        location.href=url.href
                       // location.href=
                    }else{
                        gvc.glitter.runJsInterFace("openWeb", {
                            url: object.link
                        }, (data) => {
                        }, {
                            webFunction(data: any, callback: (data: any) => void): any {
                                gvc.glitter.openNewTab(object.link)
                                // gvc.glitter.location.href=object.link
                            }
                        })
                    }
                }
            }
        }
    },
    test: {
        title: '點擊測試',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                   alert('test')
                }
            }
        }
    }
})