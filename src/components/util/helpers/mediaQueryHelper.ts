enum BreakPointsEnum {
  md = 'md',
  lg = 'lg'
}

const BreakPointValues: Record<BreakPointsEnum, number> = {
  md: 768,
  lg: 1024
};

const mediaQueryHelper = (bp: BreakPointsEnum) =>
  `@media (min-width: ${BreakPointValues[bp]}px)`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [BreakPointsEnum.md]: mediaQueryHelper(BreakPointsEnum.md),
  [BreakPointsEnum.lg]: mediaQueryHelper(BreakPointsEnum.lg)
};
