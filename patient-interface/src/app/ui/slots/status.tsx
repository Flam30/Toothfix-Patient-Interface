import clsx from 'clsx';
 
export default function SlotStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-green-500 text-white': status === 'available',
          'bg-gray-100 text-gray-500': status === 'unavailable',
        },
      )}
    />
)}