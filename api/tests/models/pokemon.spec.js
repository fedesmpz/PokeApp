const { Pokemon, conn } = require('../../src/db');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => {
    return conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });
  });

  describe('Validators', () => {
    beforeEach(() => {
      return Pokemon.sync({ force: true });
    });

    describe('name', () => {
      it('should throw an error if name is null', () => {
        return Pokemon.create({})
          .then(() => {
            throw new Error('It requires a valid name');
          })
          .catch(() => {});
      });

      it('should work when it is a valid name', () => {
        return Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
});
