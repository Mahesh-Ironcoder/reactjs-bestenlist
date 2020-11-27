const now = Date.now()
const currYear = 1970 + parseInt(now / 31_55_76_00_000)
// console.log(currYear)

const christmasDate = Date.parse("25 Dec " + currYear)
dtnc = null
if (christmasDate <= now && now < (christmasDate + 8_64_00_000)) {
    dtnc = 0
    // console.log("its Christmas day")
}
else if (christmasDate < now) {
    dtnc = (Date.parse("25 Dec " + (currYear + 1)) - now) / 8_64_00_000
}
else {
    dtnc = (christmasDate - now) / 8_64_00_000
}
console.log(parseInt(dtnc) + " days till next christmas")