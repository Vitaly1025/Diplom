﻿// <auto-generated />
using System;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Data.Migrations
{
    [DbContext(typeof(ConstantTrialPlotsContext))]
    partial class ConstantTrialPlotsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Data.Models.Breed", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Cipher")
                        .HasColumnName("cipher")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("sp_por");
                });

            modelBuilder.Entity("Data.Models.ForestType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Cipher")
                        .HasColumnName("cipher")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("sp_tl");
                });

            modelBuilder.Entity("Data.Models.Leshos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("IdForestType")
                        .HasColumnName("id_tl")
                        .HasColumnType("integer");

                    b.Property<int>("Kvartal")
                        .HasColumnName("kv")
                        .HasColumnType("integer");

                    b.Property<string>("Lesnichestvo")
                        .IsRequired()
                        .HasColumnName("lesnich")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnName("name")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<int>("Vydel")
                        .HasColumnName("vydel")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("IdForestType");

                    b.ToTable("st_leshoz");
                });

            modelBuilder.Entity("Data.Models.Privyazka", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("Az")
                        .HasColumnName("az")
                        .HasColumnType("double precision");

                    b.Property<int>("IdPlot")
                        .HasColumnType("integer");

                    b.Property<int?>("IdPlotNavigationId")
                        .HasColumnType("integer");

                    b.Property<int>("L")
                        .HasColumnName("l")
                        .HasColumnType("integer");

                    b.Property<int>("Number")
                        .HasColumnName("number")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("IdPlotNavigationId");

                    b.ToTable("st_privjazka");
                });

            modelBuilder.Entity("Data.Models.TaxationYears", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Year")
                        .HasColumnName("year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("st_taxation_year");
                });

            modelBuilder.Entity("Data.Models.TechnicalSuitability", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Chipher")
                        .HasColumnName("chipher")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("sp_techn_godnosti");
                });

            modelBuilder.Entity("Data.Models.Tree", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("IdBreed")
                        .HasColumnName("id_sp_por")
                        .HasColumnType("integer");

                    b.Property<int>("IdPlot")
                        .HasColumnName("id_plot")
                        .HasColumnType("integer");

                    b.Property<int>("Number")
                        .HasColumnName("number")
                        .HasColumnType("integer");

                    b.Property<int>("NumberKvadrata")
                        .HasColumnName("number_kvadrata")
                        .HasColumnType("integer");

                    b.Property<double>("X")
                        .HasColumnName("x")
                        .HasColumnType("double precision");

                    b.Property<double>("Y")
                        .HasColumnName("y")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("IdBreed");

                    b.HasIndex("IdPlot");

                    b.ToTable("st_tree");
                });

            modelBuilder.Entity("Data.Models.TreeProperty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("Age")
                        .HasColumnName("voz")
                        .HasColumnType("integer");

                    b.Property<double?>("CrownDiametrNs")
                        .HasColumnName("d_kr_ns")
                        .HasColumnType("double precision");

                    b.Property<double?>("CrownDiametrWe")
                        .HasColumnName("d_kr_we")
                        .HasColumnType("double precision");

                    b.Property<double?>("CrownLength")
                        .HasColumnName("h_nach_kr")
                        .HasColumnType("double precision");

                    b.Property<double>("DiametrNs")
                        .HasColumnName("d_ns")
                        .HasColumnType("double precision");

                    b.Property<double>("DiametrWe")
                        .HasColumnName("d_ws")
                        .HasColumnType("double precision");

                    b.Property<string>("FormaKrHorizontal")
                        .HasColumnType("text");

                    b.Property<string>("FormaKrVertical")
                        .HasColumnType("text");

                    b.Property<double?>("HMaxKr")
                        .HasColumnType("double precision");

                    b.Property<double>("Height")
                        .HasColumnName("h")
                        .HasColumnType("double precision");

                    b.Property<int>("IdCraft")
                        .HasColumnName("id_sp_craft")
                        .HasColumnType("integer");

                    b.Property<int>("IdSuitability")
                        .HasColumnName("id_sp_techn")
                        .HasColumnType("integer");

                    b.Property<int>("IdTaxationYears")
                        .HasColumnType("integer");

                    b.Property<int>("IdTree")
                        .HasColumnType("integer");

                    b.Property<int?>("Jar")
                        .HasColumnType("integer");

                    b.Property<int?>("Pokolenie")
                        .HasColumnType("integer");

                    b.Property<int>("TaxationYear")
                        .HasColumnName("year_taxation")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("IdCraft");

                    b.HasIndex("IdSuitability");

                    b.HasIndex("IdTaxationYears");

                    b.HasIndex("IdTree");

                    b.ToTable("st_tree_characteristics");
                });

            modelBuilder.Entity("Data.Models.TrialPlot", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<double>("Az")
                        .HasColumnType("double precision");

                    b.Property<int>("IdLeshos")
                        .HasColumnName("id_leshoz")
                        .HasColumnType("integer");

                    b.Property<double>("Length")
                        .HasColumnName("length")
                        .HasColumnType("double precision");

                    b.Property<int>("Number")
                        .HasColumnName("number")
                        .HasColumnType("integer");

                    b.Property<double>("Square")
                        .HasColumnName("square")
                        .HasColumnType("double precision");

                    b.Property<int>("Weight")
                        .HasColumnName("weight")
                        .HasColumnType("integer");

                    b.Property<double>("X")
                        .HasColumnName("x")
                        .HasColumnType("double precision");

                    b.Property<double>("Y")
                        .HasColumnName("y")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("IdLeshos");

                    b.ToTable("st_trial_plot");
                });

            modelBuilder.Entity("Data.Models.СraftСategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Chipher")
                        .HasColumnName("chipher")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("character varying(255)")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("sp_category_craft");
                });

            modelBuilder.Entity("Data.Models.Leshos", b =>
                {
                    b.HasOne("Data.Models.ForestType", "IdForestTypeNavigation")
                        .WithMany("Leshos")
                        .HasForeignKey("IdForestType")
                        .HasConstraintName("Leshos_fk0")
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.Privyazka", b =>
                {
                    b.HasOne("Data.Models.TrialPlot", "IdPlotNavigation")
                        .WithMany()
                        .HasForeignKey("IdPlotNavigationId");
                });

            modelBuilder.Entity("Data.Models.Tree", b =>
                {
                    b.HasOne("Data.Models.Breed", "IdBreedNavigation")
                        .WithMany("Tree")
                        .HasForeignKey("IdBreed")
                        .HasConstraintName("Tree_fk1")
                        .IsRequired();

                    b.HasOne("Data.Models.TrialPlot", "IdPlotNavigation")
                        .WithMany("Tree")
                        .HasForeignKey("IdPlot")
                        .HasConstraintName("Tree_fk0")
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.TreeProperty", b =>
                {
                    b.HasOne("Data.Models.СraftСategory", "IdCraftNavigation")
                        .WithMany("TreeProperty")
                        .HasForeignKey("IdCraft")
                        .HasConstraintName("TreeProperty_fk1")
                        .IsRequired();

                    b.HasOne("Data.Models.TechnicalSuitability", "IdSuitabilityNavigation")
                        .WithMany("TreeProperty")
                        .HasForeignKey("IdSuitability")
                        .HasConstraintName("TreeProperty_fk0")
                        .IsRequired();

                    b.HasOne("Data.Models.TaxationYears", "IdTaxationYearsNavigation")
                        .WithMany("TreeProperties")
                        .HasForeignKey("IdTaxationYears")
                        .HasConstraintName("TreeProperty_fk3")
                        .IsRequired();

                    b.HasOne("Data.Models.Tree", "IdTreeNavigation")
                        .WithMany("TreeProperties")
                        .HasForeignKey("IdTree")
                        .HasConstraintName("TreeProperty_fk2")
                        .IsRequired();
                });

            modelBuilder.Entity("Data.Models.TrialPlot", b =>
                {
                    b.HasOne("Data.Models.Leshos", "IdLeshosTypeNavigation")
                        .WithMany("TrialPlots")
                        .HasForeignKey("IdLeshos")
                        .HasConstraintName("TrialPlot_fk0")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
