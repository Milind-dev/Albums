import { useMemo, useRef, useState, useEffect } from "react";

const PAGE_SIZE = 3; // pagination size

const Album5 = () => {
  // 1️⃣ Merge artists (normalize once)
  const allArtists = useMemo(() => {
    const artistMap = {};

    albumjson2[0].artists.forEach((artist) => {
      if (!artistMap[artist.name]) {
        artistMap[artist.name] = {
          name: artist.name,
          albums: [],
        };
      }
      artistMap[artist.name].albums.push(...artist.albums);
    });

    return Object.values(artistMap);
  }, []);

  // 2️⃣ Pagination state
  const [page, setPage] = useState(1);

  // 3️⃣ Visible data (page-based)
  const visibleArtists = useMemo(() => {
    return allArtists.slice(0, page * PAGE_SIZE);
  }, [page, allArtists]);

  const observerRef = useRef(null);

  // 4️⃣ Infinite scroll triggers page increment
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prev) =>
            prev * PAGE_SIZE < allArtists.length ? prev + 1 : prev
          );
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [allArtists.length]);

  return (
    <div>
      <h2>🎵 Music Library (Hybrid)</h2>

      {visibleArtists.map((artist, index) => (
        <div
          key={artist.name}
          ref={index === visibleArtists.length - 1 ? observerRef : null}
          style={{ marginBottom: "24px" }}
        >
          <h3>{artist.name}</h3>

          {artist.albums.map((album, i) => (
            <div key={i} style={{ marginLeft: "20px" }}>
              <strong>Album:</strong> {album.albumName}
              <p>
                <em>Movie:</em> {album.movie}
              </p>
              <ul>
                {album.songs.map((song) => (
                  <li key={song.id}>
                    {song.title} — {song.duration}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}

      {visibleArtists.length < allArtists.length && (
        <p style={{ textAlign: "center" }}>Loading more...</p>
      )}
    </div>
  );
};

export default Album5;
