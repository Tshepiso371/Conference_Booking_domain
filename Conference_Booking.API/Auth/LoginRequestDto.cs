using System.ComponentModel.DataAnnotations;

namespace Conference_Booking.API.Auth
{
    public class LoginRequestDto
    {
        [Required]
        public string Username { get; set; } 

        [Required]
        public string Password { get; set; } 
    }
}