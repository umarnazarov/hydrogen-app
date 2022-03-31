import React from 'react'
import gql from 'graphql-tag';
import { log, useShopQuery } from '@shopify/hydrogen';

// import Testimonial from './Testimonial.client';

function Testimonials({ handle = 'vans' }) {
    const {data} = useShopQuery({
        query: QUERY,
        variables: {
            handle: handle,
        },
        preload: true,
    });

    let images = data.collectionByHandle.products.edges.map(p => p.node.images.edges[0].node.url)


    return (
      <>hi</>
    //   <Testimonial images={images}/>
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