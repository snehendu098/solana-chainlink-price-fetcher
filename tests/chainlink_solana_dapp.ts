import * as anchor from "@project-serum/anchor";
// https://docs.chain.link/docs/solana/data-feeds-solana/
// Pair	Account
// BTC / USD	CzZQBrJCLqjXRfMjRN3fhbxur2QYHUzkpaRwkWsiPqbz
// ETH / USD	2ypeVyYnZaW2TNYXXTaZq9YhYvnqcjCiifW1C6n8b7Go
// LINK / USD	6N2eCQv8hBkyZjSzN1pe5QtznZL9bGn6TZzcFhaYSLTs
// SOL / USD	HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6
// USDC / USD	4NmRgDfAZrfBHQBuzstMP5Bu1pgBzVn8u1djSvNrNkrN
// USDT / USD	EkTcZ3StgQkahMtDBuREiaowjNUyeGnEDHnMbWgMGUJQ

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6"
const CHAINLINK_ID = "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny"
describe("chainlink_solana_dapp", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.ChainlinkSolanaDapp
  it("Queries SOL to USD",async () => {
    const resultAccount = anchor.web3.Keypair.generate()
    await program.rpc.execute({
      accounts: {
        resultAccount: resultAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        chainlinkFeed: CHAINLINK_FEED,
        chainlinkProgram : CHAINLINK_ID
      },
      signers: [resultAccount]
    })
    const latestPrice = await program.account.resultAccount.fetch(resultAccount.publicKey)
    console.log("Price is 🤑 🤑", latestPrice.value/100000000)
  })
});
