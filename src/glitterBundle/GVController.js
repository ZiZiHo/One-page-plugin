"use strict";
import { GVCType } from "./module/PageManager.js";
const $ = window.$;
class LifeCycle {
    constructor() {
        this.onResume = function () {
        };
        this.onPause = function () {
        };
        this.onDestroy = function () {
        };
        this.onCreate = function () {
        };
        this.onCreateView = function () {
            return "";
        };
        this.cssInitial = function () {
            return '';
        };
    }
    notifyDataChange() {
        $('body').html(this.onCreateView());
    }
}
export class GVC {
    constructor() {
        this.glitter = window.glitter;
        this.parameter = {
            clickMap: {},
            pageConfig: undefined,
            bindViewList: {},
            clickID: 0,
            styleList: [],
            jsList: [],
            styleLinks: [],
        };
        this.recreateView = () => {
        };
    }
    notifyDataChange(id) {
        const gvc = this;
        try {
            const refresh = (id) => {
                $(`#${gvc.parameter.pageConfig.id}${id}`).html(gvc.parameter.bindViewList[id].view());
                if (gvc.parameter.bindViewList[id].onCreate) {
                    gvc.parameter.bindViewList[id].onCreate();
                }
            };
            if (typeof id === 'object') {
                id.map(function (id) {
                    refresh(id);
                });
            }
            else {
                refresh(id);
            }
        }
        catch (e) {
            if (gvc.glitter.debugMode) {
                console.log(e);
                console.log(e.stack);
                console.log(e.line);
            }
        }
    }
    addObserver(obj, callback, viewBind) {
        const gvc = this;
        try {
            if (obj.initial) {
                callback();
            }
            var map = obj.obj;
            if (!map.GlitterJsonStringConversionGetData) {
                var tMap = {};
                map.GlitterJsonStringConversionGetData = function () {
                    return tMap;
                };
            }
            if (!map.GlitterObServerCallBack) {
                var callba = [];
                map.GlitterObServerCallBack = function () {
                    return callba;
                };
            }
            if (viewBind) {
                if (map.GlitterObServerCallBack().filter(function (it) {
                    return it.viewBind === viewBind;
                }).length === 0) {
                    map.GlitterObServerCallBack().push({ key: obj.key, callback: callback, viewBind: viewBind });
                }
            }
            else {
                map.GlitterObServerCallBack().push({ key: obj.key, callback: callback });
            }
            var keys = Object.keys(map);
            for (var a = 0; a < keys.length; a++) {
                let keyVa = keys[a];
                if (keyVa !== 'GlitterJsonStringConversionGetData' && (keyVa !== 'GlitterObServerCallBack') && (keyVa === obj.key)) {
                    gvc.glitter.deBugMessage("add-" + obj.key);
                    if (!map.GlitterJsonStringConversionGetData()[keyVa]) {
                        map.GlitterJsonStringConversionGetData()[keyVa] = map[keyVa];
                    }
                    Object.defineProperty(map, keyVa, {
                        get: function () {
                            return map.GlitterJsonStringConversionGetData()[keyVa];
                        },
                        set(v) {
                            map.GlitterJsonStringConversionGetData()[keyVa] = v;
                            map.GlitterObServerCallBack().map(function (it) {
                                try {
                                    if (it.key === keyVa) {
                                        it.callback({ key: it.key, value: v });
                                    }
                                }
                                catch (e) {
                                    gvc.glitter.deBugMessage(e);
                                    gvc.glitter.deBugMessage(e.stack);
                                    gvc.glitter.deBugMessage(e.line);
                                }
                            });
                        }
                    });
                }
            }
            if (map[obj.key] === undefined) {
                map[obj.key] = '';
                Object.defineProperty(map, obj.key, {
                    get: function () {
                        return map.GlitterJsonStringConversionGetData()[obj.key];
                    },
                    set(v) {
                        map.GlitterJsonStringConversionGetData()[obj.key] = v;
                        map.GlitterObServerCallBack().map(function (it) {
                            try {
                                if (it.key === obj.key) {
                                    it.callback({ key: it.key, value: v });
                                }
                            }
                            catch (e) {
                                gvc.glitter.deBugMessage(e);
                                gvc.glitter.deBugMessage(e.stack);
                                gvc.glitter.deBugMessage(e.line);
                            }
                        });
                    }
                });
            }
        }
        catch (e) {
            gvc.glitter.deBugMessage(e);
            gvc.glitter.deBugMessage(e.stack);
            gvc.glitter.deBugMessage(e.line);
        }
    }
    bindView(map) {
        const gvc = this;
        if (typeof map === "function") {
            map = map();
        }
        if (map.dataList) {
            map.dataList.map(function (data) {
                $(`#${gvc.parameter.pageConfig?.id}${map.bind}`).html(map.view());
                gvc.addObserver(data, function () {
                    $(`#${gvc.parameter.pageConfig?.id}${map.bind}`).html(map.view());
                    if (map.onCreate()) {
                        map.onCreate();
                    }
                });
            });
        }
        gvc.parameter.bindViewList[map.bind] = map;
        if (document.getElementById(gvc.parameter.pageConfig?.id + map.bind)) {
            $(`#${gvc.parameter.pageConfig?.id}${map.bind}`).html(map.view());
        }
        if (map.onCreate) {
            var timer = setInterval(function () {
                if (document.getElementById(gvc.parameter.pageConfig.id + map.bind)) {
                    map.onCreate();
                    clearInterval(timer);
                }
            }, 100);
        }
        if (map.inital) {
            map.inital();
        }
        if (map.divCreate) {
            return `
<${map.divCreate.elem ?? 'div'} id="${gvc.parameter.pageConfig?.id}${map.bind}" class="${map.divCreate.class ?? ""}" style="${map.divCreate.style ?? ""}" 
${gvc.map((map.divCreate.option ?? []).map((dd) => {
                return ` ${dd.key}="${dd.value}"`;
            }))}
>${map.view()}</${map.divCreate.elem ?? 'div'}>
`;
        }
        else {
            return map.view();
        }
    }
    event(fun, noCycle) {
        const gvc = this;
        if (noCycle === undefined) {
            gvc.parameter.clickID++;
            gvc.parameter.clickMap[`${gvc.parameter.clickID}`] = {
                fun: fun,
                noCycle: false
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${gvc.parameter.clickID}'].fun(this,event);" data-gs-event-${gvc.parameter.clickID}="event`;
        }
        else {
            gvc.parameter.clickMap[noCycle] = {
                fun: fun,
                noCycle: true
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${noCycle}'].fun(this,event);"  data-gs-event-${noCycle}="event`;
        }
    }
    addStyle(style) {
        const gvc = this;
        let sl = {
            id: gvc.glitter.getUUID(),
            style: style
        };
        if (!gvc.parameter.styleList.find((dd) => {
            return dd.style === style;
        })) {
            var css = document.createElement('style');
            css.type = 'text/css';
            css.id = sl.id;
            if (css.styleSheet)
                css.styleSheet.cssText = style;
            else
                css.appendChild(document.createTextNode(style));
            document.getElementsByTagName("head")[0].appendChild(css);
            gvc.parameter.styleList.push(sl);
        }
    }
    async addStyleLink(fs) {
        const gvc = this;
        function add(filePath) {
            var head = document.head;
            const id = gvc.glitter.getUUID();
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = filePath;
            link.id = id;
            if (!gvc.parameter.styleLinks.find((dd) => {
                return dd.src === filePath;
            })) {
                gvc.parameter.styleLinks.push({
                    id: id,
                    src: filePath
                });
                head.appendChild(link);
            }
        }
        if (typeof fs === 'string') {
            add(fs);
        }
        else {
            fs.map((dd) => {
                add(dd);
            });
        }
    }
    addMtScript(urlArray, success, error) {
        const glitter = this.glitter;
        const that = this;
        let index = 0;
        function addScript() {
            if (index === urlArray.length) {
                success();
                return;
            }
            var scritem = urlArray[index];
            scritem.id = glitter.getUUID();
            if (that.parameter.jsList.find((dd) => {
                return dd.src === scritem.src;
            })) {
                index++;
                addScript();
                return;
            }
            that.parameter.jsList.push(scritem);
            let script = document.createElement('script');
            try {
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            index++;
                            addScript();
                        }
                    };
                }
                else {
                    script.onload = () => {
                        if (success !== undefined) {
                            index++;
                            addScript();
                        }
                    };
                }
                if (scritem.type === 'text/babel') {
                    glitter.$('body').append(`<script type="text/babel" src="${scritem.src}"></script>`);
                }
                else if (scritem.type !== undefined) {
                    script.setAttribute('type', scritem.type);
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
                else {
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            }
            catch (e) {
                error(`Add ${urlArray[index]} ERROR!!`);
            }
        }
        addScript();
    }
    id(id) {
        const gvc = this;
        return `${gvc.parameter.pageConfig.id}${id}`;
    }
    map(array) {
        let html = '';
        array.map((d) => {
            html += d;
        });
        return html;
    }
}
export function init(fun, gt) {
    const glitter = (gt) ?? window.glitter;
    const gvc = new GVC();
    gvc.glitter = glitter;
    gvc.parameter.pageConfig = glitter.nowPageConfig;
    const pageData = fun(gvc, glitter, glitter.nowPageConfig?.obj);
    if (!glitter.modelJsList.find((data) => {
        return data.src === glitter.nowPageConfig?.src;
    })) {
        glitter.modelJsList.push({
            src: glitter.nowPageConfig.src,
            create: (glitter) => {
                init(fun, window.glitter);
            }
        });
    }
    console.log(JSON.stringify(glitter.modelJsList));
    const lifeCycle = new LifeCycle();
    lifeCycle.onResume = pageData.onResume ?? lifeCycle.onResume;
    lifeCycle.onPause = pageData.onPause ?? lifeCycle.onPause;
    lifeCycle.onDestroy = pageData.onDestroy ?? lifeCycle.onDestroy;
    lifeCycle.onCreate = pageData.onCreate ?? lifeCycle.onCreate;
    lifeCycle.onCreateView = pageData.onCreateView;
    lifeCycle.cssInitial = pageData.cssInitial ?? lifeCycle.cssInitial;
    gvc.recreateView = () => {
        $(`#page${gvc.parameter.pageConfig.id}`).html(lifeCycle.onCreateView());
    };
    if ($('.page-loading').length > 0) {
        $('.page-loading').remove();
    }
    window.clickMap = window.clickMap ?? {};
    switch (gvc.parameter.pageConfig?.type) {
        case GVCType.Dialog:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
        case GVCType.Page:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
    }
    window.clickMap[gvc.parameter.pageConfig.id] = gvc.parameter.clickMap;
    lifeCycle.onCreate();
    gvc.parameter.pageConfig.deleteResource = () => {
        window.clickMap[gvc.parameter.pageConfig.id] = undefined;
        lifeCycle.onPause();
        gvc.parameter.styleLinks.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.styleList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.jsList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
    };
}
