using Microsoft.AspNetCore.Mvc;

namespace Monocle.Api.Controllers;

[ApiController]
[Route("claims")]
public class ClaimsController : ControllerBase
{
    private readonly ILogger<ClaimsController> _logger;

    public ClaimsController(ILogger<ClaimsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public string Get()
    {
        return "";
    }
}
