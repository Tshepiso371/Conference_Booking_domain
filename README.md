#  Conference Room Booking System Application

##  Project Description
This project is a simple Conference Room Booking Application that performs the core business logic required to manage conference room bookings.

The system allows:
- Creating conference rooms with fixed capacities
- Booking and cancelling conference rooms
- Tracking room availability using booking statuses


##  Technologies Used
- C#
- .NET Console Application
- Visual Studio Code
- Git & GitHub

##  Project Structure
ConferenceRoomBookingSystem/
│
├── Program.cs
├── ConferenceRoom.cs
├── Booking.cs
├── BookingStatus.cs
├── RoomCapacity.cs
└── README.md

### File Descriptions
- **Program.cs**  
  Entry point of the application. Used only to test and demonstrate the domain model.

- **ConferenceRoom.cs**  
  Represents a conference room with a name and capacity.

- **Booking.cs**  
  Represents a booking for a conference room and controls booking behaviour.

- **BookingStatus.cs**  
  Enum defining valid booking states: `Available` and `Booked`.

- **RoomCapacity.cs**  
  Enum defining allowed room capacities: 10, 20, 40, and 60.

---

##  Features
- Conference rooms with predefined capacities
- Book and cancel room reservations
- Booking status tracking using enums
- Business rules enforced through constructors and enums
- Clean separation between domain logic and console testing


##  How to Run the Application
1. Open the project folder in **Visual Studio Code**
2. Ensure the .NET SDK is installed
3. Run the application using:
   ```bash
   dotnet run
The console will display sample booking information used to test the domain model


