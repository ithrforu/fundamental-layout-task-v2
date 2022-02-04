import gulp          from 'gulp';
import autoprefixer  from 'gulp-autoprefixer';
import rename        from 'gulp-rename';

import postCss       from 'gulp-postcss';
import postCssImport from 'postcss-import';
import postCsso      from 'postcss-csso';
import postCssCustom from 'postcss-custom-properties';
import pug           from 'gulp-pug';
import prettyHtml    from 'gulp-pretty-html';
import htmlmin       from 'gulp-htmlmin';
import terser        from 'gulp-terser';
import imagemin      from 'gulp-imagemin';
import del           from 'del';
import browserSync   from 'browser-sync';

const stylesCompress = () => {
	return gulp.src(['src/css/**/*.css', '!src/css/*.min.css', '!src/css/import/**/*.css', '!src/css/normalize.css'])
		.pipe(postCss([postCssImport, postCssCustom, postCsso]))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(rename((path) => {path.basename += ".min";}))
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.stream())
}

const htmlPug = () => {
	return gulp.src(['src/pug/**/*.pug', '!src/pug/include/**/*.pug']) 
		.pipe(pug({pretty:false}))
		.pipe(prettyHtml({indent_with_tabs: true, preserve_newlines:false, extra_liners: []}))
		.pipe(gulp.dest('src/'))
		.pipe(browserSync.stream())
}

const scripts = () => {
	return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
		.pipe(terser())
		.pipe(rename((path) => {path.basename += ".min"}))
		.pipe(gulp.dest('src/js/'))
		.pipe(browserSync.stream())
}

const images = () => {
	return gulp.src('src/images/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(gulp.dest('build/images/'))
}

const htmlMinify = () => {
	return gulp.src(['src/**/*.html'])
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest('build/'))
}

const browserSyncer = () => {
	browserSync.init({
		server: {
			baseDir: 'src/',
			watch: true
		}
	});
}

const watching = () => {
	gulp.watch(['src/css/**/*.css', '!src/css/**/*.min.css'], stylesCompress);
	gulp.watch('src/pug/**/*.pug', htmlPug);
	gulp.watch(['src/js/**/*.js', '!src/js/**/*.min.js'], scripts);
}

const cleanDist = () => {
	return del(['build'])
}

const cleanSrc = () => {
	return del(['src/css/**/*.min.css', 'src/js/**/*.min.js'])
}

const building = () => {
	return gulp.src([
		`src/css/**/*.min.css`,
		`src/js/**/*.min.js`
		], {base: 'src/'})
	.pipe(gulp.dest('build/'))
}

export const build = gulp.series(cleanDist, images, htmlMinify, building, cleanSrc);

export default gulp.series(gulp.parallel(stylesCompress, htmlPug, scripts), gulp.parallel(browserSyncer, watching));