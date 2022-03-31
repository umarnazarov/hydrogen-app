import React from 'react'

import { log, useShopQuery } from '@shopify/hydrogen';
import gql from 'graphql-tag';


function Testimonials({ handle = 'vans' }) {
    const {data} = useShopQuery({
        query: QUERY,
        variables: {
            handle: handle,
        },
        preload: true,
    });

    log.debug(data)
  return (
      data.collectionByHandle.products.edges.map(p => <h1>{p.node.handle}</h1>)
  )
}

export default Testimonials

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