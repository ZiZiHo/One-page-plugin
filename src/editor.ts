export class Editor{
    public static uploadImage(obj:{
        title:string,
        gvc:any,def:string,callback:(data:string)=>void
    }){
        const glitter=(window as any).glitter
        return `<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">${obj.title}</h3>
                            <div class="d-flex align-items-center mb-3">
                                <input class="flex-fill form-control " placeholder="請輸入圖片連結" value="${obj.def}" onchange="${obj.gvc.event((e:any) => {
            obj. callback(e.value)
                                   
        })}">
                                <div class="" style="width: 1px;height: 25px;background-color: white;"></div>
                                <i class="fa-regular fa-upload text-white ms-2" style="cursor: pointer;" onclick="${obj.gvc.event(() => {
            glitter.ut.chooseMediaCallback({
                single: true,
                accept: 'json,image/*',
                callback(data:any) {  }
            });
        })}"></i>
                            </div>`
    }
}