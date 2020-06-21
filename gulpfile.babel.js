
import gulp, { dest } from "gulp";
import gpug from "gulp-pug";
import del from "del";
import WS from "gulp-webserver";
import image from "gulp-image";
import gSass, { logError } from "gulp-sass";
import autoPrefix from "gulp-autoprefixer";
import csso from "gulp-csso";


gSass.compiler = require("node-sass");
const routes = {
    pug:{
        src: "src/*.pug", //애를 감시하면 제대로 작동안함 고로 모든 파일을 감시해야해
        watch: "src/**/*.pug",
        dest:"goal"
    },
    scss:{
        watch:"src/scss/**/*.scss",
        src: "src/scss/style.scss",
        dest: "goal/css"

    },
    img: {
        src: "src/img/*",
        dest: "goal/img"
      }
   /* img:{
        src:"src/img/*",
        dest:"goal/img"
    }   */
};

const css = () => gulp.src(routes.scss.src)
        .pipe(gSass().on("error",logError))
        .pipe(autoPrefix({
            browsers: ["last 2 versions"]
        }))
        .pipe(csso())
        .pipe(dest(routes.scss.dest));

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clear = () => del(["goal"]);

const webserver = () => gulp.src("goal/").pipe(WS({
    livereload: true,
    open: true
}));

const watchTarget = () =>{
    gulp.watch(routes.pug.watch,pug);
    gulp.watch(routes.img.src,img);
    gulp.watch(routes.scss.watch,css);
    
};

const watch_img = () => gulp.watch(routes.img.src.img);

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const imgOpt = () =>{
    gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));} 
//위에 경우 async 에러 남, 화살표 함수가 {}감싸면 this 속성이 변함 주의😂😂😂😂😂

//내가 커맨드 할것만 export 하면댐
//img는 용량이커서 시간 많이 잡아먹으니까 prepare section에서 시행시키는게 나을듯, 계속 watch당하면 너무 비효율적임
const prepare = gulp.series([clear,img]);
const live = gulp.parallel([webserver,watchTarget]); //동시 실행
const assets =  gulp.series([pug,css]);


export const dev = gulp.series([prepare,assets,live]);
//export const enable_watch_img = gulp.series([watch_img]);

///문제, 이제 여기선 reload기능이 안먹힘 --> gulp가 내 pug파일을 감시안하기 때문
