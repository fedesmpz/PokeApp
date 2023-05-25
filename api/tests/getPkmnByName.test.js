const { getPokemonByName } = require('../src/controllers/getPokemonByName');

describe('getPokemonByName', () => {
  test('should return an array of Pokémon matching the given name from the database', async () => {
    // Mock request and response objects
    const req = {
      query: {
        name: 'Pikachu', // Replace with the desired Pokémon name
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the function
    await getPokemonByName(req, res);

    // Assert the response
    expect(res.status).toHaveBeenCalledWith(200);
    // You can add more assertions for the returned JSON data if needed
  });
});
