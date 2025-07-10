import styled from "styled-components";

const ContentWrapper = styled.div`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start; /*Using start instead of left or right makes the code dynamically support both directions.*/
  margin-bottom: 0.5rem;
  padding-left: 52px; /* Align content with the beginning of the name */
  padding-right: 16px;
`;

export default ContentWrapper;
