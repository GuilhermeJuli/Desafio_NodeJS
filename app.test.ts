import supertest from 'supertest';
import app from './src/app';

const request = supertest(app);

describe('GET /bet/:id/:risc/:bet/:lines', () => {
    it('should return the correct response for average risk', async () => {
        const response = await request
            .get('/bet/65da35a153f5b0de4b7c993c/average/50/12');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('result');
    });

    it('should return the correct response for low risk', async () => {
        const response = await request
            .get('/bet/65da35a153f5b0de4b7c993c/low/50/12'); 

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('result');
    });
});
