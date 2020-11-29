var sqrDigi = (num) => {
    i = num
    s = 0
    while (i > 0) {
        s = s + ((i % 10) ** 2)
        i = Math.floor(i / 10);
    }
    return s
}

console.log(sqrDigi(987654322))