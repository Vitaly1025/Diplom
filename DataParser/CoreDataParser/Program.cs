using Data.Models;
using Microsoft.Office.Interop.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Range = Microsoft.Office.Interop.Excel.Range;

namespace CoreDataParser
{
    class Program
    {
        private static string NameExcel = @"F:\Учёба\ДИПЛОМ\St-27_103_3_2019.xls";
        public static List<TechnicalSuitability> techCategory = null;
        public static ICollection<СraftСategory> craftCategory = new List<СraftСategory>() {
            new СraftСategory()
            {
                Chipher = "I"
            },
            new СraftСategory()
            {
                Chipher = "II"
            },
            new СraftСategory()
            {
                Chipher = "III"
            },
            new СraftСategory()
            {
                Chipher = "IV"
            }
        };

        static void Main(string[] args)
        {

            Application xlApp = new Application();
            Workbook xlWorkBook = xlApp.Workbooks.Open(NameExcel, 0, true, 5, "", "", true, XlPlatform.xlWindows, "\t", false, false, 0, true, 1, 0);
            Worksheet xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
            Range range = xlWorkSheet.UsedRange;
            techCategory = GetTechnicalSuitability(range);
            var year = GetYears(range);
            var trialPlot = BuildTrialPlot(range);
            var trees = GetListTree(range);
            trialPlot.Tree = trees;
            year.IdPlotNavigation = trialPlot;
            Task.Run(() => InsertAllData(year));
            Console.ReadKey();
        }

        private async static Task InsertAllData(Years year)
        {
            Console.WriteLine("Inserting wait..");
            try
            {
                using (var context = new ConstantTrialPlotsContext())
                {
                    
                    foreach (var tree in year.IdPlotNavigation.Tree)
                    {
                        tree.IdPlotNavigation = year.IdPlotNavigation;

                        if (!context.СraftСategory.Contains(tree.IdPropertyNavigation.IdCraftNavigation))
                            context.СraftСategory.Add(tree.IdPropertyNavigation.IdCraftNavigation);
                        if (!context.TechnicalSuitability.Contains(tree.IdPropertyNavigation.IdSuitabilityNavigation))
                            context.TechnicalSuitability.Add(tree.IdPropertyNavigation.IdSuitabilityNavigation);
                        await context.SaveChangesAsync();
                        if (!context.TreeProperty.Contains(tree.IdPropertyNavigation))
                            context.TreeProperty.Add(tree.IdPropertyNavigation);
                        await context.SaveChangesAsync();
                        if (!context.Tree.Contains(tree))
                            context.Tree.Add(tree);
                        await context.SaveChangesAsync();
                        Thread.Sleep(10);
                    }
                    //context.TrialPlot.Add(year.IdPlotNavigation);
                    //await context.SaveChangesAsync();
                    context.Years.Add(year);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }

        private static TrialPlot BuildTrialPlot(Range range)
        {
            return new TrialPlot()
            {
                Az = 90,
                Length = 100,
                Weight = 50,
                Number = (int)(range.Cells[1, 3] as Range).Value2
            };
        }

        private static List<TechnicalSuitability> GetTechnicalSuitability(Range range)
        {
            return new List<TechnicalSuitability>()
            {
                new TechnicalSuitability()
                {
                    Chipher = (range.Cells[2, 10] as Range).Value2,
                    Name = (range.Cells[2, 11] as Range).Value2
                },
                new TechnicalSuitability()
                {
                    Chipher = (range.Cells[2, 13] as Range).Value2,
                    Name = (range.Cells[2, 14] as Range).Value2
                },
                new TechnicalSuitability()
                {
                    Chipher = (range.Cells[3, 10] as Range).Value2,
                    Name = (range.Cells[3, 11] as Range).Value2
                },
                new TechnicalSuitability()
                {
                    Chipher = (range.Cells[3, 13] as Range).Value2,
                    Name = (range.Cells[3, 14] as Range).Value2
                }

            };
        }

        private static ICollection<Tree> GetListTree(Range range)
        {
            List<Tree> trees = new List<Tree>();
            int raw = 19;
            var trialPlot = BuildTrialPlot(range);
            var breed = new Breed();
            while (!((range.Cells[raw, 1] as Range).Value2 is null))
            {
                trees.Add(new Tree()
                {
                    Number = (int)(range.Cells[raw, 1] as Range).Value2,
                    X = (double)(range.Cells[raw, 2] as Range).Value2,
                    Y = (double)(range.Cells[raw, 3] as Range).Value2,
                    IdPlotNavigation = trialPlot,
                    IdBreedNavigation = breed,
                    IdPropertyNavigation = new TreeProperty
                    {
                        Age = (int)(range.Cells[raw, 6] as Range).Value2,
                        DiametrNs = (double)(range.Cells[raw, 7] as Range).Value2,
                        DiametrWe = (double)(range.Cells[raw, 9] as Range).Value2,
                        Height = (double)(range.Cells[raw, 10] as Range).Value2,
                        CrownDiametrNs = (range.Cells[raw, 11] as Range).Value2 as double?,
                        CrownDiametrWe = (range.Cells[raw, 12] as Range).Value2 as double?,
                        CrownLength = (range.Cells[raw, 14] as Range).Value2 as double?,
                        IdCraftNavigation = craftCategory.FirstOrDefault(c => c.Chipher == ArabToRim((int?)(range.Cells[raw, 15] as Range).Value2)),
                        IdSuitabilityNavigation = techCategory.FirstOrDefault(t => t.Chipher == (string)(range.Cells[raw, 16] as Range).Value2)
                    }
                });
                raw++;
            }
            return trees;
        }

        private static string ArabToRim(int? i)
        {
            string result = null;
            switch (i)
            {
                case 1:
                    result = "I";
                    break;
                case 2:
                    result = "II";
                    break;
                case 3:
                    result = "III";
                    break;
                case 4:
                    result = "IV";
                    break;
                default:
                    break;
            }
            return result;
        }

        private static Years GetYears(Range range)
        {
            return new Years()
            {
                Leshoz = (range.Cells[3, 2] as Range).Value2,
                Lesnichestvo = (range.Cells[3, 6] as Range).Value2,
                Kvartal = (int)(range.Cells[4, 2] as Range).Value2,
                IdForestTypeNavigation = new ForestType(),
                Vydel = (int)(range.Cells[4, 4] as Range).Value2
            };
        }
    }
}
