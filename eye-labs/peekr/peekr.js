//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e, t) => {
	function n(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	function r(e, t) {
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
		}
	}
	function i(e, t, n) {
		return t && r(e.prototype, t), n && r(e, n), e;
	}
	t.exports = /* @__PURE__ */ function() {
		function e() {
			var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.R, i = r === void 0 ? 1 : r, a = t.Q, o = a === void 0 ? 1 : a, s = t.A, c = s === void 0 ? 1 : s, l = t.B, u = l === void 0 ? 0 : l, d = t.C, f = d === void 0 ? 1 : d;
			n(this, e), this.R = i, this.Q = o, this.A = c, this.C = f, this.B = u, this.cov = NaN, this.x = NaN;
		}
		return i(e, [
			{
				key: "filter",
				value: function(e) {
					var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
					if (isNaN(this.x)) this.x = 1 / this.C * e, this.cov = 1 / this.C * this.Q * (1 / this.C);
					else {
						var n = this.predict(t), r = this.uncertainty(), i = r * this.C * (1 / (this.C * r * this.C + this.Q));
						this.x = n + i * (e - this.C * n), this.cov = r - i * this.C * r;
					}
					return this.x;
				}
			},
			{
				key: "predict",
				value: function() {
					var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
					return this.A * this.x + this.B * e;
				}
			},
			{
				key: "uncertainty",
				value: function() {
					return this.A * this.cov * this.A + this.R;
				}
			},
			{
				key: "lastMeasurement",
				value: function() {
					return this.x;
				}
			},
			{
				key: "setMeasurementNoise",
				value: function(e) {
					this.Q = e;
				}
			},
			{
				key: "setProcessNoise",
				value: function(e) {
					this.R = e;
				}
			}
		]), e;
	}();
})), u = /* @__PURE__ */ o(((e, t) => {
	function n(e) {
		for (var t = Array(e), n = 0; n < e; ++n) t[n] = n;
		return t;
	}
	t.exports = n;
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = function(e) {
		return e != null && (n(e) || r(e) || !!e._isBuffer);
	};
	function n(e) {
		return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
	}
	function r(e) {
		return typeof e.readFloatLE == "function" && typeof e.slice == "function" && n(e.slice(0, 0));
	}
})), f = /* @__PURE__ */ o(((e, t) => {
	var n = u(), r = d(), i = typeof Float64Array < "u";
	function a(e, t) {
		return e[0] - t[0];
	}
	function o() {
		var e = this.stride, t = Array(e.length), n;
		for (n = 0; n < t.length; ++n) t[n] = [Math.abs(e[n]), n];
		t.sort(a);
		var r = Array(t.length);
		for (n = 0; n < r.length; ++n) r[n] = t[n][1];
		return r;
	}
	function s(e, t) {
		var r = [
			"View",
			t,
			"d",
			e
		].join("");
		t < 0 && (r = "View_Nil" + e);
		var i = e === "generic";
		if (t === -1) {
			var a = "function " + r + "(a){this.data=a;};var proto=" + r + ".prototype;proto.dtype='" + e + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + r + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + r + "(a){return new " + r + "(a);}", s = Function(a);
			return s();
		} else if (t === 0) {
			var a = "function " + r + "(a,d) {this.data = a;this.offset = d};var proto=" + r + ".prototype;proto.dtype='" + e + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + r + "_copy() {return new " + r + "(this.data,this.offset)};proto.pick=function " + r + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + r + "_get(){return " + (i ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + r + "_set(v){return " + (i ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + r + "(a,b,c,d){return new " + r + "(a,d)}", s = Function("TrivialArray", a);
			return s(l[e][0]);
		}
		var a = ["'use strict'"], c = n(t), u = c.map(function(e) {
			return "i" + e;
		}), d = "this.offset+" + c.map(function(e) {
			return "this.stride[" + e + "]*i" + e;
		}).join("+"), f = c.map(function(e) {
			return "b" + e;
		}).join(","), p = c.map(function(e) {
			return "c" + e;
		}).join(",");
		a.push("function " + r + "(a," + f + "," + p + ",d){this.data=a", "this.shape=[" + f + "]", "this.stride=[" + p + "]", "this.offset=d|0}", "var proto=" + r + ".prototype", "proto.dtype='" + e + "'", "proto.dimension=" + t), a.push("Object.defineProperty(proto,'size',{get:function " + r + "_size(){return " + c.map(function(e) {
			return "this.shape[" + e + "]";
		}).join("*"), "}})"), t === 1 ? a.push("proto.order=[0]") : (a.push("Object.defineProperty(proto,'order',{get:"), t < 4 ? (a.push("function " + r + "_order(){"), t === 2 ? a.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : t === 3 && a.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : a.push("ORDER})")), a.push("proto.set=function " + r + "_set(" + u.join(",") + ",v){"), i ? a.push("return this.data.set(" + d + ",v)}") : a.push("return this.data[" + d + "]=v}"), a.push("proto.get=function " + r + "_get(" + u.join(",") + "){"), i ? a.push("return this.data.get(" + d + ")}") : a.push("return this.data[" + d + "]}"), a.push("proto.index=function " + r + "_index(", u.join(), "){return " + d + "}"), a.push("proto.hi=function " + r + "_hi(" + u.join(",") + "){return new " + r + "(this.data," + c.map(function(e) {
			return [
				"(typeof i",
				e,
				"!=='number'||i",
				e,
				"<0)?this.shape[",
				e,
				"]:i",
				e,
				"|0"
			].join("");
		}).join(",") + "," + c.map(function(e) {
			return "this.stride[" + e + "]";
		}).join(",") + ",this.offset)}");
		var m = c.map(function(e) {
			return "a" + e + "=this.shape[" + e + "]";
		}), h = c.map(function(e) {
			return "c" + e + "=this.stride[" + e + "]";
		});
		a.push("proto.lo=function " + r + "_lo(" + u.join(",") + "){var b=this.offset,d=0," + m.join(",") + "," + h.join(","));
		for (var g = 0; g < t; ++g) a.push("if(typeof i" + g + "==='number'&&i" + g + ">=0){d=i" + g + "|0;b+=c" + g + "*d;a" + g + "-=d}");
		a.push("return new " + r + "(this.data," + c.map(function(e) {
			return "a" + e;
		}).join(",") + "," + c.map(function(e) {
			return "c" + e;
		}).join(",") + ",b)}"), a.push("proto.step=function " + r + "_step(" + u.join(",") + "){var " + c.map(function(e) {
			return "a" + e + "=this.shape[" + e + "]";
		}).join(",") + "," + c.map(function(e) {
			return "b" + e + "=this.stride[" + e + "]";
		}).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
		for (var g = 0; g < t; ++g) a.push("if(typeof i" + g + "==='number'){d=i" + g + "|0;if(d<0){c+=b" + g + "*(a" + g + "-1);a" + g + "=ceil(-a" + g + "/d)}else{a" + g + "=ceil(a" + g + "/d)}b" + g + "*=d}");
		a.push("return new " + r + "(this.data," + c.map(function(e) {
			return "a" + e;
		}).join(",") + "," + c.map(function(e) {
			return "b" + e;
		}).join(",") + ",c)}");
		for (var _ = Array(t), v = Array(t), g = 0; g < t; ++g) _[g] = "a[i" + g + "]", v[g] = "b[i" + g + "]";
		a.push("proto.transpose=function " + r + "_transpose(" + u + "){" + u.map(function(e, t) {
			return e + "=(" + e + "===undefined?" + t + ":" + e + "|0)";
		}).join(";"), "var a=this.shape,b=this.stride;return new " + r + "(this.data," + _.join(",") + "," + v.join(",") + ",this.offset)}"), a.push("proto.pick=function " + r + "_pick(" + u + "){var a=[],b=[],c=this.offset");
		for (var g = 0; g < t; ++g) a.push("if(typeof i" + g + "==='number'&&i" + g + ">=0){c=(c+this.stride[" + g + "]*i" + g + ")|0}else{a.push(this.shape[" + g + "]);b.push(this.stride[" + g + "])}");
		a.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), a.push("return function construct_" + r + "(data,shape,stride,offset){return new " + r + "(data," + c.map(function(e) {
			return "shape[" + e + "]";
		}).join(",") + "," + c.map(function(e) {
			return "stride[" + e + "]";
		}).join(",") + ",offset)}");
		var s = Function("CTOR_LIST", "ORDER", a.join("\n"));
		return s(l[e], o);
	}
	function c(e) {
		if (r(e)) return "buffer";
		if (i) switch (Object.prototype.toString.call(e)) {
			case "[object Float64Array]": return "float64";
			case "[object Float32Array]": return "float32";
			case "[object Int8Array]": return "int8";
			case "[object Int16Array]": return "int16";
			case "[object Int32Array]": return "int32";
			case "[object Uint8Array]": return "uint8";
			case "[object Uint16Array]": return "uint16";
			case "[object Uint32Array]": return "uint32";
			case "[object Uint8ClampedArray]": return "uint8_clamped";
			case "[object BigInt64Array]": return "bigint64";
			case "[object BigUint64Array]": return "biguint64";
		}
		return Array.isArray(e) ? "array" : "generic";
	}
	var l = {
		float32: [],
		float64: [],
		int8: [],
		int16: [],
		int32: [],
		uint8: [],
		uint16: [],
		uint32: [],
		array: [],
		uint8_clamped: [],
		bigint64: [],
		biguint64: [],
		buffer: [],
		generic: []
	};
	function f(e, t, n, r) {
		if (e === void 0) {
			var i = l.array[0];
			return i([]);
		} else typeof e == "number" && (e = [e]);
		t === void 0 && (t = [e.length]);
		var a = t.length;
		if (n === void 0) {
			n = Array(a);
			for (var o = a - 1, u = 1; o >= 0; --o) n[o] = u, u *= t[o];
		}
		if (r === void 0) {
			r = 0;
			for (var o = 0; o < a; ++o) n[o] < 0 && (r -= (t[o] - 1) * n[o]);
		}
		for (var d = c(e), f = l[d]; f.length <= a + 1;) f.push(s(d, f.length - 1));
		var i = f[a + 1];
		return i(e, t, n, r);
	}
	t.exports = f;
})), p = /* @__PURE__ */ o(((e, t) => {
	function n(e, t) {
		for (var n = 1, r = e.length, i = e[0], a = e[0], o = 1; o < r; ++o) if (a = i, i = e[o], t(i, a)) {
			if (o === n) {
				n++;
				continue;
			}
			e[n++] = i;
		}
		return e.length = n, e;
	}
	function r(e) {
		for (var t = 1, n = e.length, r = e[0], i = e[0], a = 1; a < n; ++a, i = r) if (i = r, r = e[a], r !== i) {
			if (a === t) {
				t++;
				continue;
			}
			e[t++] = r;
		}
		return e.length = t, e;
	}
	function i(e, t, i) {
		return e.length === 0 ? e : t ? (i || e.sort(t), n(e, t)) : (i || e.sort(), r(e));
	}
	t.exports = i;
})), m = /* @__PURE__ */ o(((e, t) => {
	var n = p();
	function r(e, t, n) {
		var r = e.length, i = t.arrayArgs.length, a = t.indexArgs.length > 0, o = [], s = [], c = 0, l = 0, u, d;
		for (u = 0; u < r; ++u) s.push([
			"i",
			u,
			"=0"
		].join(""));
		for (d = 0; d < i; ++d) for (u = 0; u < r; ++u) l = c, c = e[u], u === 0 ? s.push([
			"d",
			d,
			"s",
			u,
			"=t",
			d,
			"p",
			c
		].join("")) : s.push([
			"d",
			d,
			"s",
			u,
			"=(t",
			d,
			"p",
			c,
			"-s",
			l,
			"*t",
			d,
			"p",
			l,
			")"
		].join(""));
		for (s.length > 0 && o.push("var " + s.join(",")), u = r - 1; u >= 0; --u) c = e[u], o.push([
			"for(i",
			u,
			"=0;i",
			u,
			"<s",
			c,
			";++i",
			u,
			"){"
		].join(""));
		for (o.push(n), u = 0; u < r; ++u) {
			for (l = c, c = e[u], d = 0; d < i; ++d) o.push([
				"p",
				d,
				"+=d",
				d,
				"s",
				u
			].join(""));
			a && (u > 0 && o.push([
				"index[",
				l,
				"]-=s",
				l
			].join("")), o.push([
				"++index[",
				c,
				"]"
			].join(""))), o.push("}");
		}
		return o.join("\n");
	}
	function i(e, t, n, i) {
		for (var a = t.length, o = n.arrayArgs.length, s = n.blockSize, c = n.indexArgs.length > 0, l = [], u = 0; u < o; ++u) l.push([
			"var offset",
			u,
			"=p",
			u
		].join(""));
		for (var u = e; u < a; ++u) l.push([
			"for(var j" + u + "=SS[",
			t[u],
			"]|0;j",
			u,
			">0;){"
		].join("")), l.push([
			"if(j",
			u,
			"<",
			s,
			"){"
		].join("")), l.push([
			"s",
			t[u],
			"=j",
			u
		].join("")), l.push([
			"j",
			u,
			"=0"
		].join("")), l.push([
			"}else{s",
			t[u],
			"=",
			s
		].join("")), l.push([
			"j",
			u,
			"-=",
			s,
			"}"
		].join("")), c && l.push([
			"index[",
			t[u],
			"]=j",
			u
		].join(""));
		for (var u = 0; u < o; ++u) {
			for (var d = ["offset" + u], f = e; f < a; ++f) d.push([
				"j",
				f,
				"*t",
				u,
				"p",
				t[f]
			].join(""));
			l.push([
				"p",
				u,
				"=(",
				d.join("+"),
				")"
			].join(""));
		}
		l.push(r(t, n, i));
		for (var u = e; u < a; ++u) l.push("}");
		return l.join("\n");
	}
	function a(e) {
		for (var t = 0, n = e[0].length; t < n;) {
			for (var r = 1; r < e.length; ++r) if (e[r][t] !== e[0][t]) return t;
			++t;
		}
		return t;
	}
	function o(e, t, n) {
		for (var r = e.body, i = [], a = [], o = 0; o < e.args.length; ++o) {
			var s = e.args[o];
			if (!(s.count <= 0)) {
				var c = new RegExp(s.name, "g"), l = "", u = t.arrayArgs.indexOf(o);
				switch (t.argTypes[o]) {
					case "offset":
						var d = t.offsetArgIndex.indexOf(o);
						u = t.offsetArgs[d].array, l = "+q" + d;
					case "array":
						l = "p" + u + l;
						var f = "l" + o, p = "a" + u;
						if (t.arrayBlockIndices[u] === 0) s.count === 1 ? n[u] === "generic" ? s.lvalue ? (i.push([
							"var ",
							f,
							"=",
							p,
							".get(",
							l,
							")"
						].join("")), r = r.replace(c, f), a.push([
							p,
							".set(",
							l,
							",",
							f,
							")"
						].join(""))) : r = r.replace(c, [
							p,
							".get(",
							l,
							")"
						].join("")) : r = r.replace(c, [
							p,
							"[",
							l,
							"]"
						].join("")) : n[u] === "generic" ? (i.push([
							"var ",
							f,
							"=",
							p,
							".get(",
							l,
							")"
						].join("")), r = r.replace(c, f), s.lvalue && a.push([
							p,
							".set(",
							l,
							",",
							f,
							")"
						].join(""))) : (i.push([
							"var ",
							f,
							"=",
							p,
							"[",
							l,
							"]"
						].join("")), r = r.replace(c, f), s.lvalue && a.push([
							p,
							"[",
							l,
							"]=",
							f
						].join("")));
						else {
							for (var m = [s.name], h = [l], g = 0; g < Math.abs(t.arrayBlockIndices[u]); g++) m.push("\\s*\\[([^\\]]+)\\]"), h.push("$" + (g + 1) + "*t" + u + "b" + g);
							if (c = new RegExp(m.join(""), "g"), l = h.join("+"), n[u] === "generic") throw Error("cwise: Generic arrays not supported in combination with blocks!");
							r = r.replace(c, [
								p,
								"[",
								l,
								"]"
							].join(""));
						}
						break;
					case "scalar":
						r = r.replace(c, "Y" + t.scalarArgs.indexOf(o));
						break;
					case "index":
						r = r.replace(c, "index");
						break;
					case "shape":
						r = r.replace(c, "shape");
						break;
				}
			}
		}
		return [
			i.join("\n"),
			r,
			a.join("\n")
		].join("\n").trim();
	}
	function s(e) {
		for (var t = Array(e.length), n = !0, r = 0; r < e.length; ++r) {
			var i = e[r], a = i.match(/\d+/);
			a = a ? a[0] : "", i.charAt(0) === 0 ? t[r] = "u" + i.charAt(1) + a : t[r] = i.charAt(0) + a, r > 0 && (n &&= t[r] === t[r - 1]);
		}
		return n ? t[0] : t.join("");
	}
	function c(e, t) {
		for (var c = t[1].length - Math.abs(e.arrayBlockIndices[0]) | 0, l = Array(e.arrayArgs.length), u = Array(e.arrayArgs.length), d = 0; d < e.arrayArgs.length; ++d) u[d] = t[2 * d], l[d] = t[2 * d + 1];
		for (var f = [], p = [], m = [], h = [], g = [], d = 0; d < e.arrayArgs.length; ++d) {
			e.arrayBlockIndices[d] < 0 ? (m.push(0), h.push(c), f.push(c), p.push(c + e.arrayBlockIndices[d])) : (m.push(e.arrayBlockIndices[d]), h.push(e.arrayBlockIndices[d] + c), f.push(0), p.push(e.arrayBlockIndices[d]));
			for (var _ = [], v = 0; v < l[d].length; v++) m[d] <= l[d][v] && l[d][v] < h[d] && _.push(l[d][v] - m[d]);
			g.push(_);
		}
		for (var y = ["SS"], b = ["'use strict'"], x = [], v = 0; v < c; ++v) x.push([
			"s",
			v,
			"=SS[",
			v,
			"]"
		].join(""));
		for (var d = 0; d < e.arrayArgs.length; ++d) {
			y.push("a" + d), y.push("t" + d), y.push("p" + d);
			for (var v = 0; v < c; ++v) x.push([
				"t",
				d,
				"p",
				v,
				"=t",
				d,
				"[",
				m[d] + v,
				"]"
			].join(""));
			for (var v = 0; v < Math.abs(e.arrayBlockIndices[d]); ++v) x.push([
				"t",
				d,
				"b",
				v,
				"=t",
				d,
				"[",
				f[d] + v,
				"]"
			].join(""));
		}
		for (var d = 0; d < e.scalarArgs.length; ++d) y.push("Y" + d);
		if (e.shapeArgs.length > 0 && x.push("shape=SS.slice(0)"), e.indexArgs.length > 0) {
			for (var S = Array(c), d = 0; d < c; ++d) S[d] = "0";
			x.push([
				"index=[",
				S.join(","),
				"]"
			].join(""));
		}
		for (var d = 0; d < e.offsetArgs.length; ++d) {
			for (var C = e.offsetArgs[d], w = [], v = 0; v < C.offset.length; ++v) if (C.offset[v] === 0) continue;
			else C.offset[v] === 1 ? w.push([
				"t",
				C.array,
				"p",
				v
			].join("")) : w.push([
				C.offset[v],
				"*t",
				C.array,
				"p",
				v
			].join(""));
			w.length === 0 ? x.push("q" + d + "=0") : x.push([
				"q",
				d,
				"=",
				w.join("+")
			].join(""));
		}
		var T = n([].concat(e.pre.thisVars, e.body.thisVars, e.post.thisVars));
		x = x.concat(T), x.length > 0 && b.push("var " + x.join(","));
		for (var d = 0; d < e.arrayArgs.length; ++d) b.push("p" + d + "|=0");
		e.pre.body.length > 3 && b.push(o(e.pre, e, u));
		var E = o(e.body, e, u), D = a(g);
		D < c ? b.push(i(D, g[0], e, E)) : b.push(r(g[0], e, E)), e.post.body.length > 3 && b.push(o(e.post, e, u)), e.debug && console.log("-----Generated cwise routine for ", t, ":\n" + b.join("\n") + "\n----------");
		var O = [
			e.funcName || "unnamed",
			"_cwise_loop_",
			l[0].join("s"),
			"m",
			D,
			s(u)
		].join("");
		return Function([
			"function ",
			O,
			"(",
			y.join(","),
			"){",
			b.join("\n"),
			"} return ",
			O
		].join(""))();
	}
	t.exports = c;
})), h = /* @__PURE__ */ o(((e, t) => {
	var n = m();
	function r(e) {
		var t = ["'use strict'", "var CACHED={}"], r = [], i = e.funcName + "_cwise_thunk";
		t.push([
			"return function ",
			i,
			"(",
			e.shimArgs.join(","),
			"){"
		].join(""));
		for (var a = [], o = [], s = [[
			"array",
			e.arrayArgs[0],
			".shape.slice(",
			Math.max(0, e.arrayBlockIndices[0]),
			e.arrayBlockIndices[0] < 0 ? "," + e.arrayBlockIndices[0] + ")" : ")"
		].join("")], c = [], l = [], u = 0; u < e.arrayArgs.length; ++u) {
			var d = e.arrayArgs[u];
			r.push([
				"t",
				d,
				"=array",
				d,
				".dtype,",
				"r",
				d,
				"=array",
				d,
				".order"
			].join("")), a.push("t" + d), a.push("r" + d), o.push("t" + d), o.push("r" + d + ".join()"), s.push("array" + d + ".data"), s.push("array" + d + ".stride"), s.push("array" + d + ".offset|0"), u > 0 && (c.push("array" + e.arrayArgs[0] + ".shape.length===array" + d + ".shape.length+" + (Math.abs(e.arrayBlockIndices[0]) - Math.abs(e.arrayBlockIndices[u]))), l.push("array" + e.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, e.arrayBlockIndices[0]) + "]===array" + d + ".shape[shapeIndex+" + Math.max(0, e.arrayBlockIndices[u]) + "]"));
		}
		e.arrayArgs.length > 1 && (t.push("if (!(" + c.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"), t.push("for(var shapeIndex=array" + e.arrayArgs[0] + ".shape.length-" + Math.abs(e.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"), t.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"), t.push("}"));
		for (var u = 0; u < e.scalarArgs.length; ++u) s.push("scalar" + e.scalarArgs[u]);
		return r.push([
			"type=[",
			o.join(","),
			"].join()"
		].join("")), r.push("proc=CACHED[type]"), t.push("var " + r.join(",")), t.push([
			"if(!proc){",
			"CACHED[type]=proc=compile([",
			a.join(","),
			"])}",
			"return proc(",
			s.join(","),
			")}"
		].join("")), e.debug && console.log("-----Generated thunk:\n" + t.join("\n") + "\n----------"), Function("compile", t.join("\n"))(n.bind(void 0, e));
	}
	t.exports = r;
})), g = /* @__PURE__ */ o(((e, t) => {
	var n = h();
	function r() {
		this.argTypes = [], this.shimArgs = [], this.arrayArgs = [], this.arrayBlockIndices = [], this.scalarArgs = [], this.offsetArgs = [], this.offsetArgIndex = [], this.indexArgs = [], this.shapeArgs = [], this.funcName = "", this.pre = null, this.body = null, this.post = null, this.debug = !1;
	}
	function i(e) {
		var t = new r();
		t.pre = e.pre, t.body = e.body, t.post = e.post;
		var i = e.args.slice(0);
		t.argTypes = i;
		for (var a = 0; a < i.length; ++a) {
			var o = i[a];
			if (o === "array" || typeof o == "object" && o.blockIndices) {
				if (t.argTypes[a] = "array", t.arrayArgs.push(a), t.arrayBlockIndices.push(o.blockIndices ? o.blockIndices : 0), t.shimArgs.push("array" + a), a < t.pre.args.length && t.pre.args[a].count > 0) throw Error("cwise: pre() block may not reference array args");
				if (a < t.post.args.length && t.post.args[a].count > 0) throw Error("cwise: post() block may not reference array args");
			} else if (o === "scalar") t.scalarArgs.push(a), t.shimArgs.push("scalar" + a);
			else if (o === "index") {
				if (t.indexArgs.push(a), a < t.pre.args.length && t.pre.args[a].count > 0) throw Error("cwise: pre() block may not reference array index");
				if (a < t.body.args.length && t.body.args[a].lvalue) throw Error("cwise: body() block may not write to array index");
				if (a < t.post.args.length && t.post.args[a].count > 0) throw Error("cwise: post() block may not reference array index");
			} else if (o === "shape") {
				if (t.shapeArgs.push(a), a < t.pre.args.length && t.pre.args[a].lvalue) throw Error("cwise: pre() block may not write to array shape");
				if (a < t.body.args.length && t.body.args[a].lvalue) throw Error("cwise: body() block may not write to array shape");
				if (a < t.post.args.length && t.post.args[a].lvalue) throw Error("cwise: post() block may not write to array shape");
			} else if (typeof o == "object" && o.offset) t.argTypes[a] = "offset", t.offsetArgs.push({
				array: o.array,
				offset: o.offset
			}), t.offsetArgIndex.push(a);
			else throw Error("cwise: Unknown argument type " + i[a]);
		}
		if (t.arrayArgs.length <= 0) throw Error("cwise: No array arguments specified");
		if (t.pre.args.length > i.length) throw Error("cwise: Too many arguments in pre() block");
		if (t.body.args.length > i.length) throw Error("cwise: Too many arguments in body() block");
		if (t.post.args.length > i.length) throw Error("cwise: Too many arguments in post() block");
		return t.debug = !!e.printCode || !!e.debug, t.funcName = e.funcName || "cwise", t.blockSize = e.blockSize || 64, n(t);
	}
	t.exports = i;
})), _ = /* @__PURE__ */ o(((e) => {
	var t = g(), n = {
		body: "",
		args: [],
		thisVars: [],
		localVars: []
	};
	function r(e) {
		if (!e) return n;
		for (var t = 0; t < e.args.length; ++t) {
			var r = e.args[t];
			t === 0 ? e.args[t] = {
				name: r,
				lvalue: !0,
				rvalue: !!e.rvalue,
				count: e.count || 1
			} : e.args[t] = {
				name: r,
				lvalue: !1,
				rvalue: !0,
				count: 1
			};
		}
		return e.thisVars ||= [], e.localVars ||= [], e;
	}
	function i(e) {
		return t({
			args: e.args,
			pre: r(e.pre),
			body: r(e.body),
			post: r(e.proc),
			funcName: e.funcName
		});
	}
	function a(e) {
		for (var t = [], n = 0; n < e.args.length; ++n) t.push("a" + n);
		return Function("P", [
			"return function ",
			e.funcName,
			"_ndarrayops(",
			t.join(","),
			") {P(",
			t.join(","),
			");return a0}"
		].join(""))(i(e));
	}
	var o = {
		add: "+",
		sub: "-",
		mul: "*",
		div: "/",
		mod: "%",
		band: "&",
		bor: "|",
		bxor: "^",
		lshift: "<<",
		rshift: ">>",
		rrshift: ">>>"
	};
	(function() {
		for (var t in o) {
			var n = o[t];
			e[t] = a({
				args: [
					"array",
					"array",
					"array"
				],
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=b" + n + "c"
				},
				funcName: t
			}), e[t + "eq"] = a({
				args: ["array", "array"],
				body: {
					args: ["a", "b"],
					body: "a" + n + "=b"
				},
				rvalue: !0,
				funcName: t + "eq"
			}), e[t + "s"] = a({
				args: [
					"array",
					"array",
					"scalar"
				],
				body: {
					args: [
						"a",
						"b",
						"s"
					],
					body: "a=b" + n + "s"
				},
				funcName: t + "s"
			}), e[t + "seq"] = a({
				args: ["array", "scalar"],
				body: {
					args: ["a", "s"],
					body: "a" + n + "=s"
				},
				rvalue: !0,
				funcName: t + "seq"
			});
		}
	})();
	var s = {
		not: "!",
		bnot: "~",
		neg: "-",
		recip: "1.0/"
	};
	(function() {
		for (var t in s) {
			var n = s[t];
			e[t] = a({
				args: ["array", "array"],
				body: {
					args: ["a", "b"],
					body: "a=" + n + "b"
				},
				funcName: t
			}), e[t + "eq"] = a({
				args: ["array"],
				body: {
					args: ["a"],
					body: "a=" + n + "a"
				},
				rvalue: !0,
				count: 2,
				funcName: t + "eq"
			});
		}
	})();
	var c = {
		and: "&&",
		or: "||",
		eq: "===",
		neq: "!==",
		lt: "<",
		gt: ">",
		leq: "<=",
		geq: ">="
	};
	(function() {
		for (var t in c) {
			var n = c[t];
			e[t] = a({
				args: [
					"array",
					"array",
					"array"
				],
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=b" + n + "c"
				},
				funcName: t
			}), e[t + "s"] = a({
				args: [
					"array",
					"array",
					"scalar"
				],
				body: {
					args: [
						"a",
						"b",
						"s"
					],
					body: "a=b" + n + "s"
				},
				funcName: t + "s"
			}), e[t + "eq"] = a({
				args: ["array", "array"],
				body: {
					args: ["a", "b"],
					body: "a=a" + n + "b"
				},
				rvalue: !0,
				count: 2,
				funcName: t + "eq"
			}), e[t + "seq"] = a({
				args: ["array", "scalar"],
				body: {
					args: ["a", "s"],
					body: "a=a" + n + "s"
				},
				rvalue: !0,
				count: 2,
				funcName: t + "seq"
			});
		}
	})();
	var l = [
		"abs",
		"acos",
		"asin",
		"atan",
		"ceil",
		"cos",
		"exp",
		"floor",
		"log",
		"round",
		"sin",
		"sqrt",
		"tan"
	];
	(function() {
		for (var t = 0; t < l.length; ++t) {
			var n = l[t];
			e[n] = a({
				args: ["array", "array"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a", "b"],
					body: "a=this_f(b)",
					thisVars: ["this_f"]
				},
				funcName: n
			}), e[n + "eq"] = a({
				args: ["array"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a"],
					body: "a=this_f(a)",
					thisVars: ["this_f"]
				},
				rvalue: !0,
				count: 2,
				funcName: n + "eq"
			});
		}
	})();
	var u = [
		"max",
		"min",
		"atan2",
		"pow"
	];
	(function() {
		for (var t = 0; t < u.length; ++t) {
			var n = u[t];
			e[n] = a({
				args: [
					"array",
					"array",
					"array"
				],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=this_f(b,c)",
					thisVars: ["this_f"]
				},
				funcName: n
			}), e[n + "s"] = a({
				args: [
					"array",
					"array",
					"scalar"
				],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=this_f(b,c)",
					thisVars: ["this_f"]
				},
				funcName: n + "s"
			}), e[n + "eq"] = a({
				args: ["array", "array"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a", "b"],
					body: "a=this_f(a,b)",
					thisVars: ["this_f"]
				},
				rvalue: !0,
				count: 2,
				funcName: n + "eq"
			}), e[n + "seq"] = a({
				args: ["array", "scalar"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a", "b"],
					body: "a=this_f(a,b)",
					thisVars: ["this_f"]
				},
				rvalue: !0,
				count: 2,
				funcName: n + "seq"
			});
		}
	})();
	var d = ["atan2", "pow"];
	(function() {
		for (var t = 0; t < d.length; ++t) {
			var n = d[t];
			e[n + "op"] = a({
				args: [
					"array",
					"array",
					"array"
				],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=this_f(c,b)",
					thisVars: ["this_f"]
				},
				funcName: n + "op"
			}), e[n + "ops"] = a({
				args: [
					"array",
					"array",
					"scalar"
				],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: [
						"a",
						"b",
						"c"
					],
					body: "a=this_f(c,b)",
					thisVars: ["this_f"]
				},
				funcName: n + "ops"
			}), e[n + "opeq"] = a({
				args: ["array", "array"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a", "b"],
					body: "a=this_f(b,a)",
					thisVars: ["this_f"]
				},
				rvalue: !0,
				count: 2,
				funcName: n + "opeq"
			}), e[n + "opseq"] = a({
				args: ["array", "scalar"],
				pre: {
					args: [],
					body: "this_f=Math." + n,
					thisVars: ["this_f"]
				},
				body: {
					args: ["a", "b"],
					body: "a=this_f(b,a)",
					thisVars: ["this_f"]
				},
				rvalue: !0,
				count: 2,
				funcName: n + "opseq"
			});
		}
	})(), e.any = t({
		args: ["array"],
		pre: n,
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}],
			body: "if(a){return true}",
			localVars: [],
			thisVars: []
		},
		post: {
			args: [],
			localVars: [],
			thisVars: [],
			body: "return false"
		},
		funcName: "any"
	}), e.all = t({
		args: ["array"],
		pre: n,
		body: {
			args: [{
				name: "x",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}],
			body: "if(!x){return false}",
			localVars: [],
			thisVars: []
		},
		post: {
			args: [],
			localVars: [],
			thisVars: [],
			body: "return true"
		},
		funcName: "all"
	}), e.sum = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=0"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}],
			body: "this_s+=a",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return this_s"
		},
		funcName: "sum"
	}), e.prod = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=1"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}],
			body: "this_s*=a",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return this_s"
		},
		funcName: "prod"
	}), e.norm2squared = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=0"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			body: "this_s+=a*a",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return this_s"
		},
		funcName: "norm2squared"
	}), e.norm2 = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=0"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			body: "this_s+=a*a",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return Math.sqrt(this_s)"
		},
		funcName: "norm2"
	}), e.norminf = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=0"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 4
			}],
			body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return this_s"
		},
		funcName: "norminf"
	}), e.norm1 = t({
		args: ["array"],
		pre: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "this_s=0"
		},
		body: {
			args: [{
				name: "a",
				lvalue: !1,
				rvalue: !0,
				count: 3
			}],
			body: "this_s+=a<0?-a:a",
			localVars: [],
			thisVars: ["this_s"]
		},
		post: {
			args: [],
			localVars: [],
			thisVars: ["this_s"],
			body: "return this_s"
		},
		funcName: "norm1"
	}), e.sup = t({
		args: ["array"],
		pre: {
			body: "this_h=-Infinity",
			args: [],
			thisVars: ["this_h"],
			localVars: []
		},
		body: {
			body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
			args: [{
				name: "_inline_1_arg0_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			thisVars: ["this_h"],
			localVars: []
		},
		post: {
			body: "return this_h",
			args: [],
			thisVars: ["this_h"],
			localVars: []
		}
	}), e.inf = t({
		args: ["array"],
		pre: {
			body: "this_h=Infinity",
			args: [],
			thisVars: ["this_h"],
			localVars: []
		},
		body: {
			body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
			args: [{
				name: "_inline_1_arg0_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			thisVars: ["this_h"],
			localVars: []
		},
		post: {
			body: "return this_h",
			args: [],
			thisVars: ["this_h"],
			localVars: []
		}
	}), e.argmin = t({
		args: [
			"index",
			"array",
			"shape"
		],
		pre: {
			body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
			args: [
				{
					name: "_inline_0_arg0_",
					lvalue: !1,
					rvalue: !1,
					count: 0
				},
				{
					name: "_inline_0_arg1_",
					lvalue: !1,
					rvalue: !1,
					count: 0
				},
				{
					name: "_inline_0_arg2_",
					lvalue: !1,
					rvalue: !0,
					count: 1
				}
			],
			thisVars: ["this_i", "this_v"],
			localVars: []
		},
		body: {
			body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
			args: [{
				name: "_inline_1_arg0_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}, {
				name: "_inline_1_arg1_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			thisVars: ["this_i", "this_v"],
			localVars: ["_inline_1_k"]
		},
		post: {
			body: "{return this_i}",
			args: [],
			thisVars: ["this_i"],
			localVars: []
		}
	}), e.argmax = t({
		args: [
			"index",
			"array",
			"shape"
		],
		pre: {
			body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
			args: [
				{
					name: "_inline_0_arg0_",
					lvalue: !1,
					rvalue: !1,
					count: 0
				},
				{
					name: "_inline_0_arg1_",
					lvalue: !1,
					rvalue: !1,
					count: 0
				},
				{
					name: "_inline_0_arg2_",
					lvalue: !1,
					rvalue: !0,
					count: 1
				}
			],
			thisVars: ["this_i", "this_v"],
			localVars: []
		},
		body: {
			body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
			args: [{
				name: "_inline_1_arg0_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}, {
				name: "_inline_1_arg1_",
				lvalue: !1,
				rvalue: !0,
				count: 2
			}],
			thisVars: ["this_i", "this_v"],
			localVars: ["_inline_1_k"]
		},
		post: {
			body: "{return this_i}",
			args: [],
			thisVars: ["this_i"],
			localVars: []
		}
	}), e.random = a({
		args: ["array"],
		pre: {
			args: [],
			body: "this_f=Math.random",
			thisVars: ["this_f"]
		},
		body: {
			args: ["a"],
			body: "a=this_f()",
			thisVars: ["this_f"]
		},
		funcName: "random"
	}), e.assign = a({
		args: ["array", "array"],
		body: {
			args: ["a", "b"],
			body: "a=b"
		},
		funcName: "assign"
	}), e.assigns = a({
		args: ["array", "scalar"],
		body: {
			args: ["a", "b"],
			body: "a=b"
		},
		funcName: "assigns"
	}), e.equals = t({
		args: ["array", "array"],
		pre: n,
		body: {
			args: [{
				name: "x",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}, {
				name: "y",
				lvalue: !1,
				rvalue: !0,
				count: 1
			}],
			body: "if(x!==y){return false}",
			localVars: [],
			thisVars: []
		},
		post: {
			args: [],
			localVars: [],
			thisVars: [],
			body: "return true"
		},
		funcName: "equals"
	});
})), v = /* @__PURE__ */ c(l(), 1), y = /* @__PURE__ */ c(f(), 1), b = /* @__PURE__ */ c(_(), 1), x = globalThis.FaceMesh, S, C = !1, w = null, T, E, D, O, k, A;
async function j(e) {
	let t = await import(
		/* @vite-ignore */
		new URL("./assets/ort.webgl.min.mjs", "" + import.meta.url).href
), n = await fetch(new URL("./assets/peekr.onnx", "" + import.meta.url));
	if (!n.ok) throw Error(`Peekr model request failed (${n.status})`);
	let r = new Uint8Array(await n.arrayBuffer()), i = await t.InferenceSession.create(r, {
		executionProviders: ["webgl"],
		graphOptimizationLevel: "all"
	}), a = !0, o = !1;
	return {
		async postMessage({ input1: n, input2: r, kpsTensor: s }) {
			if (!(!a || o)) {
				o = !0;
				try {
					let o = await i.run({
						input1: new t.Tensor("float32", n.data, [
							1,
							3,
							128,
							128
						]),
						input2: new t.Tensor("float32", r.data, [
							1,
							3,
							128,
							128
						]),
						kps: new t.Tensor("float32", s.data, [1, 8])
					});
					a && e?.(o);
				} finally {
					o = !1;
				}
			}
		},
		terminate() {
			a = !1;
		}
	};
}
function M(e, t = null, n = null) {
	return w || (w = new Worker(new URL(
		/* @vite-ignore */
		"/eye-labs/peekr/assets/worker-D7ZMe-4W.js",
		"" + import.meta.url
	), { type: "module" }), w.onmessage = (r) => {
		let { type: i, error: a, ...o } = r.data;
		if (a) {
			console.error("Worker error:", a), n?.(Error(a));
			return;
		}
		if (i === "modelLoaded") {
			console.log("ℹ️ Received \"modelLoaded\" from worker"), t && t();
			return;
		}
		if (i === "modelLoadFailed") {
			console.error("⚠️ Model failed to load inside worker", a), n?.(Error(a || "Peekr model failed to load"));
			return;
		}
		e && e(o);
	}, w.onerror = (e) => {
		console.error("Worker could not start", e), n?.(Error(e.message || "Peekr worker could not start"));
	}, w);
}
function N(e, t, n, r = null, i = null, a = null, o = !1) {
	T = e, r && i && (D = r, O = i, k = D.getContext("2d", { willReadFrequently: !0 }), A = O.getContext("2d", { willReadFrequently: !0 })), o ? j(n).then((e) => {
		w = e, console.log("👁️ Model loaded in Android WebGL mode"), t?.();
	}).catch(a) : w = M(n, () => {
		console.log("👁️ Model loaded inside worker, calling onReady"), t && t();
	}, a), E = new x({ locateFile: (e) => `/eye-labs/peekr/mediapipe/${e}` }), E.setOptions({
		selfieMode: !0,
		refineLandmarks: !0,
		maxNumFaces: 1,
		minDetectionConfidence: .5,
		minTrackingConfidence: .5
	}), E.onResults(I), T.addEventListener("play", () => {
		C = !0;
	});
}
function P() {
	C = !0;
	async function e() {
		if (C) {
			try {
				await E.send({ image: T });
			} catch (e) {
				console.error("Face tracking failed", e), C = !1;
				return;
			}
			S = requestAnimationFrame(e);
		}
	}
	e();
}
function F() {
	C = !1, S !== null && (cancelAnimationFrame(S), S = null), w?.terminate(), w = null;
	try {
		E?.close?.();
	} catch {}
	E = null;
}
function I(e) {
	if (!e.multiFaceLandmarks || e.multiFaceLandmarks.length === 0) return;
	let t = e.multiFaceLandmarks[0], n = T.videoWidth, r = T.videoHeight, i = [], a = [];
	if (B(t, [
		130,
		27,
		243,
		23
	], i), B(t, [
		463,
		257,
		359,
		253
	], a), i.length === 0 || a.length === 0) return;
	let [o, s, c, l] = z(i, n, r), u = [
		o / n,
		s / r,
		c / n,
		l / r
	];
	k.drawImage(T, Math.max(0, n - o - c), Math.max(0, s), Math.max(0, c), Math.max(0, l), 0, 0, 128, 128), [o, s, c, l] = z(a, n, r), u.push(o / n, s / r, c / n, l / r), A.drawImage(T, Math.max(0, n - o - c), Math.max(0, s), Math.max(0, c), Math.max(0, l), 0, 0, 128, 128);
	let d = L(k.getImageData(0, 0, 128, 128).data, 128, 128), f = L(A.getImageData(0, 0, 128, 128).data, 128, 128), p = R(u);
	w.postMessage({
		input1: { data: d },
		input2: { data: f },
		kpsTensor: { data: p }
	});
}
function L(e, t, n) {
	let r = (0, y.default)(new Float32Array(e), [
		t,
		n,
		4
	]), i = (0, y.default)(new Float32Array(t * n * 3), [
		1,
		3,
		n,
		t
	]);
	return b.default.divseq(r, 255), b.assign(i.pick(0, 0, null, null), r.pick(null, null, 2)), b.assign(i.pick(0, 1, null, null), r.pick(null, null, 1)), b.assign(i.pick(0, 2, null, null), r.pick(null, null, 0)), new Float32Array(i.data);
}
function R(e) {
	let t = (0, y.default)(new Float32Array(e), [e.length]), n = (0, y.default)(new Float32Array(e.length), [1, e.length]);
	return b.assign(n.pick(0, null), t), new Float32Array(n.data);
}
function z(e, t, n) {
	let r = (e[0][0] + e[2][0]) / 2, i = (e[1][1] + e[3][1]) / 2, a = e[2][0] - e[0][0], o = e[3][1] - e[1][1], s = [
		r,
		i,
		a,
		o
	], c = (s[0] - s[2] / 2) * t, l = (s[1] - s[3] / 2) * n;
	return a = s[2] * t, o = s[3] * n, [
		c,
		l,
		a,
		o
	];
}
function B(e, t, n) {
	t.forEach((t) => {
		let r = e[t];
		n.push([r.x, r.y]);
	});
}
//#endregion
//#region src/core.js
var V = !1, H = {
	x: new v.default(),
	y: new v.default()
};
function U(e, t) {
	return [H.x.filter(e), H.y.filter(t)];
}
function W({ video: e = null, canvas: t = null, leftEyeCanvas: n = null, rightEyeCanvas: r = null, onReady: i = null, onGaze: a = null, onError: o = null, compatibilityMode: s = !1 } = {}) {
	if (!e || !t) {
		console.error("Video and canvas elements must be provided"), o?.(/* @__PURE__ */ Error("Video and canvas elements must be provided"));
		return;
	}
	console.log("initialising ..."), navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }).then((t) => {
		e.srcObject = t, N(e, () => {
			V = !0, console.log("initialised, ready to run eyetracking"), i && i();
		}, a, n, r, o, s);
	}).catch((e) => {
		console.error("Could not start the front camera", e), o?.(e);
	});
}
function G() {
	if (!V) {
		console.warn("Eye tracking has not been initialized. Call initEyeTracking() first.");
		return;
	}
	P();
}
function K() {
	F();
}
//#endregion
//#region src/aac-bridge.js
var q = null;
function J({ video: e, canvas: t, leftEyeCanvas: n, rightEyeCanvas: r, onReady: i, onGaze: a, onError: o, compatibilityMode: s = !1 }) {
	q = e, W({
		video: e,
		canvas: t,
		leftEyeCanvas: n,
		rightEyeCanvas: r,
		onReady: () => {
			G(), i?.();
		},
		onGaze: (e) => {
			let t = e?.output?.cpuData ?? e?.output?.data;
			if (!t || t.length < 2) return;
			let [n, r] = U(t[0], t[1]);
			Number.isFinite(n) && Number.isFinite(r) && a?.({
				x: n,
				y: r
			});
		},
		onError: o,
		compatibilityMode: s
	});
}
function Y() {
	K();
	let e = q?.srcObject;
	e instanceof MediaStream && e.getTracks().forEach((e) => e.stop()), q && (q.srcObject = null), q = null;
}
//#endregion
export { J as startPeekr, Y as stopPeekr };
