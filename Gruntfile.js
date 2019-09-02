module.exports = function(grunt) {
	grunt.initConfig({
		cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'public/js/main.min.js': ['public/js/main.js']
                }
            }
        },
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

	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch'])
};
