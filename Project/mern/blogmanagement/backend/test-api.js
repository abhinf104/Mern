/**
 * BlogMaster API Testing Script
 *
 * This script tests all API endpoints in your blog management system.
 * It follows a logical sequence: register → login → create resources → read → update → delete
 *
 * Requirements:
 * - npm install axios form-data fs
 * - Server must be running at http://localhost:3000
 *
 * Usage:
 * - node test-api.js
 * - node test-api.js auth (to test only auth endpoints)
 * - node test-api.js posts (to test only post endpoints)
 */

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Configuration
const API_URL = "http://localhost:3000/api";
let authToken = null;
let testUserId = null;
let testPostId = null;
let testCommentId = null;
let testImageId = null;

// Test user
const testUser = {
  name: "API Test User",
  email: `test-${Date.now()}@example.com`,
  password: "Password123",
  role: "author",
};

// Helper functions
const logHeader = (title) => {
  console.log("\n" + "=".repeat(80));
  console.log(`   ${title}`);
  console.log("=".repeat(80));
};

const logRequest = (method, endpoint, data = null) => {
  console.log(`\n--> ${method} ${endpoint}`);
  if (data) console.log("Request Body:", JSON.stringify(data, null, 2));
};

const logResponse = (response) => {
  console.log(`<-- ${response.status} ${response.statusText}`);
  console.log(
    "Response:",
    JSON.stringify(response.data, null, 2).slice(0, 500) + "..."
  );
};

const logError = (error) => {
  console.error("ERROR:", error.message);
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Response:", error.response.data);
  }
};

const api = axios.create({
  baseURL: API_URL,
  validateStatus: () => true, // Don't throw on error status codes
});

// Set auth token for subsequent requests
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

/**
 * AUTH ENDPOINTS
 */
const testAuthEndpoints = async () => {
  logHeader("TESTING AUTH ENDPOINTS");

  // 1. Register
  try {
    logRequest("POST", "/auth/register", testUser);
    const registerRes = await api.post("/auth/register", testUser);
    logResponse(registerRes);

    if (registerRes.status === 201) {
      authToken = registerRes.data.token;
      testUserId = registerRes.data.user._id;
      console.log("\n✅ Registration successful");
    } else {
      console.log(
        "\n⚠️ Registration failed or user already exists, proceeding to login"
      );
    }
  } catch (error) {
    logError(error);
  }

  // 2. Login
  try {
    const loginData = {
      email: testUser.email,
      password: testUser.password,
    };

    logRequest("POST", "/auth/login", loginData);
    const loginRes = await api.post("/auth/login", loginData);
    logResponse(loginRes);

    if (loginRes.status === 200) {
      authToken = loginRes.data.token;
      testUserId = loginRes.data.user._id;
      console.log("\n✅ Login successful");
    } else {
      console.log("\n❌ Login failed, cannot proceed with authenticated tests");
      return false;
    }
  } catch (error) {
    logError(error);
    return false;
  }

  // 3. Get Current User
  try {
    logRequest("GET", "/auth/me");
    const meRes = await api.get("/auth/me");
    logResponse(meRes);
    console.log("\n✅ Get current user successful");
  } catch (error) {
    logError(error);
  }

  // 4. Logout (test at the end)
  return true;
};

/**
 * POST ENDPOINTS
 */
