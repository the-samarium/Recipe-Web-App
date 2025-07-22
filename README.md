# JWT Recipe App

A Node.js web application for sharing and managing recipes, featuring user authentication with JWT, recipe uploads, and user-specific recipe management.

## Features
- User signup, login, and logout with JWT authentication
- Add, view, and delete recipes
- Each recipe is associated with the user who created it
- File uploads (e.g., images) with Multer and Cloudinary
- EJS templating for dynamic views

## Project Structure
```
JWT/
  controllers/         # Route handler logic
  index.js             # Main server file
  middlewares/         # Custom and third-party middleware
  model/               # Mongoose schemas and models
  public/              # Static assets
  routes/              # Express route definitions
  services/            # Cloudinary, file upload planned, but not used
  uploads/             # Uploaded files
  views/               # EJS templates
  package.json         # Project dependencies and scripts
```

## Setup Instructions
1. Clone the repository
2. Run `npm install` to install dependencies
3. Ensure MongoDB is running locally or update the connection string in `index.js`
4. Start the server with `npm start` or `nodemon index.js`
5. Visit `http://localhost:3000` in your browser

## Dependencies
| Package         | Purpose                                      |
|----------------|----------------------------------------------|
| bcrypt         | Password hashing    |
| cloudinary     | Image/file uploads to Cloudinary cloud        |
| cookie-parser  | Parse cookies in Express requests             |
|   |           |
| ejs            | Embedded JavaScript templating engine         |
| express        | Web server framework                          |
| jsonwebtoken   | JWT creation and verification                 |
| mongoose       | MongoDB object modeling and schema validation |
| multer         | File upload middleware for Express(not utilized)            |
| nodemon        | Auto-restart server on file changes (dev)     |
| validator      | String validation and sanitization            |

## Author
- Sameer Chavan

