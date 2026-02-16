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

            

            var existingRoomNames = await context.ConferenceRooms
                .Select(r => r.Name)
                .ToListAsync();

            var roomsToSeed = new List<ConferenceRoom>
            {
                new ConferenceRoom("Room A", RoomCapacity.Twenty, "First Floor", true),
                new ConferenceRoom("Room B", RoomCapacity.Forty, "Second Floor", false),
                new ConferenceRoom("Room C", RoomCapacity.Sixty, "Cape Town", true),
                new ConferenceRoom("Room D", RoomCapacity.Ten, "Cape Town", true),
                new ConferenceRoom("Room E", RoomCapacity.Twenty, "Johannesburg", true),
                new ConferenceRoom("Room F", RoomCapacity.Forty, "Durban", true)
            };

            foreach (var room in roomsToSeed)
            {
                if (!existingRoomNames.Contains(room.Name))
                {
                    context.ConferenceRooms.Add(room);
                }
            }

            await context.SaveChangesAsync();

            // ----------------------
            // BOOKINGS
            // ----------------------

            if (!await context.Bookings.AnyAsync())
            {
                var activeRoom = await context.ConferenceRooms
                    .FirstAsync(r => r.IsActive);

                var booking = new Booking(
                    activeRoom,
                    DateTime.UtcNow.AddHours(1),
                    DateTime.UtcNow.AddHours(2)
                );

                booking.Confirm();

                context.Bookings.Add(booking);
                await context.SaveChangesAsync();
            }
        }
    }
}