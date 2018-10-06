var gulp        = require('gulp');
    sass        = require('gulp-sass'); // Sass
    browserSync = require('browser-sync'); // Browser Sync
    concat      = require('gulp-concat'), //  gulp-concat 
    uglify      = require('gulp-uglifyjs'); // gulp-uglifyjs
    cssnano     = require('gulp-cssnano'), // gulp-cssnano
    rename      = require('gulp-rename'); // gulp-rename


// Sass
gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

// Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false 
    });
});

//Собираеи и сжимаем
gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js'));
});


//cssnano and rename
gulp.task('css-libs', ['sass'], function() {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap-grid.css',
        'node_modules/bootstrap/dist/css/bootstrap-reboot.css'
        ])
        .pipe(concat('libs.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'));
});

//Custom task watch
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
