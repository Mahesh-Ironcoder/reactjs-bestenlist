Number.prototype.frmt = function () {
    var value = this.valueOf()
    var crfrmtted = ""
    while (value > 0) {
        if (value < 1000) {
            crfrmtted = (value % 1000) + crfrmtted
        }
        else {
            crfrmtted = (',' + (value % 1000)) + crfrmtted
        }
        value = Math.floor(value / 1000)
    }
    return crfrmtted
}

var a = Number(5541386)

console.log(a.frmt())