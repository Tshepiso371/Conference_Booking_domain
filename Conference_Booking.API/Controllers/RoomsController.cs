using Microsoft.AspNetCore.Mvc;
using Conference_Booking_domain.Data;
using Conference_Booking_domain.Domain;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly List<ConferenceRoom> _rooms;

        public RoomsController(SeedData seedData)
        {
            _rooms = seedData.SeedRooms();
        }

        // GET: api/rooms
        [HttpGet]
        public IActionResult GetAllRooms()
        {
            return Ok(_rooms);
        }

        // GET: api/rooms/{id}
        [HttpGet("{id}")]
        public IActionResult GetRoom(int id)
        {
            if (id < 0 || id >= _rooms.Count)
                return NotFound("Room not found.");

            return Ok(_rooms[id]);
        }
    }
}