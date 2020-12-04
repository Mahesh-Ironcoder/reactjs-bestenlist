Array.prototype.beRemoveObject = function (memkey, memValue) {
    var arrContains = this.slice()
    arrContains.forEach((value) => {
        delete value[memkey]
    })
}

var arrobj = Array(
    {
        name: "abc",
        age: 14,
        country: "India"
    },
    {
        name: "pqr",
        age: 31,
        country: "India"
    },
    {
        name: "xyz",
        age: 24,
        country: "India"
    }
)

console.log(arrobj)
arrobj.beRemoveObject("country", "India")
console.log(arrobj)