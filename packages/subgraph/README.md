# Subgraph

Getting a subgraph set up locally is a little more challenging than just running the contracts or the dapp in the other parts of this repo. So, it gets its own README to try and help you through all the steps required to start developing locally in a more decentralized manner.

## Preflight Checks

I use a **linux** distro, and am running **Node v16**, using [nvm](https://github.com/nvm-sh/nvm). It's likely that you can get this all working on a Mac without too much trouble. I can't speak for Windows users: good luck to you.

Let's start at the beginning. That way, if you run into a problem, you'll know about it early on. **NOTE: To build graph-node with cargo, 8GB RAM are required**. There are some intricacies to running a graph node locally and quite a few dependencies. Let's see if you can get it all set up:

1. Install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2. Make sure you hav [postgres installed](https://www.postgresql.org/download/). Most modern Linux distros come with it pre-installed. Running Ubuntu 20.04 LTS I did not need to do anything further.

3. Install [IPFS](https://docs.ipfs.io/install/command-line/#official-distributions) from your home directory (These instructions are for Linux users only. Follow the link on "IPFS" to get instructions for other OS):

```bash
wget https://dist.ipfs.io/go-ipfs/v0.12.0/go-ipfs_v0.12.0_linux-amd64.tar.gz
tar -xvzf go-ipfs_v0.12.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh

# test that it's all working
ipfs --version

```

4. Install further dependencies if you're on Ubuntu:

```bash
sudo apt-get install -y clang libpq-dev libssl-dev pkg-config
```

5. Clone the `graph-node` repo into a directory of your choice. I chose to call it `TheGraph/graph-node`:

```bash
git clone https://github.com/graphprotocol/graph-node
```

## Terminal Dancing

Now for all the fun stuff. You will be juggling many terminal windows by the end of this, so take a deep breath and let's dive deep:

1. Test you hardhat setup from the root folder and ensure that the contracts are working as intended:

```bash
cd ~/Kernel/honour/packages/hardhat

# run a local node 
yarn localnode

# deploy the contracts to generate the necessary deployments.json files (do this even if the localnode command deploys them too)
yarn deployl
```

2. Open a new terminal and start the IPFS daemon:

```bash
ipfs daemon
```

3. Open a new terminal and start your postgres DB:

```bash
sudo -u postgres psql
drop database "graph-node";
create database "graph-node";
```

A word to the wise here. Postgres comes standard with an ADMIN user called "postgres". However, we'll also need a password and I could not figure out how to get that, so needed to create a new ADMIN user with a password I knew for the next step. In order to do that, run:

```bash
CREATE USER yourname WITH SUPERUSER PASSWORD 'pswd';

# you can use the below command to see all users
\du
```

4. Open a new terminal and start your local graph-node. In order to do this, you will need to ensure you are in the directory you installed it in. Also make sure to replace `yourname` and `pswd` with the appropriate values you set in the previous step:

```bash
cd ~/TheGraph/graph-node
cargo run -p graph-node --release --postgres-url postgresql://<yourname>:<pswd>@localhost:5432/graph-node --ethereum-rpc localhost:http://127.0.0.1:8545 --ipfs 127.0.0.1:5001
```

5. Before we build the frontend querying application for our graph node, we need to get some data into it. Run the front end and propose some HON for a given account.

6. Open a new terminal, in this subgraph directory, and build the frontend application for your graph-node:

```bash
cd ~/Kernel/honour/packages/subgraph
yarn create:local
yarn deploy:local
```

You can navigate to http://localhost:8000/subgraphs/name/honour-localhost/graphql to see your graph query engine. Put the below query into the left-hand pane and then click the Play button at the top to see the proposals made for a given account. YOu cna adapt the query for `honoureds`, `forgivens` or `accepteds`. In order for this to work, you will need to specify the account in the Query Variables pane at the bottom of the screen:

```graphql
query GetProposals($account: Bytes!) {
  proposeds(where: {receiver: $account}) {
    id
    proposer
    amount
    blockNumber
    blockTimestamp
    transactionHash
  }
}
```
and, in the Query Variable pane:

```json
{
  "account": "0x1234..."
}
```