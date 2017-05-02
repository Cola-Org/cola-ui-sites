App.setProp({
	"app.name": "Cola-UI 文档中心",
	mainView: "./frame/main", //系统主框架界面
	loginPath: "./login", //登录界面路径
	"service.login": "./service/account/login",  //登录接口
	"service.logout": "./service/account/logout", //登出接口
	"service.menus": "./service/frame/menus", //系统菜单接口
	"service.user.detail": "./service/frame/user/detail"  //获得当前用户详细信息接口
});

App.open = function (path, paths) {
	cola.widget("contentFrame").open(path)
};

(function () {
	cola(function (model) {
		model.set("channels", [
			{icon: "iconfont icon-home", label: "首页", path: "http://cola-ui.com"},
			{icon: "iconfont icon-wendang", label: "在线文档", path: "http://docs.cola-ui.com"},
			{icon: "iconfont icon-APIjiekou", label: "API", path: "http://api.cola-ui.com"},
			{icon: "iconfont icon-qianduankuangjia", label: "框架", path: "http://frame.cola-ui.com"},
			{icon: "iconfont icon-zhishiwenda", label: "问答", path: "https://github.com/Cola-Org/cola-ui/issues"},
			{icon: "iconfont icon-iconfontcolor60", label: "在线演示", path: "http://demo.cola-ui.com"}
		]);
		var appName = App.prop("app.name");
		if (appName) {
			$("#appHeader").append($.xCreate({
				tagName: "span",
				content: appName
			}));
		}

		var menuMapping = {};
		model.describe("menus", {
			provider: {
				url: App.prop("service.menus"),
				response: function (self, arg) {
					var result = arg.result;

					var idIndex = 0;
					for (var i = 0, len = result.length; i < len; i++) {
						var item = result[i];
						item.id = "-" + (++idIndex);

						menuMapping[item.id] = {
							text: item.label,
							href: item.path,
							id: item.id
						};

						recursive(item)
					}
					function recursive(d) {
						if (d.menus && d.menus.length > 0) {
							var ref = d.menus;
							for (var i = 0, len = ref.length; i < len; i++) {
								var sd = ref[i];
								sd.id = "-" + (++idIndex);
								sd.parentId = d.id;
								menuMapping[sd.id] = {
									text: sd.label,
									href: sd.path,
									id: sd.id,
									parentId: sd.parentId
								};
								recursive(sd);
							}
						} else {
							d.menus = null;
							d.hasChild = false;
						}
					}
				}
			}
		});
		function resetBreadcrumb(data) {
			var paths = [];

			function recursiveCreatePath(d) {
				paths.push(menuMapping[d.id]);
				d.parentId && recursiveCreatePath(menuMapping[d.parentId]);
			}

			recursiveCreatePath(data);
			paths.push({
				text: "首页"
			});
			cola.widget("breadcrumb").set("sections", paths.reverse());
		}


		model.widgetConfig({
			subMenuTree: {
				$type: "tree",
				autoExpand: true,
				bind: {
					expression: "menu in subMenu",
					child: {
						recursive: true,
						expression: "menu in menu.menus"
					}
				},
				itemClick: function (self, arg) {
					var data, menus;
					var item = arg.item.get("data");
					data = arg.item.get("data").toJSON();
					menus = data.menus;
					if (menus && menus.length > 0) {
					} else {
						App.open(data.path, data);
						return cola.widget("subMenuLayer").hide();
					}
				}
			},
			subMenuLayer: {
				beforeShow: function () {
					$("#rightContainer").addClass("lock");
				},
				beforeHide: function () {
					$("#rightContainer").removeClass("lock");
				}
			}
		});

		model.action({
			dropdownIconVisible: function (item) {
				var menus = item.get("menus"), result = false;
				if (menus && menus.entityCount > 0) {
					result = true;
				}
				return result;
			},
			menuItemClick: function (item) {
				var data = item.toJSON(), menus = data.menus;

				function recursive(d) {
					if (d.menus && d.menus.length > 0) {
						var ref = d.menus;
						for (var i = 0, len = ref.length; i < len; i++) {
							recursive(ref[i]);
						}
					} else {
						d.menus = null;
						d.hasChild = false;
					}
				}

				if (menus && menus.length > 0) {
					for (var i = 0, len = menus.length; i < len; i++) {
						recursive(menus[i]);
					}
					model.set("subMenu", menus);
					model.set("currentMenu", data);
					cola.widget("subMenuLayer").show();
				} else {
					model.set("subMenu", []);
					cola.widget("subMenuLayer").hide();
					App.open(data.path, data);
					resetBreadcrumb(data);
				}
			},
			hideSubMenuLayer: function () {
				cola.widget("subMenuLayer").hide();
			}

		});
		$("#frameworkSidebar").accordion({
			exclusive: App.prop("menu.exclusive")
		}).delegate(".menu-item", "click", function () {
			$("#frameworkSidebar").find(".menu-item.current-item").removeClass("current-item");
			$fly(this).addClass("current-item");
		});
		$("#rightContainer>.layer-dimmer").on("click", function () {
			cola.widget("subMenuLayer").hide();
		});

		model.set("viewPaths", [
			{
				text: "首页",
				href: ""
			}
		])
	});
})();