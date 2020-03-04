//free path的controller
class FreePathCreator {
    constructor() {
        this.points = []//点数组
        this.fromPos = {x:0, y:0}//起始点
        this.started = false//是否开始绘制
        this.close =false//默认开启使用
        let controller = this
        //获取当前view事件的处理权限
        view.onmousedown = function (event) {
            controller.onmousedown(event)
        }
        view.onmousemove = function (event) {
            controller.onmousemove(event)
        }
        view.onmouseup = function (event) {
            controller.onmouseup(event)
        }
        view.onkeydown = function (event) {
            controller.onkeydown(event)
        }
    }

    stop() {
        view.onmousedown = null
        view.onmousemove = null
        view.onmouseup = null
        view.onkeydown = null
    }

    onmousedown(event) {//单击鼠标，开始绘制
        this.fromPos = view.getMousePos(event)
        this.started = true
    }

    onmousemove(event) {//移动鼠标，划线
        if(this.started) {
            this.points.push(view.getMousePos(event))
            invalidate()
        }
    }

    onmouseup(event) {//松开鼠标
        if(this.started) {
            view.doc.addShape(this.buildShape())
            this.reset()
        }
    }

    onkeydown(event) {
        if(event.keyCode == 27) {
            this.reset()
        }
    }

    buildShape() {
        let poins = [{x:this.fromPos.x,y:this.fromPos.y}]
        for(let i in this.points) {
            poins.push(this.points[i])
        }
        return new Path(poins, this.close, view.lineStyle)
    }
    onpaint(cxt) {
        if(this.started) {
            let properties = view.properties;
            cxt.lineWidth = properties.lineWidth
            cxt.strokeStyle = properties.lineColor
            cxt.beginPath()
            cxt.moveTo(this.fromPos.x, this.fromPos.y)
            for(let i in this.points) {
                cxt.lineTo(this.points[i].x, this.points[i].y)
            }
            cxt.stroke()
        }
    }

    reset() {//重置划线控制器
        this.points = []
        this.started = false
        invalidate()
    }
}

view.registerController("FreePathCreator", function () {
    return new FreePathCreator()
})
