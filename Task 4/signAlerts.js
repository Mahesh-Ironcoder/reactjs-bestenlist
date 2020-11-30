var a = (a,b,c) => {
    var signs = []
    if (a[0] == '+' || a[0] == '-') {
        // console.log(a[])
        if (!signs.includes(a[0]))
            signs.push(a[0])
    }
    if (b[0] == '+' || b[0] == '-') {
        if (!signs.includes(b[0]))
            signs.push(b[0])
    }
    if (c[0] == '+' || c[0] == '-') {
        if (!signs.includes(c[0]))
            signs.push(c[0])
    }
    if (signs.length == 0)
        alert("Welcome")
    else
        alert(signs+" signs")
}

a("+1","3","-2")