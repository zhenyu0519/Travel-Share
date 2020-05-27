# Travel Share

![](https://img.shields.io/github/issues/zhenyu0519/Travel-Share?color=red&style=flat-square)
![](https://img.shields.io/github/forks/zhenyu0519/Travel-Share?color=green&style=flat-square)
![](https://img.shields.io/github/stars/zhenyu0519/Travel-Share?color=yellow&style=flat-square)
![](https://img.shields.io/github/license/zhenyu0519/Travel-Share?style=flat-square)
![](https://img.shields.io/github/repo-size/zhenyu0519/Travel-Share?color=orange&style=flat-square)
![](https://img.shields.io/github/languages/top/zhenyu0519/Travel-Share?color=blue&style=flat-square)


## Table of Contents 

  - [About](#about)
  - [Tech Stack](#tech-stack)
  - [Before Start](#before-start)
  - [Install](#install)
  - [Start](#start)
  - [Preview](#preview)
  - [License & Copyright](#license-&-copyright)

---

## About
 > Travel Share is a full stack project to share people's traveling to others. In this website you can look other peoples traveling without sign in and you can also create your own one (sign up required). 


## Tech Stack
MongoDB, Express, React (Hooks), Node.js, REST api, JavaScript, Google map api

## Before Start 
* register Google map api for map services
* register MongoDB for database services
* Have knowledge about Reactjs (hooks + class), Axios, Nodejs, MongoDB, Express, and REST api

## Install
  Install backend dependences, navigate to **server** folder then
  ```
  npm install
  ```
  Install frontend dependences, navigate to **client** folder then
  ```
  npm install
  ```
  Create .env file under both client and server folder, copy paste the content below and replace with your own infomation.

  client > .env:
  ```
  REACT_APP_GOOGLE_API_KEY=YOUR_OWN_GOOGLE_API_KEY
  REACT_APP_BACKEND_URL=http://localhost:5000
  ```

  server > .env:
  ```
  DATA_BASE_PASS = YOUR_OWN_DATABASE_PASSWORD
  GOOGLE_MAP_API = YOUR_OWN_GOOGLE_API_KEY
  JWT_KEY = YOUR_OWN_JWT_KEY
  DB_USER = YOUR_OWN_DATABASE_USERNAME
  DB_NAME = YOUR_OWN_DATABASE_NAME
  ```
  **Do not explore your senstive information!!!**

## Start
  To run on local server, navigate to server directory
  ```
  npm run start
  ```

  and navigate to client directory
  ```
  npm run start
  ```


## Preview
![demo](https://github.com/zhenyu0519/Travel-Share/blob/master/client/public/demo.gif)

---


---
## License & Copyright

![](https://img.shields.io/github/license/zhenyu0519/Travel-Share?style=flat-square)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://github.com/zhenyu0519/Travel-Share" target="_blank">Jeffrey Zhang</a>.
