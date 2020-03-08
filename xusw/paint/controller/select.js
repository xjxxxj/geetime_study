class ShapeSelector {
    constructor() {
        this.started = false
        this.pt = {x: 0, y: 0}
        this.ptMove = {x: 0, y: 0}
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

    stop() {
        view.onmousedown = null
        view.onmousemove = null
        view.onmouseup = null
        view.onkeydown = null
    }

    reset() {
        this.started = false
        invalidate(null)
    }
    onmousedown(event) {
        this.pt = this.ptMove = view.getMousePos(event)
        this.started = true
        let ht = view.doc.hitTest(this.pt)
        if (view.selection != ht.hitShape) {
            view.selection = ht.hitShape
            invalidate(null)
        }
    }

    onmousemove(event) {
        let pt = view.getMousePos(event)
        if (this.started) {
            this.ptMove = pt
            invalidate(null)
        } else {
            let ht = view.doc.hitTest(pt)
            if (ht.hitCode > 0) {
                view.drawing.style.cursor = "move"
            } else {
                view.drawing.style.cursor = "auto"
            }
        }
    }

    onmouseup(event) {
        if (this.started) {
            let selection = view.selection
            if (selection != null) {
                let pt = view.getMousePos(event)
                selection.move(pt.x - this.pt.x, pt.y - this.pt.y)
            }
            this.reset()
        }
    }

    onkeydown(event) {
        switch (event.keyCode) {
            case 8: //KeyBackSpace
            case 46: //KeyDeleted
                view.doc.deleteShape(view.selection)
                view.selection = null
            case 27: //KeyEsc
                this.reset()
                break
        }
    }
    //虚线选择框
    onpaint(ctx) {
        let selection = view.selection
        if (selection != null) {
            let bound = selection.bound()
            if (this.started) {
                bound.x += this.ptMove.x - this.pt.x
                bound.y += this.ptMove.y - this.pt.y
            }
            ctx.lineWidth = 1
            ctx.strokeStyle = "gray"
            ctx.beginPath()
            ctx.setLineDash([5, 5])
            ctx.rect(bound.x, bound.y, bound.width, bound.height)
            ctx.stroke()
            ctx.setLineDash([])
        }
    }
}

view.registerController("ShapeSelector", function () {
    return new ShapeSelector()
})
