/**
 * @description A collection of frequently-used style elements.
 * Properties prepended with 'v' are variables; 
 * otherwise, properties are object literals.
 */

// For easy copy and paste: 
// borderStyle: 'solid', borderColor: '1px', borderColor: 'black'

export const styles = {
  /* values */
  vDarkModeTextColor1:'#bdc1c6',
  vDarkModeTextColor2: '#dadce0',
  vDarkModeTextColor3: '#ddd',
  vDarkModeTextColor4: '#8899a6',
  vDarkModeBackground1: '#22303c',
  vDarkModeBackground2: '#152028',
  /* fonts */
  h3SizeAndWeight: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  h4SizeAndWeight: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  /* padding, margin */
  paddingMarginZero: {
    padding: '0px',
    margin: '0px'
  },
  indented: {
    marginLeft: '30px'
  },
  /* positioning */
  displayFlexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  displayFlexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  inline: {
    display: 'inline'
  },
  block: {
    display: 'block'
  },
  stickToBottom: {
    position: 'fixed',
    left: '0px',
    right: '0px',
    bottom: '0px'
  },
  /* icons */
  profileIcon: {
    fontSize: '60px', 
    backgroundColor: '#bdc1c6', 
    borderRadius: '50%', 
    padding: '5px',
    marginLeft: '7px',
    color: 'charcoal'
  },
  mainIcon36pxFont: {
    fontSize: '60px', 
    backgroundColor: '#bdc1c6', 
    borderRadius: '50%', 
    padding: '5px',
    color: 'charcoal'
  },
  navbarIcon24pxFont: {
    fontSize: '24px'
  },
  mainIcon24pxFont: {
    fontSize: '24px', 
    backgroundColor: '#bdc1c6', 
    borderRadius: '50%', 
    padding: '5px',
    color: 'charcoal'
  },
  listItemIcon14pxFont: {
    fontSize: '14px', 
    backgroundColor: '#bdc1c6', 
    borderRadius: '50%', 
    padding: '5px',
    color: 'charcoal'
  },
  downChevron: {
    fontSize: '20px', 
    // marginTop: '5px',
    // backgroundColor: '#bdc1c6', 
    // borderRadius: '50%', 
    // padding: '1px',
    // color: 'charcoal'
  },
  icon50pxFont: {
    fontSize: '50px'
  },
  icon40pxFont: {
    fontSize: '40px'
  },
  icon35pxFont: {
    fontSize: '35px'
  },
  icon30pxFont: {
    fontSize: '30px'
  },
  icon20pxFont: {
    fontSize: '20px'
  },
  icon50px: {
    width: '50px',
    height: '50px'
  },
  icon40px: {
    width: '40px',
    height: '40px'
  },
  icon30px: {
    width: '30px',
    height: '30px'
  },
  icon20px: {
    width: '20px',
    height: '20px'
  },
  icon10px: {
    width: '10px',
    height: '10px'
  },
  displayFlexRowCenter: {},
  displayFlexColumnCenter: {}
};

styles.displayFlexRowCenter = {
  ...styles.displayFlexRow,
  justifyContent: "center",
};

styles.displayFlexColumnCenter = {
  ...styles.displayFlexColumn,
  justifyContent: "center",
};