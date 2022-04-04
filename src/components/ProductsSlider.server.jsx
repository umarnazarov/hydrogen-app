import React from 'react'
import gql from 'graphql-tag';
import { log, useShopQuery } from '@shopify/hydrogen';

import ProductSlider from './ProductsSlider.client';

function ProductsSlider({ handle = 'vans' }) {
    const {data} = useShopQuery({
        query: QUERY,
        variables: {
            handle: handle,
        },
        preload: true,
    });

    let images = data.collectionByHandle.products.edges.map(p => p.node.images.edges[0].node.url)


    return (
      <ProductSlider images={images}/>
  )
}

export default ProductsSlider

const QUERY = gql`
  query productsByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
        id
    		products(first: 10) {
            edges {
                node {
                    handle
                    images(first:1) {
                    edges {
                    node {
                        url
                      }
                    }
                }
                }
            }
        }
    }
}
`;