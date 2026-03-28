// src/pages/Favorites.tsx

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import TabUnselectedIcon from '@mui/icons-material/TabUnselected';
import { Link as RouterLink } from 'react-router-dom';

interface GenreRanking {
  [genre: string]: string[];
}

interface CategoryRanking {
  genres: GenreRanking;
}

type RankingsData = Record<string, CategoryRanking>;

const DEFAULT_RANKINGS: RankingsData = {
  movies: {
    genres: {
      Action: ['Mad Max: Fury Road', 'Dune: Part Two', 'The Dark Knight'],
      Comedy: ['Superbad', 'The Nice Guys', 'Palm Springs'],
      Drama: ['Whiplash', 'The Social Network', 'Parasite'],
    },
  },
  books: {
    genres: {
      Fantasy: ['The Name of the Wind', 'Mistborn', 'The Hobbit'],
      Mystery: ['Gone Girl', 'The Silent Patient', 'The Girl with the Dragon Tattoo'],
      'Sci-Fi': ['Project Hail Mary', 'Dune', 'Neuromancer'],
    },
  },
  games: {
    genres: {
      RPG: ['Elden Ring', 'Baldur\'s Gate 3', 'Skyrim'],
      Shooter: ['Titanfall 2', 'DOOM Eternal', 'Valorant'],
      Indie: ['Hades', 'Hollow Knight', 'Celeste'],
    },
  },
  music: {
    genres: {
      HipHop: ['Kendrick Lamar', 'J. Cole', 'Saba'],
      Rock: ['Arctic Monkeys', 'The Strokes', 'Foo Fighters'],
      Electronic: ['Daft Punk', 'ODESZA', 'Fred again..'],
    },
  },
};

const ADMIN_PASS = import.meta.env.VITE_RANKINGS_ADMIN_PASSWORD;
const STORAGE_KEY = 'site_rankings_data_v1';

const loadInitialRankings = (): RankingsData => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (!cached) {
    return DEFAULT_RANKINGS;
  }

  try {
    return JSON.parse(cached) as RankingsData;
  } catch {
    return DEFAULT_RANKINGS;
  }
};

