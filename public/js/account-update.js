const aform = document.querySelector("#update-account-form")

aform.addEventListener("change", function () {
    const updateBtn = document.querySelector('input[type="submit"]')
    updateBtn.removeAttribute("disabled")
})

function myFunction() {
    var x = document.getElementById("mypassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }