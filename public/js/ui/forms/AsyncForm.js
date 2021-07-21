/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
   /**
    * Если переданный элемент не существует,
    * необходимо выкинуть ошибку.
    * Сохраняет переданный элемент и регистрирует события
    * через registerEvents()
    * */
   constructor(element) {
      if (!element) {
         console.error("Элемент не существует!");
         return;
      }

      this.element = element;
      this.registerEvents();
   }

   /**
    * Необходимо запретить отправку формы. В момент отправки
    * вызывает метод submit()
    * */
   registerEvents() {
      const form = this;
      this.element.addEventListener("submit", function (event) {
         event.preventDefault();
         form.submit();
      })
   }

   /**
    * Преобразует данные формы в объект вида
    * {
    *  'название поля формы 1': 'значение поля формы 1',
    *  'название поля формы 2': 'значение поля формы 2'
    * }
    * */
   getData() {
      const data = {};
      const formData = new FormData(this.element);
      const entries = formData.entries();

      for (let item of entries) {
         const key = item[0],
            value = item[1];

         data[key] = value;
      }
      return data;
   }

   onSubmit(options) {

   }

   /**
    * Вызывает метод onSubmit и передаёт туда
    * данные, полученные из метода getData()
    * */
   submit() {
      this.onSubmit(this.getData());
   }
}