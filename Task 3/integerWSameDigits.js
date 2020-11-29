var a = function (num) {
    let u = num % 10;
    let t = parseInt(num / 10) % 10;
    print(u==t)
    return u == t;
}

console.log(a(3443))