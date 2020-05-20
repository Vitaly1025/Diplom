using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddedSomeProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "FormaKrHorizontal",
                table: "st_tree_characteristics",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FormaKrVertical",
                table: "st_tree_characteristics",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "HMaxKr",
                table: "st_tree_characteristics",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Jar",
                table: "st_tree_characteristics",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pokolenie",
                table: "st_tree_characteristics",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
