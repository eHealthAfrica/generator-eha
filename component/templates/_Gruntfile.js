module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist/'],
      tmp: ['.tmp/']
    },
    copy: {
      scripts: {
        expand: true,
        cwd: '.tmp',
        src: [
          'scripts.js',
          'scripts.templates.js'
        ],
        dest: 'dist/',
        rename: function(dest, src) {
          return dest + src.replace('scripts','<%= name %>');
        }
      }
    },
    concat: {
      scripts: {
        src: [
          'src/**/*.js',
          '!src/**/*.spec.js'
        ],
        dest: '.tmp/scripts.js'
      },
      templates: {
        src: [
          '.tmp/scripts.js',
          '.tmp/templates.js'
        ],
        dest: '.tmp/scripts.templates.js'
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      tmp: {
        files: [{
          expand: true,
          src: ['.tmp/**/*.js']
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= name %>.min.js': ['.tmp/scripts.js'],
          'dist/<%= name %>.templates.min.js': ['.tmp/scripts.templates.js']
        }
      }
    },
    html2js: {
      dist: {
        src: ['src/**/*.tpl.html'],
        dest: '.tmp/templates.js',
        module: '<%= componentNamespace %>.<%= componentName %>.templates',
        options: {
          rename: function(moduleName) {
            var parts = moduleName.split('/');
            var index = parts.indexOf('src');
            parts = parts.slice(index + 1, parts.length);
            return 'templates/' + parts.join('/');
          }
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true,
        autoWatch: false
      },
      watch: {
        singleRun: false,
        autoWatch: true
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        // pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
    jshint: {
      all: ['src/**/*.js', 'tests/**/*.spec.js']
    },
    jscs: {
      src: ['src/**/*.js', 'tests/**/*.spec.js'],
      options: {
        config: ".jscsrc",
        requireCurlyBraces: [ "if" ]
      }
    }
  });

  grunt.registerTask('templates', ['html2js']);
  grunt.registerTask('test', ['html2js', 'jshint', 'jscs', 'karma:unit']);
  grunt.registerTask('test:watch', ['karma:watch']);

  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean',
      'templates',
      'concat:scripts',
      'concat:templates',
      'ngAnnotate',
      'copy:scripts',
      'uglify:dist'
    ]);
  });

  grunt.registerTask('release', function(target) {
    grunt.task.run([
      'build',
      'bump:' + target
    ])
  })

  grunt.registerTask('default', ['jshint', 'jscs', 'build']);

};
