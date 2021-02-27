### REST API

## Matches
### Post a list matches across (a set of) competitions from football-data.org.
`POST` /api/matches

#### Responses
- `201`: Success. All the matches were saved at Firebase.
- `400`: Error. Something went wrong in the external API request.
