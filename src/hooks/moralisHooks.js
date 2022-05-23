import { useMoralisCloudFunction, useMoralisQuery } from "react-moralis"
import moment from 'moment';

export const useMints = (limit=100) => {


    const { data, error, isLoading } = useMoralisQuery(
        "RVPCMints", 
        query => query.descending("block_timestamp").limit(limit),
        [limit]);
    
    return { 
        mints: data.map(mint => ({
            gas_used_eth: mint.get('gas_used_eth'),
            gas_used_usd: mint.get('gas_used_usd'),
            block_timestamp: moment(mint.get('block_timestamp')),
            txn_hash: mint.get('transaction_hash'),
            address: mint.get('to')
        })), 
        isLoading 
    };
}

export const useMinMaxMints = () => {
    const { data: usd_min} = useMoralisQuery("RVPCMints", query => 
        query.ascending("gas_used_usd").limit(1));
    const { data: usd_max} = useMoralisQuery("RVPCMints", query => 
        query.descending("gas_used_usd").limit(1));
    return {
        maxObj: usd_max[0],
        minObj: usd_min[0]
    }
}

export const useNFTOwners = () => {
    const { data, error, isLoading } = useMoralisCloudFunction("getOwners");
    if (error) {
        console.log(error);
    }
    return { owners: data, isLoading }
}

export const useCollectionDetails = () => {
    const { data, error, isLoading } = useMoralisQuery("CollectionDetail", query => 
        query.descending("createdAt").limit(1));
    return { collectionDetails: data[0] }
}