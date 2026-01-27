class ConferenceRoom
{
    private string name;
    private RoomCapacity capacity;

    public ConferenceRoom(string name, RoomCapacity capacity)
    {
        this.name = name;
        this.capacity = capacity;
    }

    public string Name
    {
        get { return name; }
    }

    public RoomCapacity Capacity
    {
        get { return capacity; }
    }
}
