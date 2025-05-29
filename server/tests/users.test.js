process.env.NODE_ENV = "development";
const request = require("supertest");
const app = require("../src/app");

describe("User API", () => {
  it("GET /api/users should return all users", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users/:id should return a user", async () => {
    const userId = "cmb6u33050005s81u7zddgwwl";
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/users/:id should return 404", async () => {
    const userId = "cmb6u33050005s81u7"; // Non-existent user ID
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(404);
  });

  it("POST /api/users/follow/:id should return 400", async () => {
    // Use a real user ID same as the test user
    const userId = "cmb6u33050005s81u7zddgwwl";
    const res = await request(app)
      .post(`/api/users/follow/${userId}`)
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(400);
  });

  it("POST /api/users/follow/:id should follow or unfollow", async () => {
    // Use a real user ID different from the test user
    const userId = "cmb6u32uy0002s81u2tkqkdzs";
    const res = await request(app)
      .post(`/api/users/follow/${userId}`)
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(200);
  });
});
