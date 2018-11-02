# Full-Stack Developer Sample Project


## Fake Java meetup registration form
This is a simple web application that works as a web page where you can register for a fake Java meetup. There is
a registration form with some validation. The list of already registered visitors is displayed. Everything is stored in a
in-memory H2 database, which has some initial data (loaded from `data.sql`) after the system is started. After the
reboot the new data is lost. The only purpose of this application is to demonstrate a registration form implemented with
 the [Spring Boot](http://spring.io/projects/spring-boot) framework. The frontend is based on [React Redux](https://react-redux.js.org/).
 

## How to run it

Use git to get the repository contents, run the following git command:

```
git clone https://github.com/ubuntolog/K15tRegForm.git
```

Now you need to go to the repository's folder and open:

```
cd src/main/resources/public/
```

Run this command:
```
make dependencies
```

It will get all the dependencies needed to build the frontend ([npm](https://www.npmjs.com/) is required). Once you
have them, start building it:
```
make webui-production
```

Now you can start the app the same way it was before (or in your IDE):
```
java -jar FILE_NAME.jar
```

Open the following URL in a browser:
```
http://localhost:8088/
```
You should be able to see the start page.