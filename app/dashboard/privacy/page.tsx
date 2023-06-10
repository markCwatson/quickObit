'use client';

import { useSession } from 'next-auth/react';
import DialogModal from '@/components/DialogModal';
import DashboardPage from '@/components/DashboardPage';
import SignInButton from '@/components/SignInButton';
import { Card } from '@/components/Card';

export default function InputForm() {
  const session = useSession();
  if (session.status !== 'authenticated' && session.status !== 'loading') {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  return (
    <DashboardPage>
      <Card>
        <Card.Header>
          <Card.Title>Privacy</Card.Title>
          <Card.Description>
            Your privacy is very important to us.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          We understand the importance of privacy and confidentiality when it
          comes to sensitive information. We take this responsibility seriously
          and ensure that all personal information provided by users is kept
          strictly confidential. We use industry-standard security measures to
          protect user data from unauthorized access, disclosure, or misuse. The
          information provided by users is only used to generate personalized
          obituaries and is never shared with third parties without consent.
          Users can rest assured that their personal information and their loved
          one&apos;s legacy are in safe hands with our obituary service.
          <br />
          <br />
          In addition to the above statement, quickObit is committed to
          transparency and clear communication with our users regarding their
          privacy. Here are some further details about our privacy practices:
          <br />
          <br />
          <strong>Information we collect:</strong>
          <br />
          When users sign up for our obituary service, we may collect certain
          personal information such as their name, email address, and payment
          information. We may also collect information about the deceased, such
          as their name, date of birth, and date of death. This information is
          necessary to generate a personalized obituary.
          <br />
          <br />
          <strong>How we use information:</strong>
          <br />
          The information we collect is used solely to provide our obituary
          service. We do not use this information for any other purpose, nor do
          we share it with third parties without consent. We may use anonymized
          data for research and development purposes, but this data cannot be
          traced back to individual users.
          <br />
          <br />
          <strong>Data security:</strong>
          <br />
          We take data security seriously and have implemented industry-standard
          security measures to protect user data from unauthorized access,
          disclosure, or misuse. This includes the use of encryption, firewalls,
          and other security measures to safeguard user information.
          <br />
          <br />
          <strong>User control:</strong>
          <br />
          Users have control over their personal information and can edit or
          delete it at any time. Users can also choose whether or not to share
          their obituary with others or keep it private.
          <br />
          <br />
          <strong>Cookies and tracking:</strong>
          <br />
          We use cookies and other tracking technologies to enhance the user
          experience and to collect information about website usage. Users can
          control their cookie preferences through their browser settings.
          <br />
          <br />
          <strong>Legal compliance:</strong>
          <br />
          We comply with all applicable privacy laws and regulations, including
          the General Data Protection Regulation (GDPR) and the California
          Consumer Privacy Act (CCPA). We are committed to protecting the
          privacy and confidentiality of our users and their loved ones. If you
          have any questions or concerns about our privacy practices, please
          contact us at info@obitsai.com.
        </Card.Content>
      </Card>
    </DashboardPage>
  );
}
