class Mode {
  constructor(p, d, k) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function recursive(r, first) {
      var h = "";
      if (r.list === undefined) {
        h += /*html*/ `
          <li>
            <a
              class="${first ? "nav-link" : ""} scrollto"
              onclick="${event(() => funnel.hyperLink(r.link, false, { name: r.name }))}"
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
            ${glitter.print(function () {
              var tmp = "";
              r.list.map((r2) => (tmp += recursive(r2)));
              return tmp;
            })}
          </ul>
        </li>`;
      }
      return h;
    }

    /* ================ HTML ================ */
    function nav() {
      return /*html*/ `<!-- ======= Top Bar ======= -->
        ${
          d.nav.top
            ? /*html*/ `<div id="topbar" class="d-flex align-items-center fixed-top">
              <div class="container d-flex justify-content-center justify-content-md-between">
                <div class="contact-info d-flex align-items-center">
                  <i class="bi bi-phone d-flex align-items-center"><span>${d.nav.top.phone}</span></i>
                  <i class="bi bi-clock d-flex align-items-center ms-4"><span> ${d.nav.top.clock}</span></i>
                </div>

                <div class="languages d-none d-md-flex align-items-center">
                  <ul>
                    <li>中文</li>
                    <li><a href="#">English</a></li>
                  </ul>
                </div>
              </div>
            </div>`
            : ``
        }

        <!-- ======= Header ======= -->
        <header id="header" class="fixed-top d-flex align-items-cente">
          <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div class="d-flex logo" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="" class="img-fluid me-3" />
              <h1 class="logo me-auto me-lg-0"><a>${d.nav.title}</a></h1>
            </div>

            <nav id="navbar" class="navbar order-last order-lg-0">
              <ul>
                ${glitter.print(function () {
                  var tmp = "";
                  d.nav.bar.map((b) => (tmp += recursive(b, true)));
                  return tmp;
                })}
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>

            <a
              class="book-a-table-btn scrollto d-none d-lg-flex"
              onclick="${event(() => funnel.hyperLink(d.nav.btn.link))}"
              style="cursor:pointer"
              >${d.nav.btn.name}</a
            >
          </div>
        </header>
        <!-- End Header -->`;
    }
    function footer() {
      return /*html*/ `<!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div class="footer-info">
                    <h3>${d.footer.outro.title}</h3>
                    <p>${d.footer.outro.desc}</p>
                    <div class="social-links mt-3">
                      ${glitter.print(function () {
                        var tmp = "";
                        d.footer.outro.social.map((r) => {
                          tmp += /*html*/ `
                            <a class="text-white" onclick="${event(() => funnel.hyperLink(r))}" style="cursor:pointer">
                              <i class="${funnel.urlIcon(r, "bx")}"></i>
                            </a>
                          `;
                        });
                        return tmp;
                      })}
                    </div>
                  </div>
                </div>

                ${glitter.print(function () {
                  var tmp = "";
                  d.footer.map.map((m) => {
                    tmp += /*html*/ `
                      <div class="col-lg-2 col-md-6 footer-links">
                        <h4>${m.title}</h4>
                        <ul>
                          ${glitter.print(function () {
                            var tmp = "";
                            m.list.map((l) => {
                              tmp += /*html*/ `<li>
                                <i class="bx bx-chevron-right"></i>
                                <a
                                  class="scrollto"
                                  onclick="${event(() => funnel.hyperLink(l.link))}"
                                  style="cursor:pointer"
                                  data-hash=${l.link}
                                  >${l.name}</a
                                >
                              </li>`;
                            });
                            return tmp;
                          })}
                        </ul>
                      </div>
                    `;
                  });
                  return tmp;
                })}

                <div class="col-lg-4 col-md-6 footer-newsletter">
                  <h4>${glitter.share.language.subscribe}</h4>
                  <p>${d.footer.subs.desc}</p>
                  <form><input type="email" name="email" /><input type="submit" value="${glitter.share.language.submit}" /></form>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="copyright">${funnel.copyRight("#cda45e")}</div>
            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/restaurantly-restaurant-template/ -->
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        <!-- End Footer -->

        <div id="preloader"></div>
        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`;
    }
    function error404() {
      return /*html*/ `<h1 style="margin:24px;color:white">404 Not Found</h1>`;
    }
    function keyVision() {
      return /*html*/ `
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center" style="background: url(${d.keyVision.img}) top center">
          <div class="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
            <div class="row">
              <div class="col-lg-8">
                <h1 class="mb-3">${d.keyVision.title}</h1>
                <h2 class="mb-5">${d.keyVision.desc}</h2>

                <div class="btns">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.keyVision.list.map((l) => {
                      tmp += /*html*/ `
                        <a
                          class="btn-menu animated fadeInUp scrollto"
                          onclick="${event(() => funnel.hyperLink(l.link))}"
                          style="cursor:pointer"
                          >${l.name}</a
                        >
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
              <div
                class="col-lg-4 d-flex align-items-center justify-content-center position-relative"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <a href="${d.keyVision.video}" class="glightbox play-btn"></a>
              </div>
            </div>
          </div>
        </section>
        <!-- End Hero -->
      `;
    }
    function about() {
      return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about" style="background: url(${d.about.background}) center center">
          <div class="container" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="100">
                <div class="about-img">
                  <img src="${d.about.img}" alt="" />
                </div>
              </div>
              <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h3>${d.about.title}</h3>
                <p>${d.about.desc}</p>
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
    }
    function banner() {
      return /*html*/ `
        <!-- ======= Why Us Section ======= -->
        <section id="banner" class="why-us">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.banner.title}</h2>
              <p>${d.banner.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.banner.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4 ${i == 0 && glitter.frSize({ sm: false }, true) ? `` : `mt-4`}">
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
      `;
    }
    function menu() {
      return /*html*/ `
        <!-- ======= Menu Section ======= -->
        <section id="menu" class="menu section-bg">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.menu.title}</h2>
              <p>${d.menu.desc}</p>
            </div>

