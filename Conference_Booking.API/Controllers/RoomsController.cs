using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Conference_Booking_domain.Data;
using Conference_Booking.API.DTOs;
using System.Linq;
using Conference_Booking_domain.Domain;
using System.Collections.Generic;


namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    [Authorize] //  Any authenticated user
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
            var response = _rooms.Select((room, index) => new RoomResponseDto
            {
                Id = index,
                Name = room.Name,
                Capacity = (int)room.Capacity
            });

            return Ok(response);
        }

        // GET: api/rooms/{id}
        [HttpGet("{id}")]
        public IActionResult GetRoom(int id)
        {
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
