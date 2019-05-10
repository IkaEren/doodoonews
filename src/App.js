import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PokeList from "./PokeList";
import Header from "./Header";

const App = () => {
  const [number,setNumber] = useState(1);
  const [data, setData] = useState({ hits: [] });
  const [searchTerm, setSearchTerm] = useState("redux");
  const [search, setSearch] = useState("redux");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${search}`
      );
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  const onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedList = data.filter(isNotId);
    setData(updatedList);
  };

  const isSearched = searchTerm => item => {
    item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const Table = props => {
    return (
      <div>
        {props.isLoading ? (
          <Spinner animation="border" variant="success" />
        ) : (
          props.list.map(item => (
            <>
              <ListGroup key={item.objectID}>
                <ListGroup.Item action href={item.url} variant="danger">
                  {item.title}
                </ListGroup.Item>
                <ListGroup.Item>{item.author}</ListGroup.Item>
                <ListGroup.Item>{item.num_comments}</ListGroup.Item>
                <ListGroup.Item>{item.points}</ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() => props.onDismiss(item.objectID)}
                    variant="danger"
                  >
                    Dismiss
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </>
          ))
        )}
      </div>
    );
  };
  
  const Search = ({ searchTerm, onChange, setSearch, query }) => {
    return (
      <div>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={onChange}
          />
          <Button variant="info" onClick={setSearch}>
            Search
          </Button>
        </Form>
      </div>
    );
  };
  
  return (
    <>
      <Router>
        <div>
          <Header />
          <Route path="/pokelist" component={PokeList} />
          <Route path="/table" component={Search} />
        </div>
      </Router>
    </>
    // <div>
    //   <Search
    //     value={searchTerm}
    //     onChange={e => onSearchChange(e)}
    //     setSearch={() => setSearch(searchTerm)}
    //   />
    //   <Table
    //     list={data.hits}
    //     pattern={searchTerm}
    //     onDismiss={onDismiss}
    //     isSearched={isSearched}
    //     isLoading={isLoading}
    //   />
    // </div>
  );
};
export default App;
