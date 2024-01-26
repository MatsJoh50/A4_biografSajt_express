import {expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import {menuItems} from "../app.js";

test("Working 404 status", async () => {
    await request(app).get('/fil')
    .expect(404);
})

test("Enchanto shows movie title", async () => {
  const response = await request(app).get("/filmer/2")
  .expect('content-type', 'text/html; charset=utf-8')
  .expect(200);

  expect(response.text).toMatch('Encanto');
});

menuItems.forEach(page => {
    test(`Testing menu item: ${page.lable}`, async () => {
        await request(app).get(`${page.link}`).expect(200);
    });
});