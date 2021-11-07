import { Grid, 
  // Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {RemoveRedEye,Delete,Create, Search} from '@mui/icons-material';
import {useEffect, useMemo, useState} from 'react';
import api from './config/apisauce';
import { NavLink } from "react-router-dom";
import { Box } from '@mui/system';
import AddModal from './Components/AddModal';

const Main = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const searchThis = useMemo(() => {
    let searchable = Object.keys(items).filter((key,index) => {
      return items[key]['name'].toLowerCase().includes(search.toLowerCase());
    })
    if(search !== '') {
      return searchable.map((element) => {
        console.log(items[element]);
        return items[element];
      });
    }
    return items;
  },[search,items])

  const getItems = async () => {
    const result = await api.get('/api/get-all-items');
    setItems(result.data);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getItems();
  },[]);

  return (
    <Grid
      container
      justifyContent='center'
      alignItems="flex-start"
      spacing={2}
      style={{marginTop:90}}
     >
      <AddModal open={open} onClose={onClose} setItems={setItems}/>
      <Grid item>
        <Box sx={{ minWidth: 200 }}>
          <Card>
            <CardContent>
              <TextField 
                fullWidth size='small'
                placeholder='Search...'
                InputProps={{
                  endAdornment: <Search/>,
                }}
                value={search}
                onChange={(event)=>setSearch(event.target.value)}
              />
              <Button 
                sx={{ mt:1.1 }} 
                variant='contained' 
                size='small'
                onClick={()=>setOpen(true)}
              >ADD</Button>
              <Typography sx={{ fontSize: 14, mt:1.4 }} color="text.secondary" gutterBottom>Links</Typography>
                <NavLink to='/history'>History</NavLink>
            </CardContent>
          </Card>
        </Box>
      </Grid>
      <Grid item>
          <TableContainer component={Paper} sx={{ minWidth: 650, maxHeight: 550}}>
            <Table stickyHeader >
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    Item Name
                  </TableCell>
                  <TableCell align='right'>
                    Quantity
                  </TableCell>
                  <TableCell align='center'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                Object.keys(searchThis).map((key,index) => {
                  return (
                    <TableRow>
                      <TableCell align="left">
                        {searchThis[key]['name']}
                      </TableCell>
                      <TableCell align="right">
                        {searchThis[key]['Quantity']}
                      </TableCell>
                      <TableCell align="center">
                        <Grid container alignItems="center" justifyContent='center'>
                          <Grid item>
                            <IconButton size='small'>
                              <RemoveRedEye fontSize='small'/>
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton size='small'>
                              <Delete fontSize='small'/>
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton size='small'>
                              <Create fontSize='small'/>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })
              }
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Main;