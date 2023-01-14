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
  },
  stickToBottom: {
    position: 'fixed',
    left: '0px',
    right: '0px',
    bottom: '0px'
  }
};

commonDisplayStyles.displayFlexCenter = {
  ...commonDisplayStyles.displayFlex,
  justifyContent: "center",
};
