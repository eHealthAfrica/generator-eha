var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  init: function() {
    this.templates = [];
    this.config = {};

    this.config.availableFeatures = [
      {name: 'Directive', value: 'directive', suffix: '.directive'},
      {name: 'Service', value: 'service', suffix: '.service'},
      {name: 'Factory', value: 'factory', suffix: '.factory'},
      {name: 'Filter', value: 'filter', suffix: '.filter'},
      {name: 'Template', value: 'template', suffix: '.template'}
    ];

    this.hasFeature = function(feature) {
      return this.config.features.indexOf(feature) > -1;
    }

    this.validators = {};
    this.validators.isRequired = function (input, message) {
      if (/.+/.test(input)) {
        return true;
      }
      return message;
    };

  },
  promptUser: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'NAMESPACE',
        message: 'Namespace',
        validate: function (input) {
          return this.validators
                  .isRequired(input, 'You must specify a namespace');
        }.bind(this)
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component / Module name (e.g. component-name)',
        validate: function (input) {
          return this.validators
                  .isRequired(input, 'You must specify a component / module name');
        }.bind(this)
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
        name: 'authorName',
        message: 'Author\'s name',
        validate: function (input) {
          return this.validators
                  .isRequired(input, 'Please enter your name');
        }.bind(this),
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author\'s email',
        validate: function (input) {
          return this.validators
                  .isRequired(input, 'Please enter your email address');
        }.bind(this),
        default: this.user.git.email
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage',
        validate: function (input) {
          return this.validators
                  .isRequired(input, 'Please enter a URL');
        }.bind(this)
      },
      {
        type: 'input',
        name: 'gitRepoUrl',
        message: 'GIT Repo. URL'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Please choose what which items you\'d like scaffold for',
        choices: this.config.availableFeatures
      }
    ];

    this.prompt(prompts, function(props) {
      this.config = this._.extend(this.config, props);
      done();
    }.bind(this));
  },

  configure: function() {

    var now                   = new Date();
    this.config.prefix        = 'angular';
    this.config.year          = now.getFullYear();

    this.config.NAMESPACE     = this._.dasherize(this.config.NAMESPACE);
    this.config.name          = this._.dasherize(this.config.name);

    this.config.moduleName    = this.config.NAMESPACE + '.' + this.config.name;

    this.config.projectName   = this._.slugify(this.config.prefix) + '-' +
                                this.config.moduleName;

    this.config.componentName = this._.camelize(this.config.NAMESPACE + '_' +
                                  this._.camelize(
                                    this._.underscored(this.config.name)));

    this.config.dependencies  = [];

    this.config.availableFeatures.forEach(function(feature) {
      if(this.hasFeature(feature.value)) {
        this.config.dependencies.push(this.config.moduleName +  feature.suffix);
      }
    }.bind(this));

  },
  scaffoldFolders: function() {
    this.mkdir('src');
    this.mkdir('tests');
  },
  prepareTemplates: function() {

    this.templates.push({
      src: '_package.json',
      dest: 'package.json'
    });

    this.templates.push({
      src: '_bower.json',
      dest: 'bower.json'
    });

    this.templates.push({
      src: '_.travis.yml',
      dest: '.travis.yml'
    });

    this.templates.push({
      src: '_README.md',
      dest: 'README.md'
    });

    this.templates.push({
      src: '_CONTRIBUTING.md',
      dest: 'CONTRIBUTING.md'
    });

    this.templates.push({
      src: '_LICENSE',
      dest: 'LICENSE'
    });

    this.templates.push({
      src: '_Gruntfile.js',
      dest: 'Gruntfile.js'
    });

    this.templates.push({
      src: '_karma.conf.js',
      dest: 'karma.conf.js'
    });

    this.config.availableFeatures.forEach(function (feature) {
      if (this.hasFeature(feature.value)) {
        if (feature.value === 'template') {
          this.templates.push({
            src: 'src/_directive.tpl.html',
            dest: 'src/' + this.config.name + feature.suffix + '.tpl.html'
          });
        } else {
          this.templates.push({
            src: 'src/_' + feature.value + '.js',
            dest: 'src/' + this.config.name + feature.suffix + '.js'
          });

          this.templates.push({
            src: 'tests/unit/_' + feature.value + '.spec.js',
            dest: 'tests/unit/' + this.config.name + feature.suffix + '.spec.js'
          });
        }
      }
    }.bind(this));

    this.templates.push({
      src: 'src/_index.js',
      dest: 'src/index.js'
    });

    this.templates.push({
      src: '_.jscsrc',
      dest: '.jscsrc'
    });

    this.templates.push({
      src: '_.jshintrc',
      dest: '.jshintrc'
    });

    this.templates.push({
      src: '_.gitignore',
      dest: '.gitignore'
    });

    this.templates.push({
      src: '_CHANGELOG.md',
      dest: 'CHANGELOG.md'
    });
  },
  copyTemplates: function() {
    this.templates.forEach(function(template) {
      try {
        this.fs.copyTpl(
          this.templatePath(template.src),
          this.destinationPath(template.dest),
          {
            config: this.config,
            hasFeature: this.hasFeature
          }
        );
      } catch(x) {
        console.log(x, this.templatePath(template.src));
      }
    }.bind(this));
  }
});
