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
  Popover,
  Snackbar,
  Alert,
} from '@mui/material';
import {RemoveRedEye,Delete,Create, Search, CheckCircle, Cancel} from '@mui/icons-material';
import {useEffect, useMemo, useState} from 'react';
import api from './config/apisauce';
import { NavLink } from "react-router-dom";
import { Box } from '@mui/system';
import AddModal from './Components/AddModal';

const Main = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemId, setItemId] = useState(''); 
  const [openSnack, setOpenSnack] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');
  const [message, setMessage] = useState('');
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
  },[search,items]);

  const deleteThis = async () => {
    let data = {
      id:itemId
    };
    const result = await api.post('/api/delete/item',data);
    console.log(result.data);
    if(result.ok) {
      handleClose();
      setOpenSnack(true);
      setIsSuccess('success');
      setMessage('Deleted Successfully');
      getItems();
    }else {
      setOpenSnack(true);
      setIsSuccess('error');
      setMessage('Something went wrong');
    }
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const getItems = async () => {
    const result = await api.get('/api/get-all-items');
    setItems(result.data);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (event,id) => {
    setItemId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openThis = Boolean(anchorEl);
  const id = openThis ? 'simple-popover' : undefined;

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
                            <IconButton size='small' onClick={(event)=>handleClick(event,searchThis[key]['_id'])} >
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
      <Popover
        id={id}
        open={openThis}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container p={2}>
          <Grid>
            <Typography variant='caption'>Delete This Item</Typography>
          </Grid>
          <Grid item>
            <IconButton size='small' onClick={deleteThis}>
              <CheckCircle fontSize='small'/>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size='small'>
              <Cancel fontSize='small' onClick={handleClose}/>
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert severity={isSuccess}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Main;