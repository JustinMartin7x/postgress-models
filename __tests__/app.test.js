const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Books = require('../lib/Books');



describe('postgres-models routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it ('creates new book via post', async() => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Enders Game',
        author: 'Orson Scott Card',
        genre: 'sci-Fi, Fiction' 
      });
    expect(response.body).toEqual({
      id: '1',
      title: 'Enders Game',
      author: 'Orson Scott Card',
      genre: 'sci-Fi, Fiction'
    });

  });

  it ('finds a book by id via Get', async() => {
    const book = await Books.create({ title: 'The Land', author: 'Aleron Kong', genre: 'LITRPG' });
    const response = await request(app)
      .get(`/books/${book.id}`);
    expect(response.body).toEqual(book);
  });

  it ('updates book by using id and PUT', async() => {
    const book = await Books.create({ title: 'Gods Eye', author: 'Aleron Kong', genre: 'LITRPG' });
  
    const response = await request(app)
      .put(`/books/${book.id}`)
      .send({
        title: 'this worked hooray',
        author: 'This worked',
        genre: 'LITRPG, Fantasy Fiction'
      });
    console.log(response.body);
    expect(response.body).toEqual({
      id: '1',
      title: 'this worked hooray',
      author: 'This worked',
      genre: 'LITRPG, Fantasy Fiction' 
    });
  });
  it('it deletes book bu using ID and Delete route', async() => {
    const book = await Books.create({ title: '1984', author: 'Orson wells', genre: 'distopian fiction' });
    const response = await request(app)
      .delete(`/books/${book.id}`);
    expect(response.body).toEqual(book);
  });
});
