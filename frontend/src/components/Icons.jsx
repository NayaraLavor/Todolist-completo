const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const PlusIcon = ({ size = 18 }) => (
  <svg {...base} width={size} height={size}><path d="M12 5v14M5 12h14" /></svg>
);

export const PencilIcon = () => (
  <svg {...base}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
);

export const TrashIcon = () => (
  <svg {...base}>
    <path d="M3 6h18" /><path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...base} width={14} height={14} strokeWidth={3}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

export const CloseIcon = () => (
  <svg {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
