
import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";



const routes = {
    pug:{
        src: "src/*.pug",

        dest:"goal"
    },
    scss:{

    }
};
export const clear = () => del(["goal"]);

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug({preety:true}))
    .pipe(gulp.dest(routes.pug.dest));

export const dev = gulp.series([clear,pug]);
