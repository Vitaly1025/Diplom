using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConstantTrialPlotController : ControllerBase
    {

        [HttpGet]
        [Route("allTrialPlotsCharacteristics")]
        public List<TrialPlot> allTrialPlotsCharacteristics()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.TrialPlot.ToList();
            }
        }
    }
}