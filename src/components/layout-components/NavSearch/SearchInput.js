import React, { useState, useRef } from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  AntDesignOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { AutoComplete, Input } from "antd";
import IntlMessage from "components/util-components/IntlMessage";

function getOptionList(navigationTree, optionTree) {
  optionTree = optionTree ? optionTree : [];
  return optionTree;
}

const optionList = getOptionList();

const getCategoryIcon = (category) => {};

const searchResult = () =>
  optionList.map((item) => {
    const category = item.key.split("-")[0];
    return {
      value: item.path,
      label: (
        <Link to={item.path}>
          <div className="search-list-item">
            <div className="icon">{getCategoryIcon(category)}</div>
            <div>
              <div className="font-weight-semibold">
                <IntlMessage id={item.title} />
              </div>
              <div className="font-size-sm text-muted">{category} </div>
            </div>
          </div>
        </Link>
      ),
    };
  });

const SearchInput = (props) => {
  const { active, close, mode, searchItem, handleSearchItem } = props;
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);
  let history = useHistory();
  const handleKeyUp = (event) => {
    // Enter
    if (event.keyCode === 13) {
      console.log("Enter");

      console.log(`/home/posts/search/result/${encodeURI(searchItem)}`);
      history.push(`/home/posts/search/result/${encodeURI(searchItem)}`);
    }
  };
  const onSelect = () => {
    setValue("");
    setOptions([]);
    if (close) {
      close();
    }
  };

  const onSearch = (searchText) => {
    setValue(searchText);
    setOptions(!searchText ? [] : searchResult(searchText));
  };

  const autofocus = () => {
    inputRef.current.focus();
  };

  if (active) {
    autofocus();
  }

  return (
    <AutoComplete
      ref={inputRef}
      className={`nav-search-input is-mobile ${
        mode === "light" ? "light" : ""
      }`}
      dropdownClassName="nav-search-dropdown"
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      style={{ width: "100%" }}
      value={value}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input
        onKeyUp={handleKeyUp}
        value={searchItem}
        onChange={(e) => {
          handleSearchItem(e.target.value);
        }}
        style={{ width: "100%" }}
        placeholder="Search..."
        prefix={<SearchOutlined className="mr-0" />}
      />
    </AutoComplete>
  );
};

export default SearchInput;
