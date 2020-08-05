# Routes
| Resource | URL | Method | result|
| ---: | :-- |:--- |:--- |
| Venue | /create | **POST** | ``` { success: {boolean}, result: {venue}}``` |
| Venue | /get/:id | **GET** | ``` { success: {boolean}, venue: {venue}, gigs: [{gig}]}``` |
| --- | --- | --- | --- |
| Gig | / | **GET** | ``` { success: false, error: 'NOT YET IMPLEMENTED' } ``` |
| Gig | /create | **POST** | ``` { success: {boolean}, result: {gig} } ``` |
| Gig | /get/:id | **GET** | ``` { success: {boolean}, gig: {gig} } ``` |
| --- | --- | --- | --- |
| Band | / | **GET** | ``` { success: false, error: 'NOT YET IMPLEMENTED' } ``` |
| Band | /create | **POST** | ``` { success: false, error: 'NOT YET IMPLEMENTED' } ``` |
| Band | /view/:id | **GET** | ``` { success: {boolean}, band: {band} } ``` |
| --- | --- | --- | --- |
| User | / | **GET** | ``` { success: false, error: 'NOT YET IMPLEMENTED' } ``` |
| User | /login | **GET** | ``` { success: true } ``` |
| User | /signup | **POST** | ``` { success: true } ``` |
|  |  |  |  |