for (i = 1; i <= 100; i += 1){
    if (i % 3 == 0) {
        if (i % 5 == 0) {
            console.log("bestenlistreact")
        }
        else {
            console.log("bestenlist")
        }
    }
    else if (i % 5 == 0) {
        console.log("react")
    }
    else {
        console.log(i)
    }
}