// src/pages/Favorites.tsx

import React, { useState } from 'react';
import { Element } from 'react-scroll'; // might not be necessary here but keeps consistency
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

// structure for favorite rankings
interface GenreRanking {
  [genre: string]: string[]; // list of items in ranked order
}

interface CategoryRanking {
  genres: GenreRanking;
}

const favorites: Record<string, CategoryRanking> = {
  movies: {
    genres: {
      Action: ['Movie A', 'Movie B', 'Movie C'],
      Comedy: ['Movie D', 'Movie E'],
      Drama: ['Movie F', 'Movie G', 'Movie H'],
    },
  },
  books: {
    genres: {
      Fantasy: ['Book A', 'Book B', 'Book C'],
      Mystery: ['Book D', 'Book E'],
      'Sci-Fi': ['Book F', 'Book G'],
    },
  },
  games: {
    genres: {
      RPG: ['Game A', 'Game B'],
      Shooter: ['Game C', 'Game D'],
      Puzzle: ['Game E'],
    },
  },
  music: {
    genres: {
      Rock: ['Artist A', 'Artist B'],
      Jazz: ['Artist C'],
      Classical: ['Artist D', 'Artist E'],
    },
  },
};

const currently = {
  watching: 'Dune: Part Two',
  reading: 'The Silent Patient',
  playing: 'The Legend of Zelda: Tears of the Kingdom',
  listening: "Beethoven – Symphony No. 9",
};

const Favorites: React.FC = () => {
  const categories = Object.keys(favorites);
  const [tabIndex, setTabIndex] = useState(0);
  const [subTabIndex, setSubTabIndex] = useState(0);

  const currentCategory = categories[tabIndex];
  const genreNames = Object.keys(favorites[currentCategory].genres);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSubTabIndex(0);
  };

  const handleSubTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSubTabIndex(newValue);
  };

  return (
    <Element name="favorites" className="container1">
      <Box sx={{ textAlign: 'center', color: 'var(--primary-color)', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Favorites
        </Typography>
        <Typography variant="body1">
          Currently watching: {currently.watching}
        </Typography>
        <Typography variant="body1">
          Currently reading: {currently.reading}
        </Typography>
        <Typography variant="body1">
          Currently playing: {currently.playing}
        </Typography>
        <Typography variant="body1">
          Currently listening: {currently.listening}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          {categories.map((cat) => (
            <Tab label={cat.charAt(0).toUpperCase() + cat.slice(1)} key={cat} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={subTabIndex}
          onChange={handleSubTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="genre tabs"
        >
          {genreNames.map((g) => (
            <Tab label={g} key={g} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {genreNames[subTabIndex]} rankings
        </Typography>
        <ol>
          {favorites[currentCategory].genres[genreNames[subTabIndex]].map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </Box>
    </Element>
  );
};

export default Favorites;
