import { useMemo, useRef, useState, useEffect } from "react";

/* -------------------- DATA -------------------- */
const albumjson2 = [
  {
    artists: [
      {
        artistId: "A1",
        name: "Arijit Singh",
        albums: [
          {
            albumName: "Aashiqui 2",
            movie: "Aashiqui 2",
            songs: [
              { id: 1, title: "Tum Hi Ho", duration: "4:22" },
              { id: 2, title: "Chahun Main Ya Naa", duration: "5:05" },
            ],
          },
        ],
      },
      {
        artistId: "A2",
        name: "Arijit Singh",
        albums: [
          {
            albumName: "Kabir Singh",
            movie: "Kabir Singh",
            songs: [{ id: 3, title: "Tujhe Kitna Chahne Lage", duration: "4:44" }],
          },
        ],
      },
      {
        artistId: "A4",
        name: "Atif Aslam",
        albums: [
          {
            albumName: "Race",
            movie: "Race",
            songs: [{ id: 5, title: "Pehli Nazar Mein", duration: "5:12" }],
          },
        ],
      },
      {
        artistId: "A15",
        name: "Sachet Tandon",
        albums: [
          {
            albumName: "Kabir Singh",
            movie: "Kabir Singh",
            songs: [{ id: 16, title: "Bekhayali", duration: "6:11" }],
          },
        ],
      },
    ],
  },
];

const ITEMS_PER_LOAD = 2;

/* -------------------- DEBOUNCE HOOK -------------------- */
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/* -------------------- COMPONENT -------------------- */
const AlbumDebouncedSearch = () => {
  /* ---------- GROUP ARTISTS ---------- */
  const artists = useMemo(() => {
    const map = {};
    albumjson2[0].artists.forEach((artist) => {
      if (!map[artist.name]) {
        map[artist.name] = { name: artist.name, albums: [] };
      }
      map[artist.name].albums.push(...artist.albums);
    });
    return Object.values(map);
  }, []);

  /* ---------- STATES ---------- */
  const [selectedArtist, setSelectedArtist] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const observerRef = useRef(null);

  /* ---------- FILTER + SEARCH (DEBOUNCED) ---------- */
  const filteredArtists = useMemo(() => {
    let data =
      selectedArtist === "All"
        ? artists
        : artists.filter((a) => a.name === selectedArtist);

    if (!debouncedSearch.trim()) return data;

    const keyword = debouncedSearch.toLowerCase();

    return data
      .map((artist) => {
        // match artist name
        if (artist.name.toLowerCase().includes(keyword)) return artist;

        // match songs
        const albums = artist.albums
          .map((album) => {
            const songs = album.songs.filter((song) =>
              song.title.toLowerCase().includes(keyword)
            );
            return songs.length ? { ...album, songs } : null;
          })
          .filter(Boolean);

        return albums.length ? { ...artist, albums } : null;
      })
      .filter(Boolean);
  }, [artists, selectedArtist, debouncedSearch]);

  /* ---------- RESET PAGINATION ---------- */
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedArtist, debouncedSearch]);

  /* ---------- INFINITE SCROLL ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredArtists.length)
          );
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filteredArtists.length]);

  /* ---------- UI ---------- */
  return (
    <div style={{ maxWidth: "720px", margin: "auto", padding: "20px" }}>
      <h2>🎵 Music Library</h2>

      {/* SEARCH (DEBOUNCED) */}
      <input
        type="text"
        placeholder="Search artist or song..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      {/* DROPDOWN */}
      <select
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
      >
        <option value="All">All Artists</option>
        {artists.map((artist) => (
          <option key={artist.name} value={artist.name}>
            {artist.name}
          </option>
        ))}
      </select>

      {/* LIST */}
      {filteredArtists.slice(0, visibleCount).map((artist, index) => (
        <div
          key={artist.name}
          ref={index === visibleCount - 1 ? observerRef : null}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "12px",
          }}
        >
          <h3>{artist.name}</h3>

          {artist.albums.map((album, i) => (
            <div key={i} style={{ marginLeft: "16px" }}>
              <strong>{album.albumName}</strong>
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

      {filteredArtists.length === 0 && <p>No results found</p>}
    </div>
  );
};

export default AlbumDebouncedSearch;