const Rankings: React.FC = () => {
  const [rankingsData, setRankingsData] = useState<RankingsData>(loadInitialRankings);
  const [tabIndex, setTabIndex] = useState(0);
  const [subTabIndex, setSubTabIndex] = useState(0);
  const [newItemText, setNewItemText] = useState('');
  const [newGenreText, setNewGenreText] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const categories = useMemo(() => Object.keys(rankingsData), [rankingsData]);
  const currentCategory = categories[tabIndex] ?? categories[0];
  const genres = useMemo(
    () => Object.keys(rankingsData[currentCategory]?.genres ?? {}),
    [rankingsData, currentCategory]
  );
  const currentGenre = genres[subTabIndex] ?? genres[0];
  const currentItems = rankingsData[currentCategory]?.genres[currentGenre] ?? [];

  const persist = (next: RankingsData) => {
    setRankingsData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setTabIndex(value);
    setSubTabIndex(0);
    setNewItemText('');
  };

  const handleSubTabChange = (_: React.SyntheticEvent, value: number) => {
    setSubTabIndex(value);
    setNewItemText('');
  };

  const handleUnlock = () => {
    if (!ADMIN_PASS) {
      setAuthError('Set VITE_RANKINGS_ADMIN_PASSWORD in your .env file to enable editing.');
      return;
    }

    if (password === ADMIN_PASS) {
      setIsAdmin(true);
      setAuthError('');
      setPassword('');
      return;
    }

    setAuthError('Incorrect password.');
  };

  const addItem = () => {
    const clean = newItemText.trim();
    if (!clean) {
      return;
    }

    const next: RankingsData = structuredClone(rankingsData);
    next[currentCategory].genres[currentGenre].push(clean);
    persist(next);
    setNewItemText('');
  };

  const addGenre = () => {
    const clean = newGenreText.trim();
    if (!clean) {
      return;
    }

    const next: RankingsData = structuredClone(rankingsData);
    const categoryGenres = next[currentCategory].genres;

    if (categoryGenres[clean]) {
      setAdminMessage('That subgenre already exists for this section.');
      return;
    }

    categoryGenres[clean] = [];
    persist(next);

    const newGenres = Object.keys(categoryGenres);
    const insertedIndex = newGenres.indexOf(clean);
    if (insertedIndex >= 0) {
      setSubTabIndex(insertedIndex);
    }

    setNewGenreText('');
    setAdminMessage('Subgenre added.');
  };

  const removeCurrentGenre = () => {
    if (!currentGenre) {
      return;
    }

    if (genres.length <= 1) {
      setAdminMessage('Each section must keep at least one subgenre.');
      return;
    }

    const next: RankingsData = structuredClone(rankingsData);
    delete next[currentCategory].genres[currentGenre];

    const remainingGenres = Object.keys(next[currentCategory].genres);
    const nextIndex = Math.max(0, Math.min(subTabIndex, remainingGenres.length - 1));

    persist(next);
    setSubTabIndex(nextIndex);
    setAdminMessage(`Removed ${currentGenre}.`);
  };

  const swap = (indexA: number, indexB: number) => {
    const next: RankingsData = structuredClone(rankingsData);
    const list = next[currentCategory].genres[currentGenre];
    [list[indexA], list[indexB]] = [list[indexB], list[indexA]];
    persist(next);
  };

  const removeItem = (index: number) => {
    const next: RankingsData = structuredClone(rankingsData);
    next[currentCategory].genres[currentGenre] = next[currentCategory].genres[currentGenre].filter(
      (_, i) => i !== index
    );
    persist(next);
  };

  const exitEditMode = () => {
    setIsAdmin(false);
    setPassword('');
    setAuthError('');
    setNewItemText('');
    setNewGenreText('');
    setAdminMessage('');
  };

  return (
    <Box className="container1 rankings-page">
      <RouterLink to="/" className="rankings-home-link" aria-label="Go back home">
        Home
      </RouterLink>

      <Paper className="rankings-hero" elevation={4}>
        <Typography variant="h3" className="rankings-title">
          Rankings
        </Typography>
      </Paper>

      <Paper className="rankings-tabs-shell" elevation={3}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {categories.map((category) => (
            <Tab
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              className="rankings-main-tab"
            />
          ))}
        </Tabs>
        <Divider />
        <Tabs
          value={subTabIndex}
          onChange={handleSubTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {genres.map((genre) => (
            <Tab key={genre} label={genre} className="rankings-sub-tab" />
          ))}
        </Tabs>
      </Paper>

      <Paper className="rankings-content" elevation={3}>
        <Box className="rankings-content-header">
          <Typography variant="h5">{currentGenre} Rankings</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </Typography>
        </Box>

        <Stack spacing={1.25} sx={{ mt: 2 }}>
          {currentItems.map((item, index) => (
            <Card key={`${item}-${index}`} className="rankings-item-card">
              <CardContent className="rankings-item-content">
                <Box className="rankings-rank-badge">#{index + 1}</Box>
                <Typography className="rankings-item-text">{item}</Typography>

                {isAdmin && (
                  <Box className="rankings-item-controls">
                    <IconButton
                      size="small"
                      disabled={index === 0}
                      onClick={() => swap(index, index - 1)}
                    >
                      <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={index === currentItems.length - 1}
                      onClick={() => swap(index, index + 1)}
                    >
                      <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => removeItem(index)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Paper>

      <Box className="rankings-admin-fab-wrap">
        <IconButton
          className="rankings-admin-fab"
          onClick={() => setIsAdminPanelOpen((prev) => !prev)}
          aria-label="Toggle edit panel"
        >
          {isAdminPanelOpen ? <CloseIcon /> : <EditIcon />}
        </IconButton>

        {isAdminPanelOpen && (
          <Paper className="rankings-admin-panel" elevation={6}>
            {!isAdmin ? (
              <Box className="admin-unlock">
                <Typography variant="subtitle2">Edit Mode</Typography>
                <Typography variant="body2" sx={{ mb: 1.25, opacity: 0.8 }}>
                  Admin password required.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <TextField
                    type="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <Button variant="contained" size="small" onClick={handleUnlock} startIcon={<LockOpenIcon />}>
                    Unlock
                  </Button>
                </Stack>
                {authError && (
                  <Alert severity="warning" sx={{ mt: 1.25 }}>
                    {authError}
                  </Alert>
                )}
              </Box>
            ) : (
              <Box className="admin-editor">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Edit Mode Enabled</Typography>
                  <Button size="small" color="inherit" startIcon={<LogoutIcon />} onClick={exitEditMode}>
                    Exit
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={newGenreText}
                    onChange={(e) => {
                      setNewGenreText(e.target.value);
                      setAdminMessage('');
                    }}
                    placeholder={`Add subgenre to ${
                      currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addGenre();
                      }
                    }}
                  />
                  <Button variant="contained" size="small" onClick={addGenre} startIcon={<LibraryAddIcon />}>
                    Add Tab
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={removeCurrentGenre}
                    startIcon={<TabUnselectedIcon />}
                  >
                    Remove Tab
                  </Button>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    value={newItemText}
                    onChange={(e) => {
                      setNewItemText(e.target.value);
                      setAdminMessage('');
                    }}
                    placeholder={`Add a ${currentGenre} item`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addItem();
                      }
                    }}
                  />
                  <Button variant="contained" size="small" onClick={addItem} startIcon={<AddIcon />}>
                    Add
                  </Button>
                </Stack>

                {adminMessage && (
                  <Alert severity="info" sx={{ mt: 1.25 }}>
                    {adminMessage}
                  </Alert>
                )}
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Rankings;
