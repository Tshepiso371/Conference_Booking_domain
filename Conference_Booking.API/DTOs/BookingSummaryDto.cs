using System;

namespace Conference_Booking.API.DTOs
{
    public class BookingSummaryDto
    {
        public int BookingId{get ; set ;}
        public string RoomName {get; set;}

        public string Location {get; set;}

        public DateTime Start {get; set;}

        public DateTime End {get; set;}

        public DateTime CreatedAt {get; set;}
    }
}