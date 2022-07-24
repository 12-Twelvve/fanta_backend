import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const dta = [
    {'itemName': 'jhol momo achar', "qty":"500"},
    {'itemName': 'piro achar', "qty":"30"},

]

function ToCook() {
  return (
    <Box sx={{ width: '70%', bgcolor: '#f1f1f3' }}>
        {/* heading */}
        <Typography gutterBottom align='center' variant="h5" component="div">
            To Cock list
          </Typography>
        {/* list */}
        {/* map through each item */}
        {dta.map(li =>(
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText align='center' primary={li.itemName} />
              <ListItemText align='center' primary={li.qty} />
            </ListItemButton>
            <Divider color={'white'} />
          </ListItem>))}
        <List>
        </List>
    </Box>
  )
}
// rgba(71, 98, 130, 0.2)---color
// bgcolor: 'rgba(71, 98, 130, 0.2)'
export default ToCook