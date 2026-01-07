
// with optimised here usestate is unnecessary that why merge data


import {  useMemo, useState } from "react";

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

const Album3 = () => {
  const artists = useMemo(() => {
    const artistMap = {};

    albumjson2[0].artists.forEach((artist) => {
      if (!artistMap[artist.name]) {  //artismap["Arijeet singh"]
        artistMap[artist.name] = {
          name: artist.name,
          albums: [],
        };
      }

      artistMap[artist.name].albums.push(...artist.albums);
    });

    return Object.values(artistMap);
  }, []);

  return (
    <div>
      <h2>🎵 Music Library</h2>

      {artists.map((artist) => (
        <div key={artist.name} style={{ marginBottom: "24px" }}>
          <h3>{artist.name}</h3>

          {artist.albums.map((album, index) => (
            <div
              key={`${artist.name}-${index}`}
              style={{ marginLeft: "20px", marginBottom: "10px" }}
            >
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
    </div>
  );
};

export default Album3;



/* 

    artists = [
  { artistId: "A1", name: "Arijit Singh", albums: [Aashiqui 2] },
  { artistId: "A2", name: "Arijit Singh", albums: [Kabir Singh] },
  { artistId: "A3", name: "Arijit Singh", albums: [ADHM] },
  { artistId: "A4", name: "Atif Aslam", albums: [Race] },
];


albumjson2[0].artists.forEach((artist) => {
artist = {
  artistId: "A1",
  name: "Arijit Singh",
  albums: [Aashiqui 2]
}
Check
if (!artistMap["Arijit Singh"])
artistMap["Arijit Singh"] = {
  name: "Arijit Singh",
  albums: []
};
now 
artistMap = {
  "Arijit Singh": {
    name: "Arijit Singh",
    albums: []
  }
}
artistMap["Arijit Singh"].albums.push(...artist.albums);
albums: [Aashiqui 2]

iteration2
artist = {
  artistId: "A2",
  name: "Arijit Singh",
  albums: [Kabir Singh]
}
Check
if (!artistMap["Arijit Singh"])
❌ Already exists
👉 if block skip
albums.push(...[Kabir Singh])
albums: [
  Aashiqui 2,
  Kabir Singh
]


if (!artistMap["Atif Aslam"])
artistMap["Atif Aslam"] = {
  name: "Atif Aslam",
  albums: []
}
albums: [Race]
FINAL artistMap
artistMap = {
  "Arijit Singh": {
    name: "Arijit Singh",
    albums: [
      Aashiqui 2,
      Kabir Singh,
      Ae Dil Hai Mushkil
    ]
  },
  "Atif Aslam": {
    name: "Atif Aslam",
    albums: [
      Race
    ]
  }
}


final objects
==============
Object.values(artistMap)
[
  {
    name: "Arijit Singh",
    albums: [Aashiqui 2, Kabir Singh, ADHM]
  },
  {
    name: "Atif Aslam",
    albums: [Race]
  }
]


*/