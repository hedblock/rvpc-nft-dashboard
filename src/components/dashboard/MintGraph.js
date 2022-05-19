import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
  useTheme
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useMinMaxMints, useMints } from 'src/hooks/moralisHooks';
import { round, ellipsize } from 'src/utils/display';

const MintGraph = (props) => {
  const theme = useTheme();

  const { mints } = useMints();
  const { minObj, maxObj } = useMinMaxMints();
  const [isUsd, setIsUsd] = useState(true);

  const gas_used_key = isUsd ? 'gas_used_usd' : 'gas_used_eth';
  const gas_used_unit = isUsd ? 'USD' : 'ETH';
  const decimalPlace = isUsd ? 2 : 6;

  const data = {
    datasets: [
      {
        data: mints,
        parsing: {
          yAxisKey: gas_used_key,
          xAxisKey: 'block_timestamp'
        },
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        borderWidth: 1.5,
        tension: 0.25
      },
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
            unit: 'month'
        }
      },
      y: {
        ticks: {
          fontFamily: theme.typography.fontFamily,
          size: 100
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      labels: {
        color: "rgb(255, 99, 132)",
        font: {
          family: "Montserrat" // Add your font here to change the font of your legend label
        },
        size: 100
      },
    },
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <FormControlLabel
            control={(
              <Switch 
                checked={isUsd} 
                onChange={() => setIsUsd(!isUsd)}
              />
            )}
            label={gas_used_unit}
          />
        )}
        title="Latest Mints"
        subheader={`Gas Price in ${gas_used_unit}`}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <Grid container spacing={1} sx={{paddingBottom: "24px"}}>
            <Grid item xs={12} md={4}>
              <Typography align='center' variant='h6'>Min: {minObj && round(minObj.get(gas_used_key), decimalPlace)} {gas_used_unit}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography align='center' variant='h6'>Min. Address: {minObj && ellipsize(minObj.get('to'), 8)}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography align='center' variant='h6'>Max: {maxObj && round(maxObj.get(gas_used_key), decimalPlace)} {gas_used_unit}</Typography>
            </Grid>
          </Grid>
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default MintGraph;