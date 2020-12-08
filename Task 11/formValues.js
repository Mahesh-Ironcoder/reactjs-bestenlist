var formSubmit = function (e) {
    e.preventDefault()
    var firstName = document.forms["form1"]["fname"].value
    var lastName = document.forms["form1"]["lname"].value
    console.log(firstName, lastName)
    var disp = document.createElement('p')
    disp.innerHTML = `<h3>FirstName:</h3> ${firstName} <h3>LastName:</h3> ${lastName}`
    document.body.appendChild(disp)
}