namespace VatRate.Models;

public class CountryRate
{
    public int Id { get; set; }
    public string Name { get; set; }
    public float[] Rates{ get; set; }

    public CountryRate(int id, string name, float[] rates)
    {
        Id = id;
        Name = name;
        Rates = rates;
    }
}