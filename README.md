## Commenting System Backend

This is a backend for a commenting system that allows users to create comments and reply to existing comments. It uses Node.js and Express for server-side routing and MongoDB with Mongoose for database management.

### Installation
To install and run this backend on your local machine, follow these steps:

1. Clone this repository using the following command:

```bash
git clone https://github.com/anshitmishraa/comment-management.git
```

2. Install the required dependencies using npm:

```bash
cd backend
npm install
```

3. Start the server:
```bash
npm start
```

### API Endpoints
This backend provides the following API endpoints:

### POST /comments
This endpoint creates a new comment.

#### Request Body
- **`content`** (required): The content of the comment.

#### Response Body
- **`id`**: The ID of the new comment.
- **`content`**: The content of the new comment.
- **`author`**: The ID of the user who created the comment.
- **`created_at`**: The timestamp when the comment was created.

### GET /comments
This endpoint returns all the comments with their replies.

#### Response Body
- **`id`**: The ID of the comment.
- **`content`**: The content of the comment.
- **`author`**: The name of the user who created the comment.
- **`created_at`**: The timestamp when the comment was created.
- **`replies`**: An array of replies to the comment.
  - **`id`**: The ID of the reply.
  - **`content`**: The content of the reply.
  - **`author`**: The name of the user who created the reply.
  - **`created_at`**: The timestamp when the reply was created.

### POST /comments/:commentId/replies
This endpoint creates a new reply to a comment.

#### Request Parameters
- **`commentId`** (required): The ID of the comment to which the reply is being posted.

#### Request Body
- **`content`** (required): The content of the reply.

#### Response Body
- **`id`**: The ID of the new reply.
- **`content`**: The content of the new reply.
- **`author`**: The ID of the user who created the reply.
- **`created_at`**: The timestamp when the reply was created.

### Models
This backend uses the following Mongoose models:

#### Comment

##### Properties

- **`content`** (String, required): The content of the comment.
- **`author`** (User, required): The user who created the comment.
- **`replies`** (Array of Reply): The replies to the comment.
- **`created_at`** (Date): The timestamp when the comment was created.

#### Reply
##### Properties
- **`content`** (String, required): The content of the reply.
- **`author`** (User, required): The user who created the reply.
- **`created_at`** (Date): The timestamp when the reply was created.

### User
#### Properties
- **`name`** (String, required, unique): The name of the user.
- **`ip`** (String, required, unique): The IP address of the user.

### Middleware
This backend uses the following middleware:

#### User Creation Middleware
This middleware creates a new user or retrieves an existing user based on the IP address of the user.

#### Conclusion
This backend provides a simple commenting system with the ability to create comments and reply to existing comments. It can be easily integrated with a frontend to provide a complete commenting system.
