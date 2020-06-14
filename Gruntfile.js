module.exports = function (grunt) {
    require("time-grunt")(grunt);

    // Pull defaults (including username and password) from .config.json
    var config = require("./.config.json");

    // Allow grunt options to override default configuration
    var branch = grunt.option("branch") || config.branch;
    var email = grunt.option("email") || config.email;
    var password = grunt.option("password") || config.password;
    var ptr = grunt.option("ptr") ? true : config.ptr;
    var private_directory = grunt.option("privateDirectory") || config.privateDirectory;

    var currentdate = new Date();
    grunt.log.subhead("Task Start: " + currentdate.toLocaleString());
    grunt.log.writeln("Branch: " + branch);

    // Load needed tasks
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-screeps");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-file-append");
    grunt.loadNpmTasks("grunt-rsync");
    grunt.loadNpmTasks("grunt-ts");

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: "./tsconfig.json",
            },
        },

        watch: {
            scripts: {
                files: ["src/**/*.ts", "Gruntfile.js"],
                tasks: ["private"],
                options: {
                    spawn: false,
                },
            },
        },

        // Push all files in the dist folder to screeps. What is in the dist folder
        // and gets sent will depend on the tasks used.
        remote: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr,
            },
            dist: {
                src: ["dist/*.js"],
            },
        },

        // Copy files to the folder the client uses to sink to the private server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
            options: {
                args: ["--verbose", "--checksum"],
                exclude: [".git*"],
                recursive: true,
            },
            private: {
                options: {
                    src: "./dist/",
                    dest: private_directory,
                },
            },
        },

        // Add version variable using current timestamp.
        file_append: {
            versioning: {
                files: [
                    {
                        prepend: "// Created " + currentdate.toISOString() + "\n",
                        input: "dist/main.js",
                    },
                ],
            },
        },

        // Remove all files from the dist folder.
        clean: {
            dist: ["dist/*"],
        },
    });

    // Combine the above into a default task
    grunt.registerTask("default", ["clean", "ts", "file_append", "remote"]);
    grunt.registerTask("private", ["clean", "ts", "file_append", "rsync:private"]);
};
