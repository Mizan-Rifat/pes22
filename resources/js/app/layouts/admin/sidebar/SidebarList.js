import React from 'react';
import List from 'app/components/sidebar/SidebarList';
import { Divider, ListSubheader } from '@mui/material';
import routes from 'app/routes/routesList';
import SidebarListItem from './SidebarListItem';

const SidebarList = () => {
  return (
    <>
      {routes.map(route => (
        <List
          key={route.title}
          component="nav"
          subheader={
            route.title && (
              <Divider textAlign="left">
                <ListSubheader component="div">{route.title}</ListSubheader>
              </Divider>
            )
          }
        >
          {route.routes.map(singleRoute => (
            <SidebarListItem
              key={singleRoute.title}
              route={singleRoute}
              label={1}
            />
          ))}
        </List>
      ))}
    </>
  );
};

export default SidebarList;
