module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-jade');
	grunt.initConfig({
		jade: {
			html: {
				src: ['_templates/index.jade'],
				dest: './',
				options: {
					client: false
				}
			}
		},
		watch: {
			files: ['_templates/*.jade'],
			tasks: 'jade'
		}
	});
};
