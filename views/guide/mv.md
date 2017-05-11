为了减少前端开发的工作量，降低学习难度，Cola-UI采用了精简的MVVM架构，我们称之为MV架构。

![MVVM](/resources/images/docs/mvvm.png)

从上图中我们看到Cola-UI中的Model相当于MVVM概念中的ViewModel和Model的合体。在绝大部分场景中我们并没有必要区分这两种对象，因此我们没必要接触过多的概念徒劳的增加复杂度。其实Cola-UI并没有真正的合并ViewModel和Model，如果有需要您完全可以从Model中分离出一个叫DataModel的对象实现完整的MVVM，具体的做法此文暂不做论述。

Cola-UI中的Model对象管理三件事：数据、绑定、Action。

* 数据通常利用Model的get和set方法来读取和写入。
* 数据绑定通常都是通过DOM指令或控件的绑定表达式来建立。
* Action通常利用Model的action方法来声明和访问。

## 双向数据绑定

<script async src="//jsrun.net/RrkKp/embed/all/light/"></script>

上面是一个比较经典的双向绑定的示例，其中的Label和Input都与Model建立了关联，点击按钮可以设置数据模型中的数据项。我们以一张图片来分析其中的绑定关系。

![Binding](/resources/images/docs/binding.png)

Label与Model之间事实上是一种动态的单向绑定，而Input与Model之间则是动态的双向绑定关系，因为我们可以利用Input来改变数据。当用户在Input中进行输入时，Input会将用户输入的内容更新到Model中。Model检测到其中的数据项变化之后，将这一消息广播给同样绑定到这一数据项的Label，因此Label就能自动显示出最新的数据变化。

当用户点击按钮时，按钮的事件会调用到我们定义在Model中的Action，Action的代码会修改Model中的数据项。同样的，Model检测到其中的数据项变化之后，将这一消息广播给同样绑定到这一数据项的Label和Input，因此Label和Input就能自动显示出最新的数据变化。

