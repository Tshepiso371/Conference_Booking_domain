namespace Conference_Booking.API.DTOs
{
    public class RoomResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Capacity { get; set; }
    }
}