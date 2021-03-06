import {useEffect, useState} from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, TextField } from '@mui/material';
import apisauce from '../config/apisauce';

const AddModal = (props) => {
  const { id, editMode, data, onClose, open, setItems } = props;
  const [name,setName] = useState('');
  const [quantity,setQuantity] = useState(0);
  const [message,setMessage] = useState('');
  const [openSnack,setSnack] = useState(false);
  const [isSuccess,setIsSuccess] = useState('error');

  const save = async () => {
    let data= {
      name:name,
      quantity:quantity,
      id: editMode ? id : '',
    };
    var result = await apisauce.get('/api/upsert-items/',data);
    if(result.ok) {
      setMessage('Added Successfully')
      setIsSuccess('success');
      setSnack(true);
      if(!editMode) {
        setName('');
        setQuantity(0);
      }
      const result = await apisauce.get('/api/get-all-items');
      setItems(result.data)
    }else {
      setMessage('Error Something went wrong')
      setIsSuccess('error');
      setSnack(true);
    }
  };

  const handleClose = () => {
    setSnack(false);
  };

  useEffect(()=> {
    if(editMode) {
      setName(data['name'])
      setQuantity(data['Quantity'])
    }else {
      setName('');
      setQuantity(0);
    }
  },[data])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <DialogTitle>
          {editMode ? 'Edit' : 'Add'} Item
        </DialogTitle>
        <Grid container spacing={2}>
          <Grid item>
            <TextField 
              size='small' 
              placeholder='Name'
              value={name}
              onChange={(event)=>setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField 
              type='number'
              size='small' 
              placeholder='Quantity'
              value={parseInt(quantity)}
              min={0}
              onChange={(event)=>setQuantity(event.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button sx={{ mr:1.5}} onClick={onClose}>Cancel</Button>
        <Button onClick={save}>Save</Button>
      </DialogActions>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose} ><Alert severity={isSuccess}>{message}</Alert></Snackbar>
    </Dialog>
  );
};

export default AddModal;