import styled from "styled-components";
import { Input, Icon } from "../../../../components";
import PropTypes from "prop-types";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
  return (
    <div className={className}>
      <Input
        value={searchPhrase}
        placeholder="Поиск по заголовкам..."
        onChange={onChange}
      />
      <Icon inactive={true} id="fa-search" size="21px" />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  width: 340px;
  height: 40px;
  margin: 40px auto 0;

  & > input {
    width: 340px;
    padding: 10px 32px 10px 10px;
  }

  & > div {
    position: absolute;
    top: 4px;
    right: 6px;
  }
`;

Search.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};