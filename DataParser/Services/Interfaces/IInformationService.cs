using Data.Models;
using Data.Response;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IInformationService
    {
        List<GeneralLeshozInfo> GetAllLeshozes();
        TrialPlot GetPlotInfo(int leshosId, int plotNumber);
        PlotInfo GetSeparatedPlotInfo(int leshosId, int plotNumber);
        Tree GetTreeInfo(int leshosId, int plotNumber, short treeNumber);
    }
}
