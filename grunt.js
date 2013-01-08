module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-jade');
	grunt.initConfig({
		// concat: {
		// 	'all.css' : [
		// 		'css_in/*.css'
		// 	]
		// },
		jade: {
			html: {
				src: ['index.jade'],
				dest: './',
				options: {
					client: false
				}
			}
		},
		watch: {
			files: ['index.jade'],
			tasks: 'jade'
		}
	});
};
