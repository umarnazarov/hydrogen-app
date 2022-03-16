import { useShopQuery,CacheHours, log } from '@shopify/hydrogen';
import gql from 'graphql-tag';

import React from 'react'
import ProductCard from './ProductCard';

function Recomendations({id}) {
    const {data} = useShopQuery({
        query: QUERY,
        variables: {
            productId: btoa(id),
        },
        cache: CacheHours(),
        preload: '*',
    });

    
    const recoments = data.productRecommendations.filter(p => p.variants.edges[0].node.availableForSale && p)
    log.debug(recoments)

  return (
      <div>
          <h1 className='text-black mb-7 font-bold text-3xl'>You may also like</h1>
          <div className='grid grid-cols-4 gap-6'>
          {
            recoments.length ? recoments.slice(0,4).map(p => <ProductCard product={p}/>) : <p className='text-center w-full'>We have nothing to recommend</p> 
          }
          </div>
      </div>
  )
}

export default Recomendations

const QUERY = gql`
    query
    getProducts($productId: ID!){
        productRecommendations(productId: $productId) {
            id
            title,
            handle,
            description
            variants(first: 3) {
            edges {
            cursor
            node {
            image {
                url
            },
            id
            title,
            availableForSale,
            quantityAvailable
                priceV2 {
                    amount
                    currencyCode
                    }
                }
            }
        }
  }
    } 

`