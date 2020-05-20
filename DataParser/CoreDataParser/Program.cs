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
        public static List<TechnicalSuitability> techCategory;
        public static List<Breed> breedsCategory;
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
        public static TaxationYears TaxationYear = new TaxationYears() { Year = 2019 };
        public static Leshos Leshos;
        public static TrialPlot TrialPlot;
        private static void BuildSpravochniki()
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                context.TechnicalSuitability.AddRange(techCategory.Where(tc => !context.TechnicalSuitability.Any(t => t.Chipher == tc.Chipher && t.Name == tc.Name)));
                context.СraftСategory.AddRange(craftCategory.Where(tc => !context.СraftСategory.Any(t => t.Chipher == tc.Chipher && t.Name == tc.Name)));
                context.Breed.AddRange(breedsCategory.Where(tc => !context.Breed.Any(t => t.Cipher == tc.Cipher && t.Name == tc.Name)));
                var checkYears = context.TaxationYear.Where(ty => ty.Year == TaxationYear.Year).FirstOrDefault();
                if (checkYears != null)
                {
                    TaxationYear = context.TaxationYear.Where(ty => ty.Year == TaxationYear.Year).FirstOrDefault();
                }
                else
                {
                    context.TaxationYear.Add(TaxationYear);
                }
                context.SaveChanges();
            }
        }
        private static void BuildLeshos(Leshos leshos)
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                var check = context.Leshos.Where(l => l.Kvartal == leshos.Kvartal && l.Lesnichestvo == leshos.Lesnichestvo && l.Name == leshos.Name && l.Vydel == leshos.Vydel);
                if(check.FirstOrDefault() != null)
                {
                    Leshos = check.FirstOrDefault();
                }
                else
                {
                    context.Leshos.Add(leshos);
                    Leshos = leshos;
                }
                context.SaveChanges();
            }
        }
        private static void BuildTrialPlot(TrialPlot plot)
        {
            using (var context = new ConstantTrialPlotsContext())
            {
                var check = context.TrialPlot.Where(p => p.Az == plot.Az && p.IdLeshos == plot.IdLeshos && p.Length == plot.Length && p.Number == plot.Number && p.Square == plot.Square && p.Weight == plot.Weight && p.X == plot.X && p.Y == plot.Y);
                if (check.FirstOrDefault() != null)
                {
                    TrialPlot = check.FirstOrDefault();
                }
                else
                {
                    context.TrialPlot.Add(plot);
                    TrialPlot = plot;
                }
                context.SaveChanges();
            }
        }

        static void Main(string[] args)
        {

            try
            {

                Application xlApp = new Application();
                Workbook xlWorkBook = xlApp.Workbooks.Open(NameExcel, 0, true, 5, "", "", true, XlPlatform.xlWindows, "\t", false, false, 0, true, 1, 0);
                Worksheet xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
                Range range = xlWorkSheet.UsedRange;
                techCategory = GetTechnicalSuitability(range);
                breedsCategory = GetBreeds(range);
                BuildSpravochniki();
                BuildLeshos(GetLeshoz(range));
                BuildTrialPlot(GetTrialPlot(range));
                GetListTree(range);

                //var trialPlot = BuildTrialPlot(range);
                //var trees = GetListTree(range);
                //trialPlot.Tree = trees;
                //year.IdPlotNavigation = trialPlot;
                //Task.Run(() => InsertAllData(year));
                Console.ReadKey();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //private async static Task InsertAllData(Years year)
        //{
        //    Console.WriteLine("Inserting wait..");
        //    try
        //    {
        //        using (var context = new ConstantTrialPlotsContext())
        //        {

        //            foreach (var tree in year.IdPlotNavigation.Tree)
        //            {
        //                tree.IdPlotNavigation = year.IdPlotNavigation;

        //                if (!context.СraftСategory.Contains(tree.IdPropertyNavigation.IdCraftNavigation))
        //                    context.СraftСategory.Add(tree.IdPropertyNavigation.IdCraftNavigation);
        //                if (!context.TechnicalSuitability.Contains(tree.IdPropertyNavigation.IdSuitabilityNavigation))
        //                    context.TechnicalSuitability.Add(tree.IdPropertyNavigation.IdSuitabilityNavigation);
        //                await context.SaveChangesAsync();
        //                if (!context.TreeProperty.Contains(tree.IdPropertyNavigation))
        //                    context.TreeProperty.Add(tree.IdPropertyNavigation);
        //                await context.SaveChangesAsync();
        //                if (!context.Tree.Contains(tree))
        //                    context.Tree.Add(tree);
        //                await context.SaveChangesAsync();
        //                Thread.Sleep(10);
        //            }
        //            //context.TrialPlot.Add(year.IdPlotNavigation);
        //            //await context.SaveChangesAsync();
        //            context.Years.Add(year);
        //            await context.SaveChangesAsync();
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }

        //}

        private static TrialPlot GetTrialPlot(Range range)
        {
            return new TrialPlot()
            {
                Az = 90,
                Length = 100,
                Weight = 50,
                Number = (int)(range.Cells[1, 3] as Range).Value2,
                IdLeshos = Leshos.Id
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

        private static string CheckBreedName(string chipher)
        {
            switch (chipher)
            {
                case "Б":
                    return "Береза";
                case "Е":
                    return "Ель";
                case "С":
                    return "Сосна";
                default:
                    return "хз";
            }
        }
        private static List<Breed> GetBreeds(Range range)
        {
            List<Breed> breeds = new List<Breed>();
            int raw = 19;
            while (!((range.Cells[raw, 1] as Range).Value2 is null))
            {
                breeds.Add(new Breed() { Cipher = (string)(range.Cells[raw, 4] as Range).Value2, Name = CheckBreedName((string)(range.Cells[raw, 4] as Range).Value2) });
                raw++;
            }
            return breeds;
        }
        private static ICollection<Tree> GetListTree(Range range)
        {
            List<Tree> trees = new List<Tree>();
            int raw = 19;

            while (!((range.Cells[raw, 1] as Range).Value2 is null))
            {

                using (var context = new ConstantTrialPlotsContext())
                {
                    var tree = new Tree()
                    {
                        IdPlot = TrialPlot.Id,
                        Number = (int)(range.Cells[raw, 1] as Range).Value2,
                        X = (double)(range.Cells[raw, 2] as Range).Value2,
                        Y = (double)(range.Cells[raw, 3] as Range).Value2,
                        IdBreed = context.Breed.ToList().FirstOrDefault(e => e.Cipher == (range.Cells[raw, 4] as Range).Value2).Id,
                    };

                    context.Tree.Add(tree);
                    context.SaveChanges();
                    var property = new TreeProperty
                    {
                        Age = (int)(range.Cells[raw, 6] as Range).Value2,
                        DiametrNs = (double)(range.Cells[raw, 7] as Range).Value2,
                        DiametrWe = (double)(range.Cells[raw, 9] as Range).Value2,
                        Height = (double)(range.Cells[raw, 10] as Range).Value2,
                        CrownDiametrNs = (range.Cells[raw, 11] as Range).Value2 as double?,
                        CrownDiametrWe = (range.Cells[raw, 12] as Range).Value2 as double?,
                        CrownLength = (range.Cells[raw, 14] as Range).Value2 as double?,
                        IdCraft = context.СraftСategory.ToList().FirstOrDefault(c => c.Chipher == ArabToRim((int?)(range.Cells[raw, 15] as Range).Value2)).Id,
                        IdSuitability = context.TechnicalSuitability.ToList().FirstOrDefault(t => t.Chipher == (string)(range.Cells[raw, 16] as Range).Value2).Id,
                        IdTaxationYears = TaxationYear.Id,
                        IdTree = tree.Id
                    };

                    context.TreeProperty.Add(property);
                    context.SaveChanges();
                }
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

        private static Leshos GetLeshoz(Range range)
        {
            return new Leshos()
            {
                Name = (range.Cells[3, 2] as Range).Value2,
                Lesnichestvo = (range.Cells[3, 6] as Range).Value2,
                Kvartal = (int)(range.Cells[4, 2] as Range).Value2,
                IdForestTypeNavigation = new ForestType(),
                Vydel = (int)(range.Cells[4, 4] as Range).Value2,
            };
        }
    }
}
