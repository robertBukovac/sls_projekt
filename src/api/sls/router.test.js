const Controllers = require('./controller');

const getSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: getSpy,
        delete: getSpy,
        put: getSpy
      }
    }
  }
});

describe('should test router', () => {
  require('./router.js');
  test('should test get SLS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(1,'/', Controllers.getAllSls);
  });
  test('should test post SLS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(2, '/:id', Controllers.createSls);
  });
  test('should test get SLS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(3, '/:id', Controllers.getSls);
  });
  test('should test delete SLS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(4, '/:id', Controllers.deleteSls);
  });
  test('should test update SLS', () => {
    expect(getSpy).toHaveBeenNthCalledWith(5, '/:id', Controllers.updateSls);
  });
});

