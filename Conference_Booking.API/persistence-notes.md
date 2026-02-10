# Persistence Notes

## Why in-memory storage is not suitable for production
In-memory storage (lists, static collections) is lost when the application restarts.
This makes it unsuitable for production systems where data durability, consistency,
and recovery are required.

## What DbContext represents
DbContext represents a session with the database.
It tracks entities, manages database connections,
and coordinates reading and writing data in a transactional manner.

## How EF Core fits into the architecture
EF Core is used as an infrastructure concern.
It is isolated behind repository/store interfaces so that
domain logic remains persistence-agnostic.
Controllers do not access DbContext directly.

## How this prepares the system for future growth
Using EF Core enables:
- Entity relationships (e.g. Bookings → Rooms → Users)
- Ownership tracking (bookings linked to users)
- Efficient querying for reporting
- Safe integration with frontend applications