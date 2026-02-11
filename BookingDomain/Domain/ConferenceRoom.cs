using Conference_Booking_domain.Enums;

namespace Conference_Booking_domain.Domain;

public class ConferenceRoom
{
    public int Id { get; private set; }

    public string Name { get; private set; }
    public RoomCapacity Capacity { get; private set; }

    public string Location { get; private set; }
    public bool IsActive { get; private set; }

    private ConferenceRoom() { } // Required by EF

    public ConferenceRoom(string name, RoomCapacity capacity, string location, bool isActive = true)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Room name cannot be empty.");

        if (string.IsNullOrWhiteSpace(location))
            throw new ArgumentException("Location cannot be empty.");

        Name = name;
        Capacity = capacity;
        Location = location;
        IsActive = isActive;
    }

    public void SetInactive()
    {
        IsActive = false;
    }
}