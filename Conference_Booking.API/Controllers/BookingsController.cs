using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Conference_Booking.API.DTOs;
using Conference_Booking.API.Data;
using Conference_Booking_domain.Logic;
using Conference_Booking_domain.Domain;
using System.Security.AccessControl;

namespace Conference_Booking.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly BookingManager _bookingManager;

        public BookingsController(BookingManager bookingManager)
        {
            _bookingManager = bookingManager;
        }

        //  Employee OR Receptionist can create bookings
        [Authorize(Roles = "Employee,Receptionist")]
        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            [FromBody] BookingCreateRequestDto request)
        {
            var booking = await _bookingManager.CreateBookingAsync(
                request.RoomId,
                request.Start,
                request.End
            );

            return Ok(booking);
        }

        //  Admin only — view all bookings
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _bookingManager.GetAllBookingsAsync();
            return Ok(bookings);
        }

        // Employee only — cancel own booking
        [Authorize(Roles = "Employee")]
        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            await _bookingManager.CancelBookingAsync(id);
            return Ok("Booking cancelled.");
        }

        // Admin only — resolve conflicts
        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/resolve")]
        public async Task<IActionResult> ResolveConflict(int id)
        {
            await _bookingManager.ResolveConflictAsync(id);
            return Ok("Conflict resolved.");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("search")]
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
            var result = await _bookingManager.GetBookingAsync(
                room,
                location,
                start,
                end,
                activeRooms,
                sortBy,
                page,
                pageSize
            );

            return ok(result);
        }

    }
}
