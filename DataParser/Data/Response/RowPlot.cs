using Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Response
{

    public class PlotInfo : TrialPlot
    {
        public List<RowPlot> Row { get; set; } = new List<RowPlot>();
        public int KvadratCount { get; set; }
    }
    public class RowPlot
    {
        public int RowNumber { get; set; }
        public List<Tree> Tree { get; set; } = new List<Tree>();
    }
}
