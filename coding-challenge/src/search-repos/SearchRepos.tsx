import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  BsSearch,
  BsFillKeyboardFill,
  BsFillBookmarkStarFill,
} from "react-icons/bs";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchRepos() {
  const [repoData, setRepoData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");
  const [searchLanguages, setSearchLanguages] = useState();

  const handleChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleLanguageChange = async (event: any) => {
    setSearchLanguage(event);
    await repoDataURL();
  };
  async function repoDataURL() {
    //Get repo data about github user (my user: TheKooker)
    await fetch("https://api.github.com/users/theKooker/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          const list = result
            .filter(
              (item: any) =>
                item.name.toUpperCase().includes(searchText.toUpperCase()) &&
                ((searchLanguage.length != 0 &&
                  searchLanguage === item.language) ||
                  searchLanguage.length == 0)
            )
            .map((item: any) => (
              <div className="border border-dark rounded p-4 m-4 shadow">
                <div className="d-flex justify-content-between">
                  <div className="col">
                    <a target="_blank" href={item.svn_url}>
                      <h3 className="text-primary">{item.name}</h3>
                    </a>
                  </div>
                  <div>
                    <BsFillBookmarkStarFill />
                    <span className="col-md-1">{item.stargazers_count}</span>
                  </div>
                </div>

                <h5 className="text-secondary">{item.description}</h5>
                <div className="row w-25 pt-2">
                  <div className="pull-right col-md-1">
                    <BsFillKeyboardFill />
                  </div>
                  <span className="col-md-1">{item.language}</span>
                </div>
              </div>
            ));
          const distinctLanguages: any[] = [];
          result.map((item: any) => {});
          const languagesList = result
            .filter((item: any) => item.language != null)
            .map((item: any) => {
              if (distinctLanguages.indexOf(item.language) === -1) {
                distinctLanguages.push(item.language);
                return (
                  <Dropdown.Item eventKey={item.language}>
                    {item.language}
                  </Dropdown.Item>
                );
              }
            });
          setSearchLanguages(languagesList);
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  useEffect(() => {
    repoDataURL();
  }, []);
  return (
    <div>
      <div className="d-flex">
        <div className="input-group p-4 ">
          <Form.Control
            onChange={handleChange}
            value={searchText}
            className="form-control border border-dark  pl-3"
            placeholder="Find a repository..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          ></Form.Control>
          <Button
            className="input-group-appendbtn btn-secondary"
            onClick={repoDataURL}
          >
            <BsSearch size={20} />
          </Button>
        </div>
        <div className="pt-4">
          <DropdownButton
            variant="secondary"
            title="Language"
            id="dropdown-menu-align-right"
            onSelect={handleLanguageChange}
          >
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            {searchLanguages}
          </DropdownButton>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-around">
        <h3 className="p-4">{repoData.length} public repositories were found!</h3>
        {repoData}
      </div>
    </div>
  );
}

export default SearchRepos;
