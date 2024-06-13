"use client";

import React, { useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Link as MuiLink } from '@mui/material'; // Import Link as MuiLink
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { fetchUsers } from '../store/userSlice';
import Link from 'next/link';
import AddUser from '@/components/AddUser';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box mt={2}>
          <Link href="/login" passHref>
            Go to Login Page
          </Link>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          User List
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ my: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => {
                    return (user ?
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                      : <React.Fragment key={index}></React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <AddUser />
          </>
        )}
      </Box>
    </Container>
  );
}
