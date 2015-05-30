module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['test/*.html']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n'
            },
            build: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'src/jquery.vimeoplaylist.js'
                }
            }
        },
        jshint: {
            files: ["src/<%= pkg.name %>.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        copy: {
            main: {
                src: 'src/jquery.vimeoplaylist.js',
                dest: 'dist/jquery.vimeoplaylist.js',
            },
        },
        serve: {
            options: {
                port: 8123
            }
        },

    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'copy']);
};