cola(function(model){
	model.set("sections", [
		{text: "首页", href: "http://cola-ui.com"},
		{text: "组件", href: "http://cola-ui.com/docs"},
		{text: "按钮", href: "http://cola-ui.com/docs/button"}
	]);
	model.action({
		itemClick: function (self, arg) {
			model.get("sections").setCurrent(arg.item)
		}
	});
});