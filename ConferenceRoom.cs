class ConferenceRoom
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
