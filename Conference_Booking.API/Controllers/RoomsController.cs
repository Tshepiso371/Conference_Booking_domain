using Microsoft.AspNetCore.Mvc;
using Conference_Booking_domain.Data;
using Conference_Booking_domain.Domain;
using Conference_Booking.API.DTOs;
using System.Linq;
using System.Collections.Generic;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly List<ConferenceRoom> _rooms;

        public RoomsController(SeedData seedData)
        {
            // Load static room data
            _rooms = seedData.SeedRooms();
        }

        // GET: api/rooms
        [HttpGet]
        public IActionResult GetAllRooms()
        {
            // Map domain objects → DTOs
            var response = _rooms.Select((room, index) => new RoomResponseDto
            {
                Id = index,              // API-facing ID
                Name = room.Name,
                Capacity = (int)room.Capacity
            });

            return Ok(response);
        }

        // GET: api/rooms/{id}
        [HttpGet("{id}")]
        public IActionResult GetRoom(int id)
        {
            // Resource existence check (allowed)
            if (id < 0 || id >= _rooms.Count)
                return NotFound("Room not found.");

            var room = _rooms[id];

            var response = new RoomResponseDto
            {
                Id = id,
                Name = room.Name,
                Capacity = (int)room.Capacity
            };

            return Ok(response);
        }
    }
}