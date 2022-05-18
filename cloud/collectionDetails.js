Moralis.Cloud.job("getCollectionDetails", async (request) =>  {
    const owners = await getOwners("0x76236B6f13F687D0bbeDbbCe0e30e9F07d071C1C")

    const CollectionDetail = Moralis.Object.extend("CollectionDetail");
    const collectionDetail = new CollectionDetail();

    collectionDetail.set("numTokensMinted", owners.length);
    collectionDetail.set("numOwners", (new Set(owners)).size);

    await collectionDetail.save();
});

async function getOwners(address) {
    let cursor = null;
    let owners = [];
    do {
        const nftOwnersData = await Moralis.Web3API.token.getNFTOwners({
            address,
            cursor
        });
        nftOwnersData.result.forEach(data => owners.push(data.owner_of));
        cursor = nftOwnersData.cursor;
    } while (cursor !== "" && cursor != null);
    return owners;
}