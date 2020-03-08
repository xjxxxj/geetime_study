//圆形/椭圆/长方形/直线的控制器
class RectCreator {
    constructor(shapeType) {
        this.shapTyle = shapeType
        this.rect = {
            p1: {x:0, y:0},
            p2: {x:0, y:0}
        }
        this.started = false
        let controller = this
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

    onmousedown(event) {
        this.rect.p1 = view.getMousePos(event)
        this.started = true
    }
    onmousemove(event) {
        if(this.started) {
            this.rect.p2 = view.getMousePos(event)
            invalidate(this.rect)
        }
    }
    onmouseup(event) {
        if(this.started) {
            this.rect.p2 = view.getMousePos(event)
            view.doc.addShape(this.buildShape())
            this.reset()
        }
    }
    onkeydown(event) {
        if (event.keyCode == 27) { // keyEsc
            this.reset()
        }
    }

    onpaint(ctx) {
        if(this.started) {
            this.buildShape().onpaint(ctx)
        }
    }

    reset() {
        this.started = false
        invalidate(this.rect)
        view.fireControllerReset()
    }

    stop() {
        view.onmousedown = null
        view.onmousemove = null
        view.onmouseup = null
        view.onkeydown = null
    }

    buildShape() {
        let rect = this.rect;
        let r = normalizeRect(rect);
        switch (this.shapTyle) {
            case "line":
                return new Line(rect.p1, rect.p2, view.style.clone())
            case "rect":
                return new Rect(r, view.style.clone())
            case "ellipse":
                let rx = r.width / 2
                let ry = r.height / 2
                return new Ellipse(r.x + rx, r.y + ry, rx, ry, view.style.clone())
            case "circle":
                let rc = Math.sqrt(r.width*r.width + r.height * r.height)
                return new Ellipse(rect.p1.x, rect.p1.y, rc, rc, view.style.clone())
            default:
                alert("unknown shapeType:" + this.shapTyle)
                return null
        }
    }

}

view.registerController("LineCreator", function () {
    return new RectCreator("line")
})
view.registerController("RectCreator", function () {
    return new RectCreator("rect")
})
view.registerController("EllipseCreator", function () {
    return new RectCreator("ellipse")
})
view.registerController("CircleCreator", function (event) {
    return new RectCreator("circle")
})
