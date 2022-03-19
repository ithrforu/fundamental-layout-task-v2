# Fundamental layout task (updated)

:man_technologist: [GitHub Pages](https://ithrforu.github.io/fundamental-layout-task-v2/)

:cyclone: *Features*: Pug, PostCss, Gulp, JavaScript, BEM. 

## :hammer_and_wrench: Build installing
* Install [NodeJS](https://nodejs.org/en/) ***16.13.2 LTS** (or another new version)* . 
* Download build with [Git](https://git-scm.com/downloads): ```git clone https://ithrforu.github.io/fundamental-layout-task-v2/```
* Install ```gulp``` globally: ```npm i --global gulp-cli```
* Move to build folder: ```cd ~/fundamental-layout-task-v2```
* Download dependencies: ```npm i```
* For start print: ```gulp dev``` (developer mode).
* For build project print: ```gulp build``` (build mode).

If you do everything correct and start developer mode, you will have a browser with a local server open. The build mode involves project optimization: images compression, minification of HTML, CSS and JS files for uploading to the server (current build version on [gh-pages](/../tree/gh-pages/) branch).

## :open_file_folder: Files stucture

```
fundamental-layout-task-v2
├── src
│   ├── css
│   │   ├── import
│   │   │   └── theme.css
│   │   └── styles.css
│   ├── images
│   │   ├── balloon-sq1.jpg
│   │   ├── balloon-sq2.jpg
│   │   ├── balloon-sq3.jpg
│   │   ├── balloon-sq4.jpg
│   │   ├── balloon-sq5.jpg
│   │   └── balloon-sq6.jpg
│   ├── js
│   │   └── main.js
│   ├── pug
│   │   ├── include
│   │   │   ├── blocks
│   │   │   │	├── header.pug
│   │   │   │	├── main.pug
│   │   │   │	└── top-elements.pug
│   │   │   ├── data.pug
│   │   │   └── mixins.pug
│   │   ├── base.pug
│   │   └── index.pug
│   └── index.html
├── .editorconfig
├── .gitignore
├── README.md
├── gulpfile.js
└── package.json
```
