cola(function (model) {
	var option  = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:['最高气温','最低气温']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {readOnly: false},
				magicType: {type: ['line', 'bar']},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis:  {
			type: 'category',
			boundaryGap: false,
			data: ['周一','周二','周三','周四','周五','周六','周日']
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [
			{
				name:'本周气温',
				type:'line',
				data:[11, 11, 15, 13, 12, 13, 10],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				},
				markLine: {
					data: [
						{type: 'average', name: '平均值'}
					]
				}
			},
			{
				name:'上周气温',
				type:'line',
				data:[4, 8, 20, 18, 6, 13, 10]
			}
		]
	};

	var chart = echarts.init(document.getElementById("lineContainer"));

	chart.setOption(option);
})