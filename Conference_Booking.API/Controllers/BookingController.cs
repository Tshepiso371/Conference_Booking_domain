using Microsoft.AspNetCore.Mvc;
using Conference_Booking.API.DTOs;
using Conference_Booking_domain.Logic;
using System.Linq;
using System.Threading.Tasks;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly BookingManager _bookingManager;

        public BookingsController(BookingManager bookingManager)
        {
            _bookingManager = bookingManager;
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            [FromBody] BookingCreateRequestDto request)
        {
            // API-boundary validation
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Domain logic (exceptions bubble to middleware)
            var booking = await _bookingManager.CreateBookingAsync(
                request.RoomIndex,
                request.Start,
                request.End
            );

            // Map domain → response DTO
            var response = new BookingResponseDto
            {
                RoomName = booking.Room.Name,
                Start = booking.StartTime,
                End = booking.EndTime,
                Status = booking.Status.ToString()
            };

            return Ok(response);
        }

        // GET: api/bookings
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _bookingManager.GetAllBookingsAsync();

            var response = bookings.Select(b => new BookingResponseDto
            {
                RoomName = b.Room.Name,
                Start = b.StartTime,
                End = b.EndTime,
                Status = b.Status.ToString()
            });

            return Ok(response);
        }

        // POST: api/bookings/{id}/cancel
        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            await _bookingManager.CancelBookingAsync(id);
            return Ok("Booking cancelled.");
        }
    }
}