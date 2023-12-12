!function (e) { function i(n) { if (t[n]) return t[n].exports; var r = t[n] = { exports: {}, id: n, loaded: !1 }; return e[n].call(r.exports, r, r.exports, i), r.loaded = !0, r.exports } var t = {}; return i.m = e, i.c = t, i.p = "", i(0) }([function (e, i) { function t(e, i, t) { var n, r, a, o = [], d = Math.ceil(i / e.columns); n = e.marginColumn, r = e.marginRow, t && (n = e.margin, r = e.margin); for (var s = 0; s < d; s++)for (var l = 0; l < e.columns; l++)a = [0, 0, 0], 0 === e.plane.indexOf("x") && (a[0] = l * n), 0 === e.plane.indexOf("y") && (a[1] = l * n), 1 === e.plane.indexOf("y") && (a[1] = s * r), 1 === e.plane.indexOf("z") && (a[2] = s * r), o.push(a); return o } function n(e, i) { for (var t = [], n = 0; n < i; n++) { var r; r = isNaN(e.angle) ? n * (2 * Math.PI) / i : n * e.angle * .01745329252; var a = []; 0 === e.plane.indexOf("x") && (a[0] = e.radius * Math.cos(r)), 0 === e.plane.indexOf("y") && (a[1] = e.radius * Math.cos(r)), 1 === e.plane.indexOf("y") && (a[1] = e.radius * Math.sin(r)), 1 === e.plane.indexOf("z") && (a[2] = e.radius * Math.sin(r)), t.push(a) } return t } function r(e, i) { return e.columns = i, t(e, i, !0) } function a(e, i) { return s([[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]], e.radius / 2) } function o(e, i) { var t = (1 + Math.sqrt(5)) / 2, n = 1 / t, r = 2 - t, a = -1 * n, o = -1 * r; return s([[-1, r, 0], [-1, o, 0], [0, -1, r], [0, -1, o], [0, 1, r], [0, 1, o], [1, r, 0], [1, o, 0], [n, n, n], [n, n, a], [n, a, n], [n, a, a], [r, 0, 1], [r, 0, -1], [a, n, n], [a, n, a], [a, a, n], [a, a, a], [o, 0, 1], [o, 0, -1]], e.radius / 2) } function d(e, i) { var t = Math.sqrt(3), n = -1 / Math.sqrt(3), r = 2 * Math.sqrt(2 / 3); return s([[0, 0, t + n], [-1, 0, n], [1, 0, n], [0, r, 0]], e.radius / 2) } function s(e, i) { return e.map(function (e) { return e.map(function (e, t) { return e * i }) }) } function l(e, i) { e.forEach(function (e, t) { var n = i[t]; e.setAttribute("position", { x: n[0], y: n[1], z: n[2] }) }) } AFRAME.registerComponent("layout", { schema: { angle: { type: "number", default: !1, min: 0, max: 360, if: { type: ["circle"] } }, columns: { default: 1, min: 0, if: { type: ["box"] } }, margin: { default: 1, min: 0, if: { type: ["box", "line"] } }, marginColumn: { default: 1, min: 0, if: { type: ["box"] } }, marginRow: { default: 1, min: 0, if: { type: ["box"] } }, plane: { default: "xy" }, radius: { default: 1, min: 0, if: { type: ["circle", "cube", "dodecahedron", "pyramid"] } }, reverse: { default: !1 }, type: { default: "line", oneOf: ["box", "circle", "cube", "dodecahedron", "line", "pyramid"] }, fill: { default: !0, if: { type: ["circle"] } } }, init: function () { var e = this, i = this.el; this.children = i.getChildEntities(), this.initialPositions = [], this.children.forEach(function (i) { function t() { var t = i.getAttribute("position"); e.initialPositions.push([t.x, t.y, t.z]) } return i.hasLoaded ? t() : void i.addEventListener("loaded", t) }), i.addEventListener("child-attached", function (t) { t.detail.el.parentNode === i && (e.children.push(t.detail.el), e.update()) }), i.addEventListener("child-detached", function (i) { e.children.indexOf(i.detail.el) !== -1 && (e.children.splice(e.children.indexOf(i.detail.el), 1), e.initialPositions.splice(e.children.indexOf(i.detail.el), 1), e.update()) }) }, update: function (e) { var i, s, c = this.children, u = this.data, f = this.el, h = c.length; switch (u.type) { case "box": i = t; break; case "circle": i = n; break; case "cube": i = a; break; case "dodecahedron": i = o; break; case "pyramid": i = d; break; default: i = r }s = i(u, h, "margin" in f.getDOMAttribute("layout")), u.reverse && s.reverse(), l(c, s) }, remove: function () { this.el.removeEventListener("child-attached", this.childAttachedCallback), l(this.children, this.initialPositions) } }), e.exports.getBoxPositions = t, e.exports.getCirclePositions = n, e.exports.getLinePositions = r, e.exports.getCubePositions = a, e.exports.getDodecahedronPositions = o, e.exports.getPyramidPositions = d }]);