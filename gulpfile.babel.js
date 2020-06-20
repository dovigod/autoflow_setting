
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import WS from "gulp-webserver";


const routes = {
    pug:{
        src: "src/*.pug",

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
//내가 커맨드 할것만 export 하면댐

const prepare = gulp.series([clear]);
const serverActive = gulp.series([webserver]);
const assets =  gulp.series([pug]);
export const dev = gulp.series([prepare,assets,serverActive]);
