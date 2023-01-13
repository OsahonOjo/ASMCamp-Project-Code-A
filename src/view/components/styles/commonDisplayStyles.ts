export const commonDisplayStyles = {
  displayFlex: {
    display: "flex",
    flexDirection: "row",
  },
  displayFlexCenter: {},
  inline: {
    display: 'inline'
  },
  block: {
    display: 'block'
  },
  indented: {
    marginLeft: '30px'
  }
};

commonDisplayStyles.displayFlexCenter = {
  ...commonDisplayStyles.displayFlex,
  justifyContent: "center",
};
