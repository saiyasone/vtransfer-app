export const COLORS = {
  primary: '#0091B2',
  lightPrimary: '#00C771',
  danger: '#FB5859',
  blue: '#5466DE',
  black: '#000',
  white: '#FFFFFF',
  whiteGray: '#5D596C',
  whiteGray2: '#9A9A9C',
};

export const SIZES = {
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 28,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },

  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
};
