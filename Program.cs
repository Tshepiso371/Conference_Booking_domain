using System;

class Program
{
    static void Main()
    {
        
        ConferenceRoom[] rooms =
        {
            new ConferenceRoom("Room A", RoomCapacity.Ten),
            new ConferenceRoom("Room B", RoomCapacity.Twenty),
            new ConferenceRoom("Room C", RoomCapacity.Forty),
            new ConferenceRoom("Room D", RoomCapacity.Sixty),
            new ConferenceRoom("Room E", RoomCapacity.Twenty)
        };

        Booking[] bookings =
        {
            new Booking(rooms[0]),
            new Booking(rooms[1]),
            new Booking(rooms[2]),
            new Booking(rooms[3]),
            new Booking(rooms[4])
        };

        
        Console.Write("Enter your name: ");
        string name = Console.ReadLine();

        Console.Write("Enter your surname: ");
        string surname = Console.ReadLine();

        Console.Write("Enter your email: ");
        string email = Console.ReadLine();

        Console.WriteLine("\nWelcome " + name + " " + surname + "!\n");

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
                        " (" + (int)rooms[i].Capacity + " people) - " +
                        bookings[i].Status
                    );
                }
                Console.WriteLine();
            }

            // BOOK
            else if (choice == "2")
            {
                Console.Write("Enter room number (1 - 5): ");
                int index = int.Parse(Console.ReadLine()) - 1;

                bookings[index].BookRoom();
                Console.WriteLine();
            }

            // CANCEL
            else if (choice == "3")
            {
                Console.Write("Enter room number (1 - 5): ");
                int index = int.Parse(Console.ReadLine()) - 1;

                bookings[index].CancelRoom();
                Console.WriteLine();
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