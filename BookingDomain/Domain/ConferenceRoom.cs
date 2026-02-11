using Conference_Booking_domain.Enums;
namespace Conference_Booking_domain.Domain;

 public class ConferenceRoom
{
    private string name;
    private RoomCapacity capacity;
    private string location;
    private bool isActive;
      
      public int Id { get; private set; }
    public string Name => name;
    public RoomCapacity Capacity => capacity;
    public string Location {get; private set; }
    public bool IsActive {get ; private set; } = true;

    private ConferenceRoom() { }


    public ConferenceRoom(string name, RoomCapacity capacity)
    {
        this.name = name;
        this.capacity = capacity;
        this.location = location;
        isActive = true;
    }

    public void SetInactive()
    {
        isActive = false;
    }
}
