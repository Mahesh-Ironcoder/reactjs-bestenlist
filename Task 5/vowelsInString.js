String.prototype.bevowel = function(){
    var letters = this.valueOf().split("")
    var vowels = letters.filter((letter) => ['a', 'e', 'i', 'o', 'u'].includes(letter.toLowerCase()))
    return vowels.reduce((prev,curr)=>prev+curr, "")
}

var demo = new String("MahEsh ")
console.log(demo.bevowel())