COSON是一种JSON格式，用于描述HTML。

众所周知当我们开发前端时，经常需要利用HTML来动态创建一些DOM元素。然而在前端以String的形式使用HTML是非常不方便的。尤其是当HTML的长度较大或者内部含有较多动态内容的时候。并且我们也很难在创建DOM元素的同时为其绑定事件。

COSON的目标便是让HTML在Javascript中变成更加结构化、更加灵活、更加容易控制。

使用COSON的最主要的两个方法是cola.xCreate()和cola.xRender()。

## cola.xCreate()

xCreate方法的目的是通过COSON来定义HTML，以方便开发者在Javascript中创建DOM。

下面的示例都将以xCreate()为例来说明，具体请参考各个方法的API文档：[xCreate](api/$.html#method:xCreate)

### 简单JSON
tagName表示DOM的节点名，content表示DOM节点的内容
```javascript
var fragment = cola.xCreate({
	tagName: "div",
	content: "Hello World!"
});
$(document.body).append(fragment);
```
其输出为...
```html
<div>Hello World!</div>
```

### 创建多个对象
如果要创建的某个DOM的tagName是DIV，那么相应的JSON对象的tagName是可以省略的。
```javascript
$.xCreate([
	{
		content: "Hello World!"
	},
	{
		tagName: "input",
		value: "This is an input"
	}
]);
```	
其输出为...
```html
<div>Hello World!</div>
<input value="This is an input">
```

### 定义Style
Style既可以通过字符串定义，也可以通过子JSON来定义。
```javascript
$.xCreate([
	{
		content: "Style by String",
		style: "color:red; font-weight:bold"
	},
	{
		content: "Style by JSON",
		style: {
			color: "blue",
			fontStyle: "italic"
		}
	}
]);
```
其输出为...
```html
<div style="color:red; font-weight:bold">Style by String</div>
<div style="color:blue; font-style:italic">Style by JSON</div>
```

### 子对象
当content的值是子JSON对象或数组，就表示要定义DOM的子节点而不是文本内容。
```javascript
$.xCreate([
	{
		content: {
			tagName: "input",
			type: "text"
		}
	},
	{
		content: [
			"Some text ",
			{
				tagName: "input",
				type: "checkbox"
			},
			{
				tagName: "input",
				type: "checkbox"
			}
		]
	}
]);
```
其输出为...
```html
<input type="text">
<div>Some text <input type="checkbox"><input type="checkbox"></div>
```

### 空节点的简写
有时我们只需要创建一个空的节点，那么只要利用“^”开头的字符串指定好节点名就可以了。
```javascript
	$.xCreate([ "^input", "^hr", "^div" ]);
```
其输出为...
```html
<input><hr><div><div>
```

### 创建Table
```javascript
$.xCreate({
	tagName: "table",
	style: {
		width: 200
	},
	content: [
		{
			tagName: "tr",
			style: "height: 30px",
			content: ["^td", "^td"]
		},
		{
			tagName: "tr",
			style: "height: 30px",
			content: ["^td", "^td"]
		}
	]
});
```
其输出为...
```html
<table style="width:200px">
    <tbody>
        <tr style="height:30px">
            <td></td>
            <td></td>
        </tr>
        <tr style="height:30px">
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
```

### 绑定事件
如果某个属性的值是一个Function则表示我们要绑定一个事件。
```javascript
$.xCreate({
	tagName: "button",
	content: "Click Me",
	click: function() {
		alert("Hello World!");
	}
});
```
其输出为（事件绑定在HTML中无法表现）...
```html
<button>Click Me</button>
```

### jQuery扩展
为了方便搭配jQuery使用，Cola-UI利用cola.xCreate()扩展了jQuery并提供了如下接新的方法:
	* $().xAppend()	-	jQuery扩展，根据JSON创建DOM元素并添加到当前jQuery包装的DOM中。
	* $().xInsertBefore()	-	jQuery扩展，根据JSON创建DOM元素并添加到当前jQuery包装的DOM之前。
	* $().xInsertAfter()	-	jQuery扩展，根据JSON创建DOM元素并添加到当前jQuery包装的DOM之后。

## cola.xRender
cola.xRender()主要用于动态的对页面进行局部渲染。其支持很多种传入参数。

有些时候cola.xRender()的功能看起来很像cola.xCreate()，但其实cola.xCreate()只是cola.xRender()的基础。

cola.xCreate()只负责创建DOM元素，并不对这些元素进行解析，而cola.xRender()可以在创建DOM的同时解析其中的所有DOM指令，基本可以满足所有在运行时动态创建DOM元素和控件的需求。

### 利用最基本的COSON来创建DOM元素
以下的代码将会创建一个button，它看起来与cola.xCreate并没有什么差别。
```javascript
cola(function (model) {
	model.action({
		run: function() {
			var fragment = cola.xRender({
            	tagName: "button"
            	content: "测试按钮"
        }, model);
			$(document.body).append(fragment);
		}
	});
});
```

### 建立绑定
创建DOM元素并建立双向数据绑定，这是cola.xCreate()无法完成的。
```javascript
cola.xRender([
	{
		tagName: "input",
		placeholder: "请尝试输入一些文字",
		"c-bind": "text"
	},
	{
		tagName: "input",
		"c-bind": "text"
	}
], model);
```

### 使用迭代
```javascript
cola.xRender({
	content: {
		tagName: "button",
		"c-repeat": "num in [1,2,3,4,5]",
		"c-bind": "num"
	}
}, model);
```
其输出为...
```html
<button>1</button>
<button>2</button>
<button>3</button>
<button>4</button>
<button>5</button>
```

### 渲染HTML字符串
```javascript
cola.xRender("<button>Test Button</button>", model);
```

### 直接渲染现有的DOM对象
```javascript
var domDiv = document.getElementById("domDiv");
domDiv.innerHTML = "<input c-bind='text' placeholder='请尝试输入一些文字'><br><label c-bind='text'>";
cola.xRender(domDiv, model);
```

