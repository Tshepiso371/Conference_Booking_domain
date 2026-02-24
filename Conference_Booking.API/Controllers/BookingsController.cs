using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Conference_Booking.API.DTOs;
using Conference_Booking_domain.Logic;
using Conference_Booking_domain.Interfaces;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    //[Authorize] // enable later
    public class BookingsController : ControllerBase
    {
        private readonly BookingManager _bookingManager;
        private readonly IBookingStore _bookingStore;

        public BookingsController(
            BookingManager bookingManager,
            IBookingStore bookingStore)
        {
            _bookingManager = bookingManager;
            _bookingStore = bookingStore;
        }

        // ---------------------------
        // CREATE BOOKING
        // ---------------------------

       // [Authorize(Roles = "Employee,Receptionist")]
        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            [FromBody] BookingCreateRequestDto request)
        {
            try
            {
                // Get logged-in user (will work after JWT is enabled)
                var username = User.Identity?.Name ?? "Anonymous";

                var booking = await _bookingManager.CreateBookingAsync(
                    request.RoomId,
                    request.Start,
                    request.End,
                    username
                );

                var dto = new BookingSummaryDto
                {
                    BookingId = booking.Id,
                    RoomName = booking.Room.Name,
                    Location = booking.Room.Location,
                    Start = booking.StartTime,
                    End = booking.EndTime,
                    CreatedAt = booking.CreatedAt,
                    CreatedBy = booking.CreatedBy
                };

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------------------
        // SEARCH + FILTER + PAGINATION
        // ---------------------------

        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> SearchBookings(
            [FromQuery] string? room,
            [FromQuery] string? location,
            [FromQuery] DateTime? start,
            [FromQuery] DateTime? end,
            [FromQuery] bool? activeRooms,
            [FromQuery] string? sortBy = "date",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var (bookings, totalCount) =
                await _bookingManager.SearchBookingsAsync(
                    room, location, start, end,
                    activeRooms, sortBy, page, pageSize);

            var items = bookings.Select(b => new BookingSummaryDto
            {
                BookingId = b.Id,
                RoomName = b.Room.Name,
                Location = b.Room.Location,
                Start = b.StartTime,
                End = b.EndTime,
                CreatedAt = b.CreatedAt,
                CreatedBy = b.CreatedBy
            });

            var result = new PagedResultDto<BookingSummaryDto>
            {
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                Items = items.ToList()
            };

            return Ok(result);
        }

        // ---------------------------
        // CANCEL BOOKING
        // ---------------------------

        //[Authorize(Roles = "Employee")]
        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            await _bookingManager.CancelBookingAsync(id);
            return Ok("Booking cancelled.");
        }

        // ---------------------------
        // RESOLVE CONFLICT
        // ---------------------------

       // [Authorize(Roles = "Admin")]
        [HttpPost("{id}/resolve")]
        public async Task<IActionResult> ResolveConflict(int id)
        {
            await _bookingManager.ResolveConflictAsync(id);
            return Ok("Conflict resolved.");
        }
    }
}