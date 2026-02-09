using Conference_Booking_domain.Enums;
namespace Conference_Booking_domain.Domain;

 public class ConferenceRoom
{
    private string name;
    private RoomCapacity capacity;
      
      public int Id { get; private set; }
    public string Name => name;
    public RoomCapacity Capacity => capacity;

    private ConferenceRoom() { }


    public ConferenceRoom(string name, RoomCapacity capacity)
    {
        this.name = name;
        this.capacity = capacity;
    }
}
