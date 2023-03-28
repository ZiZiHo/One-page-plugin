import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    function getRout(link) {
        return new URL("./" + link, import.meta.url).href;
    }
    let hi = false;
    function initialScript(gvc, widget) {
        if (hi) {
            return;
        }
        hi = true;
        window.mode = 'dark';
        window.root = document.getElementsByTagName('html')[0];
        window.root.classList.add('dark-mode');
        gvc.addStyleLink([
            getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            getRout('assets/css/theme.min.css'),
            getRout('app.css')
        ]).then();
        gvc.addMtScript([
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' },
            { src: getRout(`assets/js/isotope.pkgd.min.js`) },
            { src: getRout(`assets/js/tgs-player.js`) },
            { src: getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`) },
            { src: getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`) },
            { src: getRout(`assets/vendor/jarallax/dist/jarallax.min.js`) },
            { src: getRout(`assets/vendor/swiper/swiper-bundle.min.js`) },
            { src: getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/js/theme.min.js`) },
            { src: getRout(`assets/js/main.js`) },
        ], () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
    }
    return {
        temp: {
            title: "網站導覽列",
            subContent: "顯示多個超連結與頁面跳轉導覽的區塊．",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
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
                        `;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        }
    };
});
