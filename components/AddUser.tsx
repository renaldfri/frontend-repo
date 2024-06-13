import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { addUser } from '../store/userSlice';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';

const AddUserModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = async () => {
    dispatch(addUser({ name, email }));
    setIsModalOpen(false)
  };

  const handleClose = () => {
    setIsModalOpen(false)
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add User
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="add-user-modal-title" variant="h5" gutterBottom>
            Add New User
          </Typography>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
