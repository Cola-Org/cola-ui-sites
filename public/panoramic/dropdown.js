cola(function (model) {
	model.set("citys", [
		{name: "北京市"},
		{name: "上海市"},
		{name: "深圳市"},
		{name: "厦门"},
		{name: "呼和浩特"},
		{name: "郑州"},
		{name: "石家庄"},
		{name: "广州"},
		{name: "香港"}
	]);

	model.describe("employees", {
		provider: {
			url: "//open-data.cola-ui.com/service/employee/find",
			pageSize: 5
		}
	});
	model.widgetConfig({
		dropdown: {
			$type: "customDropdown", valueProperty: "name",
			dropdownWidth: "300px",
			content: {
				$type: "table", bind: "language in languages",
				columns: [{bind: ".name"}, {bind: ".desc"}],
				itemClick: function (self, arg) {
					var dropdown = cola.findDropDown(self);
					if (dropdown) dropdown.close(arg.item);
				}
			}
		}
	})
});