/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - <%= pkg.description %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      main: {
        src: ['src/overthrow-detect.js','src/overthrow-toss.js','src/overthrow-polyfill.js','src/overthrow-init.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      sidescroller: {
        src: ['src/overthrow-detect.js','src/overthrow-toss.js','src/overthrow-polyfill.js','src/overthrow-init.js','extensions/overthrow-sidescroller.js'],
        dest: 'dist/<%= pkg.name %>.sidescroller.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      main: {
        src: ['src/overthrow-detect.js','src/overthrow-toss.js','src/overthrow-polyfill.js','src/overthrow-init.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      sidescroller: {
        src: ['src/overthrow-detect.js','src/overthrow-toss.js','src/overthrow-polyfill.js','src/overthrow-init.js','extensions/overthrow-sidescroller.js'],
        dest: 'dist/<%= pkg.name %>.sidescroller.min.js'
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);

};
