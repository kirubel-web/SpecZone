import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

chai.use(chaiHttp);

describe('Auth API', function() {
    this.timeout(10000); // Increase the timeout if needed

    // Before running the tests, ensure the database is connected
    before(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', (done) => {
        const user = {
            username: 'TestUser',
            email: 'test@example.com',
            password: 'password123',
        };

        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it('should log in a user', (done) => {
        const user = new User({
            username: 'TestUser',
            email: 'test@example.com',
            password: 'password123',
        });
        user.save().then(() => {
            chai.request(server)
                .post('/api/auth/login')
                .send({ email: user.email, password: 'password123' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    // Close the database connection after all tests
    after(async () => {
        await mongoose.connection.close();
    });
});

