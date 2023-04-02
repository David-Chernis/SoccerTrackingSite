import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'

export default function WeekSelector() {
    //List out options
    const options = [
        'Full Season',
        'Week 1',
        'Week 2', 
        'Week 3'
    ]

    const [anchor, setAnchor] = useState(null)
    const [selected, setSelected] = useState(0);
    const isOpen = Boolean(anchor)

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchor(null);
    }

    const handleSelect = (event, index) => {
        setSelected(index);
        setAnchor(null);
        //send GET for specific data required
    }

    return (
        <>
        <List dense component='nav' sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: '200px'
        }}>
            <ListItemButton onClick={handleOpenMenu} selected={isOpen}>
                <ListItemText 
                    primary={options[selected]}
                    primaryTypographyProps={{noWrap: true}}
                />
            </ListItemButton>
        </List>
        <Menu anchorEl={anchor} open={isOpen} onClose={handleCloseMenu}
            MenuListProps={{
                role: 'listbox', dense: true, disablePadding: true,
                sx: {
                    width: '200px',
                    bgcolor: 'secondary.main'
                }
            }} 
        >
            {options.map((option, index) => (
                <MenuItem 
                    className='Menu-Item'
                    key={option} 
                    selected={index === selected}
                    onClick={(event) => handleSelect(event, index)}
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                    }}
                >
                    {option}
                </MenuItem>
            ))}
        </Menu>
        </>
    );
}