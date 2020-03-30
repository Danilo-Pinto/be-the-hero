const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () =>{

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async () =>{
        await connection.destroy();
    })

    it('Should be able to create a new ONG', async () =>{
        const response = await request(app).post('/ongs').send({
            name:"APEG",
            email:"apeg@support.com",
            whatsapp: "99981085482",
            city:"Lago da Pedra",
            uf:"MA"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
          
    })
})