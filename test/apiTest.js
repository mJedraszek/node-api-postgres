const request = require('supertest');
const assert = require('assert');
const { isTypedArray } = require('util/types');

describe ('api', () => {
    it('test get', function(done) {
        request('https://node-api-postgres-abg9.onrender.com')
        .get('/users/1')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(/{"id":1,"name":"Jerry","email":"jerry@gmail.com"/, done)
    })
})