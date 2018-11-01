# Full-Stack Developer Sample Project


## Fake Java meetup registration form
This is a simple web application that acts and behaves as a web page where you can register for a Java meetup. There is
a registration form with validation. It is possible to see the list of name of other visitors. Everything is stored in a
in-memory H2 database which has some initial data after when the system is started. After the reboot the new data is lost.
The frontend is based on React Redux

## How to run it

Use git to get repository contents, run the following git command:

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

It will get all dependencies needed to build the frontend. Once you have them, start building it:
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