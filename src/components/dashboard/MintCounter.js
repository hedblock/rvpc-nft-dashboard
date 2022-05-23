/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, Card, CardContent, Grid, Typography, Skeleton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MintCounter = ({numTokensMinted, ...props}) => {
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              Tokens Minted
            </Typography>
            {
              numTokensMinted ? (
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  {numTokensMinted}
                </Typography>
              ) : (
                <Skeleton variant="text" animation='wave' />
              )
            }
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <AccountBalanceWalletIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon color="error" />
          <Typography
            color="error"
            sx={{
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  )
};

export default MintCounter;
