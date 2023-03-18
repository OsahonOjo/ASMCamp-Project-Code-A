/*
    bmBurgerBars: {
      background: '#add8e6'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      padding: '0px',
      fontSize: '1.15em',
      overflowY: 'hidden'  /* hide vertical scroll bar *-/
    },
    bmItemList: {
      color: 'white',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    },
*/
import { styles as frequentStyles } from "./commonDisplayStyles";

const TEXT_COLOR = frequentStyles.vDarkModeTextColor3;
const BACKGROUND_COLOR = frequentStyles.vDarkModeBackground2;

export const styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '15px',
      top: '22px'
    },
    bmBurgerBars: {
      background: TEXT_COLOR
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '30px',
      width: '30px'
    },
    bmCross: {
      background: '#bdc3c7',
      marginTop: '12px'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: '0px',
      left: '0px'
    },
    bmMenu: {
      background: BACKGROUND_COLOR,
      padding: '0px',
      fontSize: '1.15em',
      overflowY: 'hidden'  /* hide vertical scroll bar */
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {  /* the whole list, not individual items */
      color: TEXT_COLOR,
      padding: '0px'
    },
    bmItem: {
      display: 'block',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };