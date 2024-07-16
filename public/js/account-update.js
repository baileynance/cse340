const aform = document.querySelector("#update-account-form")

aform.addEventListener("change", function () {
    const updateBtn = document.querySelector('input[type="submit"]')
    updateBtn.removeAttribute("disabled")
})