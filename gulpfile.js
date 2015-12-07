var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');
var yargs = require('yargs').argv ;
var _ = require('lodash');

// helper method to resolveToApp paths
var resolveTo = function(resolvePath) {
  return function(glob) {
    glob = glob || '';
     return path.posix.join(root, resolvePath, glob);
  }
};

var resolveToApp = resolveTo('app'); // app/{glob}
var resolveToComponents = resolveTo('app/components'); // app/components/{glob}
var resolveToCommon = resolveTo('app/common'); // app/components/{glob}

var paths = {
  entry: 'client/app/app.js',
  componentTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  serviceTemplate: path.join(__dirname, 'generator', 'service/*.**'),
  stateTemplate: path.join(__dirname, 'generator', 'state/*.**'),
  dest: 'dist',
  compile: 'compile',
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


// Generator
var root = 'client';

/*
Task to create component scaffolding with test written
*/

// camelCase for underscored names
var camelCase = function(val){
  var array = val.split('_');
  for (var i = 1; i<array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  return array.join('');
};

var middleDashName = function(val) {
  var array = val.split('_');
  var result = '';

  if (array.length === 1) {
    result = val;
  } else {
    for (var i = 1; i<array.length; i++) {
      result += '-' + array[i];
    }
    result = array[0] + result;
  }

  return result;
};

// capitalize first letter
var cap = function(val){
  var camel = camelCase(val);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

gulp.task('component', function(){

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);
  var commonLessPath = '~common/common.less';

  return gulp.src(paths.componentTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      camelCaseName: camelCase(name),
      commonLessPath: commonLessPath,
      middleDashName: middleDashName(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('state', function(){

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);
  var commonLessPath = '~common/common.less';

  return gulp.src(paths.stateTemplate)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      camelCaseName: camelCase(name),
      commonLessPath: commonLessPath,
      middleDashName: middleDashName(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

/*
Task to create service scaffolding with test written
*/
gulp.task('service', function(){

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.serviceTemplate)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      camelCaseName: camelCase(name),
      middleDashName: middleDashName(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
