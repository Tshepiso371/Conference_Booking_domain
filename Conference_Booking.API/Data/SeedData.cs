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
               var activeRooms = await context.ConferenceRooms
             .Where(r => r.IsActive)
            .ToListAsync();

          if (activeRooms.Count >= 3)
         {
            var bookings = new List<Booking>
{
    new Booking(activeRooms[0],
        DateTime.UtcNow.AddHours(1),
        DateTime.UtcNow.AddHours(2),
        "System"),

    new Booking(activeRooms[1],
        DateTime.UtcNow.AddDays(1),
        DateTime.UtcNow.AddDays(1).AddHours(2),
        "System"),

    new Booking(activeRooms[2],
        DateTime.UtcNow.AddDays(2),
        DateTime.UtcNow.AddDays(2).AddHours(2),
        "System"),

    new Booking(activeRooms[0],
        DateTime.UtcNow.AddDays(3),
        DateTime.UtcNow.AddDays(3).AddHours(2),
        "System"),

    new Booking(activeRooms[1],
        DateTime.UtcNow.AddDays(4),
        DateTime.UtcNow.AddDays(4).AddHours(2),
        "System")
};

        foreach (var booking in bookings)
        {
            booking.Confirm();
            context.Bookings.Add(booking);
        }

        await context.SaveChangesAsync();
       }
    }  
        }
       }
    
    }
