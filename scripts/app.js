document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form')
  form.addEventListener('submit', formSend)

  function formSend(e) {
    e.preventDefault()

    let error = formValidate(form)
    if (error === 0) {
      alert('И тут уже в ход идет php, которого я не знаю (должна быть отправка формы на email)')
    } else {
      alert('Заполните обязательные поля!')
    }
  }

  function formValidate(form) {
    let error = 0
    let formReq = document.querySelectorAll('._req')
    console.log(formReq)
    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i]
      formRemoveError(input)

      if (input.classList.contains('_email')) {
        if (validateEmail(input) || input.value === '') {
          formAddError(input)
          error++
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input)
        error++
      } else {
        if (input.value === '') {
          formAddError(input)
          error++
        }
      }
    }
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error')
    input.classList.add('_error')
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
  }

  function validateEmail(input) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(input).toLowerCase()
    )
  }

  const formImage = document.getElementById('formImage')

  const formPreview = document.getElementById('formPreview')

  formImage.addEventListener('change', () => {
    uploadFile(formImage.files[0])
  })

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      alert('Разрешены только изображения.')
      formImage.value = ''
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Файл должен быть менее 2 Мб')
      return
    }

    var reader = new FileReader()
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`
    }
    reader.onerror = function (e) {
      alert('Error')
    }
    reader.readAsDataURL(file)
  }
})
