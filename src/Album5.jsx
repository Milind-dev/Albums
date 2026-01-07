
// with optimised here usestate is unnecessary that why merge data

// Scroll browser khud karta hai.
// IntersectionObserver sirf detect karta hai — scroll karata nahi.

/* SCROLL ACTUALLY KAHAAN SE AATA HAI?
🔹 Browser ka default behavior

Jab page ka content viewport se zyada bada ho jaata hai:
Screen height = 600px
Content height = 1200px
➡️ Browser automatically scrollbar de deta hai
⚠️ Iske liye koi JS code likhne ki zarurat nahi hoti

User thoda scroll karta hai
Browser ka native scroll chalta hai

Last element viewport me aata hai
observer.observe(observerRef.current);

Observer callback trigger hota hai
setVisibleCount(prev => prev + ITEMS_PER_LOAD);
Aur data render hota hai
“Scrolling is handled natively by the browser when content exceeds the viewport height. IntersectionObserver does not control scrolling; it only observes visibility changes of elements during scrolling. When the last element becomes visible, we load more data, which increases content height and enables further scrolling.”

*/

import { useMemo, useRef, useState, useEffect } from "react";

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

      /* ---- CONTINUE SAME PATTERN UP TO A50 ---- */
      {
        artistId: "A16",
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
        artistId: "A17",
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
        artistId: "A18",
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

const ITEMS_PER_LOAD = 3; // YouTube style batch

const Album5 = () => {
  // 1️⃣ Merge artists (already optimized)
  const artists = useMemo(() => {
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

  // 2️⃣ Visible items count
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // 3️⃣ Observer ref
  const observerRef = useRef(null);

  // 4️⃣ Intersection Observer
  useEffect(() => {
    //intersection(callback,options)
    //(entries) => { ... } kya karta hai ye callback ko array deta hai.niche hai wo dega
    /*
      entries = [
        {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: {...}
        }
      ] 
     */
    //ye destruction hai const entry = entries[0];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, artists.length)
          );
        }
      },
      { threshold: 1 } //0,0.5,1 threshold 1 par pura dikhega
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [artists.length]);

  return (
    <div>
      <h2>🎵 Music Library</h2>

      {artists.slice(0, visibleCount).map((artist, index) => (
        <div
          key={artist.name}
          ref={index === visibleCount - 1 ? observerRef : null}
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

      {visibleCount < artists.length && (
        <p style={{ textAlign: "center" }}>Loading more...</p>
      )}
    </div>
  );
};

export default Album5;
