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
            getRout('assets/vendor/animate.css/animate.min.css'),
            getRout('assets/vendor/aos/aos.css'),
            getRout('assets/vendor/bootstrap/css/bootstrap.min.css'),
            getRout('assets/vendor/bootstrap-icons/bootstrap-icons.css'),
            getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            getRout('assets/vendor/glightbox/css/glightbox.min.css'),
            getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            getRout('assets/css/style.css')
        ]).then()
        gvc.addMtScript([
            "assets/vendor/aos/aos.js",
            "assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
            "assets/vendor/glightbox/js/glightbox.min.js",
            "assets/vendor/isotope-layout/isotope.pkgd.min.js",
            "assets/vendor/swiper/swiper-bundle.min.js",
            "assets/vendor/php-email-form/validate.js",
            'assets/vendor/animate.css/animate.js',
            'assets/js/main.js'
        ].map(((dd)=>{
            return   {src: getRout(dd)}
        })), () => {
            try {
                widget.refreshComponent()
            } catch (e) {
            }

        }, () => {

        })
    }
    function recursive(r:any, first?:any) {
        var h = "";
        if (r.list === undefined) {
            h += /*html*/ `
          <li>
            <a
              class="${first ? "nav-link" : ""} scrollto"
              onclick=""
              style="cursor:pointer"
              data-hash=${r.link}
            >
              ${r.name}
            </a>
          </li>
        `;
        } else {
            h += /*html*/ ` <li class="dropdown">
          <a class="">${r.name}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(()=>{
                var tmp = "";
                r.list.map((r2:any) => (tmp += recursive(r2)));
                return tmp;
            })()}
           
          </ul>
        </li>`;
        }
        return h;
    }
    function frSize(sizeMap: any, def: any) {
        var wi = window.innerWidth;
        var sm = (sizeMap.sm ?? def)
        var me = (sizeMap.me ?? sm)
        var lg = (sizeMap.lg ?? me)
        var xl = (sizeMap.xl ?? lg)
        var xxl = (sizeMap.xxl ?? xl)
        if (wi < 576) {
            return def
        } else if ((wi >= 576 && wi < 768)) {
            return sm
        } else if ((wi >= 768 && wi < 992)) {
            return me
        } else if ((wi >= 992 && wi < 1200)) {
            return lg
        } else if ((wi >= 1200 && wi < 1400)) {
            return xl
        } else if ((wi >= 1400)) {
            return xxl
        }
    }
    function urlIcon(url:string){
        let split = url.split(".");
        console.log(split)
        return ""
    }
    return {
        topbar:{
            title: "導覽列上方的資訊",
            subContent: "用來顯示聯絡資訊",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const top= {
                            phone: "0918-563-927",
                            clock: "週一至週五 09:00 - 19:00",
                        }
                        return `
                        <div id="topbar" class="d-flex align-items-center fixed-top">
                            <div class="container d-flex justify-content-center justify-content-md-between">
                                <div class="contact-info d-flex align-items-center">
                                    <i class="bi bi-phone d-flex align-items-center"><span>${top.phone}</span></i>
                                    <i class="bi bi-clock d-flex align-items-center ms-4"><span> ${top.clock}</span></i>
                                </div>
                                <div class="languages d-none d-md-flex align-items-center">
                                    <ul>
                                      <li>中文</li>
                                      <li><a href="#">English</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        nav:{
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const nav = {
                                title: "萊恩設計",
                                logo: "../../../glitterBundle/img/logo.svg",
                                bar: [
                                    { name: "菜單", link: "#menu" },
                                    { name: "產品介紹", link: "#feature" },
                                    { name: "定價方案", link: "#slider" },
                                    { name: "聯絡我們", link: "#contact" },
                                    {
                                        name: "更多內容",
                                        list: [
                                            { name: "技術領域", link: "#banner" },
                                            { name: "公司團隊", link: "#team" },
                                        ],
                                    },
                                ],
                                top: {
                                    phone: "0918-563-927",
                                    clock: "週一至週五 09:00 - 19:00",
                                },
                                btn: { name: "登入", link: "#" },
                            }
                        return `
                            <!-- ======= Header ======= -->
                            <header id="header" class="fixed-top d-flex align-items-cente">
                              <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                                <div class="d-flex logo" onclick="${gvc.event(()=>{})}" style="cursor:pointer">
                                  <img src="${nav.logo}" alt="" class="img-fluid me-3" />
                                  <h1 class="logo me-auto me-lg-0"><a>${nav.title}</a></h1>
                                </div>
                    
                                <nav id="navbar" class="navbar order-last order-lg-0">
                                  <ul>
                                    ${(()=>{
                                        var tmp = "";
                                        nav.bar.map((b) => (tmp += recursive(b, true)));
                                        return tmp;
                                    })()}
                                   
                                  </ul>
<!--                                  todo 這顆漢堡不會作動-->
                                  <i class="bi bi-list mobile-nav-toggle"></i>
                                </nav>
                    
                                <a
                                  class="book-a-table-btn scrollto d-none d-lg-flex"
                                  onclick=""
                                  style="cursor:pointer"
                                  >${nav.btn.name}</a
                                >
                              </div>
                            </header>
                            <!-- End Header -->
                            `

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        banner:{
            title: "橫幅",
            subContent: "簡單介紹",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const keyVision= {
                            title: "關於<span>萊恩設計</span>我們能為您做什麼？",
                                desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                video: "https://www.youtube.com/watch?v=u6BOC7CDUTQ",
                                img: getRout("assets/img/hero-bg.jpg"),
                                list: [
                                { name: "菜單", link: "#" },
                                { name: "門市據點", link: "#" },
                            ],
                        }
                        return ` 
                        <section id="hero" class="d-flex align-items-center" style="background: url(${keyVision.img}) top center">
                            <!--         data-aos="zoom-in"不能作動                   -->
                            <div class="container position-relative text-center text-lg-start"  data-aos-delay="100">
                                <div class="row" style="">
                                    <div class="col-lg-8">
                                        <h1 class="mb-3" style="">${keyVision.title}</h1>
                                        <h2 class="mb-5 text-left" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${keyVision.desc}</h2>
                
                                        <div class="btns">
                                            ${glitter.print(function () {
                                                var tmp = "";
                                                keyVision.list.map((l) => {
                                                    tmp += /*html*/ `
                                                        <a
                                                            class="btn-menu animated fadeInUp scrollto"
                                                            onclick="${gvc.event(()=>{})}"
                                                            style="cursor:pointer"
                                                            >${l.name}</a>
                                                    `;
                                                });
                                                return tmp;
                                            })}
                                        </div>
                                    </div>     
                                    <!--data-aos="zoom-in"-->
                                    <div
                                        class="col-lg-4 d-flex align-items-center justify-content-center position-relative"
                                        
                                        data-aos-delay="200"
                                      >
                                        <a href="${keyVision.video}" class="glightbox play-btn"></a>
                                      </div>                               
                                </div>
                          </div>
                        </section>`

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        about:{
            title: "關於我們",
            subContent: "用來介紹這網站的用途",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const about = {
                            background: getRout("assets/img/about-bg.jpg"),
                            img: getRout("assets/img/about.jpg"),
                            title: "《人類大未來：下一個五十年》",
                            desc: `
                                <p class="py-3" style="white-space:normal;word-wrap:break-word;word-break:break-all;">
                                    若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
                                </p>
                                <p class="py-3" style="white-space:normal;word-wrap:break-word;word-break:break-all;">
                                    如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
                                </p>`
                            ,
                        }
                        return gvc.bindView({
                            bind : glitter.getUUID(),
                            view : ()=>{
                                return `                        
                                <section id="about" class="about" style="background: url(${about.background}) center center">
                                    <!--data-aos="fade-up"-->
                                    <div class="container" data-aos="fade-up">
                                        <div class="row">
                                            <!--data-aos="zoom-in" data-aos-delay="100"-->
                                            <div class="col-lg-6 order-1 order-lg-2"  data-aos="zoom-in" data-aos-delay="100">
                                                <div class="about-img">
                                                    <img src="${about.img}" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                                                <h3 style="white-space:normal;word-wrap:break-word;word-break:break-all;">${about.title}</h3>
                                                <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${about.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                `
                            },divCreate:{},
                            onCreate:()=>{
                                // @ts-ignore
                                AOS.init();
                            }
                        })


                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        whyUs:{
            title: "服務內容",
            subContent: "介紹公司服務的內容項目",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const banner = {
                            title: "我們擅長的領域",
                            desc: "從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署",
                            list: [
                                { number: "01", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零件更換" },
                                { number: "02", title: "資訊安全", desc: "網路、網際網路、端點、API、雲端、應用程式" },
                                { number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" },
                                { number: "04", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，替您解除危機" },
                                { number: "05", title: "前後台版型多樣性", desc: "多種板塊可自行設計或與我們說明想要的介面" },
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return `
                                    <!-- ======= Why Us Section ======= -->
                                    <section id="banner" class="why-us">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${banner.title}</h2>
                                                <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${banner.desc}</p>
                                            </div>
                                
                                            <div class="row">
                                                ${glitter.print(function () {
                                                    var tmp = "";
                                                    banner.list.map((l, i) => {
                                                        tmp += /*html*/ `
                                                        <div class="col-lg-4 ${i == 0 && frSize({ sm: false }, true) ? `` : `mt-4`}">
                                                            <div class="box" data-aos="zoom-in" data-aos-delay="200">
                                                                <span>${l.number}</span>
                                                                <h4>${l.title}</h4>
                                                                <p>${l.desc}</p>
                                                            </div>
                                                        </div>
                                                      `;
                                                    });
                                                    return tmp;
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Why Us Section -->
                                `
                            },divCreate:{},
                            onCreate:()=>{

                            }

                        })
                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        menu:{
            title: "服務菜單",
            subContent: "各式各樣的菜品介紹和價格",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const menu = {
                            title: "菜單",
                            desc: "由米其林四星主廚坐鎮，給你最佳美食饗宴與餐廳服務",
                            tag: [
                                { className: "*", title: "所有餐點" },
                                { className: ".starters", title: "主食" },
                                { className: ".salads", title: "副食" },
                                { className: ".specialty", title: "甜點" },
                            ],
                            list: [
                                {
                                    img: "assets/img/menu/lobster-bisque.jpg",
                                    title: "蝦滋圈",
                                    desc: "金黃色又澎又厚的圈圈，選用鮮美飽滿的100%純蝦泥，搭配梅子醬或灑上鹹蛋黃，鹹甜鹹甜的獨特口感，沾點辣粉更開胃，一朵圈圈多重滋味！",
                                    price: 2390,
                                    tag: ["starters"],
                                },
                                {
                                    img: "assets/img/menu/bread-barrel.jpg",
                                    title: "芋香黑糯米 (冰/熱)",
                                    desc: "享用糯米的獨特Q感，搭配芋頭的香鬆軟，熱熱吃更加香濃迷人~",
                                    price: 109,
                                    tag: ["specialty"],
                                },
                                {
                                    img: "assets/img/menu/cake.jpg",
                                    title: "泰式春捲",
                                    desc: "有冬粉、木耳、豬肉、竹筍、高麗菜的豐富內餡，外皮香酥，一口咬下、雙重滿足。",
                                    price: 185,
                                    tag: ["starters"],
                                },
                                {
                                    img: "assets/img/menu/caesar.jpg",
                                    title: "檸香月亮",
                                    desc: "純鮮蝦泥拌入檸檬葉及香茅，使鮮美蝦味中多出迷人的南洋風味。",
                                    price: 370,
                                    tag: ["starters"],
                                },
                                {
                                    img: "assets/img/menu/tuscan-grilled.jpg",
                                    title: "泰式酥炸軟殼蟹(小份)",
                                    desc: "酥炸至金黃的軟殼蟹香脆可口，搭配特調酸辣淋醬，還有洋蔥、蒜酥增添風味層次，酸、辣、鮮、甜的豐富滋味，唇齒留香～",
                                    price: 420,
                                    tag: ["salads"],
                                },
                                {
                                    img: "assets/img/menu/mozzarella.jpg",
                                    title: "辣味月亮",
                                    desc: "主廚獨創出更豐富的蝦餅香鹹微辣層次，好味道真不是蓋的。",
                                    price: 370,
                                    tag: ["starters"],
                                },
                                {
                                    img: "assets/img/menu/greek-salad.jpg",
                                    title: "摩摩喳喳 (冰/熱)",
                                    desc: "西米露、綠豆沙、亞達枳、菠蘿蜜、紅毛丹、石榴紅寶石等豐富材料， 淋上香氣出眾的七葉蘭糖汁及椰奶，瓦城超人氣招牌甜點。",
                                    price: 99,
                                    tag: ["specialty"],
                                },
                                {
                                    img: "assets/img/menu/spinach-salad.jpg",
                                    title: "綠咖哩海鮮",
                                    desc: "選用新鮮蝦仁、中卷、蛤蜊與四季豆，加入泰國綠咖哩及椰奶醬汁快炒，海鮮和綠咖哩的組合吃起來特別鮮甜下飯，要不要點一份來試試呢？",
                                    price: 375,
                                    tag: ["salads"],
                                },
                                {
                                    img: "assets/img/menu/lobster-roll.jpg",
                                    title: "原味月亮",
                                    desc: "每份月亮都經過 108 道用心料理步驟，真材實料、口口酥脆鮮美，一直是瓦城銷售排行第一名！",
                                    price: 370,
                                    tag: ["starters"],
                                },
                            ],
                        }
                        return gvc.bindView({
                            bind:"",
                            view:()=>{
                                return /*html*/ `
                                <!-- ======= Menu Section ======= -->
                                <section id="menu" class="menu section-bg">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${menu.title}</h2>
                                            <p>${menu.desc}</p>
                                        </div>
                                    
                                    <div class="row" data-aos="fade-up" data-aos-delay="100">
                                        <div class="col-lg-12 d-flex justify-content-center">
                                            <ul id="menu-flters">
                                            ${(()=>{
                                                let tmp = "";
                                                menu.tag.map((t, i) => {
                                                    tmp += /*html*/ ` <li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``} >${t.title}</li> `;
                                                });
                                                return tmp;
                                            })()}                                          
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div class="row menu-container" data-aos="fade-up" data-aos-delay="200">
                                        ${(()=>{
                                            let tmp = "";
                                            menu.list.map((l) => {
                                                let tagClass = "";
                                                l.tag.map((m) => (tagClass += `${m} `));
                                                tmp += /*html*/ `
                                                    <div class="col-lg-6 menu-item ${tagClass}">
                                                      <img src="${getRout(l.img)}" class="menu-img" alt="" />
                                                      <div class="menu-content" ><a href="#">${l.title}</a><span>$ ${l.price.toLocaleString()}</span></div>
                                                      <div class="menu-ingredients" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc}</div>
                                                    </div>
                                                  `;
                                            });
                                            return tmp;   
                                        })()}
                                    </div>
                                    </div>
                                </section>
                                <!-- End Menu Section -->
                              `;
                            },divCreate:{}
                            ,onCreate:()=>{
                                // @ts-ignore
                                AOS.init();
                            }
                        })
                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        special:{
            title: "特色料理",
            subContent: "分頁式顯示料理和介紹",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const feature = {
                            title: "料理主題介紹",
                            desc: "這是我們堅持做出好料理的理念",
                            list: [
                                {
                                    tab: "文教",
                                    title: "田地在走，科技要有",
                                    desc: `因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。`,
                                    img: "assets/img/specials-1.png",
                                },
                                {
                                    tab: "消費",
                                    title: "庇護工場推中秋伴手禮 即日起開放預購",
                                    desc: `中秋節即將到來，新竹市勞工處攜手3家庇護工場推出特色伴手禮，分別有喜憨兒月餅禮盒、慢飛兒咖啡禮盒還有竹夢園手工香皂禮盒，歡迎企業團體踴躍採購。喜憨兒和慢飛兒推出應景的中秋禮盒送禮或是自用都相當適合，另一家庇護工場竹夢園以清潔工作為主，主打「喜迎中秋淨來」精美手工皂禮盒與環保清潔劑。`,
                                    img: "assets/img/specials-1.png",
                                },
                                {
                                    tab: "社會",
                                    title: "eTrade hub跨境電商大講堂",
                                    desc: `eTrade hub「電商大講堂」網羅各鏈路跨境電商專業講師，連結產業動態與實務操作，擘劃一套系統性的學習課程，依照企業需求從初階到進階、從操作教學到成功個案分享，札實的內容獲得許多正面的迴響。剛結束的「基礎學程」起步篇，就以平台選擇、商標佈局、選品技巧為軸，吸引逾百位企業員工參與，近90%的學員表示整體課程內容相當實用、高達85%對於講師授課方式與互動表示滿意，更有學員反映「此系列課程幫助企業增廣見聞，讓企業能以新的思維，進行多方嘗試」，成效斐然。`,
                                    img: "assets/img/specials-2.png",
                                },
                                {
                                    tab: "產能",
                                    title: "掌握關鍵新動能 布局高雄大未來",
                                    desc: `大南方崛起，蓄積多項產業轉型關鍵動能的高雄，從重工業之都蛻變高科技新城，全臺目光聚焦高雄，「投資高雄正對時」！高雄市政府今(10)日於高雄林皇宮舉辦「111年投資高雄城市產業論壇」，由財訊雙週刊社長謝金河主持，會中邀請高雄市政府副秘書長王啓川、經濟發展局局長廖泰翔、都市發展局副局長王屯電、學界代表及在地產業代表，從「高科技S廊道成形，掌握高雄轉型關鍵動能」與「高雄新生活，活化整合接軌國際」兩大主題，探討在各產業進駐下市府積極推動產業轉型、打造宜居高雄環境，一同預見更美好的高雄。`,
                                    img: "assets/img/specials-3.png",
                                },
                                {
                                    tab: "影音",
                                    title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
                                    desc: `『不稀罕別人給的完整╱狂奔』MV由林世穎& 陶磊兩位新銳導演執導拍攝，延續首部曲『白日夢的悲哀』在白日夢者超現實的迴圈後，畫面節奏跟著狂奔想像堆疊增加速度感，為MV特製的300公分高復刻沈安發呆容貌的大型「發呆至尊寶」呆呆搖擺人入鏡，雙寶共同激起白日夢們的生活情趣熱點。沈安說『“小明一個人在街上跳舞被罵是瘋子，於是他找了朋友跟他一起跳被罵是兩個瘋子。那請問小明找了幾個朋友?” 沈安回憶著他小學到現在都解不開的題目:“朋友要去那裡找?”』，以黑色幽默帶入白日夢者們在異想世界中的同溫層。`,
                                    img: "assets/img/specials-4.png",
                                },
                                {
                                    tab: "藝術",
                                    title: "如何正確而有《次第》的學習翡翠",
                                    desc: `玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。`,
                                    img: "assets/img/specials-5.png",
                                },
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return`
                                <!-- ======= Specials Section ======= -->
                                <section id="feature" class="specials">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${feature.title}</h2>
                                            <p>${feature.desc}</p>
                                        </div>                        
                                        <div class="row" data-aos="fade-up" data-aos-delay="100">
                                            <div class="col-lg-3">
                                                <ul class="nav nav-tabs flex-column">
                                                    ${glitter.print(function () {
                                                        let tmp = "";
                                                        feature.list.map((t:any, i:number) => {
                                                            tmp += /*html*/ `
                                                                <li class="nav-item">
                                                                  <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">${t.tab}</a>
                                                                </li>
                                                              `;
                                                        });
                                                        return tmp;
                                                    })}
                                                </ul>
                                          </div>
                                            <div class="col-lg-9 mt-4 mt-lg-0">
                                                <div class="tab-content">
                                                    ${glitter.print(function () {
                                                        let tmp = "";
                                                        feature.list.map((l:any, i:number) => {
                                                            tmp += /*html*/ `
                                                                <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                                                                    <div class="row">
                                                                        <div class="col-lg-8 details order-2 order-lg-1">
                                                                            <h3>${l.title}</h3>
                                                                            <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc}</p>
                                                                        </div>
                                                                        <div class="col-lg-4 text-center order-1 order-lg-2">
                                                                            <img src="${getRout(l.img)}" alt="" class="img-fluid" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                `;
                                                        });
                                                        return tmp;
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <!-- End Specials Section -->`
                            },
                            divCreate:{},
                            onCreate:()=>{}
                        })

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        slider:{
            title: "滑動式頁面",
            subContent: "滑動式頁面",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const slider= {
                            title: "活動專案",
                            desc: "提供原創活動的餐點服務與流程",
                            background: "assets/img/events-bg.jpg",
                            list: [
                                {
                                    title: "婚禮宴會",
                                    price: 24000,
                                    desc: "飯店提供五星級盛宴場地，佈置雅緻、時尚華麗，專屬的婚宴空間及精心研發料理，真誠的貼心服務，在這值得紀念的時刻，讓我們為您留下幸福與感動，您舉行幸福婚宴最佳場地，賓主盡情享受主廚最上乘好廚藝。",
                                    img: "assets/img/event-birthday.jpg",
                                },
                                {
                                    title: "企業品酒會",
                                    price: 12000,
                                    desc: "Wine Tasting + Shopping Day意大利葡萄酒有4000年歷史，是世界上最燦爛的葡萄酒生產國。擁有20個產區，近1000種葡萄，約80萬個葡萄園，每年生產約40億瓶葡萄酒 。在過去的五年裡，意大利葡萄酒的產量及出口量都位居世界第一，意大利是當之無愧的葡萄酒生產大國。有人說，外表容易騙人，品酒亦然。除非您的品酒經驗老道，否則您必須透過不同的嘗試才能找到心頭好。所以Wine Passions 及「意大利頂級酒莊聯盟」定期舉行試酒活動，讓您可以參加好評如潮的每月活動——由《新假期 》雜誌評選的「年度必到品酒工作坊」。在輕鬆的環境下，品嚐我們推介的不同美酒，而品酒工作坊亦作社交平台，讓您認識更多朋友！",
                                    img: "assets/img/event-custom.jpg",
                                },
                                {
                                    title: "親友聚餐",
                                    price: 8000,
                                    desc: "餐點多樣，主打義大利麵，也有拼盤類餐點，適合多人聚餐，多點各式餐點一起分食享用，也有各式啤酒，店內陳設各種啤酒瓶，服務人員態度，服務品質佳，是家庭朋友聚餐會想選擇的項目",
                                    img: "assets/img/event-private.jpg",
                                },
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return `
                                    <!-- ======= Events Section ======= -->
                                    <section id="slider" class="events" style="background: url(${slider.background}) center center no-repeat">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${slider.title}</h2>
                                                <p>${slider.desc}</p>
                                            </div>
                            
                                            <div class="events-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                                <div class="swiper-wrapper">
                                                    ${glitter.print(function () {
                                                        let tmp = "";
                                                        slider.list.map((l) => {
                                                            tmp += /*html*/ `
                                                                <div class="swiper-slide">
                                                                    <div class="row event-item">
                                                                        <div class="col-lg-6">
                                                                            <img src="${getRout(l.img)}" class="img-fluid" alt="" />
                                                                        </div>
                                                                        <div class="col-lg-6 pt-4 pt-lg-0 content">
                                                                            <h3>${l.title}</h3>
                                                                            <div class="price">
                                                                                <p><span>$${l.price.toLocaleString()}</span></p>
                                                                            </div>
                                                                            <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <!-- End testimonial item -->
                                                                `;
                                                            });
                                                        return tmp;
                                                    })}
                                                </div>
                                                <div class="swiper-pagination"></div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Events Section -->
                                `
                            },divCreate:{}
                            ,onCreate:()=>{

                            }

                        })
                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        testimonials:{
            title: "用戶回饋",
            subContent: "卡片式顯示過往用戶的回饋資訊",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const test= {
                            title: "給客戶滿意的網站設計，是我們致力奉獻的服務",
                            desc: "可以看看我們的客戶與業主給我們什麼樣的回饋！",
                            list: [
                                {
                                    name: "陳志賢",
                                    pro: "平面設計師",
                                    img: "assets/img/testimonials/testimonials-1.jpg",
                                    text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
                                },
                                { name: "陳佳玲", pro: "寵物店 店長", img: "assets/img/testimonials/testimonials-2.jpg", text: "萊恩設計公司的服務與溝通方式很友善" },
                                { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: "assets/img/testimonials/testimonials-3.jpg", text: "合作得很愉快，很喜歡萊恩設計" },
                                {
                                    name: "黃國玟",
                                    pro: "OO診所 護理師",
                                    img: "assets/img/testimonials/testimonials-4.jpg",
                                    text: "達成客戶的需求，替客戶早一步想到問題點很棒",
                                },
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return `
                                    <!-- ======= Testimonials Section ======= -->
                                    <section id="testimonials" class="testimonials section-bg">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${test.title}</h2>
                                                <p>${test.desc}</p>
                                            </div>
                            
                                            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                                <div class="swiper-wrapper">
                                                    ${glitter.print(function ()     {
                                                        let tmp = "";
                                                        test.list.map((l:any) => {
                                                            tmp += /*html*/ `
                                                            <div class="swiper-slide">
                                                                <div class="testimonial-item">
                                                                    <p>
                                                                        <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                                            ${l.text}
                                                                        <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                                    </p>
                                                              <img src="${getRout(l.img)}" class="testimonial-img" alt="" />
                                                              <h3>${l.name}</h3>
                                                              <h4>${l.pro}</h4>
                                                            </div>
                                                          </div>
                                                          <!-- End testimonial item -->
                                                        `;
                                                        });
                                                        return tmp;
                                                    })}
                                                </div>
                                                <div class="swiper-pagination"></div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Testimonials Section -->
                                `
                            },divCreate:{}
                            ,onCreate:()=>{

                            }

                        })

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        gallery:{
            title: "畫廊",
            subContent: "方格式展覽作品",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const gallery= {
                            title: "實際餐廳畫面",
                            desc: "餐廳空間設計與實際用餐的感覺",
                            list: [
                                "assets/img/gallery/gallery-1.jpg",
                                "assets/img/gallery/gallery-2.jpg",
                                "assets/img/gallery/gallery-3.jpg",
                                "assets/img/gallery/gallery-4.jpg",
                                "assets/img/gallery/gallery-5.jpg",
                                "assets/img/gallery/gallery-6.jpg",
                                "assets/img/gallery/gallery-7.jpg",
                                "assets/img/gallery/gallery-8.jpg",
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return `
                                <!-- ======= Gallery Section ======= -->
                                <section id="gallery" class="gallery">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${gallery.title}</h2>
                                            <p>${gallery.desc}</p>
                                        </div>
                                    </div>
                        
                                    <div class="container-fluid" data-aos="fade-up" data-aos-delay="100">
                                        <div class="row g-0">
                                            ${glitter.print(function () {
                                                let tmp = "";
                                                gallery.list.map((l:any) => {
                                                    tmp += /*html*/ `
                                                        <div class="col-lg-3 col-md-4">
                                                            <div class="gallery-item">
                                                                <a href="${getRout(l)}" class="gallery-lightbox" data-gall="gallery-item">
                                                                    <img src="${getRout(l)}" alt="" class="img-fluid" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                      `;
                                                });
                                                return tmp;
                                            })}
                                        </div>
                                    </div>
                                </section>
                                <!-- End Gallery Section -->
                                `
                            },divCreate:{},
                            onCreate:()=>{}
                        })

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        team:{
            title: "人員介紹",
            subContent: "藉由圖片和文字的方式介紹團隊成員",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const team= {
                            title: "我們的主廚團隊",
                            desc: "優良的傳統中，持續將餐點優化，是我們共同維護的榮譽",
                            list: [
                                {
                                    img: "assets/img/chefs/chefs-1.jpg",
                                    name: "陳志賢",
                                    pro: "大廚",
                                    link: ["https://www.facebook.com/", "https://www.instagram.com/"],
                                },
                                {
                                    img: "assets/img/chefs/chefs-2.jpg",
                                    name: "黃國玟",
                                    pro: "二廚",
                                    link: [
                                        "https://www.instagram.com/",
                                        "https://squarestudio.tw",
                                        "https://www.instagram.com/",
                                        "https://www.facebook.com/",
                                        "https://twitter.com/",
                                    ],
                                },
                                { img: "assets/img/chefs/chefs-3.jpg", name: "陳佳玲", pro: "外場經理", link: ["https://squarestudio.tw", "#"] },
                            ],
                        }
                        return `
                             <!-- ======= Chefs Section ======= -->
                            <section id="team" class="chefs">
                                <div class="container" data-aos="fade-up">
                                    <div class="section-title">
                                        <h2>${team.title}</h2>
                                        <p>${team.desc}</p>
                                    </div>
                                
                                    <div class="row">
                                        ${glitter.print(function () {
                                            var tmp = "";
                                                team.list.map((l:any) => {
                                                    tmp += /*html*/ `
                                                        <div class="col-lg-4 col-md-6">
                                                            <div class="member" data-aos="zoom-in" data-aos-delay="100">
                                                                <img src="${getRout(l.img)}" class="img-fluid" alt="" />
                                                                <div class="member-info">
                                                                    <div class="member-info-content">
                                                                        <h4>${l.name}</h4>
                                                                        <span>${l.pro}</span>
                                                                    </div>
                                                                    <div class="social">
                                                                        ${(()=>{
                                                                            let tmp = "";
                                                                            l.link.map((k:any) => {
                                                                                console.log("資料")
                                                                                console.log(k)
                                                                                tmp += /*html*/ `
                                                                                    <a onclick="" style="cursor:pointer"
                                                                                        ><i class="${urlIcon(k)}bi"></i
                                                                                    ></a>
                                                                                `;
                                                                            });
                                                                            return tmp;
                                                                        })()}                                                                    
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        `;
                                                    });
                                                    return tmp;
                                                })}
                                    </div>
                                </div>
                            </section>
                            <!-- End Chefs Section -->
                            `

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        empty:{
            title: "",
                subContent: "",
                defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        initialScript(gvc,widget)
                        const top= {
                            phone: "0918-563-927",
                            clock: "週一至週五 09:00 - 19:00",
                        }
                        return `
                            <div id="topbar" class="d-flex align-items-center fixed-top">
                                <div class="container d-flex justify-content-center justify-content-md-between">
                                    <div class="contact-info d-flex align-items-center">
                                        <i class="bi bi-phone d-flex align-items-center"><span>${top.phone}</span></i>
                                        <i class="bi bi-clock d-flex align-items-center ms-4"><span> ${top.clock}</span></i>
                                    </div>
                                    <div class="languages d-none d-md-flex align-items-center">
                                        <ul>
                                          <li>中文</li>
                                          <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            `

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
    }
})