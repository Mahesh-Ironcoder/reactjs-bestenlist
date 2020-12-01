String.prototype.bespacify = function(){
    var letters = this.valueOf().split("")
    return letters.reduce((prev, curr) => { return prev + curr + " " },"")
}

var demo = new String("Mahesh")
console.log(demo.bespacify())