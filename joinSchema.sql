-- Joining tables

-- Select all columns from all databases
SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist
-- Underlapping table
FROM top_albums 

-- (Inner) Joined Elements
INNER JOIN top5000 
-- Where these two columns from diff tables are equal
ON (top_albums.artist = top5000.artist 
-- And where these two columns from diff tables are equal
AND top_albums.year = top5000.year) 

-- Where the artist is equal to ? on top_albums table
WHERE (top_albums.artist = "The Beatles" 
-- And where the artist is equal to ? on top5000 table
AND top5000.artist = "The Beatles") 

-- Sorted by year then position
ORDER BY top_albums.year, top_albums.position