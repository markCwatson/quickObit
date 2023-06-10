import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';

type Props = {};

export default function Preview({}: Props) {
  return (
    <div className="flex items-center justify-center bg-indigo-600 py-2.5">
      <p className="text-sm leading-6 text-white">
        <a href="#">
          <strong className="font-semibold">
            This is a preview version of quick
            <span className="text-[#c331ff]">Obit</span>
          </strong>
        </a>
      </p>
    </div>
  );
}
