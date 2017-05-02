"use strict";

(function () {
	var jsBeautifyOptions = {
		space_before_conditional: true,
		keep_array_indentation: false,
		preserve_newlines: true,
		unescape_strings: true,
		jslint_happy: false,
		brace_style: "end-expand",
		indent_char: " ",
		indent_size: 4
	};

	$(".example:not(.ignore)").each(function (index, el) {
		var name = $fly(el).attr("name");
		var modelName = $fly(el).attr("model") || name;
		var reg = new RegExp("(cola\\(" + ('"' + modelName + '"') + ",|cola\\('" + modelName + "',)", "g");
		var script = $("script[name='" + name + "']").text() || "";
		if (script) {
			script = "<script type=\"text/javascript\">" + (script.replace(reg, "cola(")) + "</script>";
		}
		var style = $("style[name='" + name + "']").text() || "";
		if (style) {
			style = "<style>" + style + "</style>";
		}
		var $code = $(el).find(".code");
		var html = $code.html();
		if (html) {
			var sources = [
				{
					tagName: "pre", "class": "prettyprint lang-html",
					content: html_beautify(html, jsBeautifyOptions)
				},
				{
					tagName: "pre", "class": "prettyprint lang-html",
					content: html_beautify(script, jsBeautifyOptions)
				}];
			if (style) {
				sources.push({
					tagName: "pre", "class": "prettyprint lang-html",
					content: html_beautify(style, jsBeautifyOptions)
				})
			}

			var codeEl = $.xCreate(sources);

			if ($code[0]) {
				var parentNode = $code[0].parentNode;
				if (parentNode !== el) {
					while (parentNode !== el) {
						parentNode = parentNode.parentNode;
					}
					$(parentNode).after(codeEl);
				} else {
					$code.after(codeEl);
				}
				var controlDom = $.xCreate({
					tagName: "div", class: "example-control",
					content: [
						{
							tagName: "i", class: "icon code"
						},
						{
							tagName: "span", class: "visible", content: "显示代码"
						},
						{
							tagName: "span", class: "hidden", content: "隐藏代码"
						}
					]
				});
				$(el).append(controlDom);

				$(controlDom).on("click", function () {
					$(this).parent().toggleClass("source-visible")
				})
			}
		}
	});

	$(".markdown-content pre>code").each(function (index, el) {
		var code;
		code = $(el).text();
		return $(el).parent().addClass("prettyprint lang-html c-ignore").text(code);
	});

	$(".markdown-content>pre.code").each(function (index, el) {
		var code;
		code = html_beautify($(el).html(), jsBeautifyOptions);
		return $(el).addClass("prettyprint").text(code);
	});

	prettyPrint();
}).call(this);


(function () {
	NProgress.done();
	var menuMapping = {};
	cola(function (model) {
		model.action({
			showSidebar: function () {
				cola.widget("menuSidebar").show()
			},
			hideSidebar: function () {
				cola.widget("menuSidebar").hide()
			},
			searchChange: function (self, arg) {
				var components = model.get("components");
				var key = arg.value;
				components.each(function (entity) {
					entity.set("target", entity.get("index").indexOf(key) >= 0)
				});
			},
			open: function (component) {
				var path = component.get("path");
				window.location = path;
			}
		});

		var pathName = window.location.pathname;
		var module = location.pathname.split("/");

		if (module[1]) {
			model.set("module", module[1])
			$.get("./service/menus/" + module[1]).done(function (result) {
				var components = [];
				var router = {};
				var idIndex = 0, routerIndex = 0;

				function pushRouter(config) {
					if (!config.path) {
						return
					}
					if (!routerIndex) {
						router.first = config;
					}

					if (config.path === pathName) {
						router.current = config;
						return;
					}
					if (!router.next && router.current) {
						router.next = config;
						return;
					}

					if (!router.current) {
						router.previous = config;
					}

					routerIndex++

				}

				for (var i = 0, len = result.length; i < len; i++) {
					var item = result[i];
					item.id = "-" + (++idIndex);
					var config = {
						text: item.label,
						path: item.path,
						id: item.id
					};
					menuMapping[item.id] = config;
					pushRouter(config);

					recursive(item);
				}


				function recursive(d) {
					if (d.menus && d.menus.length > 0) {
						var ref = d.menus;
						for (var i = 0, len = ref.length; i < len; i++) {
							var sd = ref[i];
							sd.id = "-" + (++idIndex);
							sd.parentId = d.id;
							var config = {
								text: sd.label,
								path: sd.path,
								id: sd.id,
								api: "/api/" + sd.api,
								parentId: sd.parentId
							};


							menuMapping[sd.id] = config;

							pushRouter(config);


							if (sd.name) {
								components.push({
									name: sd.name,
									label: sd.label,
									target: true,
									path: sd.path,
									index: (sd.name + sd.label).toLowerCase()
								})
							}
							recursive(sd);
						}
					} else {
						d.menus = null;
						d.hasChild = false;
					}
				}

				model.set("components", components);
				if (!router.current) {
					router.next = router.first;
					delete router.previous
				}

				model.set("router", router);
			})


		}


		$("#searchComponent").popup({
			inline: true, hoverable: true,
			position: 'bottom center', on: 'click',
			delay: {
				show: 300, hide: 800
			}
		});

		$("catalog")
			.delegate("li>a", "click", function () {
				$(this).parent().toggleClass("active");
			})
			.find("a[href='" + pathName + "']")
			.addClass("active")
			.closest("catalog>ul>li")
			.addClass("active");

		$("#qq").popup({
			hoverable: true, popup: "#qqPopup",
			on: 'hover', position: 'top center',
			delay: {
				show: 300, hide: 800
			}
		});
	});
})();