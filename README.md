# SBA319-MongoDB-Database-Application

https://github.com/soodala2003/SBA319-MongoDB-Database-Application.git

This is the repository for a small Node, Express, and MongoDB server application. It allows users to retrieve the data (movies, users, and comment), to create a user or a comment, to update their data or comments, and to delete their data or comments.

1. "/" route opens 'Home' page
- User can insert a new user, comment, and movie into the database.
- Or, user can insert a new user, comment, and movie into the database if click on '+Add new user', '+Add new comment', or '+Add new movie' on ecah page.

2. "/users" route shows all names of users if click on 'Users' in the navigation bar.
- "/users/:id" route shows each user data if click on each name or 'View' button.
- The shown user is removed from the database if click on 'Delete' button.
- Edited user is changed in the database if click on 'Update' button.

3. "/comments" route shows the latest comments if click on 'Comments' in the navigation bar.
- "/comments/:id" route shows each comment data if click on each name who commented or 'View' button.
- The shown comment is removed from the database if click on 'Delete' button.
- Edited comment is changed in the database if click on 'Update' button.

4. "/movies" route shows all title of movies if click on 'Movies' in the navigation bar.
- "/movies/:id" route shows each movie data if click on each title of movie or 'View' button.
- The shown movie is removed from the database if click on 'Delete' button.
- Edited movie is changed in the database if click on 'Update' button.

5. Index is created in the 'routes/comments.mjs' by defining the query( const sort = { date: -1 }; ).

6. Schema validation is included in the "routes/users.mjs" file.
- The validation is tested when user create a new user.
- If user attempts to create a user with an invalid data, it displays the error massage.