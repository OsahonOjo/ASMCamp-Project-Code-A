import styled from "styled-components";  /* no braces */
import { Link } from "react-router-dom";

/* `` --> these are tildes, not apostrophes */
/*export const TopicCardHeaderLink = styled.Link`
  color: black;
  flex-grow: 9;
  a:hover {
    text-decoration: underline;
    background-color: black;
  }
`;*/

export const noUnderline = {
  textDecoration: "none"
}

export const clickableCard = {
  textDecoration: "none",
  color: 'black'
};