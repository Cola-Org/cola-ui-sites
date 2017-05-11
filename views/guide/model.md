在Cola-UI的Model对象管理三件事：数据、绑定、Action。

* 数据通常利用Model的get和set方法来读取和写入。
* 数据绑定通常都是通过DOM指令或控件的绑定表达式来建立。
* Action通常利用Model的action方法来声明和访问。

## Model中的数据
Model本身的结构有点像一个Map，数据存储在各个命名的数据项中。每个数据项的值既可以是string、boolean这样的简单值，也可以是复杂的数据实体和集合。

例如，下面的代码向Model中读写了一个名为name的数据项。

```javascript
// 设置name数据项的值为"Bob"
model.set("name", "Bob");

// 从Model中读取一个名为name的数据项。
var name = model.get("name");
```

Model的set()/get()的行为特征与cola.Entity的set()/get()几乎是完全一致的，事实上Model的set()/get()在内部正是通过cola.Entity的set()/get()实现的，因此要更详细的了解这两个方法可以直接参考cola.Entity的set()/get()的说明。

## 动作
Model除了管理数据之外还可以管理动作。利用Model的action()方法可以为Model定义一到多个Action。具体请参考[Action](action)

## 绑定关系
Model会自动管理由DOM指令或其它方式声明的绑定关系，监听Model中数据的变化，将这些消息按需广播给相应的DOM或数据绑定控件。

建立绑定的方式有如下几种：
### DOM指令
如下几种情况都会为DOM节点或DOM节点的属性建立数据绑定关系。
```html
<div c-bind="name"></div>
<div c-style="color:fontColor"></div>
```

### 数据绑定控件
Cola-UI中的文本录入框(c-input)、复选框(c-checkbox)、表格(c-table)、表单(c-form)等支持数据绑定的控件本身就支持bind属性，可以直接利用该属性生命数据绑定关系。例如：
```javascript
new cola.Input({
    bind: "name"
});
```

当我们利用DOM指令来生命一个控件时，也可以直接通过bind属性来声明数据绑定。例如：
```html
<c-input bind="name"></c-input>
```

考虑开发人员可以已经用惯了普通DOM节点中的c-bind指令，为了避免让开发人员在定义数据绑定控件是为了究竟应该使用bind还是c-bind为纠结。Cola-UI允许开发人员在这种情况下以c-bind来替代bind。因此，下面例子的作用跟上面使用bind属性的完全一样。
```html
<c-input c-bind="name"></c-input>
```

### 属性值的内嵌表达式
如果我们需要用Javascript来声明一个控件的话就无法使用上面的两个方法了声明数据绑定了。这时我们可以使用内嵌的表达式。例如：
```javascript
new cola.Button({
    caption: "{{name}}"
});
```
上面的例子将Button的caption属性与name数据项建立的绑定。绑定关系也可以这样来定义...
```javascript
new cola.Label({
    text: "姓名: {{name}}"
});
```

## 子Model
Model对于一个页面而言往往并不是一个唯一的实例，很多情况下Cola-UI都会根据需要创建出主Model的子Model实例，子Model实例可视作是主Model的代理对象。通过子Model我们仍然可以访问主Model中的数据和Action。
最常见的接触到子Model的机会是使用c-repeat指令时和使用Cola的[Router](router)功能时。

以下面的示例为例：
```html
<script type="text/javascript">
    cola(function(model) {
        model.set("addresses", [
            { city: "ShangHai" },
            { city: "BeiJing" },
            { city: "ShenZhen" }
        ]);
</script>
<body>
    <ul>
        <li d-repeat="address in addresses">
            <span d-bind="address.city"></span>
        </li>
    </ul>
</body>
```
在li的每一次迭代过程中，Cola-都会为当前迭代的DOM创建一个新的子Model，这个子Model既可以访问主Model中的所有数据，同时它自己也保存了一项名为address的数据，其值为当前的迭代值。而li中的span元素正是绑定了这个子Model中address，因此才能正确的显示当前的迭代值。

多数情况下，开发者可能并不会感觉到这些子Model的存在，因为完全可以像使用主Model一样使用这些子Model，反正主Model中有的数据和Action，通过子Model一样能拿到。但是我认为开发者仍然需要知道在Cola-的处理过程中大致发生了些什么，以免在某些时刻犯下令人感到莫名其妙的错误。

