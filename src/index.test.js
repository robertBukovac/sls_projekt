const router= require('./api/tickets/router');
const routerS = require('./api/sls/router');


const useSpy = jest.fn();
const listenSpy = jest.fn();

jest.doMock('express', () => {
  return () => ({
    use: useSpy,
    listen: listenSpy,
  })
});
describe('should test server configuration', () => {
    test('should call listen fn', () => {
      require('./index.js');
      expect(listenSpy).toHaveBeenCalled();
    });
      test('should call listen fn', () => {
        require('./index.js');
        expect(listenSpy).toHaveBeenCalled();
      });
  });