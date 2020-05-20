using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Data.Request;
using Data.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConstantTrialPlotController : ControllerBase
    {
        private readonly IInformationService _informationService;
        private readonly IDataManageService _datamanageService;
        public ConstantTrialPlotController(IInformationService informationService, IDataManageService datamanageService)
        {
            _informationService = informationService;
            _datamanageService = datamanageService;
        }

        [HttpGet]
        [Route("getInfoAllLeshozes")]
        public List<GeneralLeshozInfo> getInfoAllLeshozes()
        {
            return _informationService.GetAllLeshozes();
        }

        [HttpGet]
        [Route("getSeparatedPlotInfo")]
        public TrialPlot getSepatatedInfo(int id, int number)
        {
            return _informationService.GetSeparatedPlotInfo(id, number);
        }

        [HttpPost]
        [Route("getPlotInfo")]
        public TrialPlot getPlotInfo(PlotInfoRequest request)
        {
            return _informationService.GetPlotInfo(request.Id, request.PlotNumber);
        }

        [HttpPost]
        [Route("getTreeInfo")]
        public Tree getTreeInfo(TreeInfoRequest request)
        {
            return _informationService.GetTreeInfo(request.Id, request.PlotNumber, request.TreeNumber);
        }

        #region DataManage
        [HttpPost]
        [Route("getAllTree")]
        public List<Tree> getAllTree()
        {
            return _datamanageService.GetAllTrees();
        }

        [HttpPost]
        [Route("getAllTrialPlots")]
        public List<TrialPlot> getAllTrialPlots()
        {
            return _datamanageService.GetAllTrialPlots();
        }

        [HttpPost]
        [Route("getAllLeshozes")]
        public List<Leshos> getAllLeshozes()
        {
            return _datamanageService.GetAllLeshozes();
        }

        [HttpPost]
        [Route("getTreeProperties")]
        public List<TreeProperty> getTreeProperties()
        {
            return _datamanageService.GetTreeProperties();
        }
        #endregion
    }
}