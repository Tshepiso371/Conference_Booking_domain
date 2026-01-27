using System;

class Program
{
static void Main()
{
// Rooms
string[] rooms = { "Room A", "Room B", "Room C", "Room D", "Room E" };

// Room status (false = available, true = booked)
bool[] booked = { false, false, false, false, false };

Console.WriteLine("=== Conference Room Booking System ===");    
    
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
 
    if (choice == "1")    
    {    
        for (int i = 0; i < rooms.Length; i++)    
        {    
            if (booked[i] == false)    
                Console.WriteLine(rooms[i] + " : Available");    
            else    
                Console.WriteLine(rooms[i] + " : Booked");    
        }    
        Console.WriteLine();    
    }    

    
    else if (choice == "2")    
    {    
        Console.Write("Enter room number (1 - 5): ");    
        int roomNumber = int.Parse(Console.ReadLine()) - 1;    

        if (roomNumber < 0 || roomNumber >= rooms.Length)    
        {    
            Console.WriteLine("Invalid room number.\n");    
        }    
        else if (booked[roomNumber] == true)    
        {    
            Console.WriteLine("Room already booked.\n");    
        }    
        else    
        {    
            booked[roomNumber] = true;    
            Console.WriteLine("Booking confirmed for " + rooms[roomNumber] + ".\n");    
        }    
    }    

      
    else if (choice == "3")    
    {    
        Console.Write("Enter room number to cancel (1 - 5): ");    
        int roomNumber = int.Parse(Console.ReadLine()) - 1;    

        if (roomNumber < 0 || roomNumber >= rooms.Length)    
        {    
            Console.WriteLine("Invalid room number.\n");    
        }    
        else if (booked[roomNumber] == false)    
        {    
            Console.WriteLine("This room is not booked.\n");    
        }    
        else    
        {    
            booked[roomNumber] = false;    
            Console.WriteLine("Booking cancelled for " + rooms[roomNumber] + ".\n");    
        }    
    }    

      
    else if (choice == "4")    
    {    
        running = false;    
        Console.WriteLine("Goodbye!");    
    }    

        
    else    
    {    
        Console.WriteLine("Invalid option. Try again.\n");    
    }    
}

}

}

