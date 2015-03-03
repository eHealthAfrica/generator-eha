var generators = require('yeoman-generator');
module.exports = generators.Base.extend({
  promptUser: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'componentNamespace',
        message: 'Namespace',
        default: 'eha'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component / Module name (e.g. component-name)'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords (comma-separated)'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author\'s name'
      }
    ];

    this.prompt(prompts, function(props) {
      this.componentName = props.name;
      this.componentNamespace = props.componentNamespace;
      this.name = 'angular-' + props.componentNamespace + '.' + props.name;
      this.author = props.author;
      this.keywords = props.keywords;
      this.description = props.description;
      done();
    }.bind(this));
  },

  scaffoldFolders: function() {
    this.mkdir('src');
    this.mkdir('tests');
  },
  copyTemplates: function() {
    var _this = this;
    var today = new Date();
    var viewModel = {
      name: this.name,
      date: today,
      author: this.author,
      year: today.getFullYear(),
      componentName: this.componentName,
      componentNamespace: this.componentNamespace,
      keywords: this.keywords.split(','),
      description: this.description
    };

    var templates = [
      {
        src: '_package.json',
        dest: 'package.json'
      },
      {
        src: '_bower.json',
        dest: 'bower.json'
      },
      {
        src: '_.travis.yml',
        dest: '.travis.yml'
      },
      {
        src: '_README.md',
        dest: 'README.md'
      },
      {
        src: '_CONTRIBUTING.md',
        dest: 'CONTRIBUTING.md'
      },
      {
        src: '_LICENSE',
        dest: 'LICENSE'
      },
      {
        src: '_Gruntfile.js',
        dest: 'Gruntfile.js'
      },
      {
        src: '_karma.conf.js',
        dest: 'karma.conf.js'
      },
      {
        src: '_script.js',
        dest: 'src/' + this.componentName + '.js'
      },
      {
        src: '_test.spec.js',
        dest: 'tests/' + this.componentName + '.spec.js'
      },
      {
        src: '_.jscsrc',
        dest: '.jscsrc'
      },
      {
        src: '_.jshintrc',
        dest: '.jshintrc'
      },
      {
        src: '_.gitignore',
        dest: '.gitignore'
      }
    ];

    templates.forEach(function(template) {
      _this.fs.copyTpl(
        _this.templatePath(template.src),
        _this.destinationPath(template.dest),
        viewModel
      );
    })
  }
});
