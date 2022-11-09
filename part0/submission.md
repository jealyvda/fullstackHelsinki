# Submission for Part0
Jealy van den Aker, 9-11-2022

## 0.4: New Note
<img src="https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC40OiBOZXcgbm90ZSAtIEplYWx5IHZhbiBkZW4gQWtlcgoKABYFb3ZlciBCcm93c2VyOgp1c2VyIGNsaWNrcyBTYXZlCmVuZAA-BQoKAB0HLT5TZXJ2ZXI6IEhUVFAgUE9TVCAvbmV3XwAhBQAWBi0-AEkIAB8Gc3RhdHVzIGNvZGUgMzAyADQXR0VUIC9ub3RlcwAzFE1MLWNvZGUAIBxtYWluLmNzACwTABEJAB4gagAlGGpzAIIbFQCCMgcgc3RhcnRzIGV4ZWN1dGluZyBqcwCBKQZ0aGF0IHJlcXVlc3RzIEpTT04gZGF0YSBmcm9tIHMAgkUFAIJDIQCCFAVkYXRhLmpzb24AglISW3tjb250ZW50OiAibW9pIiwgZGF0ZTogIjIwMjItMTEtMDlUMTM6MzQ6NTMuMjY1WiJ9LOKApl0K&s=default" alt="New Note 0.4" width="250" align="right">

```
sequenceDiagram
note over Browser:
user clicks Save
end note

Browser->Server: HTTP POST /new_note
Server->Browser: HTTP status code 302
Browser->Server: HTTP GET /notes
Server->Browser: HTML-code
Browser->Server: HTTP GET /main.css
Server->Browser: main.css
Browser->Server: HTTP GET /main.js
Server->Browser: main.js

note over Browser:
Browser starts executing js-code
that requests JSON data from server
end note

Browser->Server: HTTP GET /data.json
Server->Browser: [{content: "moi", date: "2022-11-09T13:34:53.265Z"},…]
```


## 0.5: Single Page App
<img src="https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC41OiBTaW5nbGUgcGFnZSBhcHAgSmVhbHkgdmFuIGRlbiBBa2VyCgpCcm93c2VyLT5TZXJ2ZXI6IEhUTUwgR0VUIC9zcGEKABAGLT4AIAcAGQYtY29kZQAeHG1haW4uY3NzAC0SABEJAFoeLmoAKRMAEQcKbm90ZSBvdmVyIACBDggAgT4IIHN0YXJ0cyBleGVjdXRpbmcganMAgScGdGhhdCByZXF1ZXN0cyBKU09OIGRhdGEgZnJvbSBzAIF2BQplbmQgbm90ZQCCABVUUACCEAVkYXRhLmpzb24AgggSW3tjb250ZW50OiAidGVzdCIsIGRhdGU6ICIyMDIyLTExLTA5VDE0OjA5OjIwLjkyNFoifSzigKZdAIE1HQCBRQZlcyB0aGUgZXZlbnQgaGFuZGxlcgCBTAhuZGVycwCBNAUgdG8gZGlzcGxheQo&s=default" alt="Single Page App 0.5" width="250" align="right">

```
Browser->Server: HTML GET /spa
Server->Browser: HTML-code
Browser->Server: HTML GET /main.css
Server->Browser: main.css
Browser->Server: HTML GET /spa.js
Server->Browser: spa.js

note over Browser:
Browser starts executing js-code
that requests JSON data from server
end note

Browser->Server: HTTP GET data.json
Server->Browser: [{content: "test", date: "2022-11-09T14:09:20.924Z"},…]

note over Browser:
Browser executes the event handler
that renders note to display
```

## 0.6: New Note

<img src="https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgMC42OiBOZXcgbm90ZSAtIEplYWx5IHZhbiBkZW4gQWtlcgoKABYFb3ZlciBCcm93c2VyOgp1c2VyIGNsaWNrcyBTYXZlCmVuZAA-BQoKAB0HLT5TZXJ2ZXI6IEhUVFAgUE9TVCAvbmV3X25vdGVfc3BhCgAaBi0-AE0IACMGc3RhdHVzIGNvZGUgMjAxAGkVAIEAByBkb2Vzbid0IGRlbWFuZCByZWRpcmVjdCwAGAlzdGF5cyBvbiB0aGUgc2FtZSBwYWdlLApObyBmdXJ0aGVyAIEYBnJlcXVlc3RzIHNlbnQAgUELCg&s=default" alt="New Note 0.6" width="250" align="right">

```
note over Browser:
user clicks Save
end note

Browser->Server: HTTP POST /new_note_spa
Server->Browser: HTTP status code 201

note over Browser:
Browser doesn't demand redirect,
Browser stays on the same page,
No further HTTP requests sent
end note
```

