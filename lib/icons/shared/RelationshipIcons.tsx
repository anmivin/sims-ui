import { ReactNode } from 'react';

import { PARTNERSHIP } from '@type/enums';

import { HeartBrokenIcon, RingIcon, RingsCrossedIcon, RingsIcon, TwoHeartsIcon } from '.';

export const PartnershipIcons: Record<PARTNERSHIP, ReactNode> = {
  [PARTNERSHIP.divorced]: <RingsCrossedIcon />,
  [PARTNERSHIP.engaged]: <RingIcon />,
  [PARTNERSHIP.exes]: <HeartBrokenIcon />,
  [PARTNERSHIP.married]: <RingsIcon />,
  [PARTNERSHIP.partners]: <TwoHeartsIcon />,
};
