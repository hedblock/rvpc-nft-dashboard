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
import Copyable from '../Copyable';
import MintGraphInterval from './MintGraphInterval';

const intervals = [100, 500, 1000]

const MintGraph = (props) => {
  const theme = useTheme();

  const [isUsd, setIsUsd] = useState(true);
  const [displayInterval, setDisplayInterval] = useState(intervals[0]);

  const { mints } = useMints(displayInterval);
  const { minObj, maxObj } = useMinMaxMints();

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
      }
    },
    elements: {
      point: {
        radius: 0
      }
    }
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
            <Grid item xs={12} sm={6} xl={3}>
              <Typography align='center' variant='h6'>Min: {minObj && round(minObj.get(gas_used_key), decimalPlace)} {gas_used_unit}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Typography align='center' variant='h6'>Max: {maxObj && round(maxObj.get(gas_used_key), decimalPlace)} {gas_used_unit}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Typography align='center' variant='h6'>
                Min. Address: <Copyable 
                    displayText={minObj && ellipsize(minObj.get('to'), 8)}
                    copyText={minObj && minObj.get('to')}
                    sx={{fontSize: "1.125rem"}}
                  /> 
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <Typography align='center' variant='h6'>
                Max. Address: <Copyable 
                    displayText={maxObj && ellipsize(maxObj.get('to'), 8)}
                    copyText={maxObj && maxObj.get('to')}
                    sx={{fontSize: "1.125rem"}}
                  /> 
              </Typography>
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
          justifyContent: 'center',
          p: 4
        }}
      >
        <MintGraphInterval 
          intervals={intervals}
          displayInterval={displayInterval}
          setDisplayInterval={setDisplayInterval}
        />
      </Box>
    </Card>
  );
};

export default MintGraph;