String.prototype.bespacify = function(){
    var letters = this.valueOf().split("")
    return letters.reduce((prev, curr) => prev + curr + " ", "")
}

var demo = new String("Mahesh")
console.log(demo.bespacify())