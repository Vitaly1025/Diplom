using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sp_category_craft",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    chipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sp_category_craft", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sp_por",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    cipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sp_por", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sp_techn_godnosti",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    chipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sp_techn_godnosti", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "sp_tl",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    cipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sp_tl", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "st_taxation_year",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_taxation_year", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "st_leshoz",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_tl = table.Column<int>(nullable: false),
                    name = table.Column<string>(maxLength: 255, nullable: false),
                    lesnich = table.Column<string>(maxLength: 255, nullable: false),
                    kv = table.Column<int>(nullable: false),
                    vydel = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_leshoz", x => x.id);
                    table.ForeignKey(
                        name: "Leshos_fk0",
                        column: x => x.id_tl,
                        principalTable: "sp_tl",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "st_trial_plot",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    number = table.Column<int>(nullable: false),
                    x = table.Column<double>(nullable: false),
                    y = table.Column<double>(nullable: false),
                    Az = table.Column<double>(nullable: false),
                    length = table.Column<double>(nullable: false),
                    weight = table.Column<int>(nullable: false),
                    square = table.Column<double>(nullable: false),
                    id_leshoz = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_trial_plot", x => x.id);
                    table.ForeignKey(
                        name: "TrialPlot_fk0",
                        column: x => x.id_leshoz,
                        principalTable: "st_leshoz",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "st_privjazka",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdPlot = table.Column<int>(nullable: false),
                    number = table.Column<int>(nullable: false),
                    az = table.Column<double>(nullable: false),
                    l = table.Column<int>(nullable: false),
                    IdPlotNavigationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_privjazka", x => x.id);
                    table.ForeignKey(
                        name: "FK_st_privjazka_st_trial_plot_IdPlotNavigationId",
                        column: x => x.IdPlotNavigationId,
                        principalTable: "st_trial_plot",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "st_tree",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_plot = table.Column<int>(nullable: false),
                    number_kvadrata = table.Column<int>(nullable: false),
                    NumberKvadrata = table.Column<int>(nullable: false),
                    x = table.Column<double>(nullable: false),
                    y = table.Column<double>(nullable: false),
                    id_sp_por = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_tree", x => x.id);
                    table.ForeignKey(
                        name: "Tree_fk1",
                        column: x => x.id_sp_por,
                        principalTable: "sp_por",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Tree_fk0",
                        column: x => x.id_plot,
                        principalTable: "st_trial_plot",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "st_tree_characteristics",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year_taxation = table.Column<int>(nullable: false),
                    voz = table.Column<int>(nullable: false),
                    h = table.Column<double>(nullable: false),
                    h_nach_kr = table.Column<double>(nullable: true),
                    d_ns = table.Column<double>(nullable: false),
                    d_ws = table.Column<double>(nullable: false),
                    d_kr_ns = table.Column<double>(nullable: true),
                    d_kr_we = table.Column<double>(nullable: true),
                    id_sp_techn = table.Column<int>(nullable: false),
                    id_sp_craft = table.Column<int>(nullable: false),
                    IdTree = table.Column<int>(nullable: false),
                    IdTaxationYears = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_st_tree_characteristics", x => x.id);
                    table.ForeignKey(
                        name: "TreeProperty_fk1",
                        column: x => x.id_sp_craft,
                        principalTable: "sp_category_craft",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "TreeProperty_fk0",
                        column: x => x.id_sp_techn,
                        principalTable: "sp_techn_godnosti",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "TreeProperty_fk3",
                        column: x => x.IdTaxationYears,
                        principalTable: "st_taxation_year",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "TreeProperty_fk2",
                        column: x => x.IdTree,
                        principalTable: "st_tree",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_st_leshoz_id_tl",
                table: "st_leshoz",
                column: "id_tl");

            migrationBuilder.CreateIndex(
                name: "IX_st_privjazka_IdPlotNavigationId",
                table: "st_privjazka",
                column: "IdPlotNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_id_sp_por",
                table: "st_tree",
                column: "id_sp_por");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_id_plot",
                table: "st_tree",
                column: "id_plot");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_characteristics_id_sp_craft",
                table: "st_tree_characteristics",
                column: "id_sp_craft");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_characteristics_id_sp_techn",
                table: "st_tree_characteristics",
                column: "id_sp_techn");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_characteristics_IdTaxationYears",
                table: "st_tree_characteristics",
                column: "IdTaxationYears");

            migrationBuilder.CreateIndex(
                name: "IX_st_tree_characteristics_IdTree",
                table: "st_tree_characteristics",
                column: "IdTree");

            migrationBuilder.CreateIndex(
                name: "IX_st_trial_plot_id_leshoz",
                table: "st_trial_plot",
                column: "id_leshoz");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "st_privjazka");

            migrationBuilder.DropTable(
                name: "st_tree_characteristics");

            migrationBuilder.DropTable(
                name: "sp_category_craft");

            migrationBuilder.DropTable(
                name: "sp_techn_godnosti");

            migrationBuilder.DropTable(
                name: "st_taxation_year");

            migrationBuilder.DropTable(
                name: "st_tree");

            migrationBuilder.DropTable(
                name: "sp_por");

            migrationBuilder.DropTable(
                name: "st_trial_plot");

            migrationBuilder.DropTable(
                name: "st_leshoz");

            migrationBuilder.DropTable(
                name: "sp_tl");
        }
    }
}
