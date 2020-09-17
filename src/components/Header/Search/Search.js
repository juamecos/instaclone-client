import React, { useEffect, useState } from "react";
import { Search as SearchBar, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import { SEARCH } from "../../../gql/user";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = e => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };
  return (
    <SearchBar
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      onSearchChange={onChange}
      onResultSelect={handleResultSelect}
      results={results}
      resultRenderer={e => <ResultSearch data={e} />}
    />
  );
};

export default Search;

const ResultSearch = ({ data }) => {
  return (
    <>
      <Link className="search-users__item" to={`/${data.username}`}>
        <Image src={data.avatar ? data.avatar : ImageNoFound} />
        <div>
          <p>{data.title}</p>
          <p>{data.username}</p>
        </div>
      </Link>
    </>
  );
};
