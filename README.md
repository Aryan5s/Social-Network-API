## Live 
https://social-network-kltatwnkf-aryan5s.vercel.app/

## Tech Stack 
NodeJS , ExpressJS, MongoDb , Chai , Mongoose

## Environment Variables 
PORT , MONGODB_URL , SAMPLE_TOKEN , SECRET , BASE_URL

## Running the code Locally 
-  Clone the Repository on to your local system.
```sh
git clone https://github.com/Aryan5s/Social-Network-API.git
```
-  Open it in the IDE of your Choice.
-   Open the terminal and Type in the following Code :
  ```sh
npm install // installs all the dependencies
npm start // Runs your Nodemon Server
```
## Routes
## USER Routes
```sh
POST /api/authenticate
GET /api/user
POST /api/follow/:id
POST /api/unfollow/:id
```
- The first route authenticates email and password and logs in the user returning jwt token in response
- The second Route gets authenticated user
- The third Route allows the authenticated user to follow the user with id = :id
- The fourth Route allows the authenticated user to unfollow the user with id = :id

  ## 
## POST Routes
```sh
GET /api/posts/:id
GET /api/all_posts
POST /api/posts
POST /api/like/:id
POST /api/unlike/:id
POST /api/comment/:id
DELETE /api/posts/:id
```
- The first Route gets a single post with {id} populated with its number of likes and comments
- The second Route gets all posts created by authenticated user sorted by post time.
- The third Route creates a new post created by the authenticated user.
- The fourth Route likes the post with {id} by the authenticated user.
- The fifth Route unlikes the post with {id} by the authenticated user.
- The sixth Route adds comment for post with {id} by the authenticated user.
- The seventh Route deletes post with {id} created by the authenticated user.
  ##
  

