import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';

const TournamentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });

  const [listItems] = useState([
    {
      label: 'Details',
      link: 'details'
    },
    {
      label: 'Fixtures',
      link: 'fixtures'
    },
    {
      label: 'Results',
      link: 'results'
    },
    {
      label: 'Officials',
      link: 'officials'
    }
  ]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="secondary mailbox folder" sx={{ p: 0 }}>
        {listItems.map(item => (
          <ListItemButton
            selected={location.pathname.includes(`/${item.link}`)}
            onClick={() => navigate(item.link)}
            sx={{ p: 1.5 }}
          >
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': { fontWeight: 400 }
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default TournamentSidebar;
