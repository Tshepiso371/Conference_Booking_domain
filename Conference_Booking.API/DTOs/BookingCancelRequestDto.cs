using System.ComponentModel.DataAnnotations;

namespace Conference_Booking.API.DTOs
{
    public class BookingCancelRequestDto
    {
        [Required]
        public int BookingId { get; set; }
    }
}
