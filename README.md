# ZuCash

We propose a peer-to-peer system of social credit. It is open, permissionless, and can be deployed on any EVM-compatible blockchain. The system assumes minimal structure. By virtue of four weird rules, we can invert how we represent money, in order to cultivate more healthy communal use. In short, entities hold this money as a liability that simultaneously grants access to high-bandwidth, authentic communication channels by which ongoing and lively relationships may be established.

## De-Sign

1. All ZuCash are the same.
2. I cannot create ZuCash: they are minted only when I accept another’s proposal.
3. I can forgive as much ZuCash as I currently hold.
4. ZuCash are non-transferrable.

The system is instantiated by means of two, simple contracts. One adapts the ERC20 token standard by removing any ability to transfer, or approve other accounts to transfer on your behalf. This contract is responsible for creating and destroying ZuCash, and tracking the balance associated with each account. The other contract holds the logic for proposing and forgiving HON, which is done via two simple mappings.

## Run the Dapp

```bash
git clone https://github.com/annaalexakr/zucash.git
cd zucash
yarn
yarn start
```

## Shared Principles

These are rough principles and a running code for how we treat one another and ourselves. We offer these as questions, rather than impositions. We _aspire_ to live this way, we do not expect that we will always succeed.

1. **Curiosity** - are we open, interested, passionate, and enthusiastic?
2. **Fellowship** - are we honest, transparent, approachable, and caring?
3. **Health** - are we balanced and wholesome? Do we have integrity?
4. **Participation** - are we accountable? Do we do what we say we will?
5. **Kindness** - are we forgiving, mature, and compassionate?
6. **Joy** - are we light-hearted? Do we celebrate life in all its dimensions?