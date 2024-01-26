import {expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app.js";

test("Enchanto shows movie title", async () => {
  const response = await request(app).get("/filmer/2")
  .expect('content-type', 'text/html; charset=utf-8')
  .expect(200);

  expect(response.text).toMatch('Encanto');
});
