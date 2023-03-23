import React, { useState, useEffect } from 'react'
import { useNetwork, useSigner, useAccount } from 'wagmi'
import { propose } from '../utils/contracts'
import QrReader from 'react-qr-reader'
import useError from '../hooks/useError'
import useLoading from '../hooks/useLoading'

import qrcode from '../images/qr-code.png'

function Propose () {
  const { chain } = useNetwork()
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const { open: openLoading, close: closeLoading } = useLoading()
  const { open: openError } = useError()

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const [validForm, setValidForm] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScan = async (scanData) => {
    if (scanData && scanData !== '') {
      setReceiver(scanData)
      setShowScanner(false)
    }
  }
  const handleError = (err) => {
    console.error(err)
  }

  const isValidEthereumAddress = (addr) => {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(addr)
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const name = e.target.name;
  
    if (name === 'receiver') {
      if (address === input) {
        setError("You can't propose your own HON")
      } else {
        setReceiver(input);
        if (!isValidEthereumAddress(input)) {
          setError('Please enter a valid Ethereum address')
          setValidForm(false)
        } else {
          setError('')
        }
      }
    } else if (name === 'amount') {
      const amountNum = Number(input);
      if (isNaN(amountNum) || amountNum <= 0) {
        setError('Please enter a valid amount greater than 0')
        setValidForm(false)
      } else {
        setError('')
      }
      setAmount(input)

      const isAmountValid = !isNaN(amount)
      const isReceiverValid = isValidEthereumAddress(receiver)
      setValidForm(isAmountValid && isReceiverValid)
    }
  };

  async function handlePropose (e) {
    e.preventDefault()

    openLoading('Please sign this transaction')

    // Call the propose function with the inputted address and amount
    let tx
    try {
      tx = await propose(receiver, amount, chain.id, signer)
    } catch (err) {
      openError('There was an error. Please try again.')
      closeLoading()
      setError('Failed to submit transaction')
      return
    }

    openLoading('Making money weirder')

    await tx.wait(1)

    closeLoading()

    // Reset the form inputs
    setReceiver('')
    setAmount('')
  }

  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen) return str
    const start = str.slice(0, 8)
    const end = str.slice(-5)
    return `${start}...${end}`
  }

  const truncatedReceiver = truncateString(receiver, 8)

  return (
    <div>
      <div className='flex md:text-4xl text-2xl flex-grow font-volkhorn text-gray-700 self-center'>
        Propose
      </div>
      <form className='flex flex-col gap-4 p-4 bg-gray-100 rounded-md shadow-md'>
        <label htmlFor='receiver' className='text-gray-800'>
          Whom do you oblige?
        </label>
        <div className='relative'>
          <input
            type='text'
            id='receiver'
            name='receiver'
            value={isSmallScreen ? truncatedReceiver : receiver}
            onChange={handleInputChange}
            className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
          />
          <button
            type='button'
            className='absolute right-0 h-full px-3 text-gray-500 hover:text-gray-700'
            onClick={() => setShowScanner(!showScanner)}
          >
            <img src={qrcode} alt='Scan' className='h-8' />
          </button>
        </div>
        {showScanner && (
          <QrReader
            onScan={handleScan}
            onError={handleError}
            style={{ width: '300px', margin: '0 auto 1rem' }}
          />
        )}
        <label htmlFor='amount' className='text-gray-800'>
          Amount
        </label>
        <input
          type='text'
          id='amount'
          name='amount'
          autoComplete='off'
          value={amount}
          onChange={handleInputChange}
          className='w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
        />
        <button
          type='submit'
          className={`w-1/2 px-4 py-2 mx-auto text-white rounded-md focus:outline-none focus:ring ${
            validForm ? 'bg-[#233447] hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handlePropose}
          disabled={!validForm}
        >
          Propose
        </button>
      </form>
      {error && <p className='mt-4 text-red-500'>{error}</p>}
    </div>
  )
}

export default Propose