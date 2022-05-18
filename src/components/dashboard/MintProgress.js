import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

const MAX_SUPPLY = 6000;

export default ({numTokensMinted, ...props}) => {

  const progress = Math.floor(numTokensMinted / MAX_SUPPLY * 10000) / 100;

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
              MINT PROGRESS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {progress}% 
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={progress}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
