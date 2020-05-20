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
        public virtual DbSet<TaxationYears> TaxationYear { get; set; }
        public virtual DbSet<Leshos> Leshos { get; set; }
        public virtual DbSet<Privyazka> Privyazka { get; set; }
        public virtual DbSet<СraftСategory> СraftСategory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=172.16.193.234;Database=ConstantTrialPlots;Username=postgres;Password=postgres");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Breed>(entity =>
            {
                entity.ToTable("sp_por");
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
                entity.ToTable("sp_tl");
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
                entity.ToTable("sp_techn_godnosti");
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
                entity.ToTable("st_tree");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdBreed).HasColumnName("id_sp_por");

                entity.Property(e => e.IdPlot).HasColumnName("id_plot");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.NumberKvadrata).HasColumnName("number_kvadrata");

                entity.Property(e => e.X).HasColumnName("x");

                entity.Property(e => e.Y).HasColumnName("y");

                entity.HasOne(d => d.IdPlotNavigation)
                    .WithMany(p => p.Tree)
                    .HasForeignKey(d => d.IdPlot)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Tree_fk0");

                entity.HasOne(d => d.IdBreedNavigation)
                    .WithMany(p => p.Tree)
                    .HasForeignKey(d => d.IdBreed)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Tree_fk1");
            });

            modelBuilder.Entity<TreeProperty>(entity =>
            {
                entity.ToTable("st_tree_characteristics");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Age).HasColumnName("voz");

                entity.Property(e => e.CrownDiametrNs).HasColumnName("d_kr_ns");

                entity.Property(e => e.CrownDiametrWe).HasColumnName("d_kr_we");

                entity.Property(e => e.CrownLength).HasColumnName("h_nach_kr");

                entity.Property(e => e.DiametrNs).HasColumnName("d_ns");

                entity.Property(e => e.DiametrWe).HasColumnName("d_ws");

                entity.Property(e => e.Height).HasColumnName("h");

                entity.Property(e => e.IdCraft).HasColumnName("id_sp_craft");

                entity.Property(e => e.IdSuitability).HasColumnName("id_sp_techn");

                entity.Property(e => e.TaxationYear).HasColumnName("year_taxation");

                entity.HasOne(d => d.IdSuitabilityNavigation)
                    .WithMany(p => p.TreeProperty)
                    .HasForeignKey(d => d.IdSuitability)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TreeProperty_fk0");

                entity.HasOne(d => d.IdCraftNavigation)
                    .WithMany(p => p.TreeProperty)
                    .HasForeignKey(d => d.IdCraft)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TreeProperty_fk1");

                entity.HasOne(d => d.IdTreeNavigation)
                    .WithMany(p => p.TreeProperties)
                    .HasForeignKey(d => d.IdTree)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TreeProperty_fk2");

                entity.HasOne(d => d.IdTaxationYearsNavigation)
                   .WithMany(p => p.TreeProperties)
                   .HasForeignKey(d => d.IdTaxationYears)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("TreeProperty_fk3");

            });

            modelBuilder.Entity<TaxationYears>(entity =>
            {
                entity.ToTable("st_taxation_year");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Year).HasColumnName("year");
            });

                modelBuilder.Entity<Privyazka>(entity =>
            {
                entity.ToTable("st_privjazka");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.Az).HasColumnName("az");

                entity.Property(e => e.L).HasColumnName("l");

            });

            modelBuilder.Entity<TrialPlot>(entity =>
            {
                entity.ToTable("st_trial_plot");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Length).HasColumnName("length");

                entity.Property(e => e.IdLeshos).HasColumnName("id_leshoz");

                entity.Property(e => e.Number).HasColumnName("number");

                entity.Property(e => e.Square).HasColumnName("square");

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.Property(e => e.X).HasColumnName("x");

                entity.Property(e => e.Y).HasColumnName("y");

                entity.HasOne(d => d.IdLeshosTypeNavigation)
                   .WithMany(p => p.TrialPlots)
                   .HasForeignKey(d => d.IdLeshos)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("TrialPlot_fk0");
            });

            modelBuilder.Entity<Leshos>(entity =>
            {
                entity.ToTable("st_leshoz");
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdForestType).HasColumnName("id_tl");

                entity.Property(e => e.Kvartal).HasColumnName("kv");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255);

                entity.Property(e => e.Lesnichestvo)
                    .IsRequired()
                    .HasColumnName("lesnich")
                    .HasMaxLength(255);

                entity.Property(e => e.Vydel).HasColumnName("vydel");

                entity.HasOne(d => d.IdForestTypeNavigation)
                    .WithMany(p => p.Leshos)
                    .HasForeignKey(d => d.IdForestType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Leshos_fk0");
            });

            modelBuilder.Entity<СraftСategory>(entity =>
            {
                entity.ToTable("sp_category_craft");
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
