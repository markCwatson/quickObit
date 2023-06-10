import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ClientNavbar from '@/components/ClientNavBar';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return <ClientNavbar session={session} />;
};

export default Navbar;
