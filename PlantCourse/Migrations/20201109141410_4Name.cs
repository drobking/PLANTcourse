using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantCourse.Migrations
{
    public partial class _4Name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Plants_UserAdditioanalInfos_UserAdditioanalInfoId",
                table: "Plants");

            migrationBuilder.DropIndex(
                name: "IX_Plants_UserAdditioanalInfoId",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "UserAdditioanalInfoId",
                table: "Plants");

            migrationBuilder.CreateTable(
                name: "usersAndPlants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nameUser = table.Column<string>(nullable: true),
                    namePlant = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usersAndPlants", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "usersAndPlants");

            migrationBuilder.AddColumn<string>(
                name: "UserAdditioanalInfoId",
                table: "Plants",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Plants_UserAdditioanalInfoId",
                table: "Plants",
                column: "UserAdditioanalInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_UserAdditioanalInfos_UserAdditioanalInfoId",
                table: "Plants",
                column: "UserAdditioanalInfoId",
                principalTable: "UserAdditioanalInfos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
