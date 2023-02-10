using Microsoft.AspNetCore.Mvc;
using VatRate.Models;
using VatRate.Services;

namespace VatRate.Controllers;

[ApiController]
[Route("[controller]")]
public class CountryRateController : ControllerBase
{
    private readonly ILogger<CountryRateController> _logger;
    private readonly CountryRateService _service;

    public CountryRateController(ILogger<CountryRateController> logger, CountryRateService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var countryRates = _service.CountryRates;

        if (countryRates == null)
            return NotFound();

        return Ok(countryRates);
    }
}
