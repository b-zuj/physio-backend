## API 

### /auth

```node
/signup - POST		require in body:  name, email, password
				returns: new Pro data + authorization token
        
/client/signup - POST	require in body:  name, email, password, pro id
				returns: new Client data + authorization token
        
/login - POST		require in body:  email, password
				returns:  Pro/Client data + authorization token
        
/login - GET		require authorization token
				returns: user data (for pros data is populated with client and session data

note: authentication required
```

	
### /pros				
<i>note: authentication required for all pros paths</i>
```node
/:id - GET			returns: pro data populated with clients data
/:id - PUT			requires in body: data to be updated
				returns: updated pro data
/:id - DELETE		note:
```
### /clients			
<i>note: authentication required for all clients paths</i>
```
/ - GET			available filter: pro id in query string
returns: all clients / all clients matching the filter value, populated with session data

/:id - GET			returns: client data populated with session data

/:id - PUT			requires in body: data to be updated
				returns: updated client data
        
/:id - DELETE		note: client id is deleted also from pro’s account clients’ list
```
### /sessions			
<i> note: authentication required for all sessions paths</i>
```node
/ - GET			available filter: pro id and/or client id in query string
returns: all sessions / all sessions matching the filter value populated with exercises data

/ - POST			required in body: title, description, client id, pro id
				returns: new session data
				note: doesn’t support adding exercises (??)
        
/:id - GET			returns: session data populated with exercise data

/:id - PUT			required in body: data to be updated, when adding an exercise it 
has to be added one at the time by sending exercise and comment in body
returns: updated session data populated with exercise data

/:id - DELETE		note: session id is deleted also from client’s account sessions’ list
```
### /exercises			
<i>note: authentication required for all exercises paths</i>
```node
/ - GET			available filter: pro id and title in query string
returns: all exercises / all exercises matching the filter values

/ - POST			required in body: title, description
required otherwise: user authentication token - pro id is extracted from token and added to the new exercise data 
				returns: new exercise data
        
/:id - GET			returns: exercise data

/:id - PUT			required in body: data to be updated
returns: updated exercise data

/:id - DELETE		note: exercise id is deleted also from session’s account exercises’
list
```
