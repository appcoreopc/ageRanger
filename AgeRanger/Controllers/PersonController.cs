using Microsoft.AspNetCore.Mvc;
using AgeRanger.DataProvider;
using AgeRanger.Model;
using Microsoft.Extensions.Options;
using AgeRanger.Config;
using Microsoft.AspNetCore.Cors;

namespace AgeRanger.Controllers
{
    [EnableCors("MyPolicy")]
    public class PersonController : Controller
    {
        private AgeRangerContext _ctx;
        private IDataProvider _provider;
        private IStatusProvider _statusProvider;
        private IOptions<AppModuleConfig> _appConfig;

        public PersonController(AgeRangerContext ctx, HttpStatusMapper statusProvider, IOptions<AppModuleConfig> appConfig)
        {
            _ctx = ctx;
            _statusProvider = statusProvider;
            _provider = new AgeRangerDataProvider(ctx);
            _appConfig = appConfig;
        }
        
        [HttpPost]
        public IActionResult Add([FromBody] Person person)
        {
            var result = _provider.AddPerson(person);
            return StatusCode(_statusProvider.GetStatus(result));
        }

        [HttpGet]
        public IActionResult List(int? start)
        {
            int offset = start ?? 0;
            var result = _provider.List(offset, _appConfig.Value.Defaults.PageSize);
            return Json(result);
        }

        [HttpGet]
        public IActionResult Search([FromQuery] string firstname, string lastname)
        {
            var result = _provider.Search(firstname, lastname);
            return Json(result);
        }
    }
}