Model中可以声明一组Action。Action事实上是Javascript的Function。把动作封装成Action的主要目的是供表达式使用。例如SPAN可以绑定到一个Action以显示其执行的返回值；Button的onclick事件可以绑定到某个Action以便在点击时自动调用它。

### 普通Function
定义普通的Action的方式如下：
```javascript
model.action({
    showMessage: function() {
        ...
    },
    checkNickName: function() {
    }
});
```
也可以简单的通过下面的方式来定义，不过此种简单的定义方式只能用于普通Function型Action。
```javascript
model.action.showMessage = function() {
    ...
};
```

### 内置Action

Cola中包含一些系统级的Action供我们直接使用，我们称这些Action为内置Action。目前已支持的内置Action如下:

* **default(value，defaultValue)**
    如果value的值等价于逻辑false则返回defaultValue，否则返回value自身。null、false、0、""都会被认为是逻辑false。

* **int(value)**
    将传入的值转换整数，如果转换失败则返回0。

* **float(value)**
    将传入的值转换浮点数，如果转换失败则返回0。

* **is(value)**
    将传入的值转换成逻辑值。

* **bool(value)**
    同is()。

* **not(value)**
    用于对传入的值进行逻辑非运算。

* **isEmpty(value)**
    用于判断传入的值是否为空。此方法对于各种类型的value值有不完全相同的处理逻辑:
    * Array - 如果长度为0则认为是空。
    * cola.EntityList - 如果其entityCount属性为0则认为是空。
    * String - 如果长度为0则认为是空。
    * 其他情况下则当其值为null或undefined时才认为是空。

* **isNotEmpty(value)**
    与isEmpty(value)的结果相反。

* **len(value)**
    获得Array或EntityList的长度。

* **upperCase(str)**
    将字符串转换为大写。

* **lowerCase(str)**
    将字符串转换为小写。

* **resource(key, param1, param2, ...)**
    用于返回cola中定义的国际化资源，其具体用法可以直接参考cola.resource()方法的API文档。

* **formatNumber(num, format)**
    用于对数字进行格式化输出。例如： `formatNumber(1234.5678, '$#,##0.00')`将输出`$1,234.57`。

* **formatDate(date, format)**
    用于对日期进行格式化输出。例如： `formatDate(birthday, 'yyyy-MM-dd')`将输出`1991-09-01`这样的格式。
    
* **format(value, format)**
    可以自动根据value参数的数据类型（number或date）来决定如何对数值进行格式化的方法。其内部自动根据数据类型调用formatNumber()或formatDate()。

* **filter(list, criteria, caseSensitive, strict)**
    用于对集合型数据进行过滤。
    filter支持三个参数：
    * criteria 过滤条件，字符串或JSON对象。
    * caseSensitive 逻辑值，表示是否对大小写敏感。此参数可省略。
    * strict 逻辑值，表示是否按照严格模式进行字符串匹配，即是否启用全文匹配。此参数可省略。

    如果criteria是字符串，表示用该值匹配对象中的每一个属性（如果集合中的对象本身就是一个值而非对象，那么则直接匹配该值）。
    
    如果criteria是一个JSON对象或JSON对象的数组，那么上面的caseSensitive和strict将是失效，同时它的格式应该是这样的：
    ```json
    {
        name: { //属性名，如果属性名为"$"表示要匹配每一个属性
            value: "b", //要匹配的值
            caseSensitive: true //非必须
        },
        gendar: {
            value: "male",
            strict: true //非必须
        }
    }
    ```
                
    例如： `filter(employees, 'b')`表示过滤出所有名字或其它属性中带有字母b的员工。
    `filter(employees, 'Tom', false, true)`表示过滤出所有名字或其它属性值为Tom的员工，忽略字母的大小写。
    
