const request = require('supertest');
const server = require('./index.js');

const db = require('../data/dbConfig.js');


// beforeEach(async () => {
//     await db('users').truncate();
// });

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
            request(server)
                .post('/', {username: 'jimbo'})
                .then(response => {
                expect(response.status).toBe(201);
                })  
                .catch();
            
        }) 
        it('expect response to be JSON', () => {
            request(server)
                .post('/', {username: 'jimbo'})
                .then(response => {
                    expect(response.type).toBe('application/json')
                })
        })
    })
    

    describe('DELETE', () => {
        it('should return a 200 on delete',  () => {

            request(server)
                .post('/', {username: 'jimbo'})
                .then(response => {
                    request(server)
                        .delete('/', {id: 1})
                        .first()
                        .expect(200);
                })
            
            
        })
        it('should return 0 users after delete', async () => {
            const users = await db('users');

            expect(users).toHaveLength(0);
            
        })
    })
})