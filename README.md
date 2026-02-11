 ## Conference Room Booking System 

## Project Overview
This project is a C# console-based Conference Room Booking System that allows users to:
- Register with their details
- View conference rooms and their capacities
- Book conference rooms for specific time slots
- Prevent overlapping (double) bookings
- Cancel existing bookings
- Persist booking data asynchronously to a file


## Features
- User registration (name, surname, email)
- View conference rooms and capacities
- Book a room for a specific date and time
- Prevent invalid and overlapping bookings
- Cancel bookings safely
- Asynchronous saving and loading of booking data
- Graceful error handling with meaningful messages


## Technologies Used
C#
.NET Console Application
Visual Studio Code
Git & GitHub



## File Responsibilities
> Program.cs
Entry point of the application
Displays menu options
Handles user input
Calls domain logic
Catches and displays exceptions
Triggers async save operations

> ConferenceRoom.cs
Represents a conference room
Uses private fields for encapsulation
Exposes read-only properties for name and capacity

> Booking.cs
Contains core booking logic
Enforces business rules
Uses guard clauses for fail-fast validation
Controls valid booking state transitions

> BookingStatus.cs
Defines valid booking states:
Available
Booked

> RoomCapacity.cs
Defines allowed room capacities:
10 seats
20 seats
40 seats
60 seats

> BookingException.cs
Custom domain-specific exception
Represents booking-related errors clearly
Improves readability and error handling

>  BookingRepository.cs
Handles persistence of booking data
Saves and loads bookings asynchronously
Uses async / await
Safely handles missing files and I/O failures


## How to Run the Application
Open the project folder in Visual Studio Code
Open the terminal in the project directory
Run:
Copy code
Bash
dotnet run
Follow the on-screen menu options

## How to Test Booking Persistence 
To verify that bookings are saved asynchronously:
Run the application using dotnet run
Complete user registration
Choose Book a room
Enter a valid room number and time range
Confirm that the message “Booking successful!” appears
Exit the application
Check the project folder for a file named:
Copy code

## bookings.txt
Open the file and confirm booking data is present
This confirms that asynchronous file saving is working correctly.

## Key Concepts Demonstrated
Object-Oriented Programming (OOP)
Encapsulation
Enums for controlled values
Guard clauses and fail-fast validation
Exception handling strategy
Safe LINQ usage
Asynchronous file operations
Separation of concerns

## Booking Querying & Performance 

### Pagination
All booking list endpoints support pagination using:
- page (default: 1)
- pageSize (default: 10)

The API returns total count, page metadata, and paged results.

### Filtering
Bookings can be filtered by:
- Room name
- Location
- Date range
- Active or inactive rooms

All filtering is performed at the database level using LINQ-to-Entities.

### Sorting
Bookings can be sorted by:
- Start date (default)
- Room name
- Creation time

Sorting is applied before pagination.

### Performance Considerations
- AsNoTracking() is used for read-only queries
- IQueryable is composed before execution
- DTO projection avoids returning EF entities

## Author
Tshepiso Mohlabane
