module.exports = [
	{
		label: "全景图",
		path: "/panoramic/index"
	},
	{
		icon: "icon-component-layout",
		label: "布局",
		menus: [
			{
				label: "表单布局",
				name: "Form Layout",
				path: "/docs/form-layout"
			},
			{
				label: "横向箱式布局",
				name: "HBox Layout",
				path: "/docs/h-box"
			},
			{
				label: "纵向箱式布局",
				name: "VBox Layout",
				path: "/docs/v-box"
			},
			{
				label: "块状布局",
				name: "Block Layout",
				path: "/docs/block-layout"
			}
		]
	},
	{
		icon: "icon-component-component",
		label: "控件",
		menus: [
			{
				icon: "icon-component-button",
				label: "按钮",
				name: "button",
				api: "cola.Button.html",
				path: "/docs/button"
			},
			{
				icon: "icon-component-button-group",
				label: "按钮组",
				name: "button",
				api: "cola.ButtonGroup.html",
				path: "/docs/button-group"
			},
			{
				icon: "icon-component-input",
				name: "Input",
				label: "输入框 ",
				api: "cola.Input.html",
				path: "/docs/input"
			},
			{
				icon: "icon-component-dropdown",
				name: "Dropdown",
				label: "下拉框 ",
				api: "cola.Dropdown.html",
				path: "/docs/dropdown"
			},
			{
				icon: "icon-component-table",
				name: "Table",
				label: "表格 ",
				api: "cola.Table.html",
				path: "/docs/table"
			},
			{
				icon: "icon-component-dialog",
				name: "Dialog",
				api: "cola.Dialog.html",
				label: "弹出框",
				path: "/docs/dialog"
			},
			{
				icon: "icon-component-panel",
				name: "Panel",
				label: "面板",
				api: "cola.Panel.html",
				path: "/docs/panel"
			},
			{
				icon: "icon-component-date",
				name: "DatePicker",
				label: "日期选择器",
				api: "cola.DatePicker.html",
				path: "/docs/date-picker"
			},
			{
				icon: "icon-tab",
				name: "Tab",
				label: "标签页",
				api: "cola.Tab.html",
				path: "/docs/tab"
			},

			// {
			// 	icon: "icon-component-year-month",
			// 	name: "YearMonthPicker",
			// 	label: "年月下拉框",
			// 	api: "cola.YearMonthPicker.html",
			// 	path: "/docs/year-month-picker"
			// },
			{
				icon: "icon-component-split-panel",
				name: "SplitPanel",
				label: "滑动分割面板",
				api: "cola.SplitPanel.html",
				path: "/docs/split-panel"
			},
			// {
			// 	icon: "icon-component-tag",
			// 	name: "TagEditor",
			// 	api: "cola.TagEditor.html",
			// 	label: "标签编辑器",
			// 	path: "/docs/tag-editor"
			// },
			{
				icon: "icon-component-layer",
				name: "Layer",
				label: "层控件",
				api: "cola.Layer.html",
				path: "/docs/layer"
			},
			{
				name: "SelectButton",
				label: "按钮选择器",
				api: "cola.SelectButton.html",
				path: "/docs/select-button"
			},
			{
				name: "Rating",
				label: "评分控件",
				api: "cola.Rating.html",
				path: "/docs/rating"
			},
			{
				name: "Toggle",
				label: "开关控件",
				api: "cola.Toggle.html",
				path: "/docs/toggle"
			},
			{
				name: "Progress",
				label: "进度条",
				api: "cola.Progress.html",
				path: "/docs/progress"
			},
			{
				name: "Tree",
				label: "树控件",
				api: "cola.Tree.html",
				path: "/docs/tree"
			},
			{
				name: "Pager",
				label: "分页控件",
				api: "cola.Pager.html",
				path: "/docs/pager"
			},
			{
				name: "Message Box",
				label: "消息框",
				path: "/docs/message-box"
			},
			{
				name: "Notify Tip",
				label: "提示信息组件",
				api: "cola.NotifyTip.html",
				path: "/docs/notify-tip"
			},

			{
				name: "Steps",
				label: "步骤控件",
				api: "cola.Steps.html",
				path: "/docs/steps"
			},
			{
				name: "TimeLine",
				label: "时间线控件",
				api: "cola.TimeLine.html",
				path: "/docs/time-line"
			},
			{
				name: "Breadcrumb",
				label: "面包屑",
				api: "cola.Breadcrumb.html",
				path: "/docs/breadcrumb"
			},
			{
				name: "Card",
				label: "卡片控件",
				api: "cola.Card.html",
				path: "/docs/card"
			}
			,
			{
				name: "Carousel",
				label: "走马灯",
				api: "cola.Carousel.html",
				path: "/docs/carousel"
			},
			{
				name: "Sidebar",
				label: "侧边栏",
				api: "cola.Sidebar.html",
				path: "/docs/sidebar"
			},
			{
				name: "Calendar",
				label: "日历控件",
				api: "cola.Calendar.html",
				path: "/docs/calendar"
			},
			{
				name: "Menu",
				label: "菜单",
				api: "cola.Menu.html",
				path: "/docs/menu"
			},
			{
				name: "RadioGroup",
				label: "单选按钮组",
				api: "cola.RadioGroup.html",
				path: "/docs/radioGroup"
			}
			,
			{
				name: "ListView",
				label: "列表控件",
				api: "cola.ListView.html",
				path: "/docs/listView"
			},
			{
				name: "TagEditor",
				label: "标签编辑器",
				path: "/docs/tag-editor"
			}
		]
	},
	{
		icon: "icon-component-custom",
		label: "控件自定义",
		path: "/docs/custom"
	},
	{
		icon: "icon-component-upload",
		label: "文件上传示例",
		path: "/docs/upload"
	},
	{
		icon: "icon-component-charts",
		label: "Echart图表整合",
		path: "/docs/charts"
	},

	{
		icon: "icon-component-font",
		label: "引入第三方图标库",
		path: "/docs/font"
	}
];