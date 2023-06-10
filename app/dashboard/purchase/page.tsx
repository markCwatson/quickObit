import { getCurrentUser } from '@/lib/session';
import { checkActive } from '@/lib/subscription';
import BillingForm from '@/components/BillingForm';
import DashboardPage from '@/components/DashboardPage';
import DialogModal from '@/components/DialogModal';
import SignInButton from '@/components/SignInButton';

export const metadata = {
  title: 'Billing',
  description: 'Manage billing for quickObit.',
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <DialogModal
        title={'You are not signed in.'}
        body={'You cannot access this page.'}
        show={true}
        goToButton={<SignInButton text="Sign in" />}
      />
    );
  }

  const plan = await checkActive(user.id);

  return (
    <DashboardPage>
      <BillingForm
        plan={{
          ...plan,
        }}
      />
    </DashboardPage>
  );
}
