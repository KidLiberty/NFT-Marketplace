import React, { useState, useEffect, useContext } from 'react'

import { NFTContext } from '../context/NFTContext'

import { Loader, NFTCard } from '../components'

const listedNFTs = () => {
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext)

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchItemsListed').then(items => {
      setNfts(items)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className='flex-start min-h-screen'>
        <Loader />
      </div>
    )
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className='flexCenter sm:p-4 p-16 min-h-screen'>
        <h1 className='font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold'>
          No NFTs listed for sale.
        </h1>
      </div>
    )
  }

  return (
    <div className='flex justify-center sm:px-4 p-12 min-h-screen'>
      <div className='w-full minmd:w-4/5 '>
        <div className='mt-4'>
          <h2 className='font-poppins font-semibold dark:text-white text-nft-black-1 text-2xl ml-4 sm:ml-2'>
            NFTs Listed for Sale
          </h2>
          <div className='mt-3 w-full flex flex-wrap justify-start md:justify-center'>
            {nfts.map(nft => {
              return <NFTCard key={nft.marketId} nft={nft} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default listedNFTs