* **sort(list, comparator, caseSensitive)**
    用于对集合型数据进行排序。
    sort支持两个参数：
    * comparator 排序条件，字符串或JSON数组。
    * caseSensitive 逻辑值，表示是否对大小写敏感。此参数可省略。
    
    如果comparator是字符串，表示是一个属性名，即按照此属性进行排序。如果第一个字符为'+'或'-'表示正向或逆向的排序。
    例如：
    `sort(employees, 'age')`表示按照age从小到大排序。
    `sort(employees, '-age')`表示按照age从大到小排序。
    如果集合中数据本身就是一个值而非对象，则可以省略上面的属性名，比如： `sort(names, '-')`表示逆向排序names中的值。
    
    如果comparator是JSON对象，那么它的格式应该是这样的：
    ```json
    [
        { prop:"age", desc:true }, //按照age逆向排序
        { prop:"gender" }
    ]
    ```
    
    另外comparator还接受两个特殊的值：
    * "$none" 表示不排序。
    * "$random" 表示随机排序。例如：`sort(employees, '$random')`

* **caption(path)**
    根据给定的path从DataType中找到相应的Property并返回其caption。
    
* **number2Word(num)**
    将传入的1、2、3、4...这样的数字转换成one、two、three、four...这样的英文单词，最大支持到16。

* **backgroundImage(url, defaultUrl)**
    将一个图片url转换成可用于定义DOM style中的backgroundImage的内容。
    backgroundImage支持三个参数：
    * url 图片url。
    * defaultUrl 默认图片。此参数为可选参数，当url为空时则自动选择此处的url作为图片url。
    如果url和defaultUrl均为空，那么此方法会返回none以避免浏览器发出错误的图片请求而报错。
    
    例如：`<div class="image" c-style="backgroundImage: backgroundImage(product.image,'/images/default.png')"></div>`
    
* **path(path, ...)**
    将一系列的路径或URL片段拼接成一段完整的路径或URL。
    
    例如：`<a c-href="path('//store/product', 'detail', product.id)">Show Detail</a>` 其输出的结果大致是这样的...
    `<a href="//store/product/detail/06430630">Show Detail</a>`

* **dictionary(dictionaryName)**
    根据字典名称返回一组字典键值对，其返回值的实际形式是一个JSON对象数组，其中的每一个JSON对象包含两个属性:
    * key   -   内部值/键值
    * value -   显示值

    可以把dictionary()的返回结果直接交给DropDown、RadioGroup等控件的items属性，Cola-UI最终会把他们解析中下拉框中的备选条目，或者自动生成多个单选框。

* **translate(dictionaryName, key)** 
    根据给定的字典名称和内部值/键值返回相应的显示值。  
        
### 链式表达式
考虑这里的一种表达式
`sort(filter(products, filterParam), sortParam)` 
我们需要对products进行过滤之后在再排序，这样的表达式有时并不利于阅读和理解。为此，Cola-UI特别了提供一种链式的写法，上面的表达式如果以链式表达的话可以变成如下的形式
`chain(products).filter(filterParam).sort(sortParam)`

链式表达式首先利用chain()对需要处理的数据进行包装。之后，我们就可以将其他的内置Action追加到链式表达式中，Cola-UI会自动将上一个方法的返回值所谓第一个的参数传入到下一个方法中，因此我们在链式表达式中只需要指定Action的第二个开始的参数就可以了。

看看更多的例子...
`isEmpty(products)` 可以改写为 `chain(products).isEmpty()`
`format(value, "#,##0.00")` 可以改写为 `chain(value).value("#,##0.00")`

> 根据以上的原则，并不是所有的内置Action都支持链式表达式。并且，在表达式本身并不复杂的时候，改写成链式的写法并不会带来什么特别好处。

### 自定义内置Action

如果要自定义内置Action，可以通过下面的方式：
```javascript
cola.defaultAction["percent"] = function(value) {
	return (value * 100) + "%";
}
```

上面的示例定义了一个名为percent的内置Action，用于输出数值的百分比形式。例如`percent(0.86)`将输出'86%'。

一个带有参数的内置Action：
```javascript
cola.defaultAction["multiply"] = function(value, num) {
	return value * num;
}
```

上面的例子中定义了一个名为multiply的内置Action，用于对数值进行乘法运算。例如`multiply(6,3)`将输出18。

