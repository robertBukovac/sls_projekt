const Controllers = require('./controller');

const getSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: getSpy
      }
    }
  }
});

describe('should test router', () => {
  require('./router.js');
  test('should test get TICKETS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(1,'/', Controllers.getTickets);
  });
  test('should test get TICKET', () => {
    expect(getSpy).toHaveBeenNthCalledWith(2, '/:id', Controllers.getTicket);
  });
  test('should test create TICKET', () => {
    expect(getSpy).toHaveBeenNthCalledWith(3, '/:id', Controllers.createTicket);
  });
});


