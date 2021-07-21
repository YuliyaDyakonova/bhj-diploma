/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
   /**
    * Запускает initAuthLinks и initToggleButton
    * */
   static init() {
      this.initAuthLinks();
      this.initToggleButton();
   }

   /**
    * Отвечает за скрытие/показа боковой колонки:
    * переключает два класса для body: sidebar-open и sidebar-collapse
    * при нажатии на кнопку .sidebar-toggle
    * */
   static initToggleButton() {
      const sidebarToggleBtn = document.getElementsByClassName("sidebar-toggle")[0];
      sidebarToggleBtn.addEventListener("click", (event) => {
         event.preventDefault();
         const body = document.getElementsByTagName("body")[0];
         body.classList.toggle("sidebar-open");
         body.classList.toggle("sidebar-collapse");
      });
   }

   /**
    * При нажатии на кнопку входа, показывает окно входа
    * (через найденное в App.getModal)
    * При нажатии на кнопку регастрации показывает окно регистрации
    * При нажатии на кнопку выхода вызывает User.logout и по успешному
    * выходу устанавливает App.setState( 'init' )
    * */
   static initAuthLinks() {
      const registerItem = document.querySelector('.menu-item_register');
      registerItem.addEventListener('click', function registerHandler() {
         const modal = App.getModal('register');
         modal.open();
      });

      const loginItem = document.querySelector('.menu-item_login');
      loginItem.addEventListener('click', function loginHandler() {
         const modal = App.getModal('login');
         modal.open();
      });

      const logoutItem = document.querySelector('.menu-item_logout');
      logoutItem.addEventListener('click', function logoutHandler() {
         function resetState(err, response) {
            if (response && response.success) App.setState('init');
         };
         User.logout({}, resetState);
      });

   }

}