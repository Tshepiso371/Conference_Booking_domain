using System;
using System;
using System.ComponentModel.DataAnnotations;

namespace Conference_Booking.API.DTOs
{
    public class BookingCreateRequestDto
    {
        [Required]
        public int RoomId { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }
    }
}

