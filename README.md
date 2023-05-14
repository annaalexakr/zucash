# ZuCash

We propose a peer-to-peer system of social credit. It is open, permissionless, and can be deployed on any EVM-compatible blockchain. The system assumes minimal structure. By virtue of four weird rules, we can invert how we represent money, in order to cultivate more healthy communal use.

## De-Sign

1. All ZuCash are the same.
2. I cannot create ZuCash: they are minted only when I accept another’s proposal.
3. I can forgive as much ZuCash as I currently hold.
4. ZuCash are non-transferrable.

The system is instantiated by means of two, simple contracts. One adapts the ERC20 token standard by removing any ability to transfer, or approve other accounts to transfer on your behalf. This contract is responsible for creating and destroying ZuCash, and tracking the balance associated with each account. The other contract holds the logic for proposing and forgiving HON, which is done via two simple mappings.

## Work done at Zuzalu

The git history reveals that this is a long-term project, but Zuzalu is a great place to experiment with new currencies in the wild. While here, we have built an api for seamless integrations, improved the webapp UX, done user testing, and collected invaluable feedback.  

It may seem like we need fancy AI or better governance simulators to help us organise in efficient, sustainable, and wise ways. The truth is simpler: it's all about the money. That may sound superficial, but it's actually about integrating our collective shadow. We all yearn for the unquantifiable benefits: belonging, communitas, love, truth. The best, most honest, way to keep the unquantifiable flowing is by being explicit about material benefits and how those relate to power and influence.

Who gets to invite new people? Who gets to organise events, when and where? Can we gate different spaces to keep them intimate and meaningful without being exclusive? Are there ways we can assign a cost to all of these actions without being elitist? 

When "cost" is determined by money you already have, the questions above are insoluble. However, we can program any kind of money we need, with any kind of features! "Cost", for instance, can be determined by the debt you are willing to incur in order to participate in different contexts you care about. 

The key here is _how we choose to be explicit about benefit_. If we use the same old idea of "tokens as assets" to quantify cost, we will reliably and predictably achieve the same old win-lose, unequal, elitist outcomes. If we [think creatively about how we represent debt and it's relationship to community](https://kernel.community/en/learn/module-2/debt/#communal-credit), we can craft many different ways of belonging which do not depend on who has the "real" money needed to fund shared work.

Creating smart contracts and a web interface is the easy work when trying to cultivate a new currency with a radically different way of representing value. The real hack is Layer 0: the people. We need to believe that different ways of relating and belonging are possible. We need to learn together about the [underlying power of incentives](https://kernel.community/en/learn/module-5/incentives). We need to trust that truly new values are achievable in this world, right now.

Money is the most powerful social tool we have. It is the "killer app". It always has been. The goal is not to make it more efficient, or to eliminate trust. Our goal is to re-establish [an older kind of faith](https://kernel.community/en/learn/module-7/scale-ability): one not premised on a separate God, king, or nation state, but simply on **belief in one another**.  

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