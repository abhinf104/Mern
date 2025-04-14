const axios = require("axios");

// Configuration
const API_URL = "http://localhost:3000/api";
let token = null;
let postId = null;
let commentId = null;

// Test user credentials
const testUser = {
  email: "test@example.com",
  password: "password123",
};

// Helper function to log responses
const logResponse = (title, response) => {
  console.log(`\n--- ${title} ---`);
  console.log("Status:", response.status);
  console.log("Data:", JSON.stringify(response.data, null, 2));
};

// Run all tests sequentially
const runTests = async () => {
  try {
    // 1. Register a test user (if needed)
    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, {
        name: "Test User",
        email: testUser.email,
        password: testUser.password,
        role: "author",
      });
      logResponse("Register User", registerResponse);
    } catch (err) {
      console.log("User may already exist, continuing with login...");
    }

    // 2. Login
    const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
    logResponse("Login", loginResponse);
    token = loginResponse.data.token;

    // Set auth header for subsequent requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // 3. Get all posts
    const postsResponse = await axios.get(`${API_URL}/posts`);
    logResponse("Get All Posts", postsResponse);

    // Save first post id for further tests if posts exist
    if (postsResponse.data.posts && postsResponse.data.posts.length > 0) {
      postId = postsResponse.data.posts[0]._id;
      console.log(`\nUsing post with ID: ${postId} for further tests`);
    }

    // 4. Create a new post
    const newPostResponse = await axios.post(`${API_URL}/posts`, {
      title: "Test Post via API",
      content: "This is a test post created via the API test script.",
      categories: ["Test"],
      tags: ["test", "api"],
      status: "published",
    });
    logResponse("Create New Post", newPostResponse);

    // Use newly created post for further tests
    postId = newPostResponse.data.post._id;

    // 5. Get single post
    const singlePostResponse = await axios.get(`${API_URL}/posts/${postId}`);
    logResponse("Get Single Post", singlePostResponse);

    // 6. Update post
    const updatePostResponse = await axios.put(`${API_URL}/posts/${postId}`, {
      title: "Updated Test Post",
      content: "This post has been updated via the API test script.",
      categories: ["Test"],
      tags: ["test", "api", "updated"],
    });
    logResponse("Update Post", updatePostResponse);

    // 7. Add a comment
    const newCommentResponse = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      {
        content: "This is a test comment.",
      }
    );
    logResponse("Create Comment", newCommentResponse);
    commentId = newCommentResponse.data.comment._id;

    // 8. Get comments for a post
    const commentsResponse = await axios.get(
      `${API_URL}/posts/${postId}/comments`
    );
    logResponse("Get Post Comments", commentsResponse);

    // 9. Reply to a comment
    const replyResponse = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      {
        content: "This is a reply to the test comment.",
        parentId: commentId,
      }
    );
    logResponse("Reply to Comment", replyResponse);

    // 10. Update comment
    const updateCommentResponse = await axios.put(
      `${API_URL}/comments/${commentId}`,
      {
        content: "This comment has been updated.",
      }
    );
    logResponse("Update Comment", updateCommentResponse);

    // 11. Like a post
    const likeResponse = await axios.post(`${API_URL}/posts/${postId}/like`);
    logResponse("Like Post", likeResponse);

    // 12. Get post metadata (categories, tags)
    const metadataResponse = await axios.get(`${API_URL}/posts/metadata`);
    logResponse("Get Post Metadata", metadataResponse);

    // 13. Get posts by author
    const authorPostsResponse = await axios.get(
      `${API_URL}/posts/author/${loginResponse.data.user._id}`
    );
    logResponse("Get Author Posts", authorPostsResponse);

    // 14. Search posts
    const searchResponse = await axios.get(`${API_URL}/posts?search=test`);
    logResponse("Search Posts", searchResponse);

    // 15. Delete comment
    const deleteCommentResponse = await axios.delete(
      `${API_URL}/comments/${commentId}`
    );
    logResponse("Delete Comment", deleteCommentResponse);

    // 16. Delete post
    const deletePostResponse = await axios.delete(`${API_URL}/posts/${postId}`);
    logResponse("Delete Post", deletePostResponse);

    console.log("\n✅ All API tests completed successfully!");
  } catch (error) {
    console.error("\n❌ Test failed:");
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error("Status:", error.response.status);
      console.error("Response:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error:", error.message);
    }
  }
};

// Run the tests
console.log("Starting API tests...");
runTests();
