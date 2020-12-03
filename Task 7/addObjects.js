Array.prototype.beAddObject = function (memkey, memValue) {
    var arrContains = this.slice()
    arrContains.forEach((value) => {
        value[memkey] = memValue
    })
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

console.log(arrobj)
arrobj.beAddObject("Country", "India")
console.log(arrobj)