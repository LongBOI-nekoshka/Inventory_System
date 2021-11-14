import { Grid, 
    Card,
    Typography,
    CardContent,
    TextField,
    Divider,
} from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
import api from './config/apisauce';
import { NavLink } from "react-router-dom";
import { Search } from '@mui/icons-material';

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');

  const getHistory = async () => {
    const result = await api.get('/api/get-all-history/');
    if(result.ok) {
      setHistory(result.data);
    }
  };

  const searchThis = useMemo(() => {
    let searchable = Object.keys(history).filter((key,index) => {
      if(!history[index]['item']['name'].toLowerCase().includes(search.toLowerCase())) {
        return history[index]['action'].toLowerCase().includes(search.toLowerCase()) ?? history[index]['item']['name'].toLowerCase().includes(search.toLowerCase());
      }
      return history[index]['item']['name'].toLowerCase().includes(search.toLowerCase());
    });

    if(search !== '') {
      return searchable.map((element) => {
        return history[element];
      });
    }

    return history;
  },[search,history]);

  useEffect(() => {
    getHistory();
  },[])

  return (
    <Grid 
      container
      justifyContent='center'
      alignItems="flex-start"
      style={{marginTop:90}}
    >
      <Grid item container justifyContent='space-between'
      alignItems="flex-start"direction='column' xs={2} >
        <Grid item>
          <TextField 
            placeholder='Search...' 
            size='small' fullWidth
            InputProps={{
              endAdornment: <Search/>,
            }}
            style={{position:'fixed',width:220,top:120}}
            onChange={(event)=>setSearch(event.target.value)}
          />
        </Grid>
        <Grid item>
        <NavLink to='/inventory'>Inventory</NavLink>
        </Grid>
      </Grid>
      <Grid item container justifyContent='center' alignItems='center' spacing={2} xs={6}>
      {
        searchThis.map((index) => {
          return (
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant='caption'>
                    <strong>Id: {index._id}</strong>
                  </Typography>
                  <Typography variant='body2'>
                    <strong>Action: {index.action.toUpperCase()}</strong>
                  </Typography>
                  <Typography variant='body1'>
                    Name: {index.item.name}
                  </Typography>
                  <Typography variant='body1'>
                    Quantity: {index.action === 'deleted' ? index.item.Quantity : index.item.quantity}
                  </Typography>
                  <Typography variant='h5'>
                    { index.action === 'deleted' ? 'Deleted:' : 'Created:'} {index.createdAt}
                  </Typography>
                  {
                    index.action === 'updated' ? 
                      <>
                        <Divider variant='br'/>
                        <Typography variant='h5'>
                          <strong>Previous Value</strong>
                        </Typography>
                        <Typography variant='body1'>
                          Name: {index.item.preval.name}
                        </Typography>
                        <Typography variant='body1'>
                          Quantity: {index.item.preval.Quantity}
                        </Typography>
                        <Typography variant='h5'>
                          Updated: {index.item.preval.updatedAt}
                        </Typography>
                      </>
                     :undefined
                  }
                </CardContent>
              </Card>
            </Grid>
          )
        })
      }
      </Grid>
    </Grid>
  );
};

export default History;