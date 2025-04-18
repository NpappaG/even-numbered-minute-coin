import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Evennumberedminutecoin } from '../target/types/evennumberedminutecoin'

describe('evennumberedminutecoin', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Evennumberedminutecoin as Program<Evennumberedminutecoin>

  const evennumberedminutecoinKeypair = Keypair.generate()

  it('Initialize Evennumberedminutecoin', async () => {
    await program.methods
      .initialize()
      .accounts({
        evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([evennumberedminutecoinKeypair])
      .rpc()

    const currentCount = await program.account.evennumberedminutecoin.fetch(evennumberedminutecoinKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Evennumberedminutecoin', async () => {
    await program.methods.increment().accounts({ evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey }).rpc()

    const currentCount = await program.account.evennumberedminutecoin.fetch(evennumberedminutecoinKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Evennumberedminutecoin Again', async () => {
    await program.methods.increment().accounts({ evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey }).rpc()

    const currentCount = await program.account.evennumberedminutecoin.fetch(evennumberedminutecoinKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Evennumberedminutecoin', async () => {
    await program.methods.decrement().accounts({ evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey }).rpc()

    const currentCount = await program.account.evennumberedminutecoin.fetch(evennumberedminutecoinKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set evennumberedminutecoin value', async () => {
    await program.methods.set(42).accounts({ evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey }).rpc()

    const currentCount = await program.account.evennumberedminutecoin.fetch(evennumberedminutecoinKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the evennumberedminutecoin account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        evennumberedminutecoin: evennumberedminutecoinKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.evennumberedminutecoin.fetchNullable(evennumberedminutecoinKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
