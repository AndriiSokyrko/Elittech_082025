import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function IconNavigation():React.FC {
    const [value, setValue] = React.useState(0);

    return (
        <Box position="fixed" sx={{ bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if(event.target.id==='favorits'){
                        console.log('fav')}
                }}
            >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon /> } name="recents" />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} id="favorits"/>
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} name="nearby"/>
            </BottomNavigation>
        </Box>
    );
}