            <div class="row" data-aos="fade-up" data-aos-delay="100">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="menu-flters">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.menu.tag.map((t, i) => {
                      tmp += /*html*/ ` <li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``}>${t.title}</li> `;
                    });
                    return tmp;
                  })}
                </ul>
              </div>
            </div>

            <div class="row menu-container" data-aos="fade-up" data-aos-delay="200">
              ${glitter.print(function () {
                var tmp = "";
                d.menu.list.map((l) => {
                  var tagClass = "";
                  l.tag.map((m) => (tagClass += `${m} `));
                  tmp += /*html*/ `
                    <div class="col-lg-6 menu-item ${tagClass}">
                      <img src="${l.img}" class="menu-img" alt="" />
                      <div class="menu-content"><a href="#">${l.title}</a><span>$ ${funnel.addQuantile(l.price)}</span></div>
                      <div class="menu-ingredients">${l.desc}</div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Menu Section -->
      `;
    }
    function feature() {
      return /*html*/ `
        <!-- ======= Specials Section ======= -->
        <section id="feature" class="specials">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.feature.title}</h2>
              <p>${d.feature.desc}</p>
            </div>

            <div class="row" data-aos="fade-up" data-aos-delay="100">
              <div class="col-lg-3">
                <ul class="nav nav-tabs flex-column">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.feature.list.map((t, i) => {
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
                    var tmp = "";
                    d.feature.list.map((l, i) => {
                      tmp += /*html*/ `
                        <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                          <div class="row">
                            <div class="col-lg-8 details order-2 order-lg-1">
                              <h3>${l.title}</h3>
                              <p>${l.desc}</p>
                            </div>
                            <div class="col-lg-4 text-center order-1 order-lg-2">
                              <img src="${l.img}" alt="" class="img-fluid" />
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
        <!-- End Specials Section -->
      `;
    }
    function slider() {
      return /*html*/ `
        <!-- ======= Events Section ======= -->
        <section id="slider" class="events" style="background: url(${d.slider.background}) center center no-repeat">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.slider.title}</h2>
              <p>${d.slider.desc}</p>
            </div>

            <div class="events-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper">
                ${glitter.print(function () {
                  var tmp = "";
                  d.slider.list.map((l) => {
                    tmp += /*html*/ `
                      <div class="swiper-slide">
                        <div class="row event-item">
                          <div class="col-lg-6">
                            <img src="${l.img}" class="img-fluid" alt="" />
                          </div>
                          <div class="col-lg-6 pt-4 pt-lg-0 content">
                            <h3>${l.title}</h3>
                            <div class="price">
                              <p><span>$${funnel.addQuantile(l.price)}</span></p>
                            </div>
                            <p>${l.desc}</p>
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
      `;
    }
    function test() {
      return /*html*/ `
        <!-- ======= Testimonials Section ======= -->
        <section id="testimonials" class="testimonials section-bg">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.test.title}</h2>
              <p>${d.test.desc}</p>
            </div>

            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper">
                ${glitter.print(function () {
                  var tmp = "";
                  d.test.list.map((l) => {
                    tmp += /*html*/ `
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <p>
                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                            ${l.text}
                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                          </p>
                          <img src="${l.img}" class="testimonial-img" alt="" />
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
      `;
    }
    function gallery() {
      return /*html*/ `
        <!-- ======= Gallery Section ======= -->
        <section id="gallery" class="gallery">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.gallery.title}</h2>
              <p>${d.gallery.desc}</p>
            </div>
          </div>

          <div class="container-fluid" data-aos="fade-up" data-aos-delay="100">
            <div class="row g-0">
              ${glitter.print(function () {
                var tmp = "";
                d.gallery.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-lg-3 col-md-4">
                      <div class="gallery-item">
                        <a href="${l}" class="gallery-lightbox" data-gall="gallery-item">
                          <img src="${l}" alt="" class="img-fluid" />
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
      `;
    }
    function team() {
      return /*html*/ `
        <!-- ======= Chefs Section ======= -->
        <section id="team" class="chefs">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.team.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6">
                      <div class="member" data-aos="zoom-in" data-aos-delay="100">
                        <img src="${l.img}" class="img-fluid" alt="" />
                        <div class="member-info">
                          <div class="member-info-content">
                            <h4>${l.name}</h4>
                            <span>${l.pro}</span>
                          </div>
                          <div class="social">
                            ${glitter.print(function () {
                              var tmp = "";
                              l.link.map((k) => {
                                tmp += /*html*/ `
                                  <a onclick="${event(() => funnel.hyperLink(k))}" style="cursor:pointer"
                                    ><i class="${funnel.urlIcon(k, "bi")}"></i
                                  ></a>
                                `;
                              });
                              return tmp;
                            })}
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
      `;
    }
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>
          </div>

          <div data-aos="fade-up">
            <iframe style="border: 0; width: 100%; height: 350px" src="${d.contact.map}" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="container" data-aos="fade-up">
            <div class="row mt-5">
              <div class="col-lg-4">
                <div class="info">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.contact.info.map((f) => {
                      tmp += /*html*/ `
                        <div class="mb-5">
                          <i class="${f.icon}"></i>
                          <h4>${f.title}</h4>
                          <p>${f.text}</p>
                        </div>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>

              <div class="col-lg-8 mt-5 mt-lg-0">
                ${funnel.lightForm(d.contact.form, {
                  div: `class="php-email-form"`,
                  input: `class="form-control"`,
                  textarea: `class="form-control"`,
                  btn: `type="submit"`,
                })}
              </div>
            </div>
          </div>
        </section>
        <!-- End Contact Section -->
      `;
    }

    /* ================ Frame ================ */
    function frameRender(page, debug) {
      var h = "";
      var err = false;
      page.map((a) => {
        if (debug) {
          h += eval(a + "()");
        } else {
          try {
            h += eval(a + "()");
          } catch (e) {
            err = true;
          }
        }
      });
      return err ? error404() : nav() + h + footer();
    }
    this.frame = () => frameRender(p, 1);
  }
}
