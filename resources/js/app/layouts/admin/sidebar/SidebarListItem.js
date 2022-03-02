import React, { useState } from 'react';
import List from 'app/components/sidebar/SidebarList';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';

const SidebarListItem = ({ route, label }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {route.children ? (
        <ListItemButton onClick={handleClick} sx={{ pl: 2 * label }}>
          <ListItemIcon>{route.icon}</ListItemIcon>
          <ListItemText primary={route.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      ) : (
        <NavLink to={route.path} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <ListItemButton sx={{ pl: 2 * label }} selected={isActive}>
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          )}
        </NavLink>
      )}
      {route.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {route.children.map(item => (
              <SidebarListItem
                key={item.title}
                route={item}
                label={label + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarListItem;
