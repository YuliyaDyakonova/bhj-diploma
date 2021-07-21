/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
class UserWidget {
   /**
    * Устанавливает полученный элемент
    * в свойство element.
    * Если переданный элемент не существует,
    * необходимо выкинуть ошибку.
    * */
   constructor(element) {
      if (!element) {
         console.error("Элемент не существует!");
         return;
      }

      this.element = element;
      this.update();
   }

   /**
    * Получает информацию о текущем пользователе
    * с помощью User.current()
    * Если пользователь авторизован,
    * в элемент .user-name устанавливает имя
    * авторизованного пользователя
    * */
   update() {
      const authUser = User.current();
      if (authUser) {
         const userName = document.querySelector(".user-name");
         userName.innerText = authUser.name;
      }
   }
}