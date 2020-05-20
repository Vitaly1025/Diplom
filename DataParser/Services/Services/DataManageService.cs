using Data.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class DataManageService : IDataManageService
    {
        public List<Tree> GetAllTrees()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.Tree.ToList();
            }
        }
        public List<Leshos> GetAllLeshozes()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.Leshos.ToList();
            }
        }
        public List<TrialPlot> GetAllTrialPlots()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.TrialPlot.ToList();
            }
        }
        public List<TreeProperty> GetTreeProperties()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.TreeProperty.ToList();
            }
        }
        public List<TaxationYears> GetAllYears()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.TaxationYear.ToList();
            }
        }
    }
}
