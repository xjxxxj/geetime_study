/*class LineStyle {
    constructor(width, color){
        this.width = width
        this.color = color
    }
}*/
//画笔样式
class ShapeStyle {
    constructor(lineWidth, lineColor, fillColor) {
        this.lineWidth = lineWidth
        this.lineColor = lineColor
        this.fillColor = fillColor
    }

    setProp(key, val) {
        this[key] = val
    }

    clone() {
        return new ShapeStyle(this.lineWidth, this.lineColor, this.fillColor)
    }

}

//线段
class Line {
    constructor(point1, point2, style) {
        this.p1 = point1
        this.p2 = point2
        this.style = style
    }
    bound() {
        return normalizeRect(this)
    }
    hitTest(pt) {
        if(hitLine(pt, this.p1, this.p2, this.style.lineWidth)) {
            return {hitCode: 1, hitShape: this}
        }
        return {hitCode: 0, hitShape: null}
    }

    move(dx, dy){
        this.p1.x += dx
        this.p2.x += dx
        this.p1.y += dy
        this.p2.y += dy
    }

    setProp(key, val) {
        this.style.setProp(key, val)
    }

    onpaint(cxt) {
        let style = this.style
        cxt.lineWidth = style.lineWidth
        cxt.strokeStyle = style.lineColor
        cxt.beginPath()
        cxt.moveTo(this.p1.x, this.p1.y)
        cxt.lineTo(this.p2.x, this.p2.y)
        cxt.stroke()
    }
}

//长方形
class Rect {

    constructor(r, style) {
        this.x = r.x
        this.y = r.y
        this.width = r.width
        this.height = r.height
        this.style = style
    }

    bound() {
        return {x: this.x, y: this.y, width: this.width, height: this.height}
    }

    hitTest(pt) {
        if(hitRect(pt, this)) {
            return {hitCode: 1, hitShape: this}
        }
        return {hitCode: 0, hitShape: null}
    }

    move(dx, dy) {
        this.x += dx
        this.y += dy
    }

    setProp(key, val) {
        this.style.setProp(key, val)
    }

    onpaint(cxt) {
        let style = this.style
        cxt.lineWidth = style.lineWidth
        cxt.strokeStyle = style.lineColor
        cxt.beginPath()
        cxt.rect(this.x, this.y, this.width, this.height)
        fill(cxt, style.fillColor)
        cxt.stroke()
    }

}

//椭圆
class Ellipse {

    constructor(x, y, radiusX, radiusY, style) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.style = style;
    }

    bound() {
        return {
            x: this.x - this.radiusX,
            y: this.y - this.radiusY,
            width: this.radiusX * 2,
            height: this.radiusY * 2
        }
    }

    hitTest(pt) {
        let dx = pt.x - this.x
        let dy = pt.y - this.y
        let a = this.radiusX
        let b = this.radiusY
        if (dx*dx/a/a + dy*dy/b/b <= 1) {
            return {hitCode: 1, hitShape: this}
        }
        return {hitCode: 0, hitShape: null}
    }

    move(dx, dy) {
        this.x += dx
        this.y += dy
    }

    setProp(key, val) {
        this.style.setProp(key, val)
    }

    onpaint(cxt) {
        let style = this.style
        cxt.lineWidth = style.lineWidth
        cxt.strokeStyle = style.lineColor
        cxt.beginPath()
        cxt.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
        fill(cxt, this.style.fillColor)
        cxt.stroke()
    }
}



//shape接口的一个具体实现(涂鸦功能的model)
//lineStyle为画笔的样子，有with,color两个属性
class Path {
    //points:[{x:x1,y:y1},{x:x2,y:y2},...,{x:xn,y:yn}]
    constructor(points, close, style) {
        this.points = points
        this.close = close
        this.style = style
    }
    //求多线段的外接矩阵
    bound() {
        let points = this.points
        let n = points.length
        if(n < 1) {
            return
        }
        //选出最小值与最大值
        let x1 = points[0].x
        let y1 = points[0].y
        let x2 = x1
        let y2 = y1
        for(let i = 1; i < n; i++) {
            let tx = points[i].x
            let ty = points[i].y
            if(tx < x1) {
                x1 =tx
            }else if(tx > x2) {
                x2 = tx
            }
            if(ty < y1) {
                y1 = ty
            }else if(ty > y2) {
                y2 = ty
            }
        }
        return {x: x1, y: y1, width: x2 - x1, height: y2 - y1}
    }
    //判断坐标pt是否在多线段的外接矩阵内
    hitTest(pt) {
        if(hitRect(pt, this.bound())) {
            let points = this.points
            let n = points.length
            if (n > 1) {
                let lineWidth = this.style.lineWidth
                //遍历判断pt是否在某条线段上
                for(let i = 1; i < n; i++) {
                    if(hitLine(pt, points[i-1], points[i], lineWidth)) {
                        return {hitCode:1, hitShape: this}
                    }
                }
            }
        }
        return {hitCode: 0, hitShape: null}
    }

    //x轴移动dx,y轴移动dy
    move(dx, dy) {
        let points = this.points
        for(let i in points) {
            points[i].x += dx
            points[i].y += dy
        }
    }

    setProp(key, val) {
        this.style.setProp(key, val)
    }

    onpaint(ctx) {
        let n = this.points.length
        if(n < 1) {
            return
        }
        let points = this.points
        let lineStyle = this.style
        ctx.lineWidth = lineStyle.lineWidth
        ctx.strokeStyle = lineStyle.lineColor
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
    //删除功能
    deleteShape(shape) {
        deleteItem(this.shapes, shape);
    }
    //鼠标所在坐标pt锁定的图形
    hitTest(pt) {
        let shapes = this.shapes
        let n = shapes.length
        for(let i = n-1; i >= 0; i--) {
            let ret = shapes[i].hitTest(pt)
            if(ret.hitCode > 0) {
                return ret
            }
        }
        return {hitCode:0, hitShape: null}
    }
}

function deleteItem(shapes, shape) {
    let index = shapes.indexOf(shape)
    if(index != -1) {
        shapes.splice(index, 1)
    }
}

//鼠标所在位置pt是否锁定线段pt1pt2
function hitLine(pt, pt1, pt2, width) {
    if((pt1.x - pt.x) * (pt.x - pt2.x) < 0) {
        return false
    }
    if((pt1.y - pt.y) * (pt.y - pt2.y) < 0) {
        return false
    }
    let dy = pt2.y - pt1.y
    let dx = pt2.x - pt1.x
    let d12 = Math.sqrt(dx*dx + dy*dy)
    if(d12 < 0.1) {
        return false
    }
    let d = Math.abs(dy*pt.x - dx*pt.y + pt2.x*pt1.y - pt1.x*pt2.y)/d12 - 2
    return width >= d*2
}
//鼠标所在坐标pt是否锁定r为参数的图形
function hitRect(pt, r) {
    if((r.x + r.width - pt.x) * (pt.x - r.x) < 0) {
        return false
    }
    if((r.y + r.height - pt.y) * (pt.y - r.y) < 0) {
        return false
    }
    return true
}
//颜色填充
function fill(cxt, fillColor) {
    if(fillColor != "null") {
        cxt.fillStyle = fillColor
        cxt.fill()
    }
}
//获取圆相关的其他参数
function normalizeRect(rect) {
    let x = rect.p1.x
    let y = rect.p1.y
    let width = rect.p2.x - x
    let height = rect.p2.y - y
    if(width < 0) {
        x = rect.p2.x
        width = -width
    }
    if(height < 0) {
        y = rect.p2.y
        height = -height
    }
    return {x:x, y:y, width:width, height:height}
}
