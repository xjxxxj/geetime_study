//画笔样式
class LineStyle {
    constructor(width, color){
        this.width = width
        this.color = color
    }
}

//线段
class Line {
    constructor(point1, point2, lineStyle) {
        this.p1 = point1
        this.p2 = point2
        this.lineStyle = lineStyle
    }

    onpaint(cxt) {
        let lineStyle = this.lineStyle
        cxt.lineWidth = lineStyle.width
        cxt.strokeStyle = lineStyle.color
        cxt.beginPath()
        cxt.moveTo(this.p1.x, this.p1.y)
        cxt.lineTo(this.p2.x, this.p2.y)
        cxt.stroke()
    }
}

//长方形
class Rect {

    constructor(r, lineStyle) {
        this.x = r.x
        this.y = r.y
        this.width = r.width
        this.height = r.height
        this.lineStyle = lineStyle
    }

    onpaint(cxt) {
        let lineStyle = this.lineStyle
        cxt.lineWidth = lineStyle.width
        cxt.strokeStyle = lineStyle.color
        cxt.beginPath()
        cxt.rect(this.x, this.y, this.width, this.height)
        cxt.stroke()
    }

}

//椭圆
class Ellipse {

    constructor(x, y, radiusX, radiusY, lineStyle) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.lineStyle = lineStyle;
    }
    onpaint(cxt) {
        let lineStyle = this.lineStyle
        cxt.lineWidth = lineStyle.width
        cxt.strokeStyle = lineStyle.color
        cxt.beginPath()
        cxt.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
        cxt.stroke()
    }
}



//shape接口的一个具体实现(涂鸦功能的model)
//lineStyle为画笔的样子，有with,color两个属性
class Path {
    //points:[{x:x1,y:y1},{x:x2,y:y2},...,{x:xn,y:yn}]
    constructor(points, close, lineStyle) {
        this.points = points
        this.close = close
        this.lineStyle = lineStyle
    }

    onpaint(ctx) {
        let n = this.points.length
        if(n < 1) {
            return
        }
        let points = this.points
        let lineStyle = this.lineStyle
        ctx.lineWidth = lineStyle.width
        ctx.strokeStyle = lineStyle.color
        ctx.beginPath()
        ctx.moveTo(points[0].x,points[0].y)
        for(let i = 1; i < n; i++) {
            ctx.lineTo(points[i].x,points[i].y)
        }
        if(this.close) {
            ctx.closePath()
        }
        ctx.stroke()
    }

}

//抽象整个paint用到的数据模型,给view层提供支持
class PaintDoc {
    constructor() {
        this.shapes = []
    }

    addShape(shape) {
        if(shape != null) {
            this.shapes.push(shape)
        }
    }

    //cxt是shape的onpaint作用对象,及一个canvas
    onpanint(cxt) {
        let shapes = this.shapes
        for(let i in shapes) {
            shapes[i].onpaint(cxt)
        }
    }
}
