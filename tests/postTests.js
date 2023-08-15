const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../server");
require("dotenv").config();

const API = process.env.BASE_URL;
chai.use(chaiHttp);

describe('/POST addPost', () => {
  it('should add a new post', (done) => {
    const post = {
      title: 'Test Post Title',
      description: 'Test Post Description'
    };

    chai.request(app)
      .post('/api/addPost')
      .set('Authorization', process.env.SAMPLE_TOKEN) // Assuming you have authentication set up
      .send(post)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('post');
        expect(res.body.post).to.be.an('object');
        expect(res.body.post).to.have.property('id');
        expect(res.body.post).to.have.property('title', post.title);
        expect(res.body.post).to.have.property('desc', post.description);
        expect(res.body.post).to.have.property('user');
        expect(res.body.post).to.have.property('created_at');
        expect(res.body.post).to.have.property('comments').that.is.an('array');
        expect(res.body.post).to.have.property('likes', 0);
        expect(res.body.post).to.have.property('likedBy').that.is.an('array');
        done();
      });
  });
});


describe('/GET getAllPosts', () => {
    it('should get all posts by the authenticated user', (done) => {
      const userId = 'user_id_here';
  
      chai.request(app)
        .get('/api/getAllPosts')
        .set('Authorization', 'Bearer your_auth_token_here') 
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('title');
          expect(res.body[0]).to.have.property('desc');
          expect(res.body[0]).to.have.property('created_at');
          expect(res.body[0]).to.have.property('comments');
          expect(res.body[0]).to.have.property('likes');
          done();
        });
    });
})  

describe('/DELETE deletePost', () => {
    it('should delete a post', (done) => {
      const postId = 'post_id_here'; 
  
      chai.request(app)
        .delete(`/api/deletePost/${postId}`)
        .set('Authorization', 'Bearer your_auth_token_here')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('_id', postId);
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('desc');
          expect(res.body).to.have.property('created_at');
          expect(res.body).to.have.property('comments');
          expect(res.body).to.have.property('likes');
          done();
        });
    });
})

describe('/POST likePost', () => {
    it('should like a post', (done) => {
      const postId = 'post_id_here'; 
  
      chai.request(app)
        .post(`/api/likePost/${postId}`)
        .set('Authorization', process.env.SAMPLE_TOKEN) 
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.msg).to.equal(`Succesfully Liked the Post with id : ${postId}`);
          done();
        });
    });
})  