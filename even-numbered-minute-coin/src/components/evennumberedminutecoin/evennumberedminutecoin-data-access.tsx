'use client'

import { getEvennumberedminutecoinProgram, getEvennumberedminutecoinProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useEvennumberedminutecoinProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getEvennumberedminutecoinProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getEvennumberedminutecoinProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['evennumberedminutecoin', 'all', { cluster }],
    queryFn: () => program.account.evennumberedminutecoin.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['evennumberedminutecoin', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ evennumberedminutecoin: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useEvennumberedminutecoinProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useEvennumberedminutecoinProgram()

  const accountQuery = useQuery({
    queryKey: ['evennumberedminutecoin', 'fetch', { cluster, account }],
    queryFn: () => program.account.evennumberedminutecoin.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['evennumberedminutecoin', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ evennumberedminutecoin: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['evennumberedminutecoin', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ evennumberedminutecoin: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['evennumberedminutecoin', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ evennumberedminutecoin: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['evennumberedminutecoin', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ evennumberedminutecoin: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
