// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream'), 
    semver= require('semver'), runSequence=require('run-sequence');


// Gulp and plugins
var gulp = require('gulp'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'),
    replace = require('gulp-replace-task'), uglify = require('gulp-uglify'), htmlreplace = require('gulp-html-replace');
var bump = require('gulp-bump');

//var pkg = require('./package.json');
var getPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    };


// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
            'home':['components/home-page/home'],
            'clock':['components/clock/clock'],
            'refresh':['components/refresh/refresh'],
            'hsstatusdevice':['components/hsstatusdevice/hsstatusdevice'],
            'hsdevice':['components/hsdevice/hsdevice'],
            'hsthermostat':['components/hsthermostat/hsthermostat'],
            'staticimage':['components/staticimage/staticimage'],
            'weather':['components/weather/weather']
        }
    });




gulp.task('images', function() {
  return gulp.src('src/img/*.*')
    .pipe(gulp.dest('./dist/img'))
});

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
/*gulp.task('css', function () {
    var bowerCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});*/

gulp.task('copycss', function() {
    var bowercss= gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css');
    var css= gulp.src('src/css/*.css');
            //.pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),      
   return es.merge(css, bowercss).pipe(gulp.dest('./dist/css'));
    
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    var pkg = require('./package.json')
    return gulp.src('./src/index.html').pipe(
    htmlreplace({
        js: {
        src: 'libs',
        tpl: '<script data-main="app/startup" src="%s/require.js"></script>'
        },
        css: {
            src: 'css',
            tpl: '<link href="%s/bootstrap.min.css" rel="stylesheet">'
        }
    })).pipe(replace({
      patterns: [
        {
          match: 'version',
          replacement: pkg.version
        }
      ]
  })).pipe(gulp.dest('./dist/'));

});

var filesToMove = [
        'src/components/**/*.*',
        'src/app/**/*.*',
        'src/package.json',
        'src/libs/**/*.*'
    ];

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: 'src/' })
  .pipe(gulp.dest('dist'));
});

gulp.task('bump', function(){
    var pkg = getPackageJson();
  // increment version 
  var newVer = semver.inc(pkg.version, 'prerelease');
  return gulp.src('./package.json').pipe(bump({
      version: newVer
    })).pipe(gulp.dest('./'))
  .pipe(gulp.dest('dist'));
});



// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', {read: false})
        .pipe(clean({force: true}));
});

/*gulp.task('default', ['bump', 'copycss', 'images', 'html' ], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});*/

gulp.task('default', function(callback) {
  runSequence('clean',
              ['bump', 'copycss', 'images', 'move'],
              'html',
              callback);
});
