using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Conference_Booking.API.DTOs;
using Conference_Booking_domain.Interfaces;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/rooms")]
    [Authorize]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomStore _roomStore;

        public RoomsController(IRoomStore roomStore)
        {
            _roomStore = roomStore;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomStore.GetAllAsync();

            var response = rooms.Select(room => new RoomResponseDto
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = (int)room.Capacity
            });

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _roomStore.GetByIdAsync(id);

            if (room == null)
                return NotFound();

            var response = new RoomResponseDto
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = (int)room.Capacity
            };

            return Ok(response);
        }
    }
}