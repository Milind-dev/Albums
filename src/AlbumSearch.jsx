/* ---------- FILTER + SEARCH ---------- */

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
            songs: [
              { id: 3, title: "Tujhe Kitna Chahne Lage", duration: "4:44" },
            ],
          },
        ],
      },
      {
        artistId: "A3",
        name: "Arijit Singh",
        albums: [
          {
            albumName: "Ae Dil Hai Mushkil",
            movie: "Ae Dil Hai Mushkil",
            songs: [{ id: 4, title: "Channa Mereya", duration: "4:49" }],
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
        artistId: "A5",
        name: "Atif Aslam",
        albums: [
          {
            albumName: "Ajab Prem Ki Ghazab Kahani",
            movie: "Ajab Prem Ki Ghazab Kahani",
            songs: [{ id: 6, title: "Tu Jaane Na", duration: "5:09" }],
          },
        ],
      },

      {
        artistId: "A6",
        name: "Sonu Nigam",
        albums: [
          {
            albumName: "Kal Ho Naa Ho",
            movie: "Kal Ho Naa Ho",
            songs: [{ id: 7, title: "Kal Ho Naa Ho", duration: "5:21" }],
          },
        ],
      },
      {
        artistId: "A7",
        name: "Sonu Nigam",
        albums: [
          {
            albumName: "Saathiya",
            movie: "Saathiya",
            songs: [{ id: 8, title: "Saathiya", duration: "5:57" }],
          },
        ],
      },

      {
        artistId: "A8",
        name: "Shreya Ghoshal",
        albums: [
          {
            albumName: "Aashiqui 2",
            movie: "Aashiqui 2",
            songs: [
              { id: 9, title: "Sunn Raha Hai (Female)", duration: "5:10" },
            ],
          },
        ],
      },
      {
        artistId: "A9",
        name: "Shreya Ghoshal",
        albums: [
          {
            albumName: "Ram-Leela",
            movie: "Goliyon Ki Raasleela Ram-Leela",
            songs: [{ id: 10, title: "Nagada Sang Dhol", duration: "4:34" }],
          },
        ],
      },

      {
        artistId: "A10",
        name: "KK",
        albums: [
          {
            albumName: "Jannat",
            movie: "Jannat",
            songs: [{ id: 11, title: "Zara Sa", duration: "5:03" }],
          },
        ],
      },

      {
        artistId: "A11",
        name: "Neha Kakkar",
        albums: [
          {
            albumName: "Luka Chuppi",
            movie: "Luka Chuppi",
            songs: [{ id: 12, title: "Coca Cola", duration: "2:59" }],
          },
        ],
      },

      {
        artistId: "A12",
        name: "Armaan Malik",
        albums: [
          {
            albumName: "MS Dhoni",
            movie: "MS Dhoni: The Untold Story",
            songs: [{ id: 13, title: "Jab Tak", duration: "2:55" }],
          },
        ],
      },

      {
        artistId: "A13",
        name: "Jubin Nautiyal",
        albums: [
          {
            albumName: "Marjaavaan",
            movie: "Marjaavaan",
            songs: [{ id: 14, title: "Tum Hi Aana", duration: "4:09" }],
          },
        ],
      },

      {
        artistId: "A14",
        name: "Mohit Chauhan",
        albums: [
          {
            albumName: "Rockstar",
            movie: "Rockstar",
            songs: [{ id: 15, title: "Kun Faya Kun", duration: "7:53" }],
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

      {
        artistId: "A16",
        name: "Sachet Tandon",
        albums: [
          {
            albumName: "Kabir Singh",
            movie: "Kabir Singh",
            songs: [{ id: 16, title: "padal", duration: "6:11" }],
          },
        ],
      },
      {
        artistId: "A17",
        name: "Sachet Tandon",
        albums: [
          {
            albumName: "Kabir Singh",
            movie: "Kabir Singh",
            songs: [{ id: 16, title: "jhoki", duration: "6:11" }],
          },
        ],
      },
      {
        artistId: "A18",
        name: "Sachet Tandon",
        albums: [
          {
            albumName: "Kabir Singh",
            movie: "Kabir Singh",
            songs: [{ id: 16, title: "kati", duration: "6:11" }],
          },
        ],
      },
      {
        artistId: "A19",
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

/* -------------------- COMPONENT -------------------- */
const AlbumSearch = () => {
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
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const observerRef = useRef(null);

  /* ---------- FILTER + SEARCH ---------- */
  const filteredArtists = useMemo(() => {
    let data =
      selectedArtist === "All"
        ? artists
        : artists.filter((a) => a.name === selectedArtist);

    if (!search.trim()) return data;

    const keyword = search.toLowerCase();

    return data
      .map((artist) => {
        // match artist name
        if (artist.name.toLowerCase().includes(keyword)) {
          return artist;
        }

        // filter albums & songs
        const albums = artist.albums
          .map((album) => {
            const songs = album.songs.filter((song) =>
              song.title.toLowerCase().includes(keyword)
            );

            if (songs.length > 0) {
              return { ...album, songs };
            }
            return null;
          })
          .filter(Boolean);

        return albums.length ? { ...artist, albums } : null;
      })
      .filter(Boolean);
  }, [artists, selectedArtist, search]);

  /* ---------- RESET SCROLL ---------- */
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedArtist, search]);

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
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>🎵 Music Library</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search artist or song..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
        }}
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

export default AlbumSearch;
