using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Rooms
        ConferenceRoom[] rooms =
        {
            new ConferenceRoom("Room A", RoomCapacity.Ten),
            new ConferenceRoom("Room B", RoomCapacity.Twenty),
            new ConferenceRoom("Room C", RoomCapacity.Forty),
            new ConferenceRoom("Room D", RoomCapacity.Sixty),
            new ConferenceRoom("Room E", RoomCapacity.Twenty)
        };

        // 1.2
        List<Booking> bookings = new List<Booking>();

        Console.WriteLine("=== Conference Room Booking System ===");

        
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

            // 1️⃣ VIEW ROOMS
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

            // 2️⃣ BOOK ROOM
            else if (choice == "2")
            {
                Console.Write("Select room number (1 - 5): ");
                int roomIndex = int.Parse(Console.ReadLine()) - 1;

                if (roomIndex < 0 || roomIndex >= rooms.Length)
                {
                    Console.WriteLine("Invalid room selection.\n");
                    continue;
                }

                Console.Write("Enter start time (yyyy-MM-dd HH:mm): ");
                DateTime startTime = DateTime.Parse(Console.ReadLine());

                Console.Write("Enter end time (yyyy-MM-dd HH:mm): ");
                DateTime endTime = DateTime.Parse(Console.ReadLine());

                ConferenceRoom selectedRoom = rooms[roomIndex];

                // Prevent overlapping bookings (LINQ)
                bool overlapExists = bookings.Any(b =>
                    b.Room == selectedRoom &&
                    startTime < b.EndTime &&
                    endTime > b.StartTime
                );

                if (overlapExists)
                {
                    Console.WriteLine("Room is already booked for that time.\n");
                    continue; // FAIL-FAST
                }

                Booking booking = new Booking(selectedRoom, startTime, endTime);
                booking.Confirm();
                bookings.Add(booking);

                Console.WriteLine("Booking successful!\n");
            }

            // 3️⃣ CANCEL BOOKING
            else if (choice == "3")
            {
                Console.Write("Select room number (1 - 5): ");
                int roomIndex = int.Parse(Console.ReadLine()) - 1;

                if (roomIndex < 0 || roomIndex >= rooms.Length)
                {
                    Console.WriteLine("Invalid room selection.\n");
                    continue;
                }

                Console.Write("Enter booking start time (yyyy-MM-dd HH:mm): ");
                DateTime startTime = DateTime.Parse(Console.ReadLine());

                ConferenceRoom room = rooms[roomIndex];

                Booking bookingToCancel = bookings.FirstOrDefault(b =>
                    b.Room == room && b.StartTime == startTime
                );

                if (bookingToCancel == null)
                {
                    Console.WriteLine("Booking not found.\n");
                    continue; // FAIL-FAST
                }

                bookingToCancel.Cancel();
                Console.WriteLine("Booking cancelled.\n");
            }

            // 4️⃣ EXIT
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
