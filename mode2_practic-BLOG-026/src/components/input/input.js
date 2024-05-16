import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = forwardRef(({ classname, width, ...props }, ref) => {
  return <input className={classname} {...props} ref={ref}></input>;
});

export const Input = styled(InputContainer)`
  width: ${({ width = "auto" }) => width};
  height: 40px;
  margin: 0 0 10px;
  padding: 10px;
  font-size: 18px;
  border: 1px splid #000;
`;

Input.propTypes = {
  with: PropTypes.string,
};
