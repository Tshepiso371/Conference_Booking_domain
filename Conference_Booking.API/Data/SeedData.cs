using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Conference_Booking.API.Data
{
    public static class SeedData
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            await context.Database.MigrateAsync();

            // ----------------------
            // ROOMS
            // ----------------------
            if (!context.ConferenceRooms.Any())
            {
                var activeRoom = new ConferenceRoom("Room A", RoomCapacity.Twenty);
                var inactiveRoom = new ConferenceRoom("Room B", RoomCapacity.Forty);

                inactiveRoom.SetInactive(); // if you don't have this, we’ll fix it below

                context.ConferenceRooms.AddRange(activeRoom, inactiveRoom);
                await context.SaveChangesAsync();
            }

            // ----------------------
            // BOOKINGS
            // ----------------------
            if (!context.Bookings.Any())
            {
                var room = await context.ConferenceRooms.FirstAsync(r => r.IsActive);

                var booking = new Booking(
                    room,
                    DateTime.UtcNow.AddHours(1),
                    DateTime.UtcNow.AddHours(2)
                );

                booking.Confirm(); // Non-default status

                context.Bookings.Add(booking);
                await context.SaveChangesAsync();
            }
        }
    }
}