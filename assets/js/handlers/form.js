function submitFormData(url, form){
    var formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    }
    postData(url, formData)
}

async function postData(url = "", data = {}) {
    console.log(url)
    console.log(data)
    return await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    .then(response => console.log(response.json()));
}