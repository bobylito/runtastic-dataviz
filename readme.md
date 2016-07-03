# Runtastic dataviz

This app is a static website generator with the data from runtastic.

Super alpha: only for the adventurous :)

## Purpose

Frustrated with the data visulatizations provided by the runtastic.com, this
app is an attempt to fix that. It is a reusable command line app, to make it
trivial to run and update.

## Getting started

1. Install the package globally using NPM

```sh
npm install runtastic-dataviz
```

2. Run the command, it will asks for your credentials

```sh
runtastic-dataviz
```

3. The app will generate a folder `runtastic-dataviz` that you can serve with any HTTP server.

## Using a config file

To make things more convenient, you can create a file called `.runtastic` in your home folder.

It should look like : 

```ini
login=me@host.com
password='my$ecretPassword'
```

## Tech stack

It uses the following tech and lib:

 - runtastic-js
 - React + Victory
 - Metalsmith
 - bluebird
 - babel
 - prompt
 - simple-statistics
