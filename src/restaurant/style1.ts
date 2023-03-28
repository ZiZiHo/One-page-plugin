import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
import {ClickEvent} from "../glitterBundle/plugins/click-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    function getRout(link: string) {
        return new URL("./" + link, import.meta.url).href
    }
    let hi: boolean = false;
    // https://liondesign.tw/restaurant/index.html?type=editor&page=nav&dialog=dialog_setting
    // https://squarestudio.tw/restaurantly/home?page=Page_Home
    function initialScript(gvc: any, widget: HtmlJson) {
        if (hi) {
            return
        }
        hi = true;
        (window as any).mode = 'dark';
        (window as any).root = document.getElementsByTagName('html')[0];
        (window as any).root.classList.add('dark-mode');
        gvc.addStyleLink([
            getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            // 'https://unpkg.com/aos@2.3.1/dist/aos.css',
            getRout('assets/css/theme.min.css'),
            getRout('app.css')
        ]).then()
        gvc.addMtScript([
            {src: 'https://kit.fontawesome.com/02e2dc09e3.js'},
            {src: getRout(`assets/js/isotope.pkgd.min.js`)},
            {src: getRout(`assets/js/tgs-player.js`)},
            {src: getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`)},
            {src: getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`)},
            {src: getRout(`assets/vendor/jarallax/dist/jarallax.min.js`)},
            {src: getRout(`assets/vendor/swiper/swiper-bundle.min.js`)},
            {src: getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`)},
            {src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`)},
            {src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`)},
            {src: getRout(`assets/js/theme.min.js`)},
            {src: getRout(`assets/js/main.js`)},
            // {src: `https://unpkg.com/aos@2.3.1/dist/aos.js`}
        ], () => {
            try {
                widget.refreshComponent()
            } catch (e) {
            }

        }, () => {

        })
    }
    return {
        temp:{
            title: "網站導覽列",
            subContent: "顯示多個超連結與頁面跳轉導覽的區塊．",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        return `
                            <nav class="w-100" style="padding: 0 300px;background-color: green;font-size: 14px;">
                                <div class="hidden-row d-flex" style="background: transparent;">
                                    <div class="d-flex align-items-center">
                                        <img style="width: 14px;height: 14px;margin-right: 5px;" src="${getRout("../img/phone.svg")}">0918-563-927
                                    </div>
                                    <div></div>
                                    <div class="ms-auto" style="color: #cda45e">
                                        中文 
                                        <span style="color:white;"> / English</span>
                                    </div>
                                </div>
                                <div class="nav-main-row" style="background: rgba(12, 11, 9, 0.6);"></div>
                            </nav>
                        `
                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        }
    }
})