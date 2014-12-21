module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n'
            },
            build: {
                files: {
                    'build/jquery.vimeoplaylist-<%= pkg.version %>.min.js': 'src/jquery.vimeoplaylist.js'
                }
            }
        },

    });

    for (var key in grunt.file.readJSON('package.json').devDependencies) {
        if (key !== 'grunt' && key.indexOf('grunt') === 0) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['uglify']);
};