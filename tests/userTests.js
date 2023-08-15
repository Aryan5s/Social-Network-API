const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../server");
require("dotenv").config();

const API = process.env.BASE_URL;
chai.use(chaiHttp);

describe("/POST testing user signin", () => {
    it("logs in a user", (done) => {
      chai
        .request(API)
        .post("/api/authenticate")
        .send({
          email: "jd57@hehemail.com",
          password: "Hello@6969",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.message.should.equal("Signed-In successfully");
          res.body.should.have.property("bearerToken");
          done();
        });
    });
  });
  
  escribe('/POST followUser', () => {
    it('should follow a user', (done) => {
      const userId = 'user_id_here'; 
  
      chai.request(app)
        .post(`/api/follow/${userId}`)
        .set('Authorization', process.env.SAMPLE_TOKEN) 
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.msg).to.equal(`[object Object] was followed by Follower Name`);
          done();
        });
    });
  
    it('should return 404 for invalid user ID', (done) => {
      const invalidUserId = 'invalid_user_id_here';
  
      chai.request(app)
        .post(`/api/follow/${invalidUserId}`)
        .set('Authorization', 'Bearer your_auth_token_here') // Assuming you have authentication set up
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.msg).to.equal('No user found with id : invalid_user_id_here');
          done();
        });
    });
  
  });

 
  describe('/POST unfollowUser', () => {
    it('should unfollow a user', (done) => {
      const userId = 'user_id_here'; // Replace with a valid user ID
  
      chai.request(app)
        .post(`/api/unfollow/${userId}`)
        .set('Authorization', 'Bearer your_auth_token_here') // Assuming you have authentication set up
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.msg).to.equal('[object Object] successfully unfollowed [object Object]');
          done();
        });
    });
  
    it('should return 404 for invalid user ID', (done) => {
      const invalidUserId = 'invalid_user_id_here';
  
      chai.request(app)
        .post(`/api/unfollow/${invalidUserId}`)
        .set('Authorization', process.env.SAMPLE_TOKEN) 
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body.msg).to.equal('Invalid User Id');
          done();
        });
    });
  });