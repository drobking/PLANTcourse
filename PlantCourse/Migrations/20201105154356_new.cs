using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantCourse.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserAdditioanalInfoId",
                table: "Plants",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
