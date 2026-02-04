using Microsoft.AspNetCore.Mvc;
using Conference_Booking_domain.Domain;
using Conference_Booking_domain.Data;
using Conference_Booking_domain.Persistence;
using System.Threading.Tasks;
using System.Linq;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly BookingRepository _repository;
        private readonly List<ConferenceRoom> _rooms;

        public BookingsController(BookingRepository repository, SeedData seedData)
        {
            _repository = repository;
            _rooms = seedData.SeedRooms();
        }

        

        // POST: /api/bookings
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest request)
        {
            try
            {
                if (request.RoomIndex < 0 || request.RoomIndex >= _rooms.Count)
                    return BadRequest("Invalid room index.");

                ConferenceRoom room = _rooms[request.RoomIndex];

                // Load existing bookings
                List<Booking> bookings = await _repository.LoadAsync();

                // Check for overlapping bookings
                bool overlap = bookings.Any(b =>
                    b.Room == room &&
                    request.Start < b.EndTime &&
                    request.End > b.StartTime
                );

                if (overlap)
                    return BadRequest("Room already booked for that time.");

                Booking booking = new Booking(room, request.Start, request.End);
                booking.Confirm();
                bookings.Add(booking);

                await _repository.SaveAsync(bookings);

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{id}/cancel")]
         public async Task<IActionResult> CancelBooking(int id)
        {
           try
         {
        var bookings = await _repository.LoadAsync();

        if (id < 0 || id >= bookings.Count)
            return NotFound("Booking not found.");

           bookings[id].Cancel();
           await _repository.SaveAsync(bookings);

        return Ok("Booking cancelled.");
       }
         catch (Exception ex)
        {
        return BadRequest(ex.Message);
          }
      }

      [HttpGet]
       public async Task<IActionResult> GetBookings()
           {
          var bookings = await _repository.LoadAsync();
           return Ok(bookings);
           }

           
    }

    // DTO for POST requests
    public class BookingRequest
    {
        public int RoomIndex { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
