import { Grid, 
  // Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import {RemoveRedEye,Delete,Create} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import api from './config/apisauce';

const Main = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const result = await api.get('/api/get-all-items');
    setItems(result.data);
  };

  useEffect(() => {
    getItems();
  },[]);
  

  return (
    <Grid
      container 
      justifyContent='space-around'
      alignItems="center"
      style={{marginTop:90}}
     >
      <Grid item>
          <TableContainer component={Paper}>
            <Table  sx={{ minWidth: 650 }} >
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
                Object.keys(items).map((key,index) => {
                  return (
                    <TableRow>
                      <TableCell align="left">
                        {items[key]['name']}
                      </TableCell>
                      <TableCell align="right">
                        {items[key]['Quantity']}
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