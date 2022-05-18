Moralis.Cloud.define("getMostPopularCollections", async (request) => {
    const nftOwnersData = await Moralis.Web3API.token.getNFTOwners({address: request.params.contractAddress});
    const nftOwners = [... new Set(nftOwnersData.result.map(data => data.owner_of))];
    const collectionHistogram = {};
    await Promise.all(nftOwners.slice(0,10).map(async (owner) => {
        const ownerNftData = await Moralis.Web3API.account.getNFTs({address: owner});
        ownerNftData.result.forEach(data => {
            collectionHistogram[data.token_address] ? collectionHistogram[data.token_address]++ : collectionHistogram[data.token_address] = 1;
        });
    }))
    return collectionHistogram;
})

Moralis.Cloud.define("getSalesVolume", async (request) => {
    const salesData = await Moralis.Web3API.token.getNFTTrades({
        address: request.params.contractAddress,
        chain: 'rinkeby'
    });
    return {
        sales: salesData.result.length,
        volume_eth: salesData.result.reduce((acc, sale) => acc + parseInt(sale.price) / (10 ** 18), 0)
    }
})

Moralis.Cloud.define("getNumberOfSoldTokens", async (request) => {
    const salesData = await Moralis.Web3API.token.getNFTTrades({address: request.params.contractAddress});
    const tokensSold = new Set();
    salesData.result.forEach(sale => sale.token_ids.forEach(token_id => tokensSold.add(token_id)));
    return tokensSold.size;
})

Moralis.Cloud.define("getHighestSalePrice", async (request) => {
    const salesData = await Moralis.Web3API.token.getNFTTrades({address: request.params.contractAddress});
    return Math.max(...salesData.result.map(sale => parseInt(sale.price) / (10 ** 18)));
})


Moralis.Cloud.define("getTransfersNonSale", async (request) => {
    const transfers = await getTransfers(request.params.contractAddress);
    return {
        from_addresses: transfers.map(transfer => transfer.from_address),
        to_addresses: transfers.map(transfer => transfer.to_address),
    };
})

Moralis.Cloud.define("getOwners", async (request) => {
    return await getOwners("0x76236B6f13F687D0bbeDbbCe0e30e9F07d071C1C");
})

Moralis.Cloud.define("getNumOwners", async (request) => {
    return (await getOwners(request.params.contractAddress)).length;
})

Moralis.Cloud.define("getHolders", async (request) => {
    const [nftOwnersData, transfers] = await Promise.all([
        Moralis.Web3API.token.getNFTOwners({address: request.params.contractAddress}),
        getTransfers(request.params.contractAddress)
    ]);
    const nftOwners = [... new Set(nftOwnersData.result.map(data => data.owner_of))];
    return nftOwners.filter(owner => !transfers.some(transfer => transfer.to_address === owner));
})

async function getTransfers(address) {
    const [transfersData, salesData] = await Promise.all([
        Moralis.Web3API.token.getNFTTransfers({address}),
        Moralis.Web3API.token.getNFTTrades({address})
    ]);
    return transfersData.result
    return transfersData.result.filter(transfer => !salesData.result.some(sale => sale.transaction_hash === transfer.transaction_hash));
}