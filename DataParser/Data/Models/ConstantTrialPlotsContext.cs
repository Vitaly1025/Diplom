using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Data.Models
{
    public partial class ConstantTrialPlotsContext : DbContext
    {
        public ConstantTrialPlotsContext()
        {
        }

        public ConstantTrialPlotsContext(DbContextOptions<ConstantTrialPlotsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Breed> Breed { get; set; }
        public virtual DbSet<ForestType> ForestType { get; set; }
        public virtual DbSet<TechnicalSuitability> TechnicalSuitability { get; set; }
        public virtual DbSet<Tree> Tree { get; set; }
        public virtual DbSet<TreeProperty> TreeProperty { get; set; }
        public virtual DbSet<TrialPlot> TrialPlot { get; set; }
        public virtual DbSet<Years> Years { get; set; }
        public virtual DbSet<СraftСategory> СraftСategory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=172.16.193.234;Database=ConstantTrialPlots;Username=postgres;Password=postgres");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Breed>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cipher)
                    .HasColumnName("cipher")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<ForestType>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cipher)
                    .HasColumnName("cipher")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<TechnicalSuitability>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Chipher)
                    .HasColumnName("chipher")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<Tree>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdBreed).HasColumnName("id_breed");

                entity.Property(e => e.IdPlot).HasColumnName("id_plot");

                entity.Property(e => e.IdProperty).HasColumnName("id_property");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.X).HasColumnName("x");

                entity.Property(e => e.Y).HasColumnName("y");

                entity.HasOne(d => d.IdBreedNavigation)
                    .WithMany(p => p.Tree)
                    .HasForeignKey(d => d.IdBreed)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Tree_fk1");

                entity.HasOne(d => d.IdPlotNavigation)
                    .WithMany(p => p.Tree)
                    .HasForeignKey(d => d.IdPlot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Tree_fk0");

                entity.HasOne(d => d.IdPropertyNavigation)
                    .WithMany(p => p.Tree)
                    .HasForeignKey(d => d.IdProperty)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Tree_fk2");
            });

            modelBuilder.Entity<TreeProperty>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.CrownDiametrNs).HasColumnName("crown_diametrNS");

                entity.Property(e => e.CrownDiametrWe).HasColumnName("crown_diametrWE");

                entity.Property(e => e.CrownLength).HasColumnName("crownLength");

                entity.Property(e => e.DiametrNs).HasColumnName("diametrNS");

                entity.Property(e => e.DiametrWe).HasColumnName("diametrWE");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.IdCraft).HasColumnName("id_craft");

                entity.Property(e => e.IdSuitability).HasColumnName("id_suitability");

                entity.Property(e => e.TaxationYear).HasColumnName("taxationYear");

                entity.HasOne(d => d.IdCraftNavigation)
                    .WithMany(p => p.TreeProperty)
                    .HasForeignKey(d => d.IdCraft)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TreeProperty_fk1");

                entity.HasOne(d => d.IdSuitabilityNavigation)
                    .WithMany(p => p.TreeProperty)
                    .HasForeignKey(d => d.IdSuitability)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TreeProperty_fk0");
            });

            modelBuilder.Entity<TrialPlot>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Length).HasColumnName("length");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.Square).HasColumnName("square");

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.Property(e => e.X).HasColumnName("x");

                entity.Property(e => e.Y).HasColumnName("y");
            });

            modelBuilder.Entity<Years>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdForestType).HasColumnName("id_forestType");

                entity.Property(e => e.IdPlot).HasColumnName("id_plot");

                entity.Property(e => e.Kvartal).HasColumnName("kvartal");

                entity.Property(e => e.Leshoz)
                    .IsRequired()
                    .HasColumnName("leshoz")
                    .HasMaxLength(255);

                entity.Property(e => e.Lesnichestvo)
                    .IsRequired()
                    .HasColumnName("lesnichestvo")
                    .HasMaxLength(255);

                entity.Property(e => e.Vydel).HasColumnName("vydel");

                entity.Property(e => e.Year).HasColumnName("year");

                entity.HasOne(d => d.IdForestTypeNavigation)
                    .WithMany(p => p.Years)
                    .HasForeignKey(d => d.IdForestType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Years_fk0");

                entity.HasOne(d => d.IdPlotNavigation)
                    .WithMany(p => p.Years)
                    .HasForeignKey(d => d.IdPlot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Years_fk1");
            });

            modelBuilder.Entity<СraftСategory>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Chipher)
                    .HasColumnName("chipher")
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