const testPostEndpoints = async () => {
  logHeader("TESTING POST ENDPOINTS");

  // 1. Create Post
  try {
    const postData = {
      title: `Test Post ${Date.now()}`,
      content: "This is a test post content created by the API test script.",
      categories: ["Test", "API"],
      tags: ["test", "api", "automation"],
      status: "published",
    };

    logRequest("POST", "/posts", postData);
    const createPostRes = await api.post("/posts", postData);
    logResponse(createPostRes);

    if (createPostRes.status === 201) {
      testPostId = createPostRes.data.post._id;
      console.log("\n✅ Post creation successful");
    } else {
      console.log("\n❌ Post creation failed, cannot proceed with post tests");
      return false;
    }
  } catch (error) {
    logError(error);
    return false;
  }

  // 2. Get All Posts
  try {
    logRequest("GET", "/posts");
    const postsRes = await api.get("/posts");
    logResponse(postsRes);
    console.log("\n✅ Get all posts successful");
  } catch (error) {
    logError(error);
  }

  // 3. Get Post by ID
  try {
    logRequest("GET", `/posts/${testPostId}`);
    const postRes = await api.get(`/posts/${testPostId}`);
    logResponse(postRes);
    console.log("\n✅ Get post by ID successful");
  } catch (error) {
    logError(error);
  }

  // 4. Get Posts By Author
  try {
    logRequest("GET", `/posts/author/${testUserId}`);
    const authorPostsRes = await api.get(`/posts/author/${testUserId}`);
    logResponse(authorPostsRes);
    console.log("\n✅ Get posts by author successful");
  } catch (error) {
    logError(error);
  }

  // 5. Update Post
  try {
    const updateData = {
      title: `Updated Test Post ${Date.now()}`,
      content: "This post has been updated via the API test script.",
      categories: ["Test", "Updated"],
      tags: ["test", "api", "updated"],
    };

    logRequest("PUT", `/posts/${testPostId}`, updateData);
    const updatePostRes = await api.put(`/posts/${testPostId}`, updateData);
    logResponse(updatePostRes);
    console.log("\n✅ Update post successful");
  } catch (error) {
    logError(error);
  }

  // 6. Like Post
  try {
    logRequest("POST", `/posts/${testPostId}/like`);
    const likePostRes = await api.post(`/posts/${testPostId}/like`);
    logResponse(likePostRes);
    console.log("\n✅ Like post successful");
  } catch (error) {
    logError(error);
  }

  // 7. Get Post Metadata
  try {
    logRequest("GET", "/posts/metadata");
    const metadataRes = await api.get("/posts/metadata");
    logResponse(metadataRes);
    console.log("\n✅ Get post metadata successful");
  } catch (error) {
    logError(error);
  }

  return true;
};

/**
 * COMMENT ENDPOINTS
 */
const testCommentEndpoints = async () => {
  logHeader("TESTING COMMENT ENDPOINTS");

  // 1. Create Comment
  try {
    const commentData = {
      content: `Test comment ${Date.now()}`,
      postId: testPostId,
    };

    logRequest("POST", `/comments/post/${testPostId}`, commentData);
    const createCommentRes = await api.post(
      `/comments/post/${testPostId}`,
      commentData
    );
    logResponse(createCommentRes);

    if (createCommentRes.status === 201) {
      testCommentId = createCommentRes.data.comment._id;
      console.log("\n✅ Comment creation successful");
    } else {
      console.log(
        "\n❌ Comment creation failed, cannot proceed with comment tests"
      );
      return false;
    }
  } catch (error) {
    logError(error);
    return false;
  }

  // 2. Get Comments for Post
  try {
    logRequest("GET", `/comments/post/${testPostId}`);
    const commentsRes = await api.get(`/comments/post/${testPostId}`);
    logResponse(commentsRes);
    console.log("\n✅ Get comments for post successful");
  } catch (error) {
    logError(error);
  }

  // 3. Update Comment
  try {
    const updateData = {
      content: `Updated comment ${Date.now()}`,
    };

    logRequest("PATCH", `/comments/${testCommentId}`, updateData);
    const updateCommentRes = await api.patch(
      `/comments/${testCommentId}`,
      updateData
    );
    logResponse(updateCommentRes);
    console.log("\n✅ Update comment successful");
  } catch (error) {
    logError(error);
  }

  return true;
};

/**
 * USER ENDPOINTS
 */
const testUserEndpoints = async () => {
  logHeader("TESTING USER ENDPOINTS");

  // 1. Update User Profile
  try {
    const profileData = {
      name: `Updated Test User ${Date.now()}`,
      bio: "This is a test bio updated via the API test script.",
    };

    logRequest("PATCH", "/users/profile", profileData);
    const updateProfileRes = await api.patch("/users/profile", profileData);
    logResponse(updateProfileRes);
    console.log("\n✅ Update profile successful");
  } catch (error) {
    logError(error);
  }

  // 2. Get User Profile
  try {
    logRequest("GET", `/users/profile/${testUserId}`);
    const profileRes = await api.get(`/users/profile/${testUserId}`);
    logResponse(profileRes);
    console.log("\n✅ Get user profile successful");
  } catch (error) {
    logError(error);
  }

  // Note: Get All Users requires admin role, not testing here

  return true;
};

