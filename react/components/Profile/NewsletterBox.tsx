import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Checkbox } from 'vtex.styleguide'

import ContentBox from '../shared/ContentBox'
import GET_NEWSLETTER from '../../graphql/getNewsletterOpt.gql'
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
      checked: props.isNewsletterOptIn,
    }
  }

  public componentDidUpdate(oldProps: Props) {
    if (oldProps.isNewsletterOptIn !== this.props.isNewsletterOptIn) {
      this.setState({ checked: this.props.isNewsletterOptIn })
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
      500
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

type Props = ExternalProps & QueryResult & Mutations & InjectedIntlProps

interface ExternalProps {
  userEmail: string
}

interface QueryData {
  profile: Pick<Profile, 'customFields'>
}

interface QueryResult {
  isNewsletterOptIn: boolean
}

interface Mutations {
  setOptInNewsletter: (args: Variables<SetOptInNewsletterArgs>) => Promise<void>
}

const enhance = compose<Props, ExternalProps>(
  graphql<Props, QueryData, unknown, QueryResult>(GET_NEWSLETTER, {
    props: ({ data }) => ({
      isNewsletterOptIn: data?.profile?.customFields?.[0].value === 'true',
    }),
  }),
  graphql(NEWSLETTER_MUTATION, {
    name: 'setOptInNewsletter',
    options: {
      refetchQueries: ['NewsletterOpt'],
    },
  }),
  injectIntl
)

export default enhance(NewsletterBox)
