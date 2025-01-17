'use strict';
export class Editor {
    constructor(gvc) {
        const editor = this;
        const glitter = gvc.glitter;
        const $ = window.$;
        glitter.share.formExtra = glitter.share.formExtra ?? {};
        this.generateForm = (data, window, callback, second) => {
            let id = glitter.getUUID();
            return `<div id="${id}" class="w-100">
        ${gvc.bindView({
                bind: id,
                view: function () {
                    let html = ``;
                    data.map((dd, index) => {
                        if (!dd.custom) {
                            html += `
                            <div class="w-100 fs-3 d-flex ">
                                <label class="form-label fw-bold" style="font-size: 16px; font-weight: 400;">
                                    <span class="fw-bold${dd.need ? `` : ` d-none`}" style="color: red; font-size: 18px; font-weight: 300;"
                                        >*</span
                                    >
                                    ${(typeof dd.name === 'function' ? dd.name() ?? '' : dd.name ?? '') ?? ''}</label
                                >
                                <div class="flex-fill"></div>
                                ${dd.preView
                                ? `
                                          <button
                                              class="btn btn-warning"
                                              onclick="${gvc.event(() => {
                                    let editEdit = glitter.getUUID();
                                    $('#standard-modal').remove();
                                    $('body').append(` <div
                                                      id="standard-modal"
                                                      class="modal fade"
                                                      tabindex="-1"
                                                      role="dialog"
                                                      aria-labelledby="standard-modalLabel"
                                                      aria-hidden="true"
                                                  >
                                                      <div
                                                          class="modal-dialog modal-dialog-centered${glitter.ut.frSize({ sm: `` }, ' m-0')}"
                                                      >
                                                          <div class="modal-content">
                                                              <div class="modal-header d-flex border-bottom">
                                                                  <h4
                                                                      class="modal-title fw-light"
                                                                      style="font-size: 28px;"
                                                                      id="standard-modalLabel"
                                                                  >
                                                                      預覽
                                                                  </h4>
                                                                  <div class="flex-fill"></div>
                                                                  <button
                                                                      type="button"
                                                                      class="btn"
                                                                      data-bs-dismiss="modal"
                                                                      aria-hidden="true"
                                                                      style="margin-right: -10px;"
                                                                  >
                                                                      <i
                                                                          class="fa-regular fa-circle-xmark text-white"
                                                                          style="font-size: 25px;"
                                                                      ></i>
                                                                  </button>
                                                              </div>
                                                              <div class="modal-body pt-2 px-2" id="${editEdit}">
                                                                  ${gvc.bindView(() => {
                                        return {
                                            bind: `${editEdit}`,
                                            view: () => editor.generateForm(JSON.parse(JSON.stringify(dd.value)), window, () => { }),
                                        };
                                    })}
                                                              </div>
                                                              <div class="modal-footer w-100">
                                                                  <button
                                                                      type="button"
                                                                      class="btn btn-light flex-fill"
                                                                      data-bs-dismiss="modal"
                                                                  >
                                                                      關閉
                                                                  </button>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>`);
                                    $('#standard-modal').modal('show');
                                })}"
                                          >
                                              <i class="fa-solid fa-eye fs-6 me-1 "></i>預覽表單
                                          </button>
                                      `
                                : ``}
                            </div>
                        `;
                        }
                        switch (dd.elem) {
                            case 'selected':
                                html += `<select
                                class="form-select"
                                aria-label="Default select example"
                                style="font-size: 14px;"
                                onchange="${gvc.event((e) => ((dd.value = $(e).val()), callback(dd)))}"
                            >
                                ${glitter.print(() => {
                                    let html = '';
                                    dd.option.map((d2) => {
                                        html += `<option value="${d2.value}" ${d2.value === dd.value ? `selected` : ``}>
                                            ${d2.name}
                                        </option>`;
                                    });
                                    return html;
                                })}
                            </select>`;
                                break;
                            case 'checked':
                                dd.option = glitter.ut.toJson(dd.option, []);
                                dd.option.map((d2) => {
                                    let labelID = glitter.getUUID();
                                    html += `
                                    <div class="py-1 d-flex">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            role="${dd.role ?? ''}"
                                            id="${labelID}"
                                            onchange="${gvc.event((e) => {
                                        dd.type === 'single' && dd.option.map((d3) => (d3.checked = false));
                                        d2.checked = $(e).get(0).checked;
                                        gvc.notifyDataChange(id), callback(dd);
                                    })}"
                                            ${d2.checked ? `checked` : ``}
                                        />
                                        ${glitter.print(() => {
                                        let h = '';
                                        if (d2.elem && d2.checked) {
                                            h += `<div style="width: calc(100% - 30px);">
                                                    ${glitter.print(() => {
                                                if (d2.elem === 'form') {
                                                    return ` <label
                                                                    class="ms-1"
                                                                    for="${labelID}"
                                                                    style="font-size: 16px;font-weight: 400;"
                                                                >
                                                                    ${d2.name}
                                                                </label>
                                                                ${editor.generateForm(d2.value, window, callback, true)}`;
                                                }
                                                else {
                                                    return `<div class="ms-1">
                                                                ${editor.generateForm([d2], window, callback, true)}
                                                            </div>`;
                                                }
                                            })}
                                                </div>`;
                                        }
                                        else {
                                            h += ` <label
                                                    class="ms-1"
                                                    for="${labelID}"
                                                    style="font-size: 16px;font-weight: 400;"
                                                >
                                                    ${d2.name}
                                                </label>`;
                                        }
                                        return h;
                                    })}
                                    </div>
                                `;
                                });
                                break;
                            case 'form':
                                html += editor.generateForm(dd.value, window, callback, true);
                                break;
                            case 'formEdit':
                                html += glitter.share.formEdit.formEditor(dd.value, window, dd.formSetting, false);
                                break;
                            case 'input':
                                switch (dd.type) {
                                    case 'email':
                                        html += `<div class="input-group input-group-merge">
                                        <input
                                            class="form-control"
                                            type="email"
                                            placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                            onchange="${gvc.event((e) => (dd.value = $(e).val()))}"
                                            value="${dd.value ?? ''}"
                                            ${dd.readonly ? `readonly` : ``}
                                        />
                                        ${dd.needAuth
                                            ? `<div
                                                  class="btn btn-outline-primary"
                                                  onclick="${gvc.event(() => {
                                            })}"
                                              >
                                                  <span>驗證</span>
                                              </div>`
                                            : ``}
                                    </div>`;
                                        break;
                                    case 'phone':
                                        html += ` <div class="input-group input-group-merge">
                                        <input
                                            class="form-control"
                                            type="email"
                                            placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                            onchange="${gvc.event((e) => (dd.value = $(e).val()))}"
                                            value="${dd.value ?? ''}"
                                            ${dd.readonly ? `readonly` : ``}
                                        />
                                        ${dd.needAuth
                                            ? ` <div
                                                      class="btn btn-outline-primary"
                                                      onclick="${gvc.event(() => {
                                            })}"
                                                  >
                                                      <span>驗證</span>
                                                  </div>`
                                            : ``}
                                    </div>`;
                                        break;
                                    case 'text':
                                        html += `
                                        <div class="w-100 input-group ">
                                            <input
                                                type="text"
                                                class="form-control w-100"
                                                placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                                value="${dd.value ?? ''}"
                                                onchange="${gvc.event((e) => {
                                            dd.value = $(e).val();
                                            gvc.notifyDataChange(id), callback(dd);
                                        })}"
                                                ${dd.readonly ? `readonly` : ``}
                                            />
                                        </div>
                                    `;
                                        break;
                                    case 'date':
                                        let dateID = glitter.getUUID();
                                        html += `
                                        <div class="w-100 input-group " id="${dateID}">
                                            <input
                                                type="text"
                                                placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                                class="form-control"
                                                data-provide="datepicker"
                                                data-date-format="yyyy/mm/dd"
                                                data-date-container="#${dateID}"
                                                value="${dd.value ?? ''}"
                                                onchange="${gvc.event((e) => ((dd.value = $(e).val()), callback(dd)))}"
                                                ${dd.readonly ? `readonly` : ``}
                                            />
                                        </div>
                                    `;
                                        break;
                                    case 'number':
                                        html += `
                                        <div class="w-100 input-group ">
                                            <input
                                                type="text"
                                                class="form-control w-100"
                                                placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                                value="${dd.value ?? ''}"
                                                onchange="${gvc.event((e) => {
                                            dd.value = glitter.utText.filterNumber($(e).val());
                                            gvc.notifyDataChange(id), callback(dd);
                                        })}"
                                                oninput="${gvc.event((e) => $(e).val(glitter.utText.filterNumber($(e).val())))}"
                                                ${dd.readonly ? `readonly` : ``}
                                            />
                                        </div>
                                    `;
                                        break;
                                    case 'word':
                                        html += `
                                        <div class="w-100 input-group ">
                                            <input
                                                type="text"
                                                class="form-control w-100"
                                                placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                                value="${dd.value ?? ''}"
                                                onchange="${gvc.event((e) => {
                                            dd.value = $(e).val().replace(/[\W]/g, '');
                                            gvc.notifyDataChange(id), callback(dd);
                                        })}"
                                                oninput="${gvc.event((e) => $(e).val($(e).val().replace(/[\W]/g, '')))}"
                                                ${dd.readonly ? `readonly` : ``}
                                            />
                                        </div>
                                    `;
                                        break;
                                    case 'time':
                                        let pickerID = glitter.getUUID();
                                        html += `
                                        <div class="mb-3 position-relative">
                                            ${gvc.bindView({
                                            bind: pickerID,
                                            view: () => {
                                                return `
                                                        <div
                                                            id="pickerID${pickerID}"
                                                            type="text"
                                                            class="form-control"
                                                            ${dd.readonly ? `readonly` : ``}
                                                            onclick="${gvc.event(() => {
                                                })}"
                                                        >
                                                            ${dd.value ??
                                                    `<span style="color: gray">
                                                                ${dd.placeholder ?? '請輸入' + dd.name}</span
                                                            >`}
                                                        </div>
                                                    `;
                                            },
                                            divCreate: { class: 'w-100 input-group' },
                                            onCreate: () => { },
                                        })}
                                        </div>
                                    `;
                                        break;
                                    default:
                                        html += `
                                        <div class="w-100 input-group">
                                            <input
                                                type="${dd.type}"
                                                class="form-control w-100"
                                                placeholder="${dd.placeholder ?? '請輸入' + dd.name}"
                                                value="${dd.value ?? ''}"
                                                onchange="${gvc.event((e) => {
                                            dd.value = $(e).val();
                                            gvc.notifyDataChange(id), callback(dd);
                                        })}"
                                                ${dd.readonly ? `readonly` : ``}
                                            />
                                        </div>
                                    `;
                                }
                                html += ``;
                                break;
                            case 'textArea':
                                html += `<div class="w-100 px-1">
                                <textarea
                                    class="form-control border rounded"
                                    rows="4"
                                    onchange="${gvc.event((e) => ((dd.value = $(e).val()), callback(dd)))}"
                                    placeholder="${dd.placeholder ?? ''}"
                                >${dd.value ?? ''}</textarea
                                >
                            </div>`;
                                break;
                            case 'button':
                                html += `<button class="btn btn-primary" onclick="${gvc.event(() => dd.click(window))}">
                                ${dd.placeholder}
                            </button>`;
                                break;
                            default:
                                if (glitter.share.formExtra[dd.elem]) {
                                    html += glitter.share.formExtra[dd.elem](dd, window, callback);
                                }
                                break;
                        }
                        if (index !== data.length - 1) {
                            html += `<div class="w-100 my-2 bg-light" style="height: 1px;"></div>`;
                        }
                    });
                    return html;
                },
                divCreate: {},
                onCreate: () => { },
            })}
    </div>`;
        };
    }
}
