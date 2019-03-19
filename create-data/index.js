const superagent = require('superagent');
const loremIpsum = require('lorem-ipsum');

const host = 'catamel';
const numProposals = 50;
const numDatasetsPerProposal = [5, 15];
const numDatafilesPerDataset = [5, 15];
const bytesPerDatafile = [100000000, 1000000000];

superagent
    .post(`${host}:3000/api/v2/Users/login`)
    .send({username: 'admin', password: 'aman'})
    .then(res => res.body.id)
    .then(createProposals)
    .catch(err => console.error(err));

function randInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function randPick(arr) {
    return arr[randInt(0, arr.length - 1)];
}

function createProposals(token) {
    const ownerGroups = ['group-1', 'group-2', 'group-3'];
    const owners = ['owner-1', 'owner-2', 'owner-3'];
    const beamlines = ['FooMAX', 'BarMAX', 'BazMAX'];

    for (let i = 0; i < numProposals; i++) {
        const ownerGroup = randPick(ownerGroups);
        const owner = randPick(owners);
        const beamline = randPick(beamlines);

        const proposalId = `proposal-${i}`;
        const email = `${owner}@email.com`;
        const title = `Proposal ${i}`;
        const abstract = loremIpsum({count: 100});

        const proposal = {
            proposalId,
            title,
            abstract,
            email,
            ownerGroup,
            MeasurementPeriodList: []
        };

        superagent
            .post(`${host}:3000/api/v2/Proposals`)
            .query({access_token: token})
            .send(proposal)
            .then(() => createDatasets(token, {proposalId, ownerGroup, owner, email, beamline}))
            .catch(err => console.error(err));
    }
}

function createDatasets(token, {proposalId, ownerGroup, owner, email, beamline}) {
    const num = randInt(...numDatasetsPerProposal);

    for (let i = 0; i < num; i++) {
        const creationTime = new Date(
            randInt(2010, 2018),
            randInt(0, 11),
            randInt(2, 365),
            randInt(0, 23),
            randInt(0, 56)
        );
    
        const sourceFolder = `/data/${ownerGroup}/${i}`;
    
        const fields = Array(randInt(5,10)).fill(0).map((_, i) => `field_${i}`);
        const scientificMetadata = fields.reduce((metadata, field) => {
            return {...metadata, [field]: 'value ' + randInt(10, 20)};
        }, {});

        const dataset = {
            owner,
            contactEmail: email,
            creationLocation: beamline,
            sourceFolder,
            creationTime,
            type: 'raw',
            ownerGroup,
            proposalId,
            scientificMetadata
        };

        superagent
            .post(`${host}:3000/api/v2/Datasets`)
            .query({access_token: token})
            .send(dataset)
            .then(res => res.body.pid)
            .then(pid => createOrigDatablock(token, {ownerGroup, datasetId: pid}))
            .catch(err => console.error(err));
    }
}

function createOrigDatablock(token, {ownerGroup, datasetId}) {
    const num = randInt(...numDatafilesPerDataset);
    
    const dataFileList = Array(num).fill().map((_, i) => ({
        path: `datafile_${i}.h5`,
        size: randInt(...bytesPerDatafile),
    }));

    const totalSize = dataFileList
        .map(({size}) => size)
        .reduce((sum, size) => sum + size);

    const origDatablock = {
        dataFileList,
        ownerGroup,
        datasetId,
        size: totalSize
    };
    
    superagent
        .post(`${host}:3000/api/v2/OrigDatablocks`)
        .query({access_token: token})
        .send(origDatablock)
        .catch(err => console.error(err))
}
