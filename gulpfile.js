var gulp      = require('gulp'), // Подключаем Gulp
	sass        = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync = require('browser-sync'); // Подключаем Browser Sync
 
gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
 
gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {  // Таск для обработки JS
	return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('code', function() { // Таск для обработки HTML
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));