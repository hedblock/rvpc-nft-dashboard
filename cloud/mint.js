Moralis.Cloud.define('patchPriceErrors', async (request) => {
    const RVPCMints = Moralis.Object.extend("RVPCMints");
    const query = new Moralis.Query(RVPCMints);
    query.equalTo("gas_used_usd", undefined);
    query.limit(20);
    const results = await query.find();
    for (const result of results) {
        const transaction = await Moralis.Web3API.native.getTransaction({
            transaction_hash: result.get('transaction_hash')
        });
        const ethPrice = await Moralis.Web3API.token.getTokenPrice({
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            to_block: transaction.block_number
        });
        // result.set("gas_used_gwei", parseInt(transaction.receipt_gas_used));
        // result.set("gas_used_eth", transaction.receipt_gas_used * transaction.gas_price / (10 ** 18));
        await result.set("gas_used_usd", (transaction.receipt_gas_used * transaction.gas_price / (10 ** 18)) * ethPrice.usdPrice);
        await result.save();
    }
})

Moralis.Cloud.beforeSave("RVPCMints", async (request) => {
    const transaction_hash = request.object.get("transaction_hash");
    const transaction = await Moralis.Web3API.native.getTransaction({transaction_hash});
    const ethPrice = await Moralis.Web3API.token.getTokenPrice({
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        to_block: transaction.block_number
    });
    request.object.set("gas_used_gwei", parseInt(transaction.receipt_gas_used));
    request.object.set("gas_used_eth", transaction.receipt_gas_used * transaction.gas_price / (10 ** 18));
    request.object.set("gas_used_usd", (transaction.receipt_gas_used * transaction.gas_price / (10 ** 18)) * ethPrice.usdPrice);
});

Moralis.Cloud.afterSave("RVPCMints", async (request) => {
    const owners = await getOwners("0x76236B6f13F687D0bbeDbbCe0e30e9F07d071C1C")

    const CollectionDetail = Moralis.Object.extend("CollectionDetail");
    const collectionDetail = new CollectionDetail();

    collectionDetail.set("numTokensMinted", owners.length);
    collectionDetail.set("numOwners", (new Set(owners)).size);

    await collectionDetail.save();
});