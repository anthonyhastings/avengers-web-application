# Avengers Web Application
[![Build Status](https://semaphoreapp.com/api/v1/projects/eddde0c2-684f-4a4d-a3e1-ffcfba4170fc/357938/badge.png)](https://semaphoreapp.com/antwan1986/avengers-web-application)

## Introduction
This is a learning application that will be enhanced and built upon, to better understand the process of building web applications. It has been built upon the [rehabstudio FE Skeleton](https://github.com/rehabstudio/fe-skeleton) so any specifics about installation or setup can be read from that repositorys documentation.

## Web Server
A mock API and server is available via ExpressJS. To run it, simply run the following command:

```node api.js```

## Internationalization

You are able to see the application in French, German and English (default). This is achieved via different URL extensions:

```
/fr
/de
/en
```

You are able to generate a POT file via the following command:
```make extract-translations```

To convert PO files to Jed JSON files, run the following:
```gulp po2json```

## Tests
There is a fully-working test suite included in the build tools for this project. There is also a [CI server](https://semaphoreapp.com/antwan1986/avengers-web-application) setup for this project at Semaphore. You can run the test suite via the following command:

```gulp test```