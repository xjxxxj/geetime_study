//画多线段的控制器

class PathCreator {
    constructor(close) {
        this.points = []
        this.close = close
        this.fromPos = this.toPos = {x:0, y:0}
        this.started = false
        let controller = this
        view.onkeydown = function (event) {
            controller.onkeydown(event)
        }
        view.onmousedown = function (event) {
            controller.onmousedown(event)
        }
        view.onmousemove = function (event) {
            controller.onmousemove(event)
        }
        view.ondblclick = function (event) {
            controller.ondblclick(event)
        }
    }

    stop() {
        view.onmousedown = null
        view.onmousemove = null
        view.ondblclick = null
        view.onkeydown = null
    }
    onmousedown(event) {
        this.toPos = view.getMousePos(event)
        if(this.started) {
            this.points.push(this.toPos)
        }else {
            this.fromPos = this.toPos
            this.started = true
        }
        invalidate()
    }

    onmousemove(event) {
        if(this.started) {
            this.toPos = view.getMousePos(event)
            invalidate()
        }
    }

    ondblclick(event) {
        if(this.started) {
            view.doc.addShape(this.buildShape())
            this.reset()
        }
    }

    onkeydown(event) {
        switch (event.keyCode) {
            case 13: //KeyEnter
                let n = this.points.length
                if(n == 0 || this.points[n-1] !== this.toPos) {
                    this.points.push(this.toPos)
                }
                this.ondblclick(event)
                break
            case 27: //KeyEsc
                this.reset()
        }
    }

    onpaint(ctx) {
        if(this.started) {
            let properties = view.properties;
            ctx.lineWidth = properties.lineWidth
            ctx.strokeStyle = properties.lineColor
            ctx.beginPath()
            ctx.moveTo(this.fromPos.x, this.fromPos.y)
            for(let i in this.points) {
                ctx.lineTo(this.points[i].x, this.points[i].y)
            }
            ctx.lineTo(this.toPos.x, this.toPos.y)
            if(this.close) {
                ctx.closePath()
            }
            ctx.stroke()
        }
    }

    reset() {
        this.points = []
        this.started = false
        invalidate()
    }
    buildShape() {
        let points = [{x:this.fromPos.x, y:this.fromPos.y}]
        for (let i in this.points) {
            points.push(this.points[i])
        }
        return new Path(points, this.close, view.lineStyle)
    }
}

view.registerController("PathCreator", function () {
    return new PathCreator(false)
})
