using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Breed",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    cipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Breed", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ForestType",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    cipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForestType", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TechnicalSuitability",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    chipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechnicalSuitability", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TrialPlot",
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
                    square = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrialPlot", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "СraftСategory",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    chipher = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_СraftСategory", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Years",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<int>(nullable: false),
                    id_forestType = table.Column<int>(nullable: false),
                    id_plot = table.Column<int>(nullable: false),
                    leshoz = table.Column<string>(maxLength: 255, nullable: false),
                    lesnichestvo = table.Column<string>(maxLength: 255, nullable: false),
                    kvartal = table.Column<int>(nullable: false),
                    vydel = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Years", x => x.id);
                    table.ForeignKey(
                        name: "Years_fk0",
                        column: x => x.id_forestType,
                        principalTable: "ForestType",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Years_fk1",
                        column: x => x.id_plot,
                        principalTable: "TrialPlot",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TreeProperty",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    taxationYear = table.Column<int>(nullable: false),
                    age = table.Column<int>(nullable: false),
                    height = table.Column<double>(nullable: false),
                    crownLength = table.Column<double>(nullable: true),
                    diametrNS = table.Column<double>(nullable: false),
                    diametrWE = table.Column<double>(nullable: false),
                    crown_diametrNS = table.Column<double>(nullable: true),
                    crown_diametrWE = table.Column<double>(nullable: true),
                    id_suitability = table.Column<int>(nullable: false),
                    id_craft = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreeProperty", x => x.id);
                    table.ForeignKey(
                        name: "TreeProperty_fk1",
                        column: x => x.id_craft,
                        principalTable: "СraftСategory",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "TreeProperty_fk0",
                        column: x => x.id_suitability,
                        principalTable: "TechnicalSuitability",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tree",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_plot = table.Column<int>(nullable: false),
                    number = table.Column<int>(nullable: false),
                    x = table.Column<double>(nullable: false),
                    y = table.Column<double>(nullable: false),
                    id_breed = table.Column<int>(nullable: false),
                    id_property = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tree", x => x.id);
                    table.ForeignKey(
                        name: "Tree_fk1",
                        column: x => x.id_breed,
                        principalTable: "Breed",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Tree_fk0",
                        column: x => x.id_plot,
                        principalTable: "TrialPlot",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "Tree_fk2",
                        column: x => x.id_property,
                        principalTable: "TreeProperty",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tree_id_breed",
                table: "Tree",
                column: "id_breed");

            migrationBuilder.CreateIndex(
                name: "IX_Tree_id_plot",
                table: "Tree",
                column: "id_plot");

            migrationBuilder.CreateIndex(
                name: "IX_Tree_id_property",
                table: "Tree",
                column: "id_property");

            migrationBuilder.CreateIndex(
                name: "IX_TreeProperty_id_craft",
                table: "TreeProperty",
                column: "id_craft");

            migrationBuilder.CreateIndex(
                name: "IX_TreeProperty_id_suitability",
                table: "TreeProperty",
                column: "id_suitability");

            migrationBuilder.CreateIndex(
                name: "IX_Years_id_forestType",
                table: "Years",
                column: "id_forestType");

            migrationBuilder.CreateIndex(
                name: "IX_Years_id_plot",
                table: "Years",
                column: "id_plot");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tree");

            migrationBuilder.DropTable(
                name: "Years");

            migrationBuilder.DropTable(
                name: "Breed");

            migrationBuilder.DropTable(
                name: "TreeProperty");

            migrationBuilder.DropTable(
                name: "ForestType");

            migrationBuilder.DropTable(
                name: "TrialPlot");

            migrationBuilder.DropTable(
                name: "СraftСategory");

            migrationBuilder.DropTable(
                name: "TechnicalSuitability");
        }
    }
}
