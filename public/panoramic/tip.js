cola(function (model) {
	model.action({
		info: function () {
			cola.alert("Hello World !!", {
				level: cola.MessageBox.level.INFO
			})
		},
		warning: function () {
			cola.alert("Hello World !!", {
				level: cola.MessageBox.level.WARNING
			})
		},
		error: function () {
			cola.alert("Hello World !!", {
				level: cola.MessageBox.level.ERROR
			})
		},
		confirm: function () {
			cola.confirm("Hello World !!", {
				onApprove: function () {
					console.log("yes")
				},
				onDeny: function () {
					console.log("no")
				}
			})
		}

	})

});