using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Conference_Booking.API.Migrations
{
    /// <inheritdoc />
    public partial class RoomEnhancements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ConferenceRooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "ConferenceRooms",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ConferenceRooms");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "ConferenceRooms");
        }
    }
}
