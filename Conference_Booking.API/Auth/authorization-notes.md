
## Why Authorization Should Not Live in Controllers

Controllers are responsible for receiving requests, returning responses, and delegating work.  
Embedding authorization logic (role checks, ownership checks, permission rules) inside controllers leads to:

- Code duplication across endpoints
- Harder testing and maintenance

Authorization is a cross-cutting concern and should be enforced declaratively using framework mechanisms such as:
- [Authorize]
- Role-based policies
- Middleware

This keeps controllers thin and predictable while allowing authorization rules to evolve independently.

---

## Why Roles Belong in Tokens

JWT tokens represent the authenticated identity and permissions of a user at a point in time.

Embedding roles in the token allows:
- Stateless authorization (no database lookup per request)
- Fast role checks at the framework level
- Consistent enforcement across all endpoints

Because the token is cryptographically signed, role information can be trusted by the API until the token expires.


## How This Design Prepares the System for Future Growth

### Database Relationships
Keeping authorization outside controllers allows future introduction of:
- User–Booking ownership relationships
- Role–Permission tables
- Fine-grained authorization policies

These changes can occur without rewriting controllers.


### Booking Ownership
Booking ownership (e.g., “cancel only your own booking”) naturally belongs in:
- Domain logic
- Authorization policies

Not in controllers.  
This enables rules like:
- Admins can manage all bookings
- Employees can manage only their own bookings


### Frontend Integration
With roles included in tokens:
- Frontend applications can adjust UI behavior immediately
- Navigation and feature visibility can be role-driven
- The backend remains the single source of truth

## Summary

This authorization design:
- Keeps controllers thin
- Centralizes security concerns
- Supports scalability and maintainability
- Aligns with professional backend architecture
