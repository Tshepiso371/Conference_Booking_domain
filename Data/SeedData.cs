using System.Collections.Generic;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Enums;


namespace Conference_Booking_domain.Logic
{
    public class SeedData
    {
        public List<ConferenceRoom> SeedRooms()
        {
            return new List<ConferenceRoom>
            {
                new ConferenceRoom("Room A", RoomCapacity.Ten),
                new ConferenceRoom("Room B", RoomCapacity.Twenty),
                new ConferenceRoom("Room C", RoomCapacity.Forty),
                new ConferenceRoom("Room D", RoomCapacity.Sixty),
                new ConferenceRoom("Room E", RoomCapacity.Twenty)
            };
        }
    }
}
