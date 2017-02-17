export class Rect {
    constructor(
        public left: number = 0,
        public top: number = 0,
        public width: number = 100,
        public height: number = 100) {
    }

    public static fromSegment(seg: any): Rect {
        return new Rect(
            seg.left || 0,
            seg.top || 0,
            seg.width || 100,
            seg.height || 100
        );
    }

    public multiply(lambda: number): void {
        this.left *= lambda;
        this.top *= lambda;
        this.width *= lambda;
        this.height *= lambda;
    }

    public applyMargin(margin: number, canvasSize: number) {
            // Around each rect should be this.layoutMargin pixels of margin. As rects are neighboured, all
            // edges which are not located at the image border would have twice the margin. To compensate this,
            // we will (a) deflate by half the margin and (b) clamp the rects at the border to the full margin

            let m = Math.floor(margin / 2);

            // (a)
            this.left += m;
            this.width -= 2 * m;
            this.top += m;
            this.height -= 2 * m;

            // (b)
            if(this.left == m) {
                this.left += m;
                this.width -= m;
            }
            if(this.top == m) {
                this.top += m;
                this.height -= m;
            }
            this.width = Math.min(canvasSize - margin, this.left + this.width) - this.left;
            this.height = Math.min(canvasSize - margin, this.top + this.height) - this.top;
    }

    public toString(): string {
        return `${this.left}, ${this.top}, ${this.width}, ${this.height}`;
    }
}