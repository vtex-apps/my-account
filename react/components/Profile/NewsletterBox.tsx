import React, { Component } from 'react'
import { defineMessages, WrappedComponentProps, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Checkbox } from 'vtex.styleguide'

import ContentBox from '../shared/ContentBox'
import NEWSLETTER_MUTATION from '../../graphql/setOptInNewsletter.gql'
import styles from '../../styles.css'

const messages = defineMessages({
  optinNewsLetter: {
    id: 'personalData.newsletterOptIn',
    from: 'vtex.store-messages',
  },
  newsletter: {
    id: 'personalData.newsletter',
    from: 'vtex.store-messages',
  },
  newsletterQuestion: {
    id: 'personalData.newsletterQuestion',
    from: 'vtex.store-messages',
  },
})

class NewsletterBox extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      checked: this.props.isNewsletterOptIn,
    }
  }

  private debounceCall: NodeJS.Timeout | null | number = null

  private handleCheck = () => {
    const { setOptInNewsletter, userEmail } = this.props
    const { checked } = this.state
    clearInterval(this.debounceCall as NodeJS.Timeout)
    this.debounceCall = setTimeout(
      () =>
        setOptInNewsletter({
          variables: {
            email: userEmail,
            isNewsletterOptIn: !checked,
          },
        }),
      1000
    )
    this.setState({ checked: !checked })
  }

  public render() {
    const { checked } = this.state
    const {
      intl: { formatMessage },
    } = this.props

    return (
      <ContentBox shouldAllowGrowing>
        <div>{formatMessage(messages.newsletter)}</div>
        <div className="c-muted-2 pt2 pb6">
          {formatMessage(messages.newsletterQuestion)}
        </div>
        <div className={`${styles.passwordBox} w-100`}>
          <Checkbox
            checked={checked}
            id="newsletterOptIn"
            label={formatMessage(messages.optinNewsLetter)}
            name="newsletterOptIn"
            onChange={this.handleCheck}
          />
        </div>
      </ContentBox>
    )
  }
}

interface State {
  checked: boolean
}

interface Props extends WrappedComponentProps {
  userEmail: string
  isNewsletterOptIn: boolean
  setOptInNewsletter: (args: Variables<SetOptInNewsletterArgs>) => Promise<void>
}

const enhance = compose<Props, Pick<Props, 'isNewsletterOptIn' | 'userEmail'>>(
  graphql(NEWSLETTER_MUTATION, { name: 'setOptInNewsletter' }),
  injectIntl
)

export default enhance(NewsletterBox)
