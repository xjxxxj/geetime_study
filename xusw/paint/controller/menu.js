//安装控制器，即在菜单栏的工具与控制器绑定
function installControllers() {
    //初始化菜单工具
    document.getElementById("menu").innerHTML = `
    <input type="button" id="PathCreator" value="Create Path" style="visibility:hidden">
    <input type="button" id="FreePathCreator" value="Create FreePath" style="visibility:hidden">
    <input type="button" id="LineCreator" value="Create Line" style="visibility:hidden">
    <input type="button" id="RectCreator" value="Create Rect" style="visibility:hidden">
    <input type="button" id="EllipseCreator" value="Create Ellipse" style="visibility:hidden">
    <input type="button" id="CircleCreator" value="Create Circle" style="visibility:hidden">`

    for(let key in view.controllers) {// 遍历绑定控制器
        let controllerKey = key
        let elem = document.getElementById(key)
        elem.style.visibility = "visible"//显示出来
        elem.onclick = function () {//点击选择与工具匹配的控制器
            if(view.currentKey != "") {//移除之前的控制器
                document.getElementById(view.currentKey).removeAttribute("style")
            }
            elem.style.borderColor = "blue"//显示蓝色
            elem.blur()//模糊
            view.invokeController(controllerKey)//控制器生效
        }
    }
}

function installControllersV2() {
    //初始化菜单工具
    document.getElementById("menu").innerHTML = `
    <input type="button" id="PathCreator" value="Create Path" style="visibility:hidden">
    <input type="button" id="FreePathCreator" value="Create FreePath" style="visibility:hidden">
    <input type="button" id="LineCreator" value="Create Line" style="visibility:hidden">
    <input type="button" id="RectCreator" value="Create Rect" style="visibility:hidden">
    <input type="button" id="EllipseCreator" value="Create Ellipse" style="visibility:hidden">
    <input type="button" id="CircleCreator" value="Create Circle" style="visibility:hidden">
    <input type="button" id="ShapeSelector" value="Select Shape" style="visibility: hidden">`

    for(let key in view.controllers) {// 遍历绑定控制器
        if(key == "ShapeSelector") {//图形选择器，隐藏着的
            continue
        }
        let controllerKey = key
        let elem = document.getElementById(key)
        elem.style.visibility = "visible"//显示出来
        elem.onclick = function () {//点击选择与工具匹配的控制器
            if(view.currentKey != "ShapeSelector") {//移除之前的控制器
                document.getElementById(view.currentKey).removeAttribute("style")
            }
            elem.style.borderColor = "blue"//显示蓝色
            elem.blur()//模糊
            view.invokeController(controllerKey)//控制器生效
        }
    }
    //启用图形选择器
    view.invokeController("ShapeSelector")
    view.onControllerReset = function () {
        document.getElementById(view.currentKey).removeAttribute("style")
        view.invokeController("ShapeSelector")
    }
}

function selection_setProp(key, val) {
    if(view.selection != null) {
        view.selection.setProp(key, val)
        invalidate(null)
    }
}

function onPropChanged(key) {
    let elem = document.getElementById(key)
    let val = elem.value
    elem.blur()
    view.style[key] = val
    selection_setProp(key, val)
}

function onIntPropChanged(key) {
    let elem = document.getElementById(key)
    elem.blur()
    let val = parseInt(elem.value)
    if (val > 0) {
        view.style[key] = val
        selection_setProp(key, val)
    }
}

function onSelectionChanged(old) {
    let selection = view.selection
    if(selection != null) {
        let style = selection.style
        view.style = style.clone()
        document.getElementById("lineWidth").value = style.lineWidth
        document.getElementById("lineColor").value = style.lineColor
        document.getElementById("fillColor").value = style.fillColor
    }
}

//改变线条的宽度
function onLineWidthChanged() {
    let elem = document.getElementById("LineWidth")
    elem.blur()
    let width = parseInt(elem.value)
    if(width > 0) {
        view.properties.lineWidth = width
    }
}

//改变线条的颜色
function onLineColorChanged() {
    let elem = document.getElementById("LineColor")
    elem.blur()
    view.properties.lineColor = elem.value
}

//安装线条宽度和颜色的选择器
function installPropSelectors() {
    document.getElementById("menu").insertAdjacentHTML("afterend", `<br><div id="properties">
    <label for="LineWidth">LineWidth: </label>
    <select id="LineWidth" onchange="onLineWidthChanged()">
    <option value="1">1</option>
    <option value="3">3</option>
    <option value="5">5</option>
    <option value="7">7</option>
    <option value="9">9</option>
    <option value="11">11</option>
</select>
<label for="LineColor">LineColor: </label>
<select id="LineColor" onchange="onLineColorChanged()">
    <option value="black">black</option>
    <option value="red">red</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
</select>

<label for="fillColor">FillColor: </label>
<select id="fillColor" onchange="onPropChanged('fillColor')">
    <option value="white">white</option>
    <option value="null">transparent</option>
    <option value="black">black</option>
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
</select>
</div>`)
}

//安装显示鼠标位置
function installMousePos() {
    document.getElementById("properties").insertAdjacentHTML("beforeend", `&nbsp;<span id="mousepos"></span>`)

    let old = view.drawing.onmousemove;
    let mousepos = document.getElementById("mousepos");
    view.drawing.onmousemove = function (event) {//装饰，提升坐标
        let pos = view.getMousePos(event);
        mousepos.innerText = "MousePos: " + pos.x + "," + pos.y
        old(event)
    }
}

installControllersV2()
installPropSelectors()
installMousePos()
