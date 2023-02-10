using VatRate.Models;

namespace VatRate.Services;

public class CountryRateService
{

    private static IList<CountryRate> _countryRates = new List<CountryRate>();

    public IEnumerable<CountryRate> CountryRates
    {
        get
        {
            if (_countryRates.Count == 0)
            {                
                _countryRates.Add(new CountryRate(1, "Portugal", new float[] { 6, 13, 23 }));
                _countryRates.Add(new CountryRate(2, "France", new float[] { 5.5f, 10, 20 }));
                _countryRates.Add(new CountryRate(3, "Spain", new float[] { 10, 20 }));
                _countryRates.Add(new CountryRate(4, "United Kingdom", new float[] { 5, 20 }));
            }
            return _countryRates;
        }
    }
}