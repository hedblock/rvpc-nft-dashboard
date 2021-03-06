import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { useMints } from 'src/hooks/moralisHooks';
import { ellipsize, round } from 'src/utils/display';

import Copyable from '../Copyable';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

const LatestMints = (props) => {

  const { mints } = useMints(10);

  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  Txn Hash
                </TableCell>
                <TableCell align='center'>
                  Address
                </TableCell>
                <TableCell align='center'>
                  Gas Used
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mints.map((mint) => (
                <TableRow
                  hover
                  key={mint.txn_hash}
                >
                  <TableCell align='center'>
                    <Copyable
                      displayText={ellipsize(mint.txn_hash, 10)}
                      copyText={mint.txn_hash}
                      sx={{fontSize: 14}}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Copyable
                      displayText={ellipsize(mint.address, 10)}
                      copyText={mint.address}
                      sx={{fontSize: 14}}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    {round(mint.gas_used_eth, 5)} ETH
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

export default LatestMints;