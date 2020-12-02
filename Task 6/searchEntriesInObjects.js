Array.prototype.beFindObject = function (memName) {
    var results = []
    var arrContains = this.slice()
    arrContains.forEach((value) => {
        if (value[memName] != undefined) {
            results.push(value[memName])
        }
    })
    return results
}

var arrobj = Array(
    {
        name: "abc",
        age: 14
    },
    {
        name: "pqr",
        age: 31
    },
    {
        name: "xyz",
        age: 24
    }
)

console.log(arrobj.beFindObject("name"))