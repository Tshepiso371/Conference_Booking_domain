using System;

namespace Conference_Booking.API.DTOs
{
    public class BookingResponseDto
    {
        public string RoomName { get; set; } = string.Empty;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
