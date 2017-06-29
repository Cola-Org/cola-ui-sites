cola(function (model) {
	model.describe("employees", {
		provider: {
			url: "//open-data.cola-ui.com/service/employee/find",
			pageSize: 5
		}
	});
});