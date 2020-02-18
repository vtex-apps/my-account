import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Checkbox } from 'vtex.styleguide'

import ContentBox from '../shared/ContentBox'
import NEWSLETTER_MUTATION from '../../graphql/setOptInNewsletter.gql'

const messages = defineMessages({
  optinNewsLetter: {
    id: 'personalData.newsletterOptIn',
    defaultMessage: '',
  },
  newsletter: {
    id: 'personalData.newsletter',
    defaultMessage: '',
  },
  newsletterQuestion: {
    id: 'personalData.newsletterQuestion',
    defaultMessage: '',
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
        <div className="vtex-account__password-box w-100">
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

interface Props extends InjectedIntlProps {
  userEmail: string
  isNewsletterOptIn: boolean
  setOptInNewsletter: (args: Variables<SetOptInNewsletterArgs>) => Promise<void>
}

const enhance = compose<Props, Pick<Props, 'isNewsletterOptIn' | 'userEmail'>>(
  graphql(NEWSLETTER_MUTATION, { name: 'setOptInNewsletter' }),
  injectIntl
)

export default enhance(NewsletterBox)
