using Conference_Booking_domain.Enums;
namespace Conference_Booking_domain.Domain;

 public class ConferenceRoom
{
    private string name;
    private RoomCapacity capacity;

    public string Name => name;
    public RoomCapacity Capacity => capacity;


    public ConferenceRoom(string name, RoomCapacity capacity)
    {
        this.name = name;
        this.capacity = capacity;
    }
}
