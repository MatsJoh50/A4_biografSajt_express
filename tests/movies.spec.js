import {expect, test } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import {menuItems, impData} from "../app.js";

test("Working 404 status", async () => {
    await request(app).get('/fil')
    .expect(404);
})

impData.forEach(movie => {
    test(`Movies shows movie title: ${movie.title}`, async () => {
      const response = await request(app).get(`/filmer/${movie.id}`)
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(200);
    
      expect(response.text).toMatch(movie.title);
    });
    
});

menuItems.forEach(page => {
    test(`Testing menu item: ${page.lable}`, async () => {
        await request(app).get(`${page.link}`).expect(200);
    });
});