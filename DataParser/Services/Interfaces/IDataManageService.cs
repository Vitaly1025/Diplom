using Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IDataManageService
    {
        List<Tree> GetAllTrees();
        List<TaxationYears> GetAllYears();
        List<TreeProperty> GetTreeProperties();
        List<TrialPlot> GetAllTrialPlots();
        List<Leshos> GetAllLeshozes();
    }
}
