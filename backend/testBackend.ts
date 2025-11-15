import "dotenv/config"; 
import fetch from "node-fetch";

const API_URL = "http://127.0.0.1:3000/api";


async function testBackend() {
  try {
    console.log("=== GET /snippets ===");
    const snippets = await fetch(`${API_URL}/snippets`);
    console.log("Status:", snippets.status);
    console.log(await snippets.json());

    console.log("\n=== POST /users/register ===");
    const email = "docker_test_user@example.com";
    const register = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, motdepasse: "123456" }),
    });
    console.log("Status:", register.status);
    const registerData = await register.json();
    console.log(registerData);

    console.log("\n=== POST /users/login ===");
    const login = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, motdepasse: "123456" }),
    });
    console.log("Status:", login.status);
    const loginData = await login.json();
    console.log(loginData);

    if (loginData.token) {
      const token = loginData.token;

      console.log("\n=== GET /users/profile ===");
      const profile = await fetch(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Status:", profile.status);
      console.log(await profile.json());

      console.log("\n=== GET /comments/snippet/1 ===");
      const comments = await fetch(`${API_URL}/comments/snippet/1`);
      console.log("Status:", comments.status);
      console.log(await comments.json());

      console.log("\n=== GET /likes/snippet/1 ===");
      const likes = await fetch(`${API_URL}/likes/snippet/1`);
      console.log("Status:", likes.status);
      console.log(await likes.json());

      console.log("\n=== GET /tags ===");
      const tags = await fetch(`${API_URL}/tags`);
      console.log("Status:", tags.status);
      console.log(await tags.json());
    }

  } catch (err) {
    console.error("Erreur de test :", err);
  }
}

testBackend();
