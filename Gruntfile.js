module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/css/main.css': 'public/scss/main.scss'
				}
			}
		},
		jshint: {
			files: ['*.js', '!Gruntfile.js', 'public/js/*.js'],
			options: {
				'esversion': 6,
			}
		},
		watch: {
			sass: {
				files: ['public/scss/main.scss'],
				tasks: ['sass', 'cssmin']
			},
			frontJs: {
				files: ['public/js/main.js'],
				tasks: ['jshint', 'uglify']
			},
			backJS: {
				files: ['server.js'],
				tasks: ['jshint']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch'])
};