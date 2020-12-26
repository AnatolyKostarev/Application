# Application

## Task 13

Создать задачи (task) для gulp:

1)	чтобы он автоматически обновлял страницу при изменении в ваших файлах.

2)	чтобы компилировал ваш файл написанный на препроцессоре sass в css.


1.  Сначала объявляем переменные:

        var gulp      = require('gulp'), // Подключаем Gulp
            sass        = require('gulp-sass'), //Подключаем Sass пакет,
            browserSync = require('browser-sync'); // Подключаем Browser Sync


2. Создаем таск (task) для компиляции файла написанного на препроцессоре sass в css

        gulp.task('sass', function(){ // Создаем таск Sass
	        return gulp.src('app/sass/**/*.sass') // Берем источник
		        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
        });

3. Создаем таск для автоматического обновления страницы в браузере при внесении изменений в файлы с использованием Browser-sync

        gulp.task('browser-sync', function() { // Создаем таск browser-sync
	        browserSync({ // Выполняем browserSync
		        server: { // Определяем параметры сервера
			        baseDir: 'app' // Директория для сервера - app
		        },
		        notify: false // Отключаем уведомления
	        });
        });

4. Осуществляем наблюдение за изменениями. Gulp поддерживает метод watch для проверки сохраняемых файлов. Создаем таск:

        gulp.task('watch', function() {
            gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
        });
        gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));