let expect;
const nock = require('nock');
const countries = require('../service/DefaultService');

before(async () => {
    const chai = await import('chai');
    expect = chai.expect;
});

describe('Country API Functions', () => {

  describe('countriesGET()', () => {
    it('should return a list of countries with name and flag', async () => {
      nock('https://restcountries.com')
        .get('/v3.1/all')
        .query({fields:"name,flags"})
        .reply(200, [
          {
            name: { common: 'France' },
            flags: { png: 'https://flagcdn.com/w320/fr.png' }
          },
          {
            name: { common: 'Germany' },
            flags: { png: 'https://flagcdn.com/w320/de.png' }
          }
        ]);

      const result = await countries.countriesGET();
      expect(result).to.be.an('array');
      expect(result).to.deep.include({ name: 'France', flag: 'https://flagcdn.com/w320/fr.png' });
      expect(result).to.deep.include({ name: 'Germany', flag: 'https://flagcdn.com/w320/de.png' });
    });
  });

  describe('countriesNameGET(name)', () => {
    it('should return details of a specific country', async () => {
      const countryName = 'France';

      nock('https://restcountries.com')
        .get(`/v3.1/name/${countryName}`)
        .query({ fullText: true })
        .reply(200, [
          {
            name: { common: 'France' },
            flags: { png: 'https://flagcdn.com/w320/fr.png' },
            capital: ['Paris'],
            population: 67000000
          }
        ]);

      const result = await countries.countriesNameGET(countryName);
      expect(result).to.be.an('object');
      expect(result).to.include({
        name: 'France',
        flag: 'https://flagcdn.com/w320/fr.png',
        capital: 'Paris',
        population: 67000000
      });
    });

    it('should handle not found country error', async () => {
      const countryName = 'Wakanda';

      nock('https://restcountries.com')
        .get(`/v3.1/name/${countryName}`)
        .query({ fullText: true })
        .reply(404, {
          message: "Not Found"
        });

      try {
        await countries.countriesNameGET(countryName);
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error.message).to.include('Failed to fetch data for country');
      }
    });
  });
});
