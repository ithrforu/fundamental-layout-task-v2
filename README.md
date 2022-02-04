# Fundamental layout task (updated)

[GitHub Pages](https://ithrforu.github.io/fundamental-layout-task-upd/src/index.html)

## :hammer_and_wrench: Build installing
* Install [NodeJS](https://nodejs.org/en/) ***16.13.2 LTS** (or another new version)* . 
* Download build with [Git](https://git-scm.com/downloads): ```git clone https://github.com/ithrforu/fundamental-layout-task-upd```
* Install ```gulp``` globally: ```npm i --global gulp-cli```
* Move to build folder: ```cd ~/fundamental-layout-task-upd```
* Download dependencies: ```npm i```
* For start print: ```gulp``` (developer mode by default).
* For build project print: ```gulp build``` (build mode).

If you do everything correct, you will have a browser with a local server open. The build mode involves project optimization: image compression and minification of HTML file for uploading to the server.

## :open_file_folder: Files stucture

```
fundamental-layout-task-upd
├── src
│   ├── css
    │  ├── styles.css
    │  ├── styles.min.css
│   ├── images
    │  ├── balloon-sq1.jpg
    │  ├── balloon-sq2.jpg
    │  ├── balloon-sq3.jpg
    │  ├── balloon-sq4.jpg
    │  ├── balloon-sq5.jpg
    │  ├── balloon-sq6.jpg
│   ├── js
    │  ├── main.js
    │  ├── main.min.js
│   ├── pug
    │  ├── index.pug
│   ├── index.html
├── README.md
├── gulpfile.js
├── package.json
```
