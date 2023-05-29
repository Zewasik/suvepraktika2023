# Test assignment

Welcome to CGI test assignment!
This is the project template which contains Angular front-end and Spring Boot back-end

## Setting up Spring Boot application.

1. Make sure you have installed Java. For development OpenJDK 11 from [Adoptium](https://adoptium.net/) should be used.
2. Install Intellij IDEA Community edition
3. Import the Maven project
4. Run the LibraryApplication from IDE.

However, you can also install Maven and run the back-end from terminal with
`mvn spring-boot:run` in project directory
(make sure your JAVA_HOME variable is set up to point to
your Java 11 installation in that case)

## Setting up Angular application.

To get React app up and running you need to:

1. Make sure you have [NodeJS](https://nodejs.org/en/download/) version 18+ installed.
2. Open the terminal.
3. Navigate to frontend project `cd frontend/`
4. Install all dependencies with npm `npm install`. NB: This might take a while.
5. Start the development server `npm start`.
6. Once development server is running, open app at http://localhost:4200. If you can see a list of books then it means
   that you have successfully set up and run the application

## To run project via docker

Database needs to be started before backend:

1. Make sure you have [Docker](https://www.docker.com/) installed.
2. Open new terminal in project root.
3. Start docker-compose with `docker compose up`.
<!-- 4. After that you can use pgAdmin at http://localhost:5050 and start backend. -->

## Front-end features

- [x] Implement table of books view
- [x] Implement the checkouts view. Support paging for both views
- [ ] Support basic CRUD operations
- [x] Implement searching for books using freetext criteria
- [x] Implement filtering for books by status
- [ ] Implement saving / displaying favorite books for current user
- [ ] Add modal confirmation dialogues when deleting or checking out books
- [ ] Implement a user-friendly way to display late checkouts
- [ ] Implement advanced search form for books, where user can specify and combine different criterias (title, author year etc)
- [ ] Add UI tests
- [ ] Add support for multiple users and different user roles: reader and librarian.

## Back-end features

- [x] Support basic CRUD operations
- [x] Implement searching for books using freetext criteria
- [x] Implement filtering for books by status
- [ ] Implement saving / displaying favorite books for current user!!!
- [x] Implement advanced search form for books, where user can specify and combine different criterias (title, author
      year etc)
- [x] Add support for multiple users and different user roles: reader and librarian.
- [ ] Add backend tests
- [x] Containerize your application to make it cloud-native
