
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import WS from "gulp-webserver";


const routes = {
    pug:{
        src: "src/*.pug", //애를 감시하면 제대로 작동안함 고로 모든 파일을 감시해야해
        watch: "src/**/*.pug",
        dest:"goal"
    },
    scss:{

    }
};


const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug({}))
    .pipe(gulp.dest(routes.pug.dest));

const clear = () => del(["goal"]);

const webserver = () => gulp.src("goal/").pipe(WS({
    livereload: true,
    open: true
}))

const watchTarget = () =>{
    gulp.watch(routes.pug.watch,pug);
}
//내가 커맨드 할것만 export 하면댐

const prepare = gulp.series([clear]);
const serverActive = gulp.parallel([webserver,watchTarget]); //동시 실행
const assets =  gulp.series([pug]);

export const dev = gulp.series([prepare,assets,serverActive]);


///문제, 이제 여기선 reload기능이 안먹힘 --> gulp가 내 pug파일을 감시안하기 때문
