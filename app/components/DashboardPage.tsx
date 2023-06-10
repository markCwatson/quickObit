import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DashboardPage({ children }: Props) {
  return (
    <div className="bg-my-color3 dark:bg-my-color10 h-full w-full">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="m-2 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
