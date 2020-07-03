import React, { Component } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Checkbox } from 'vtex.styleguide'
import { withCssHandles } from 'vtex.css-handles'

import ContentBox from '../shared/ContentBox'
import GET_NEWSLETTER from '../../graphql/getNewsletterOpt.gql'
import NEWSLETTER_MUTATION from '../../graphql/setOptInNewsletter.gql'

const CSS_HANDLES = [
  'newsletterBoxContainer',
  'newsletterContainerTitle',
  'newsletterContainerMessage',
  'passwordBox',
] as const

const messages = defineMessages({
  optinNewsLetter: {
    id: 'vtex.store-messages@0.x::personalData.newsletterOptIn',
    defaultMessage: '',
  },
  newsletter: {
    id: 'vtex.store-messages@0.x::personalData.newsletter',
    defaultMessage: '',
  },
  newsletterQuestion: {
    id: 'vtex.store-messages@0.x::personalData.newsletterQuestion',
    defaultMessage: '',
  },
})

class NewsletterBox extends Component<Props, State> {
  constructor(props: Props) {
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
      cssHandles,
      intl: { formatMessage },
    } = this.props

    return (
      <div className={cssHandles.newsletterBoxContainer}>
        <ContentBox shouldAllowGrowing>
          <div className={`${cssHandles.newsletterContainerTitle}`}>
            {formatMessage(messages.newsletter)}
          </div>
          <div
            className={`c-muted-2 pt2 pb6 ${cssHandles.newsletterContainerMessage}`}
          >
            {formatMessage(messages.newsletterQuestion)}
          </div>
          <div className={`${cssHandles.passwordBox} w-100`}>
            <Checkbox
              checked={checked}
              id="newsletterOptIn"
              label={formatMessage(messages.optinNewsLetter)}
              name="newsletterOptIn"
              onChange={this.handleCheck}
            />
          </div>
        </ContentBox>
      </div>
    )
  }
}

interface State {
  checked: boolean
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

interface OuterProps {
  userEmail: string
}
interface InnerProps extends InjectedIntlProps, QueryResult, Mutations {
  cssHandles: CssHandles<typeof CSS_HANDLES>
}

type Props = OuterProps & InnerProps

const enhance = compose<Props, OuterProps>(
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
  injectIntl,
  withCssHandles(CSS_HANDLES)
)

export default enhance(NewsletterBox)
