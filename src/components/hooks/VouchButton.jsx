import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { transactionQueries } from '~/queries/transactionQueries'
import { VouchMutationForm } from '~/components/hooks/VouchMutationForm'
import { getSystemInfo } from '~/utils/getSystemInfo'
import { findLast } from 'lodash'

export const VouchButton = graphql(transactionQueries.allTransactionsQuery)(
  class _VouchButton extends Component {
    state = {
      isVouching: false
    }

    render () {
      const { packageId } = this.props

      const vouchTx = findLast(this.props.data.transactions, tx => {
        return (
          tx.contractName === 'Vouching' &&
          tx.method === 'vouch' &&
          tx.args.values[0].toString() === this.props.packageId.toString()
        )
      })

      const approveTx = findLast(this.props.data.transactions, tx => {
        return (
          tx.contractName === 'ZepToken' &&
          tx.method === 'approve'
        )
      })

      // This sets the proper state when the voucher navigates away
      // then comes back
      const showVouchMutationForm = (
        this.state.isVouching ||
        (vouchTx || approveTx)
      )

      return (
        showVouchMutationForm ? (
          <VouchMutationForm
            vouchTx={vouchTx}
            approveTx={approveTx}
            packageId={packageId}
            systemInfo={getSystemInfo()}
          />
        ) : (
          <div className='is-addons-form-toggler-height'>
            <button
              className='button is-dark'
              onClick={(e) => { this.setState({ isVouching: true }) }}
            >
              Vouch
            </button>
          </div>
        )
      )
    }
  }
)
