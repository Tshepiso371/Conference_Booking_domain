using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Conference_Booking_domain.Domain;

namespace Conference_Booking_domain.Persistence;


class BookingRepository
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

    public async Task<List<string>> LoadAsync()
    {
        if (!File.Exists(filePath))
            return new List<string>();

        try
        {
            var lines = await File.ReadAllLinesAsync(filePath);
            return new List<string>(lines);
        }
        catch
        {
            return new List<string>();
        }
    }
}