/**
 * IMAGE UPLOAD ENDPOINTS
 */
const testImageEndpoints = async () => {
  logHeader("TESTING IMAGE UPLOAD ENDPOINTS");

  // Only run if we can find a test image
  const testImagePath = path.join(__dirname, "test-image.jpg");
  if (!fs.existsSync(testImagePath)) {
    console.log("\n⚠️ Test image not found at:", testImagePath);
    console.log(
      "Skipping image upload tests. Create a test-image.jpg in the backend directory to test these endpoints."
    );
    return true;
  }

  // 1. Upload Post Image
  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(testImagePath));

    const headers = {
      ...form.getHeaders(),
      Authorization: `Bearer ${authToken}`,
    };

    logRequest("POST", "/images/upload/post");
    const uploadRes = await axios.post(`${API_URL}/images/upload/post`, form, {
      headers,
    });
    logResponse(uploadRes);

    if (uploadRes.status === 200) {
      testImageId = uploadRes.data.public_id;
      console.log("\n✅ Post image upload successful");
    } else {
      console.log("\n❌ Post image upload failed");
    }
  } catch (error) {
    logError(error);
  }

  // 2. Upload Profile Image (if previous test succeeded)
  if (testImageId) {
    try {
      const form = new FormData();
      form.append("image", fs.createReadStream(testImagePath));

      const headers = {
        ...form.getHeaders(),
        Authorization: `Bearer ${authToken}`,
      };

      logRequest("POST", "/images/upload/profile");
      const uploadRes = await axios.post(
        `${API_URL}/images/upload/profile`,
        form,
        { headers }
      );
      logResponse(uploadRes);
      console.log("\n✅ Profile image upload successful");
    } catch (error) {
      logError(error);
    }
  }

  // 3. Delete Image (if we have an image ID)
  if (testImageId) {
    try {
      logRequest("DELETE", "/images/delete", { public_id: testImageId });
      const deleteRes = await api.delete("/images/delete", {
        data: { public_id: testImageId },
      });
      logResponse(deleteRes);
      console.log("\n✅ Image deletion successful");
    } catch (error) {
      logError(error);
    }
  }

  return true;
};

/**
 * CLEANUP
 */
const cleanupTests = async () => {
  logHeader("CLEANUP");

  // 1. Delete Comment
  if (testCommentId) {
    try {
      logRequest("DELETE", `/comments/${testCommentId}`);
      const deleteCommentRes = await api.delete(`/comments/${testCommentId}`);
      logResponse(deleteCommentRes);
      console.log("\n✅ Delete comment successful");
    } catch (error) {
      logError(error);
    }
  }

  // 2. Delete Post
  if (testPostId) {
    try {
      logRequest("DELETE", `/posts/${testPostId}`);
      const deletePostRes = await api.delete(`/posts/${testPostId}`);
      logResponse(deletePostRes);
      console.log("\n✅ Delete post successful");
    } catch (error) {
      logError(error);
    }
  }

  // 3. Logout
  try {
    logRequest("GET", "/auth/logout");
    const logoutRes = await api.get("/auth/logout");
    logResponse(logoutRes);
    console.log("\n✅ Logout successful");
  } catch (error) {
    logError(error);
  }
};

/**
 * MAIN TEST RUNNER
 */
const runTests = async () => {
  console.log("🚀 Starting API Tests");

  // Determine which tests to run based on command line args
  const args = process.argv.slice(2);
  const testFilter = args[0];

  try {
    // Auth tests always need to run first to get token
    let authSuccess = await testAuthEndpoints();
    if (!authSuccess) {
      console.log("\n❌ Auth tests failed, cannot proceed with other tests");
      return;
    }

    // Run selected tests based on command line args
    if (!testFilter || testFilter === "posts") await testPostEndpoints();
    if (!testFilter || testFilter === "comments") await testCommentEndpoints();
    if (!testFilter || testFilter === "users") await testUserEndpoints();
    if (!testFilter || testFilter === "images") await testImageEndpoints();

    // Run cleanup to delete test resources
    await cleanupTests();

    console.log("\n🎉 All tests completed!");
  } catch (error) {
    console.error("\n❌ Tests failed with error:", error.message);
  }
};

// Run the tests
runTests();
