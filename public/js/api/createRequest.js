"use strict";
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

   const xhr = new XMLHttpRequest();
   let formData;
   xhr.responseType = options.responseType;
   const url = new URL(options.url, "http://localhost:8000/");
   if (options.method === "GET") {

      for (let key in options.data) {
         url.searchParams.set(key, options.data[key]);
      }

   } else {
      formData = new FormData;
      for (let key in options.data) {
         formData.append(key, options.data[key]);
      }
   }

   if ('headers' in options) {
      for (let key in options.headers) {
         xhr.setRequestHeader(key, options.headers[key]);
      }
   };

   xhr.addEventListener('readystatechange', function () {
      if (this.readyState === xhr.DONE && this.status === 200) {
         if (this.response.error) options.callback(err = this.response.error);
         else options.callback(err = null, this.response);
      }
   });
   xhr.withCredentials = true;

   xhr.open(options.method, url);
   try {

      if (options.method === "GET") {
         xhr.send()
      } else {
         xhr.send(formData);
      }

      return xhr;

   } catch (error) {
      options.callback(err = error);
   }

};