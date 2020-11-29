var secMax = (arr) => {
    arrclone = arr.map((x) => x)
    arrclone.sort((a, b) => b - a)
    return arrclone[1]
}

console.log(secMax([1,2,3,4,5,5,6]))