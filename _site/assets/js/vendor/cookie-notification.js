!(function () {
  'use strict';
  function e() {}
  const t = e => e;
  function n(e) {
    return e();
  }
  function o() {
    return Object.create(null);
  }
  function c(e) {
    e.forEach(n);
  }
  function i(e) {
    return 'function' == typeof e;
  }
  function r(e, t) {
    return e != e ? t == t : e !== t || (e && 'object' == typeof e) || 'function' == typeof e;
  }
  const s = 'undefined' != typeof window;
  let a = s ? () => window.performance.now() : () => Date.now(),
    l = s ? e => requestAnimationFrame(e) : e;
  const u = new Set();
  function d(e) {
    u.forEach(t => {
      t.c(e) || (u.delete(t), t.f());
    }),
      0 !== u.size && l(d);
  }
  function f(e, t) {
    e.appendChild(t);
  }
  function p(e) {
    if (!e) return document;
    const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return t && t.host ? t : e.ownerDocument;
  }
  function h(e) {
    const t = m('style');
    return (
      (function (e, t) {
        f(e.head || e, t), t.sheet;
      })(p(e), t),
      t.sheet
    );
  }
  function g(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function b(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }
  function m(e) {
    return document.createElement(e);
  }
  function k(e) {
    return document.createElementNS('http://www.w3.org/2000/svg', e);
  }
  function $(e) {
    return document.createTextNode(e);
  }
  function y() {
    return $(' ');
  }
  function v() {
    return $('');
  }
  function w(e, t, n, o) {
    return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
  }
  function _(e, t, n) {
    null == n ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function C(e, t) {
    (t = '' + t), e.wholeText !== t && (e.data = t);
  }
  function x(e, t, n) {
    e.classList[n ? 'add' : 'remove'](t);
  }
  function L(e, t, {bubbles: n = !1, cancelable: o = !1} = {}) {
    const c = document.createEvent('CustomEvent');
    return c.initCustomEvent(e, n, o, t), c;
  }
  const E = new Map();
  let O,
    j = 0;
  function N(e, t, n, o, c, i, r, s = 0) {
    const a = 16.666 / o;
    let l = '{\n';
    for (let e = 0; e <= 1; e += a) {
      const o = t + (n - t) * i(e);
      l += 100 * e + `%{${r(o, 1 - o)}}\n`;
    }
    const u = l + `100% {${r(n, 1 - n)}}\n}`,
      d = `__svelte_${(function (e) {
        let t = 5381,
          n = e.length;
        for (; n--; ) t = ((t << 5) - t) ^ e.charCodeAt(n);
        return t >>> 0;
      })(u)}_${s}`,
      f = p(e),
      {stylesheet: g, rules: b} =
        E.get(f) ||
        (function (e, t) {
          const n = {stylesheet: h(t), rules: {}};
          return E.set(e, n), n;
        })(f, e);
    b[d] || ((b[d] = !0), g.insertRule(`@keyframes ${d} ${u}`, g.cssRules.length));
    const m = e.style.animation || '';
    return (e.style.animation = `${m ? `${m}, ` : ''}${d} ${o}ms linear ${c}ms 1 both`), (j += 1), d;
  }
  function B(e, t) {
    const n = (e.style.animation || '').split(', '),
      o = n.filter(t ? e => e.indexOf(t) < 0 : e => -1 === e.indexOf('__svelte')),
      c = n.length - o.length;
    c &&
      ((e.style.animation = o.join(', ')),
      (j -= c),
      j ||
        l(() => {
          j ||
            (E.forEach(e => {
              const {ownerNode: t} = e.stylesheet;
              t && b(t);
            }),
            E.clear());
        }));
  }
  function R(e) {
    O = e;
  }
  function A() {
    if (!O) throw new Error('Function called outside component initialization');
    return O;
  }
  const D = [],
    I = [],
    z = [],
    U = [],
    S = Promise.resolve();
  let M = !1;
  function P(e) {
    z.push(e);
  }
  const T = new Set();
  let G,
    F = 0;
  function q() {
    const e = O;
    do {
      for (; F < D.length; ) {
        const e = D[F];
        F++, R(e), H(e.$$);
      }
      for (R(null), D.length = 0, F = 0; I.length; ) I.pop()();
      for (let e = 0; e < z.length; e += 1) {
        const t = z[e];
        T.has(t) || (T.add(t), t());
      }
      z.length = 0;
    } while (D.length);
    for (; U.length; ) U.pop()();
    (M = !1), T.clear(), R(e);
  }
  function H(e) {
    if (null !== e.fragment) {
      e.update(), c(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]), e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(P);
    }
  }
  function J(e, t, n) {
    e.dispatchEvent(L(`${t ? 'intro' : 'outro'}${n}`));
  }
  const W = new Set();
  let Y;
  function K() {
    Y = {r: 0, c: [], p: Y};
  }
  function Q() {
    Y.r || c(Y.c), (Y = Y.p);
  }
  function V(e, t) {
    e && e.i && (W.delete(e), e.i(t));
  }
  function X(e, t, n, o) {
    if (e && e.o) {
      if (W.has(e)) return;
      W.add(e),
        Y.c.push(() => {
          W.delete(e), o && (n && e.d(1), o());
        }),
        e.o(t);
    } else o && o();
  }
  const Z = {duration: 0};
  function ee(n, o, r, s) {
    const f = {direction: 'both'};
    let p = o(n, r, f),
      h = s ? 0 : 1,
      g = null,
      b = null,
      m = null;
    function k() {
      m && B(n, m);
    }
    function $(e, t) {
      const n = e.b - h;
      return (t *= Math.abs(n)), {a: h, b: e.b, d: n, duration: t, start: e.start, end: e.start + t, group: e.group};
    }
    function y(o) {
      const {delay: i = 0, duration: r = 300, easing: s = t, tick: f = e, css: y} = p || Z,
        v = {start: a() + i, b: o};
      o || ((v.group = Y), (Y.r += 1)),
        g || b
          ? (b = v)
          : (y && (k(), (m = N(n, h, o, r, i, s, y))),
            o && f(0, 1),
            (g = $(v, r)),
            P(() => J(n, o, 'start')),
            (function (e) {
              let t;
              0 === u.size && l(d),
                new Promise(n => {
                  u.add((t = {c: e, f: n}));
                });
            })(e => {
              if (
                (b &&
                  e > b.start &&
                  ((g = $(b, r)),
                  (b = null),
                  J(n, g.b, 'start'),
                  y && (k(), (m = N(n, h, g.b, g.duration, 0, s, p.css)))),
                g)
              )
                if (e >= g.end)
                  f((h = g.b), 1 - h), J(n, g.b, 'end'), b || (g.b ? k() : --g.group.r || c(g.group.c)), (g = null);
                else if (e >= g.start) {
                  const t = e - g.start;
                  (h = g.a + g.d * s(t / g.duration)), f(h, 1 - h);
                }
              return !(!g && !b);
            }));
    }
    return {
      run(e) {
        i(p)
          ? (G ||
              ((G = Promise.resolve()),
              G.then(() => {
                G = null;
              })),
            G).then(() => {
              (p = p(f)), y(e);
            })
          : y(e);
      },
      end() {
        k(), (g = b = null);
      }
    };
  }
  function te(e, t) {
    -1 === e.$$.dirty[0] && (D.push(e), M || ((M = !0), S.then(q)), e.$$.dirty.fill(0)),
      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
  }
  function ne(t, r, s, a, l, u, d, f = [-1]) {
    const p = O;
    R(t);
    const h = (t.$$ = {
      fragment: null,
      ctx: [],
      props: u,
      update: e,
      not_equal: l,
      bound: o(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(r.context || (p ? p.$$.context : [])),
      callbacks: o(),
      dirty: f,
      skip_bound: !1,
      root: r.target || p.$$.root
    });
    d && d(h.root);
    let g = !1;
    if (
      ((h.ctx = s
        ? s(t, r.props || {}, (e, n, ...o) => {
            const c = o.length ? o[0] : n;
            return (
              h.ctx && l(h.ctx[e], (h.ctx[e] = c)) && (!h.skip_bound && h.bound[e] && h.bound[e](c), g && te(t, e)), n
            );
          })
        : []),
      h.update(),
      (g = !0),
      c(h.before_update),
      (h.fragment = !!a && a(h.ctx)),
      r.target)
    ) {
      if (r.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(r.target);
        h.fragment && h.fragment.l(e), e.forEach(b);
      } else h.fragment && h.fragment.c();
      r.intro && V(t.$$.fragment),
        (function (e, t, o, r) {
          const {fragment: s, after_update: a} = e.$$;
          s && s.m(t, o),
            r ||
              P(() => {
                const t = e.$$.on_mount.map(n).filter(i);
                e.$$.on_destroy ? e.$$.on_destroy.push(...t) : c(t), (e.$$.on_mount = []);
              }),
            a.forEach(P);
        })(t, r.target, r.anchor, r.customElement),
        q();
    }
    R(p);
  }
  class oe {
    $destroy() {
      !(function (e, t) {
        const n = e.$$;
        null !== n.fragment &&
          (c(n.on_destroy), n.fragment && n.fragment.d(t), (n.on_destroy = n.fragment = null), (n.ctx = []));
      })(this, 1),
        (this.$destroy = e);
    }
    $on(t, n) {
      if (!i(n)) return e;
      const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        o.push(n),
        () => {
          const e = o.indexOf(n);
          -1 !== e && o.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }
  /*! js-cookie v3.0.1 | MIT */ function ce(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) e[o] = n[o];
    }
    return e;
  }
  var ie = (function e(t, n) {
    function o(e, o, c) {
      if ('undefined' != typeof document) {
        'number' == typeof (c = ce({}, n, c)).expires && (c.expires = new Date(Date.now() + 864e5 * c.expires)),
          c.expires && (c.expires = c.expires.toUTCString()),
          (e = encodeURIComponent(e)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape));
        var i = '';
        for (var r in c) c[r] && ((i += '; ' + r), !0 !== c[r] && (i += '=' + c[r].split(';')[0]));
        return (document.cookie = e + '=' + t.write(o, e) + i);
      }
    }
    return Object.create(
      {
        set: o,
        get: function (e) {
          if ('undefined' != typeof document && (!arguments.length || e)) {
            for (var n = document.cookie ? document.cookie.split('; ') : [], o = {}, c = 0; c < n.length; c++) {
              var i = n[c].split('='),
                r = i.slice(1).join('=');
              try {
                var s = decodeURIComponent(i[0]);
                if (((o[s] = t.read(r, s)), e === s)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        },
        remove: function (e, t) {
          o(e, '', ce({}, t, {expires: -1}));
        },
        withAttributes: function (t) {
          return e(this.converter, ce({}, this.attributes, t));
        },
        withConverter: function (t) {
          return e(ce({}, this.converter, t), this.attributes);
        }
      },
      {attributes: {value: Object.freeze(n)}, converter: {value: Object.freeze(t)}}
    );
  })(
    {
      read: function (e) {
        return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
      },
      write: function (e) {
        return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
      }
    },
    {path: '/'}
  );
  function re(e, {delay: n = 0, duration: o = 400, easing: c = t} = {}) {
    const i = +getComputedStyle(e).opacity;
    return {delay: n, duration: o, easing: c, css: e => 'opacity: ' + e * i};
  }
  function se(e, t, n) {
    const o = e.slice();
    return (o[30] = t[n]), (o[31] = t), (o[32] = n), o;
  }
  function ae(e) {
    let t, n, o, c, i, r, s;
    return {
      c() {
        (t = m('button')),
          (n = k('svg')),
          (o = k('path')),
          _(
            o,
            'd',
            'M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17\n        0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13\n        35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0\n        0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77\n        54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11\n        80.53-12.76l69.13-35.21a132.273 132.273 0 0 0\n        57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176\n        368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32\n        32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33\n        32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32\n        32-14.33 32-32 32z'
          ),
          _(n, 'xmlns', 'http://www.w3.org/2000/svg'),
          _(n, 'viewBox', '0 0 512 512'),
          _(t, 'class', 'cookieConsentToggle'),
          _(t, 'aria-label', e[7]);
      },
      m(c, a) {
        g(c, t, a), f(t, n), f(n, o), (i = !0), r || ((s = w(t, 'click', e[8])), (r = !0));
      },
      p(e, n) {
        (!i || 128 & n[0]) && _(t, 'aria-label', e[7]);
      },
      i(e) {
        i ||
          (P(() => {
            c || (c = ee(t, re, {}, !0)), c.run(1);
          }),
          (i = !0));
      },
      o(e) {
        c || (c = ee(t, re, {}, !1)), c.run(0), (i = !1);
      },
      d(e) {
        e && b(t), e && c && c.end(), (r = !1), s();
      }
    };
  }
  function le(e) {
    let t, n, o, i, r, s, a, l, u, d, p, h, k, v, x, L, E, O, j, N, B, R;
    return {
      c() {
        (t = m('div')),
          (n = m('div')),
          (o = m('div')),
          (i = m('div')),
          (r = m('p')),
          (s = $(e[1])),
          (a = y()),
          (l = m('p')),
          (u = y()),
          (d = m('div')),
          (p = m('button')),
          (h = $(e[5])),
          (k = y()),
          (v = m('button')),
          (x = $(e[4])),
          (L = y()),
          (E = m('button')),
          (O = $(e[3])),
          _(r, 'class', 'cookieConsent__Title'),
          _(l, 'class', 'cookieConsent__Description'),
          _(i, 'class', 'cookieConsent__Content'),
          _(o, 'class', 'cookieConsent__Left'),
          _(p, 'type', 'button'),
          _(p, 'class', 'cookieConsent__Button'),
          _(p, 'aria-label', e[5]),
          _(v, 'type', 'submit'),
          _(v, 'class', 'cookieConsent__Button'),
          _(v, 'aria-label', e[4]),
          _(E, 'type', 'submit'),
          _(E, 'class', 'cookieConsent__Button'),
          _(E, 'aria-label', e[3]),
          _(d, 'class', 'cookieConsent__Right'),
          _(n, 'class', 'cookieConsent'),
          _(t, 'class', 'cookieConsentWrapper');
      },
      m(c, b) {
        g(c, t, b),
          f(t, n),
          f(n, o),
          f(o, i),
          f(i, r),
          f(r, s),
          f(i, a),
          f(i, l),
          (l.innerHTML = e[2]),
          f(n, u),
          f(n, d),
          f(d, p),
          f(p, h),
          f(d, k),
          f(d, v),
          f(v, x),
          f(d, L),
          f(d, E),
          f(E, O),
          (N = !0),
          B || ((R = [w(p, 'click', e[19]), w(v, 'click', e[13]), w(E, 'click', e[14])]), (B = !0));
      },
      p(e, t) {
        (!N || 2 & t[0]) && C(s, e[1]),
          (!N || 4 & t[0]) && (l.innerHTML = e[2]),
          (!N || 32 & t[0]) && C(h, e[5]),
          (!N || 32 & t[0]) && _(p, 'aria-label', e[5]),
          (!N || 16 & t[0]) && C(x, e[4]),
          (!N || 16 & t[0]) && _(v, 'aria-label', e[4]),
          (!N || 8 & t[0]) && C(O, e[3]),
          (!N || 8 & t[0]) && _(E, 'aria-label', e[3]);
      },
      i(e) {
        N ||
          (P(() => {
            j || (j = ee(t, re, {}, !0)), j.run(1);
          }),
          (N = !0));
      },
      o(e) {
        j || (j = ee(t, re, {}, !1)), j.run(0), (N = !1);
      },
      d(e) {
        e && b(t), e && j && j.end(), (B = !1), c(R);
      }
    };
  }
  function ue(e) {
    let t,
      n,
      o,
      c,
      i,
      r,
      s,
      a,
      l,
      u = e[10],
      d = [];
    for (let t = 0; t < u.length; t += 1) d[t] = fe(se(e, u, t));
    return {
      c() {
        (t = m('div')), (n = m('div'));
        for (let e = 0; e < d.length; e += 1) d[e].c();
        (o = y()),
          (c = m('button')),
          (i = $(e[6])),
          _(c, 'type', 'submit'),
          _(c, 'class', 'cookieConsent__Button cookieConsent__Button--Close'),
          _(c, 'aria-label', e[6]),
          _(n, 'class', 'cookieConsentOperations__List'),
          _(t, 'class', 'cookieConsentOperations');
      },
      m(r, u) {
        g(r, t, u), f(t, n);
        for (let e = 0; e < d.length; e += 1) d[e].m(n, null);
        f(n, o), f(n, c), f(c, i), (s = !0), a || ((l = w(c, 'click', e[21])), (a = !0));
      },
      p(e, t) {
        if (1536 & t[0]) {
          let c;
          for (u = e[10], c = 0; c < u.length; c += 1) {
            const i = se(e, u, c);
            d[c] ? d[c].p(i, t) : ((d[c] = fe(i)), d[c].c(), d[c].m(n, o));
          }
          for (; c < d.length; c += 1) d[c].d(1);
          d.length = u.length;
        }
        (!s || 64 & t[0]) && C(i, e[6]), (!s || 64 & t[0]) && _(c, 'aria-label', e[6]);
      },
      i(e) {
        s ||
          (P(() => {
            r || (r = ee(t, re, {}, !0)), r.run(1);
          }),
          (s = !0));
      },
      o(e) {
        r || (r = ee(t, re, {}, !1)), r.run(0), (s = !1);
      },
      d(e) {
        e && b(t),
          (function (e, t) {
            for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
          })(d, e),
          e && r && r.end(),
          (a = !1),
          l();
      }
    };
  }
  function de(e) {
    let t,
      n,
      o,
      c,
      i,
      r,
      s,
      a,
      l,
      u,
      d,
      p,
      h,
      k = e[30].label + '',
      v = e[30].description + '';
    function L() {
      e[20].call(n, e[30]);
    }
    return {
      c() {
        (t = m('div')),
          (n = m('input')),
          (i = y()),
          (r = m('label')),
          (s = $(k)),
          (l = y()),
          (u = m('span')),
          (d = $(v)),
          _(n, 'type', 'checkbox'),
          _(n, 'id', (o = `gdpr-check-${e[30].id}`)),
          (n.disabled = c = 'necessary' === e[30].id),
          _(r, 'for', (a = `gdpr-check-${e[30].id}`)),
          _(u, 'class', 'cookieConsentOperations__ItemLabel'),
          _(t, 'class', 'cookieConsentOperations__Item'),
          x(t, 'disabled', 'necessary' === e[30].id);
      },
      m(o, c) {
        g(o, t, c),
          f(t, n),
          (n.checked = e[9][e[30].id].value),
          f(t, i),
          f(t, r),
          f(r, s),
          f(t, l),
          f(t, u),
          f(u, d),
          p || ((h = w(n, 'change', L)), (p = !0));
      },
      p(i, l) {
        (e = i),
          1024 & l[0] && o !== (o = `gdpr-check-${e[30].id}`) && _(n, 'id', o),
          1024 & l[0] && c !== (c = 'necessary' === e[30].id) && (n.disabled = c),
          1536 & l[0] && (n.checked = e[9][e[30].id].value),
          1024 & l[0] && k !== (k = e[30].label + '') && C(s, k),
          1024 & l[0] && a !== (a = `gdpr-check-${e[30].id}`) && _(r, 'for', a),
          1024 & l[0] && v !== (v = e[30].description + '') && C(d, v),
          1024 & l[0] && x(t, 'disabled', 'necessary' === e[30].id);
      },
      d(e) {
        e && b(t), (p = !1), h();
      }
    };
  }
  function fe(e) {
    let t,
      n = Object.hasOwnProperty.call(e[9], e[30].id) && e[9][e[30].id],
      o = n && de(e);
    return {
      c() {
        o && o.c(), (t = v());
      },
      m(e, n) {
        o && o.m(e, n), g(e, t, n);
      },
      p(e, c) {
        1536 & c[0] && (n = Object.hasOwnProperty.call(e[9], e[30].id) && e[9][e[30].id]),
          n ? (o ? o.p(e, c) : ((o = de(e)), o.c(), o.m(t.parentNode, t))) : o && (o.d(1), (o = null));
      },
      d(e) {
        o && o.d(e), e && b(t);
      }
    };
  }
  function pe(e) {
    let t,
      n,
      o,
      c,
      i = e[0] && ae(e),
      r = e[11] && le(e),
      s = e[12] && ue(e);
    return {
      c() {
        i && i.c(), (t = y()), r && r.c(), (n = y()), s && s.c(), (o = v());
      },
      m(e, a) {
        i && i.m(e, a), g(e, t, a), r && r.m(e, a), g(e, n, a), s && s.m(e, a), g(e, o, a), (c = !0);
      },
      p(e, c) {
        e[0]
          ? i
            ? (i.p(e, c), 1 & c[0] && V(i, 1))
            : ((i = ae(e)), i.c(), V(i, 1), i.m(t.parentNode, t))
          : i &&
            (K(),
            X(i, 1, 1, () => {
              i = null;
            }),
            Q()),
          e[11]
            ? r
              ? (r.p(e, c), 2048 & c[0] && V(r, 1))
              : ((r = le(e)), r.c(), V(r, 1), r.m(n.parentNode, n))
            : r &&
              (K(),
              X(r, 1, 1, () => {
                r = null;
              }),
              Q()),
          e[12]
            ? s
              ? (s.p(e, c), 4096 & c[0] && V(s, 1))
              : ((s = ue(e)), s.c(), V(s, 1), s.m(o.parentNode, o))
            : s &&
              (K(),
              X(s, 1, 1, () => {
                s = null;
              }),
              Q());
      },
      i(e) {
        c || (V(i), V(r), V(s), (c = !0));
      },
      o(e) {
        X(i), X(r), X(s), (c = !1);
      },
      d(e) {
        i && i.d(e), e && b(t), r && r.d(e), e && b(n), s && s.d(e), e && b(o);
      }
    };
  }
  function he(e, t, n) {
    let o, c, i, r;
    const s = (function () {
      const e = A();
      return (t, n, {cancelable: o = !1} = {}) => {
        const c = e.$$.callbacks[t];
        if (c) {
          const i = L(t, n, {cancelable: o});
          return (
            c.slice().forEach(t => {
              t.call(e, i);
            }),
            !i.defaultPrevented
          );
        }
        return !0;
      };
    })();
    let {cookieName: a = null} = t,
      {showEditIcon: l = !0} = t,
      u = !1,
      d = !1,
      {heading: f = 'GDPR Notice'} = t,
      {
        description:
          p = 'We use cookies to offer a better browsing experience, analyze site traffic and personalize content. Please review our <a aria-label="review our privacy policy" href="/policies/#privacy">privacy policy</a> & <a aria-label="review our privacy policy" href="/policies/#cookies">cookies policy</a>. By clicking accept, you consent to our privacy policy & use of cookies.'
      } = t,
      {categories: h = {analytics() {}, tracking() {}, marketing() {}, necessary() {}}} = t,
      {cookieConfig: g = {}} = t;
    const b = {sameSite: 'strict'};
    let {choices: m = {}} = t;
    const k = {
      necessary: {label: 'Necessary cookies', description: "Used for cookie control. Can't be turned off.", value: !0},
      tracking: {label: 'Tracking cookies', description: 'Used for advertising purposes.', value: !0},
      analytics: {
        label: 'Analytics cookies',
        description: 'Used to control Google Analytics, a 3rd party tool offered by Google to track user behavior.',
        value: !0
      },
      marketing: {label: 'Marketing cookies', description: 'Used for marketing data.', value: !0}
    };
    let {acceptLabel: $ = 'Accept cookies'} = t,
      {rejectLabel: y = 'Reject cookies'} = t,
      {settingsLabel: v = 'Cookie settings'} = t,
      {closeLabel: w = 'Close settings'} = t,
      {editLabel: _ = 'Edit cookie settings'} = t;
    function C() {
      n(11, (u = !0));
    }
    var x;
    function E(e) {
      const t = new Date();
      t.setDate(t.getDate() + 365);
      const n = Object.assign({}, b, g, {expires: t});
      ie.set(a, JSON.stringify({choices: e}), n);
    }
    function O(e) {
      Object.keys(i).forEach(t => {
        const c = e[t];
        o[t] && n(9, (o[t].value = c), o), c && (h[t] && h[t](), s(`${t}`));
      }),
        n(11, (u = !1));
    }
    (x = () => {
      if (!a) throw new Error('You must set gdpr cookie name');
      const e = ie.get(a);
      e || C();
      try {
        const {choices: t} = JSON.parse(e),
          n = (function (e, t) {
            const n = Object.keys(e),
              o = Object.keys(t);
            return o.length === n.length && o.every(e => n.includes(e));
          })(i, t);
        if (!n) throw new Error('cookie consent has changed');
        O(t);
      } catch (e) {
        !(function () {
          const {path: e} = g;
          ie.remove(a, Object.assign({}, e ? {path: e} : {}));
        })(),
          C();
      }
    }),
      A().$$.on_mount.push(x);
    return (
      (e.$$set = e => {
        'cookieName' in e && n(15, (a = e.cookieName)),
          'showEditIcon' in e && n(0, (l = e.showEditIcon)),
          'heading' in e && n(1, (f = e.heading)),
          'description' in e && n(2, (p = e.description)),
          'categories' in e && n(16, (h = e.categories)),
          'cookieConfig' in e && n(17, (g = e.cookieConfig)),
          'choices' in e && n(18, (m = e.choices)),
          'acceptLabel' in e && n(3, ($ = e.acceptLabel)),
          'rejectLabel' in e && n(4, (y = e.rejectLabel)),
          'settingsLabel' in e && n(5, (v = e.settingsLabel)),
          'closeLabel' in e && n(6, (w = e.closeLabel)),
          'editLabel' in e && n(7, (_ = e.editLabel));
      }),
      (e.$$.update = () => {
        262144 & e.$$.dirty[0] && n(9, (o = Object.assign({}, k, m))),
          512 & e.$$.dirty[0] &&
            n(10, (c = Object.values(o).map((e, t) => Object.assign({}, e, {id: Object.keys(o)[t]})))),
          1024 & e.$$.dirty[0] && (i = c.reduce((e, t) => ((e[t.id] = !!t.value && t.value), e), {})),
          1024 & e.$$.dirty[0] && (r = c.reduce((e, t) => ((e[t.id] = 'necessary' === t.id), e), {}));
      }),
      [
        l,
        f,
        p,
        $,
        y,
        v,
        w,
        _,
        C,
        o,
        c,
        u,
        d,
        function () {
          E(r), O(r);
        },
        function () {
          E(i), O(i);
        },
        a,
        h,
        g,
        m,
        () => {
          n(12, (d = !0));
        },
        function (e) {
          (o[e.id].value = this.checked), n(9, o), n(18, m);
        },
        () => {
          n(12, (d = !1));
        }
      ]
    );
  }
  class ge extends oe {
    constructor(e) {
      super(),
        ne(
          this,
          e,
          he,
          pe,
          r,
          {
            cookieName: 15,
            showEditIcon: 0,
            heading: 1,
            description: 2,
            categories: 16,
            cookieConfig: 17,
            choices: 18,
            acceptLabel: 3,
            rejectLabel: 4,
            settingsLabel: 5,
            closeLabel: 6,
            editLabel: 7,
            show: 8
          },
          null,
          [-1, -1]
        );
    }
    get show() {
      return this.$$.ctx[8];
    }
  }
  (window.GdprConsent = window.GdprConsent || {}),
    (window.GdprConsent.attachBanner = function (e, t = {}) {
      new ge({target: e, props: t});
    });
})();
