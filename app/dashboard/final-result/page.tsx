import Result from '@/components/Result';
import DialogModal from '@/components/DialogModal';
import DashboardPage from '@/components/DashboardPage';
import SignInButton from '@/components/SignInButton';
import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/db/prismaClient';

export default async function ResultPage() {
  const user = await getCurrentUser();
  let finalObitId = null;

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

  const getFinalObitId = async () => {
    const data = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
      select: {
        finalObitId: true,
      },
    });

    if (!data) {
      return;
    }

    finalObitId = data?.finalObitId;
  };

  await getFinalObitId();

  return (
    <DashboardPage>
      <Result finalObitId={finalObitId} />
    </DashboardPage>
  );
}
