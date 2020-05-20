using Data.Models;
using Data.Response;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Services
{
    public class InformationService : IInformationService
    {
        public List<GeneralLeshozInfo> GetAllLeshozes()
        {
            try
            {
                using (var context = new ConstantTrialPlotsContext())
                {

                    var result = context.Leshos.Include(ls => ls.TrialPlots)
                        .ThenInclude(t => t.Tree)
                        .ThenInclude(t => t.IdBreedNavigation)
                        .ThenInclude(t => t.Tree)
                        .ThenInclude(p => p.TreeProperties)
                        .ThenInclude(y => y.IdTaxationYearsNavigation)
                        .ToList();
                    return BuildGeneralInfo(result);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        private List<GeneralLeshozInfo> BuildGeneralInfo(List<Leshos> leshozes)
        {
            List<GeneralLeshozInfo> results = new List<GeneralLeshozInfo>();
            foreach (var leshoz in leshozes)
            {
                results.Add(new GeneralLeshozInfo(leshoz));
            }
            return results;
        }

        public Tree GetTreeInfo(int leshosId, int plotNumber, short treeNumber)
        {
            using (var context = new ConstantTrialPlotsContext())
            {

                return context.Tree.Include(t => t.IdPlotNavigation)
                        .Where(t => t.IdPlotNavigation.IdLeshos == leshosId && t.IdPlotNavigation.Number == plotNumber && t.Number == treeNumber)
                        .Include(t => t.IdBreedNavigation)
                        .Include(t => t.TreeProperties)
                        .ThenInclude(t => t.IdCraftNavigation)
                        .ThenInclude(t => t.TreeProperty)
                        .ThenInclude(t => t.IdSuitabilityNavigation)
                        .ThenInclude(t => t.TreeProperty)
                        .ThenInclude(t => t.IdTaxationYearsNavigation)
                        .SingleOrDefault();
            }
        }

        public TrialPlot GetPlotInfo(int leshosId, int plotNumber)
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                return context.TrialPlot.Where(tp => tp.IdLeshos == leshosId && tp.Number == plotNumber)
                    .Include(t => t.Tree)
                    .ThenInclude(t => t.IdBreedNavigation)
                    .ThenInclude(tp => tp.Tree)
                    .ThenInclude(tp => tp.TreeProperties)
                    .ThenInclude(tp => tp.IdTaxationYearsNavigation)
                    .SingleOrDefault();
            }
        }

        public PlotInfo GetSeparatedPlotInfo(int leshosId, int plotNumber)
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                var result = context.Tree.Where(t => t.IdPlotNavigation.Number == plotNumber && t.IdPlotNavigation.IdLeshosTypeNavigation.Id == leshosId).Include(t=> t.IdPlotNavigation).Include(t => t.TreeProperties).ToList();
                return SeparationPlotBuild(50, 100, result, false);

            }
        }

        private PlotInfo SeparationPlotBuild(int length, int weight, List<Tree> trees, bool reCalculate)
        {
            PlotInfo plot = new PlotInfo();
            RowPlot row = new RowPlot();
            int kvadratSize = 5;
            int currentX = 0;
            int currentY = 0;
            int currentNumber = 1;

            while (currentX != weight || currentY != length)
            {

                if (currentX > weight && currentY + kvadratSize > length)
                {
                    currentX = 0;
                    currentY = length;
                }


                if (currentX + kvadratSize < length)
                {
                    List<Tree> temp = null;
                    if (reCalculate)
                    {
                        temp = trees.Where(t => (t.X >= currentX && t.X <= currentX + kvadratSize) && (t.Y >= currentY && t.Y <= currentY + kvadratSize)).ToList();
                    }
                    else
                    {
                        temp = trees.Where(t => (t.X >= currentX && t.X <= currentX + kvadratSize) && (t.Y >= currentY && t.Y <= currentY + kvadratSize)).ToList();
                    }
                    foreach (var tree in temp)
                    {
                        tree.NumberKvadrata = currentNumber;
                        if (reCalculate)
                        {
                            tree.X = tree.X - currentX;
                            tree.Y = tree.Y - currentY;
                        }
                        row.Tree.Add(tree);
                    }
                    currentX += kvadratSize;
                    currentNumber++;
                }
                else
                {
                    List<Tree> temp = null;
                    if (reCalculate)
                    {
                        temp = trees.Where(t => (t.X >= currentX && t.X <= currentX + kvadratSize) && (t.Y >= currentY && t.Y <= currentY + kvadratSize)).ToList();
                    }
                    else
                    {
                        temp = trees.Where(t => (t.X >= currentX && t.X <= currentX + kvadratSize) && (t.Y >= currentY && t.Y <= currentY + kvadratSize)).ToList();
                    }
                    foreach (var tree in temp)
                    {
                        tree.NumberKvadrata = currentNumber;
                        if (reCalculate)
                        {
                            tree.X = tree.X - currentX;
                            tree.Y = tree.Y - currentY;
                        }
                        row.Tree.Add(tree);
                    }
                    currentNumber++;
                    currentY += kvadratSize;
                    if (currentY == length)
                        currentX = weight;
                    else {
                        currentX = 0;
                        plot.Row.Add(row);
                        row = new RowPlot();
                    }

                }
                
            }
            plot.KvadratCount = currentNumber - 1;
            return plot;

        }
    }
}
