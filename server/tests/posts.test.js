process.env.NODE_ENV = "development";
const request = require("supertest");
const app = require("../src/app");

describe("Posts API", () => {
  let createdPostId;

  it("POST /api/posts should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ content: "Test post content" })
      .set("Accept", "application/json");
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message", "Post created successfully");
    // Optionally, fetch posts to get the created post's ID
    const feedRes = await request(app).get("/api/posts/feed");
    expect(feedRes.statusCode).toBe(200);
    expect(Array.isArray(feedRes.body)).toBe(true);
    createdPostId = feedRes.body[0]?.id;
  });

  it("GET /api/posts/feed should return posts", async () => {
    const res = await request(app)
      .get("/api/posts/feed")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/posts/:id/like should like or unlike a post", async () => {
    if (!createdPostId) {
      // Skip if no post was created
      return;
    }
    const res = await request(app)
      .post(`/api/posts/${createdPostId}/like`)
      .set("Accept", "application/json");
    expect([200, 201]).toContain(res.statusCode);
    expect(["Post liked successfully", "Post unliked successfully"]).toContain(
      res.body.message
    );
  });

  it("POST /api/posts/:id/comment should add a comment", async () => {
    if (!createdPostId) {
      // Skip if no post was created
      return;
    }
    const res = await request(app)
      .post(`/api/posts/${createdPostId}/comment`)
      .send({ content: "Nice post!" })
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Comment added successfully");
    expect(res.body).toHaveProperty("comment");
    expect(res.body.comment).toHaveProperty("content", "Nice post!");
  });

  it("POST /api/posts should return 400 if content is missing", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({})
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Content is required");
  });
});
