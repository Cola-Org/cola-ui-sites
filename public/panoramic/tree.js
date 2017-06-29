cola(function(model){
	model.dataType({
		name: "Node",
		properties: {
			nodes: {
				dataType: "Node",
				provider: {
					url: "http://open-data.cola-ui.com/service/district/children",
					parameter: {
						parentId: "{{@id}}"
					}
				}
			}
		}
	});

	model.describe("nodes", {
		dataType: "Node",
		provider: "http://open-data.cola-ui.com/service/district/provinces"
	});

	model.widgetConfig({
		cityTree: {
			bind: {
				hasChildProperty: "isDir",
				expression: "node in nodes",
				textProperty:"name",
				child: {
					recursive: true,
					hasChildProperty: "isDir",
					textProperty:"name",
					expression: "node in node.nodes"
				}
			},
			height: "100%"
		}
	});
})