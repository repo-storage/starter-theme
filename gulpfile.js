//------- config -------------------
var fs = require('fs');
var path = require('path');
var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var print = require('gulp-print');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var include = require('gulp-file-includer');
var sequence = require('run-sequence');
var grunt = require('gulp-grunt');
var inject = require('gulp-inject');
var bower = require('gulp-bower-files');
var ignore = require('gulp-ignore');


/*
 install gulp and dependencies the easy way
 *** ---- quick gulp + all package plugins ---- ***
 * npm install
 install gulp and dependencies the coder way
 *** ----- the coders way ----- ***
 * npm install gulp gulp-util --save-dev
 * ---- install required gulp plugins ---***
 * npm install event-stream gulp-concat gulp-rename gulp-uglify gulp-clean gulp-watch gulp-changed streamqueue gulp-print gulp-minify-css --save-dev
 */

//  create some useful variables

var srcDir = './src/';
var scriptsPath = srcDir + 'js/';
var buildPath = 'deploy/',
    ignore_files = [''];

var src_files = [
    './src/css/**/*.css',
    './src/js/**/*.*'
];

//-----end config ----


function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('scripts', function () {

    var file_dir = 'js/';
    gulp.src(srcDir + file_dir + '**/*.*',{ base: './src' })
        .pipe(changed(buildPath + file_dir))
        .pipe(print())
        .pipe(gulp.dest(buildPath + file_dir));

    });

gulp.task('html_files', function () {
    //collect all files in root di
    //move to dest folder
    gulp.src(srcDir + '/*')
        .pipe(print())
        .pipe(gulp.dest(buildPath));

});

gulp.task('images', function () {

    var file_dir = 'images/';
    gulp.src(srcDir + file_dir + '**/*.*', { base: './src' })
        .pipe(changed(buildPath + file_dir))
        .pipe(print())
        .pipe(gulp.dest(buildPath + file_dir));

});


gulp.task('fonts', function () {

    var file_dir = 'fonts/';
    gulp.src(srcDir + file_dir + '**/*.*',{ base: './src' })
        .pipe(changed(buildPath + file_dir))
        .pipe(print())
        .pipe(gulp.dest(buildPath + file_dir));

});





gulp.task('css', function () {

    var file_dir = 'css/';
    gulp.src(srcDir + file_dir + '**/*.*',{ base: './src' })
        .pipe(changed(buildPath + file_dir))
        .pipe(print())
        .pipe(gulp.dest(buildPath + file_dir));

});


gulp.task("bower-files", function() {
     bower()
         .pipe(gulp.dest(buildPath + 'vendors/'))
         .pipe(print());
});

/* inject source */
gulp.task("inject", function(){
  gulp.src(srcDir + '*.html')
      .pipe(inject(gulp.src([buildPath + "js/**/*.js", buildPath + "css/**/*.css"], {read: false})))
      .pipe(gulp.dest("./dist"));
});

/*copy files/dependencies from root to the source folder */

gulp.task("srcbuild", function () {

    gulp.src('./bootstrap/dist/css/*.css')
        .pipe(gulp.dest(srcDir + 'bootstrap/css/'));
    gulp.src('./bootstrap/dist/js/*.js')
        .pipe(gulp.dest(srcDir + 'bootstrap/js/'));
    gulp.src('./knockout/build/output/knockout-latest.js')
        .pipe(gulp.dest(srcDir + 'js/vendor'));

});

gulp.task('default', ['html_files', 'scripts', 'fonts', 'images'], function () {});

// moves directory (entire) listed in src_files to a deploy directory
gulp.task('move', function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    gulp.src(src_files, { base: './src' })
        .pipe(gulp.dest(buildPath))
        .pipe(print());
});

// delete all the files in the deploy directory
gulp.task('cleanup', function () {
    gulp.src(buildPath + '**/*.*' , {read: false})
        .pipe(print())
        .pipe(clean());
});

// delete the deploy directory
gulp.task('clean', function () {
    gulp.src(buildPath, {read: false})
        .pipe(print())
        .pipe(clean());
});


// test - test your gulp file to see if it works
gulp.task('test', function(){});
