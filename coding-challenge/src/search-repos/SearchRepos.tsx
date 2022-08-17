import React, { useEffect, useState } from "react";
import "./SearchRepos.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { BsSearch, BsFillKeyboardFill } from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchRepos() {
  const [repoData, setRepoData] = useState();
  const [searchText, setSearchText] = useState('');

  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  async function repoDataURL() {
    //Get repo data about github user (my user: TheKooker)
    await fetch("https://api.github.com/users/theKooker/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          const list = result.filter((item: any) => item.name.toUpperCase().includes(searchText.toUpperCase())).map((item: any) => (
            <div className="p-4">
            <a target="_blank" href={item.svn_url} ><h3 className="text-primary">{item.name}</h3></a>
            <h5 className="text-secondary">{item.description}</h5>
            <div className="row w-25 pt-2">
            <div className="pull-right col-md-1">
              <BsFillKeyboardFill />
            </div>
           <span className="col-md-1">{item.language}</span>
            </div>
          </div>
          ));
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  useEffect(()=> {
    repoDataURL()
  });
  return (
    <div>
      <div className="input-group p-4 ">
        <Form.Control
          onChange={handleChange}
          value={searchText}
          className="form-control pl-3"
          placeholder="Find a repository..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        ></Form.Control>
        <Button className="input-group-appendbtn btn-secondary" onClick={repoDataURL}>
          <BsSearch size={20} />
        </Button>
      </div>
      <div className="d-flex flex-column">

      {repoData}

      </div>
    </div>
  );
}

export default SearchRepos;
