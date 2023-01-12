export const commonDisplayStyles = {
  displayFlex: {
    display: "flex",
    flexDirection: "row",
  },
  inline: {
    display: 'inline'
  },
  indented: {
    marginLeft: '30px'
  }
};
commonDisplayStyles.displayFlexCenter = {
  ...commonDisplayStyles.displayFlex,
  justifyContent: "center",
};
