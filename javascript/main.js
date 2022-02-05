$('.telegram-form').on('submit', function (event) {

   event.stopPropagation();
   event.preventDefault();

   let form = this,
      submit = $('.submit', form),
      data = new FormData(),
      files = $('input[type=file]')


   $('.submit', form).val('Отправка...');
   $('input, textarea', form).attr('disabled', '');

   data.append('Имя', $('[name="name"]', form).val());
   data.append('Фамилия', $('[name="surname"]', form).val());
   data.append('Номер телефона', $('[name="number"]', form).val());
   data.append('Услуга', $('[name="selectedApp"]', form).val());
   data.append('Прикрпл. файлы', $('[name="myfile"]', form).val());
   data.append('Срочный вопрос', $('[name="terms"]', form).val());
   data.append('Доп. комментарий', $('[name="comment"]', form).val());


   files.each(function (key, file) {
      let cont = file.files;
      if (cont) {
         $.each(cont, function (key, value) {
            data.append(key, value);
         });
      }
   });

   $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false,
      contentType: false,
      xhr: function () {
         let myXhr = $.ajaxSettings.xhr();

         if (myXhr.upload) {
            myXhr.upload.addEventListener('progress', function (e) {
               if (e.lengthComputable) {
                  let percentage = (e.loaded / e.total) * 100;
                  percentage = percentage.toFixed(0);
                  $('.submit', form)
                     .html(percentage + '%');
               }
            }, false);
         }

         return myXhr;
      },
      error: function (jqXHR, textStatus) {
         console.log("Error")
      },
      complete: function () {
         // Тут можем что-то делать ПОСЛЕ успешной отправки формы
         console.log('Complete')
         form.reset()
         location.reload();
      }
   });

   return false;
});