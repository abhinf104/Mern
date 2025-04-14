const mongoose = require("mongoose");
const Comment = require("./models/comment");
const Post = require("./models/post");
const User = require("./models/user");
require("dotenv").config();

// MongoDB connection
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/blogmanagement";

// MongoDB connection with proper error handling
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Don't specify authSource unless you're sure it's needed
  })
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Sample comment templates
const commentTemplates = [
  "Great post! I really enjoyed reading this.",
  "Thanks for sharing this information. It was very helpful.",
  "I disagree with some points here. Let me explain why...",
  "This is exactly what I was looking for. Well written!",
  "Have you considered the alternative perspective on this topic?",
  "I've been researching this topic for a while and your post adds valuable insights.",
  "Your explanation of {topic} was very clear and easy to understand.",
  "I had a similar experience with this. It really resonated with me.",
  "Could you elaborate more on the point about {topic}?",
  "This post changed my perspective on {topic}. Thank you!",
  "I'm going to share this with my colleagues. Very informative!",
  "The examples you provided really helped clarify the concepts.",
  "I've bookmarked this for future reference. Great resource!",
  "What are your thoughts on applying this to {topic}?",
  "I learned something new today. Thanks for the education!",
];

// Reply templates
const replyTemplates = [
  "I agree with your comment. Well said!",
  "That's an interesting perspective. I hadn't thought of it that way.",
  "I see your point, but have you considered...",
  "Thanks for sharing your thoughts on this.",
  "You raised some good questions there.",
  "I can relate to your experience with this.",
  "Let me clarify what I meant about that...",
  "Great observation! I'd add that...",
  "You're absolutely right about that point.",
  "I appreciate your feedback on this topic.",
];

// Function to seed comments
const seedComments = async () => {
  try {
    console.log("Starting comment seeding process...");

    // Check if posts and users exist
    const postsCount = await Post.countDocuments();
    const usersCount = await User.countDocuments();

    if (postsCount === 0) {
      console.log("No posts found. Please create posts first.");
      process.exit(1);
    }

    if (usersCount === 0) {
      console.log("No users found. Please create users first.");
      process.exit(1);
    }

    // Get all posts and users
    const posts = await Post.find({});
    const users = await User.find({});

    console.log(`Found ${posts.length} posts and ${users.length} users`);

    // Clear existing comments
    await Comment.deleteMany({});
    console.log("Cleared existing comments");

    // Create comments for each post
    const createdComments = [];
    const topLevelComments = [];

    // First, create top-level comments
    for (const post of posts) {
      // Random number of comments (2-7) per post
      const commentCount = Math.floor(Math.random() * 6) + 2;

      console.log(`Creating ${commentCount} comments for post: ${post.title}`);

      for (let i = 0; i < commentCount; i++) {
        // Random user as author
        const author = users[Math.floor(Math.random() * users.length)]._id;

        // Random comment template with topic replacement
        let commentText =
          commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
        // Replace {topic} placeholder with the post category if exists
        if (post.categories && post.categories.length > 0) {
          commentText = commentText.replace(
            /{topic}/g,
            post.categories[0].toLowerCase()
          );
        } else {
          commentText = commentText.replace(/{topic}/g, "this topic");
        }

        // Create comment
        const comment = new Comment({
          content: commentText,
          post: post._id,
          author,
          parent: null,
          depth: 0,
          isEdited: false,
        });

        const savedComment = await comment.save();
        createdComments.push(savedComment);
        topLevelComments.push(savedComment);
      }
    }

    console.log(`Created ${topLevelComments.length} top-level comments`);

    // Now create some replies
    let replyCount = 0;

    for (const comment of topLevelComments) {
      // 50% chance of having replies
      if (Math.random() > 0.5) {
        // Random number of replies (1-3)
        const replyNumber = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < replyNumber; i++) {
          // Random user as author
          const author = users[Math.floor(Math.random() * users.length)]._id;

          // Random reply template
          const replyText =
            replyTemplates[Math.floor(Math.random() * replyTemplates.length)];

          // Create reply
          const reply = new Comment({
            content: replyText,
            post: comment.post,
            author,
            parent: comment._id,
            depth: 1,
            isEdited: false,
          });

          const savedReply = await reply.save();
          createdComments.push(savedReply);
          replyCount++;

          // 25% chance of having a reply to this reply (depth 2)
          if (Math.random() > 0.75) {
            const nestedAuthor =
              users[Math.floor(Math.random() * users.length)]._id;
            const nestedReplyText =
              replyTemplates[Math.floor(Math.random() * replyTemplates.length)];

            const nestedReply = new Comment({
              content: nestedReplyText,
              post: comment.post,
              author: nestedAuthor,
              parent: savedReply._id,
              depth: 2,
              isEdited: false,
            });

            const savedNestedReply = await nestedReply.save();
            createdComments.push(savedNestedReply);
            replyCount++;
          }
        }
      }
    }

    console.log(`Created ${replyCount} replies to comments`);
    console.log(`Total comments created: ${createdComments.length}`);

    // Disconnect
    await mongoose.disconnect();
    console.log("MongoDB disconnected - comment seeding complete");
  } catch (error) {
    console.error("Error seeding comments:", error);
    process.exit(1);
  }
};

// Run the seed function
console.log("Starting comment seeding script...");
seedComments().catch((err) => {
  console.error("Fatal error during seeding:", err);
  mongoose.connection.close();
  process.exit(1);
});
