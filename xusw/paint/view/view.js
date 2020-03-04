//抽象画图的view,是一个viewModel
class PaintView {
    constructor() {//定义和初始化页面的属性
        //lineStyle的配置
        this.properties = {
            lineWidth: 1,
            lineColor: "black"
        }
        //控制器列表
        this.controllers = {}
        this._currentKey = ""
        //当前使用的controller
        this._current = null
        //当前生效的控制器
        //单击鼠标事件的处理方法
        this.onmousedown = null
        //鼠标移动事件的处理方法
        this.onmousemove = null
        //鼠标松开事件
        this.onmouseup = null
        //鼠标双击事件的处理方法
        this.ondblclick = null
        //键盘按键事件的处理方法
        this.onkeydown = null

        //获取画图的canvas对象
        let drawing = document.getElementById("drawing")
        let view = this

        drawing.onmousedown = function (event) {
            event.preventDefault()//取消默认事件,使用view对象定义的处理方法
            if(view.onmousedown != null) {
                view.onmousedown(event)
            }
        }
        drawing.onmousemove = function(event) {
            if (view.onmousemove != null) {
                view.onmousemove(event)
            }
        }
        drawing.onmouseup = function(event) {
            if (view.onmouseup != null) {
                view.onmouseup(event)
            }
        }
        drawing.ondblclick = function(event) {
            event.preventDefault()
            if (view.ondblclick != null) {
                view.ondblclick(event)
            }
        }
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case 9: case 13: case 27:
                    event.preventDefault()
            }
            if (view.onkeydown != null) {
                view.onkeydown(event)
            }
        }
        this.drawing = drawing
        this.doc = new PaintDoc()
    }


    get currentKey() {
        return this._currentKey;
    }

    get lineStyle() {
        let props = this.properties
        return new LineStyle(props.lineWidth, props.lineColor)
    }
    _setCurrent(name, controller) {
        this._current = controller
        this._currentKey = name
    }
    onpaint(cxt) {
        //画菜单栏
        this.doc.onpanint(cxt)
        if(this._current != null) {
            this._current.onpaint(cxt)
        }
    }
    //获取鼠标坐标
    getMousePos(event) {
        return {
            x: event.offsetX,
            y: event.offsetY
        }
    }
    //重置画板
    invalidateRect() {
        let cxt = this.drawing.getContext("2d")
        let bound = this.drawing.getBoundingClientRect()
        cxt.clearRect(0,0, bound.width, bound.height)
        this.onpaint(cxt)
    }

    registerController(name, controller) {
        if(name in this.controllers) {
            alert("Controller exists:" + name)
        }else {
            this.controllers[name] = controller
        }
    }

    invokeController(name) {
        this.stopController()
        if(name in this.controllers) {
            let controller = this.controllers[name]
            this._setCurrent(name, controller())
        }
    }
    stopController() {
        if(this._current != null) {
            this._current.stop()
            this._setCurrent("", null)
        }
    }
}

var view = new PaintView()

function invalidate() {
    view.invalidateRect()
}
