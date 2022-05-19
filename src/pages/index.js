import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import MintCounter from '../components/dashboard/MintCounter';
import LatestMints from '../components/dashboard/LatestMints';
import MintGraph from '../components/dashboard/MintGraph';
import MintProgress from '../components/dashboard/MintProgress';
import UniqueOwners from '../components/dashboard/UniqueOwners';
import { DashboardLayout } from '../components/dashboard-layout';

import { useCollectionDetails } from 'src/hooks/moralisHooks';

const Dashboard = () => {

  const { collectionDetails } = useCollectionDetails();

  return (
    <>
      <Head>
        <title>
          Dashboard | RVPC NFT
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              sm={6}
              xs={12}
            >
              <MintCounter numTokensMinted={collectionDetails && collectionDetails.get('numTokensMinted')} />
            </Grid>
            <Grid
              item
              lg={4}
              sm={6}
              xs={12}
            >
              <UniqueOwners numOwners={collectionDetails && collectionDetails.get('numOwners')} />
            </Grid>
            <Grid
              item
              lg={4}
              sm={6}
              xs={12}
            >
              <MintProgress numTokensMinted={collectionDetails && collectionDetails.get('numTokensMinted')} />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={8}
              xl={8}
            >
              <MintGraph sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={4}
              xl={4}
              
            >
              <LatestMints sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
