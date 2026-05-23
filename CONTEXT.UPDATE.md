# Context Update

## Feed Config Shape Changed

The feed automation config now includes a `threshold` percentage field.

### API

`GET /api/feed/config` now returns:

```json
{
	"id": 1,
	"servo1Ms": 5000,
	"servo2Ms": 5000,
	"stepperMs": 10000,
	"threshold": 25,
	"createdAt": "2026-05-23T00:00:00.000Z",
	"updatedAt": "2026-05-23T00:00:00.000Z"
}
```

`PATCH /api/feed/config` accepts partial updates:

```json
{
	"servo1Ms": 5000,
	"servo2Ms": 5000,
	"stepperMs": 10000,
	"threshold": 25
}
```

### Field Notes

- `threshold` is a number from `0` to `100`.
- It represents the feed-level percentage threshold used for automated feeding decisions.
- Seeded default is `25`.
- Existing frontend types/forms for feed config should add `threshold`.
- If the database is not auto-syncing with alter enabled, add the matching `threshold` column to `feed_configs`.
