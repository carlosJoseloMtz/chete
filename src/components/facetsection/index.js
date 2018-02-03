import React, { Component } from 'react'
import './index.css'

class FacetSection extends Component {

  constructor (props) {
    super(props)
    this.state = {
      facets: []
    }
  }

  async componentWillMount () {
    this.setState({
      facets: [
        {
          facet: 'Facet 1',
          values: [
            {
              key: 'Brand1',
              value: 'brand1'
            },
            {
              key: 'Brand2',
              value: 'brand2'
            },
            {
              key: 'Brand3',
              value: 'brand3'
            }
          ]
        },
        {
          facet: 'Facet 2',
          values: [
            {
              key: 'Brand4',
              value: 'brand4'
            },
            {
              key: 'Brand5',
              value: 'brand5'
            },
            {
              key: 'Brand6',
              value: 'brand6'
            }
          ]
        }
      ]
    })
  }

  getFacets () {
    if (this.state.facets.length === 0) {
      return null
    }

    return this.state.facets.map(facet => {
      return <div key={facet.facet}>
        <h3>{facet.facet}</h3>
        {
          facet.values.map(fv => {
            return <div key={fv.value}>
              {fv.key}
            </div>
          })
        }
      </div>
    })
  }

  render () {
    return <div>
      {
        this.getFacets()
      }
    </div>
  }
}

export default FacetSection
