describe('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      expect(message).toMatch(message);
    });
  });
});
