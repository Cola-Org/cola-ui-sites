随着技术的发展，前端的开发技术正在变得日趋复杂。目前业界比较的流行的前端框架有jQuery、jQueryUI、Bootstrap、AngularJS、React、VUE等。
然而上述每一个的框架都只能帮我们解决前端开发过程中遇到的一小部分问题。
实际的使用过程中开发者通常都要选取其中的几个进行整合，这种整合的工作往往技术要求较高，且整合的结果通常也不能很好的发挥每个框架各自的优点，难以形成一套高效的、便于推广的开发模式。

Cola-UI的目标就提供一套 **一站式的前端开发解决方案** ，满足前端开发过程中所需的绝大多数需求。

* Cola-UI整合了jQuery 2.x和Semantic UI 2.x，为Semantic UI提供了更加易于使用的控件化封装，同时还提供了更多SemanticUI中不具备的高级控件如List、Table、Tree等。
* Cola-UI提供了自行实现的MVVM跨框架，并基于此框架实现了任意DOM元素或控件与模型间的双向数据绑定。
* Cola-UI的设计遵循了Mobile First的策略，非常适用于移动设备，同时也能很好的满足PC浏览器的操作要求。

从功能角度，Cola-UI可划分为两大部分MVVM框架和控件集。

![Structure](/resources/images/docs/structure.png)

### MVVM框架
MVVM框架部分的功能比较类似于AngularJS，提供了数据模型、DOM指令、以及模型和DOM之间的双向数据绑定等功能。
相比较于AngularJS这类MVVM框架，Cola-UI简化了其中一些过于繁琐的设计，让开发者能够更快的理解和上手。
同时，Cola-UI又强化了数据模型中元数据的功能，使得数据模型能够自行管理懒装载、分页、编辑状态、校验状态等，以便于适应一些复杂的应用场景。

### 视图
* Semantic控件的数据绑定支持
* 更多常用布局
* 更多常用的高级控件


## Hello World
下面的例子是一个最简单的Cola-UI示例，它演示了Cola-UI的MVVM架构中的双向数据绑定功能。

Cola-UI依赖jQuery和Semantic-UI，因此我们需要在html中引入jQuery和Semantic-UI。
除此之外，Cola-UI还会使用少量的其他第三方js库，他们被打包成了一个3rd.js。


```html
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="/resources/cola-ui/semantic.css">
	<link rel="stylesheet" type="text/css" href="/resources/cola-ui/cola.css">
	<script src="/resources/jquery-2.1.3.js"></script>
	<script src="/resources/cola-ui/3rd.js"></script>
	<script src="/resources/cola-ui/semantic.js"></script>
	<script src="/resources/cola-ui/cola.js"></script>

	<script type="text/javascript">
		cola(function (model) {
			model.set("text", "Hello World!");
		});
	</script>
</head>
<body>
	<input c-bind="text">
	<div c-bind="text"></div>
</body>
</html>
```

<script async src="//jsrun.net/TrkKp/embed/all/light/"></script>

运行该示例，并尝试修改Input中的内容，你会发现Input中的改变会立刻更新到Hello后面。这就是双向数据绑定提供的功能。
其实上面的页面中真正有效的代码只有3行，其它部分都是固定的内容。

`cola(function(model){ })` 是一个默认的初始化方法，其中的代码会在页面的DOM树装载完成之后自动执行，其触发时机与jQuery.ready相同。
在初始化时会自动传入一个已经创建好的Model对象。我们可以在这个方法中对这个Model对象进行初始化。

`model.set("name","World")` 向Model中写入了一个数据项，该数据项的名称是name，值是World。Model可以拥有1到多个数据。
每个数据项中的数据并不限于简单的String类型，它可以接受各种复杂的数据类型，包括Array和JSON。参考 [Model(视图模型)](model)。

`<span c-bind="name"></span>` 定义了一个Span，这里我们利用c-bind指令声明了该Input绑定到name这个数据项。
关于DOM指令的更多说明请参考 [DOM指令](dom-directives)。

`<input c-bind="name">` 定义了一个Input，它同样绑定到了name这个数据项。
由于我们在之前已经通过Javascript向Model的name中写入了World，因此Input中默认将显示World。
同时，由于Input是一种可以编辑的DOM元素，所以当我们在Input中录入内容时新的内容会自动被写回Model中，这表示我们可以利用Input来改变Model中的数据。
另外，由于Model是支持双向数据绑定的，因此当我们编辑Input中的内容时，这个Span总是可以同步的显示出最新的内容变化。

这里的运行机制其实是这样的，当我们编辑了Input中的内容时，Cola会自动将该值写回到其绑定的Model数据项中。
这样Model中的name数据项就被改变了，而Model一旦发现自己的某个数据被改变就会立刻将这一消息通知给所有与这个数据项相关的DOM对象，这其中就包含了那个同样绑定到name的span。
span接受到数据源改变的消息后会立即重新从Model重读取最新的值并刷新自己的显示。

## 简单的Action
Cola-UI中的Model除了能够提供管理数据之外也可以管理动作，本例演示如何在Cola-UI执行一段逻辑代码。

<script async src="//jsrun.net/UrkKp/embed/all/light/"></script>

本例展示一个个最简单的事件绑定和Action调用。
onclick是HTML规范中原本就支持的一种DOM事件，只要在前面添加"c-"就可以让它变成一个Cola的DOM指令了，由Cola来建立onclick的事件绑定。
本例中c-onclick的内容是一段表达式，用于调用一个名为showMessage的Action。showMessage时通过Javascript中的model.action()方法定义的。
Action是Cola中专门用于封装业务逻辑的方法，其详细说明请参考 [Action(动作)](action)。

本例中的showMessage()方法非常简单，仅仅是提示一段文字。当我们点击"Show Message"按钮时就可以看到这段提示了。

> 需要特别注意的是在Cola的表达式中，我们只能调用Cola的Action，不能调用其他的任何Javascript方法。
> 例如跳过Action直接这样写`c-onclick="alert('Hello World!')"`是无法正确执行的。


## 使用控件
最简单的使用Cola-UI中控件的方式是利用DOM指令。
例如用定义Cola-UI中的Button控件，只需要直接在HTML中嵌入一个名为c-button的节点，此处大小写并不敏感。

<script async src="//jsrun.net/9rkKp/embed/all/light/"></script>

在上例中我们定义了两个控件，c-input和c-button。
可以注意到在c-input和c-button我们通常可以使用"c-"开通的DOM指令，利用这种方式在控件与数据模型之间建立双向的数据绑定。


