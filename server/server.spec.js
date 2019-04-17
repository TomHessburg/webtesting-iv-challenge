const request = require('supertest');
const server = require('./index.js');

const db = require('../data/dbConfig.js');


beforeEach(async () => {
    await db('users').truncate();
});

describe('server.js', () => {
    describe('GET', () => {
        it('should return a 200 on GET', () => {
            return request(server)
                .get('/')
                .then(response => {
                expect(response.status).toBe(200);
                })  
                .catch();
        })
    })
    describe('POST', () => {
        it('should return a 201 on POST',  () => {
            return request(server)
                .post('/')
                .send({username: 'jimbo'})
                .then(response => {
                expect(response.status).toBe(201);
                })  
                .catch();
            
        }) 
        it('expect response to be 1', () => {
            return request(server)
                .post('/')
                .send({username: 'jimbo'})
                .then(response => {
                    expect(response.text).toBe("[1]")
                })
        })
    })
    

    describe('DELETE', () => {
        it('should return a 200 on delete',  () => {

            request(server)
                .post('/')
                .send({username: 'jimbo'})
                .then(response => {
                    request(server)
                        .delete('/')
                        .send({id: 1})
                        .expect(200);
                })
        })
        it('should return 0 users after delete',  () => {
            
            return request(server)
                    .delete('/')
                    .send({id: 1})
                    .then(response => {
                        expect(response.text).toBe("1")
                    })
        })
    })
})