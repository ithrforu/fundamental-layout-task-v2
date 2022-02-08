import pkg from 'gulp';
const { src, dest, parallel, series, watch } = pkg;

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
	return src(['src/css/**/*.css', '!src/css/import/**/*.css'])
		.pipe(postCss([postCssImport, postCssCustom, postCsso]))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(rename((path) => {path.basename += ".min"}))
		.pipe(dest('build/css'))
		.pipe(browserSync.stream());
};

const htmlPug = () => {
	return src(['src/pug/**/*.pug', '!src/pug/include/**/*.pug'])
		.pipe(pug())
		.pipe(prettyHtml({
			indent_with_tabs: true,
			preserve_newlines:false,
			extra_liners: []
		}))
		.pipe(dest('src'));
};

const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(dest('build'))
		.pipe(browserSync.stream());
};

const scripts = () => {
	return src('src/js/**/*.js')
		.pipe(terser())
		.pipe(rename((path) => {path.basename += ".min"}))
		.pipe(dest('build/js/'))
		.pipe(browserSync.stream());
};

const images = () => {
	return src('src/images/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.mozjpeg({
				quality: 75,
				progressive: true
			}),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('build/images'));
};

const copy = () => {
	return src([
		'src/fonts/**/*',
		'src/images/**/*',
	], {
		base: 'src'
	})
		.pipe(dest('build'))
		.pipe(browserSync.stream({
			once: true
		}));
};

const cleanDist = () => {
	return del('build');
};

const browserSyncer = () => {
	browserSync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'build',
			watch: true
		}
	});
};

const watching = () => {
	watch('src/css/**/*.css', stylesCompress);
	watch('src/pug/**/*.pug', series(htmlPug, htmlMinify));
	watch('src/js/**/*.js', scripts);
	watch([
		'src/fonts/**/*',
		'src/images/**/*',
	], copy);
};

const regularSeries = series(
	cleanDist,
	parallel(
		stylesCompress,
		htmlPug,
		htmlMinify,
		scripts
	)
);

export const build = series(
	regularSeries,
	images
);

export const dev = series(
	regularSeries,
	copy,
	parallel(
		browserSyncer,
		watching
	)
);