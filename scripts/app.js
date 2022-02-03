// https://www.youtube.com/watch?v=PqTrhfjLQBI
// https://novocherkassk.hh.ru/search/vacancy?schedule=remote&clusters=true&ored_clusters=true&experience=noExperience&enable_snippets=true&salary=&text=React+developer+junior
// https://novocherkassk.hh.ru/vacancy/51644823?from=vacancy_search_list&hhtmFrom=vacancy_search_list&query=%D0%A1%D1%82%D0%B0%D0%B6%D1%91%D1%80-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%20React
// https://novocherkassk.hh.ru/vacancy/51264185?from=vacancy_search_list&hhtmFrom=vacancy_search_list&query=%D0%A1%D1%82%D0%B0%D0%B6%D1%91%D1%80-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%20React
// https://novocherkassk.hh.ru/vacancy/50656441?from=vacancy_search_list&hhtmFrom=vacancy_search_list&query=%D0%A1%D1%82%D0%B0%D0%B6%D1%91%D1%80-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%20React
// https://novocherkassk.hh.ru/search/vacancy?clusters=true&ored_clusters=true&experience=noExperience&enable_snippets=true&salary=&text=%D0%A1%D1%82%D0%B0%D0%B6%D1%91%D1%80-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA+React

//    Здравствуйте, я начинающий frontend developer, и хотел бы попасть на стажировку по вакансии "Стажер- Frontend разработчик". Очень хочу набраться опыта и улучшить свои знания, работая за реальными проектами. В 2021 году получил красный диплом бакалавра по специальности "Программная инженерия". Также сам учился и проходил курсы в интернете по frontend, делал проекты и выкладывал результаты на gitHub. Ссылка на gitHub в резюме.
// Вот ссылка на мое резюме:https://drive.google.com/file/d/1tV-jo-2W6nw5ea2DFEE5YLdg37tWnWKv/view

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
