using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        ConferenceRoom[] rooms =
        {
            new ConferenceRoom("Room A", RoomCapacity.Ten),
            new ConferenceRoom("Room B", RoomCapacity.Twenty),
            new ConferenceRoom("Room C", RoomCapacity.Forty),
            new ConferenceRoom("Room D", RoomCapacity.Sixty),
            new ConferenceRoom("Room E", RoomCapacity.Twenty)
        };

        List<Booking> bookings = new List<Booking>();
        BookingRepository repository = new BookingRepository();

        Console.WriteLine("=== Conference Room Booking System ===");

        // Registration (UNCHANGED)
        Console.Write("Enter your name: ");
        string name = Console.ReadLine();

        Console.Write("Enter your surname: ");
        string surname = Console.ReadLine();

        Console.Write("Enter your email: ");
        string email = Console.ReadLine();

        Console.WriteLine($"\nWelcome {name} {surname}!\n");

        bool running = true;

        while (running)
        {
            Console.WriteLine("1. View room status");
            Console.WriteLine("2. Book a room");
            Console.WriteLine("3. Cancel booking");
            Console.WriteLine("4. Exit");
            Console.Write("Choose an option: ");

            string choice = Console.ReadLine();
            Console.WriteLine();

            // VIEW ROOMS
            if (choice == "1")
            {
                for (int i = 0; i < rooms.Length; i++)
                {
                    Console.WriteLine(
                        (i + 1) + ". " +
                        rooms[i].Name +
                        " (" + (int)rooms[i].Capacity + " seats)"
                    );
                }
                Console.WriteLine();
            }

            // BOOK ROOM
            else if (choice == "2")
            {
                try
                {
                    Console.Write("Select room number (1 - 5): ");
                    int index = int.Parse(Console.ReadLine()) - 1;

                    if (index < 0 || index >= rooms.Length)
                        throw new BookingException("Invalid room selection.");

                    Console.Write("Enter start time (yyyy-MM-dd HH:mm): ");
                    DateTime start = DateTime.Parse(Console.ReadLine());

                    Console.Write("Enter end time (yyyy-MM-dd HH:mm): ");
                    DateTime end = DateTime.Parse(Console.ReadLine());

                    ConferenceRoom room = rooms[index];

                    bool overlap = bookings.Any(b =>
                        b.Room == room &&
                        start < b.EndTime &&
                        end > b.StartTime
                    );

                    if (overlap)
                        throw new BookingException("Room already booked for that time.");

                    Booking booking = new Booking(room, start, end);
                    booking.Confirm();
                    bookings.Add(booking);

                    await repository.SaveAsync(bookings);

                    Console.WriteLine("Booking successful!\n");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message + "\n");
                }
            }

            // CANCEL BOOKING
            else if (choice == "3")
            {
                try
                {
                    if (bookings.Count == 0)
                        throw new BookingException("No bookings to cancel.");

                    Booking booking = bookings.Last();
                    booking.Cancel();

                    await repository.SaveAsync(bookings);

                    Console.WriteLine("Booking cancelled.\n");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message + "\n");
                }
            }

            // EXIT
            else if (choice == "4")
            {
                running = false;
                Console.WriteLine("Goodbye!");
            }
            else
            {
                Console.WriteLine("Invalid option.\n");
            }
        }
    }
}
