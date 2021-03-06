import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { allowedNetworkIds } from '~/web3/allowedNetworkIds'
import { FooterContainer } from '~/components/layout/Footer'
import { ErrorMessage } from '~/components/ErrorMessage'
import { HooksList } from '~/components/hooks/HooksList'
import { LandingHero } from '~/components/hooks/LandingHero'
import { web3Queries } from '~/queries/web3Queries'
import * as routes from '~/../config/routes'

export class HomePage extends PureComponent {
  render () {
    const heroColor = 'is-link'

    return (
      <div className='is-positioned-absolutely'>
        <LandingHero heroColor={heroColor} />
        
        <section id="your-webhooks" className='section section--main-content'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-8 col-start-md-3'>
                {/* <CodeBox /> */}
                {/* <p>
                  <a href='https://docs.zeppelinos.org' target='_blank' rel='noopener noreferrer'>See Hook Docs &gt;</a>
                </p> */}
                <Query query={web3Queries.networkIdQuery}>
                  {({ data }) => {
                    const wrongNetwork = data && data.networkId && allowedNetworkIds().indexOf(data.networkId) === -1

                    if (wrongNetwork) {
                      return <ErrorMessage errorMessage={
                        `No hooks available on the currently selected Ethereum network. (Wrong network?)`
                      } />
                    } else {
                      return (
                        <>
                          <h5 className='is-size-5 has-text-grey-dark is-uppercase has-text-weight-bold'>
                            Your WebHooks
                          </h5>
                          <br />

                          <HooksList location={this.props.location} />
                        </>
                      )
                    }
                  }}
                </Query>
              </div>
            </div>
          </div>
        </section>

        <FooterContainer />
      </div>
    )
  }
}
