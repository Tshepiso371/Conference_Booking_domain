using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Persistence;
using Conference_Booking_domain.Enums;

namespace Conference_Booking_domain.Persistence;


 public class BookingRepository
{
    private readonly string filePath = "bookings.txt";

    public async Task SaveAsync(List<Booking> bookings)
    {
        if (bookings.Count == 0)
            return;

        StringBuilder data = new StringBuilder();

        foreach (var booking in bookings)
        {
            data.AppendLine(
                booking.Room.Name + "|" +
                booking.StartTime + "|" +
                booking.EndTime + "|" +
                booking.Status
            );
        }

        await File.WriteAllTextAsync(filePath, data.ToString());
    }

    public async Task<List<Booking>> LoadAsync()
{
    var bookings = new List<Booking>();

    if (!File.Exists(filePath))
        return bookings;

    try
    {
        var lines = await File.ReadAllLinesAsync(filePath);

        foreach (var line in lines)
        {
            var parts = line.Split('|');

            var room = new ConferenceRoom (parts[0], RoomCapacity.Ten , "Loaded From File" , true);
            var start = DateTime.Parse(parts[1]);
            var end = DateTime.Parse(parts[2]);
            var status = parts[3];

            var booking = new Booking(room, start, end);

            if (status == "Confirmed")
                booking.Confirm();

            bookings.Add(booking);
        }
    }
    catch
    {
        return new List<Booking>();
    }

    return bookings;
}

}
