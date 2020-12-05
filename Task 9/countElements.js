Array.prototype.utilCount = function (val) {
    var count = 0;
    for (const i of this.slice()) {
        if (i == val)
            count++
    }
    return count
}


Array.prototype.beGetDuplicate = function () {
    var arrContains = this.slice()
    var duplicates = []
    for (const value of arrContains) {
        if (this.utilCount(value) > 1)
            if (!duplicates.includes(value))
                duplicates.push(value)
    }
    return duplicates
}


var a = Array(1, 2, 3, 45, 3, 45, 5, 2, 4, 5, 6)

console.log(a)
console.log(a.beGetDuplicate())