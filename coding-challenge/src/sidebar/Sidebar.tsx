import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [githubName, setGitHubName] = useState();
  const [githubBio, setGitHubBio] = useState();
  const [githubLocation, setGitHubLocation] = useState();
  //Using my github as an example
  useEffect(() => {
    fetch("https://api.github.com/users/theKooker")
      .then((res) => res.json())
      .then(
        (result) => {
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
          setGitHubName(result.name);
          setGitHubBio(result.bio);
          setGitHubLocation(result.location);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div>
      <div className="container">
          <img
            className="row mw-100 rounded-circle"
            src={avatarURL}
            data-holder-rendered="true"
          >
          </img>
      </div>

      <div className="d-flex flex-column">
        <div className="pt-2">
          <h2>{githubName}</h2>
        </div>
        <div className="pt-1">
          <h1 className="text-secondary">{githubUsername}</h1>
        </div>
        <div className="pt-4">
          <h4 className="font-italic">{githubBio}</h4>
        </div>
        <div className="pt-4">
          <Button className="btn btn-secondary btn-lg ">Follow +</Button>
        </div>
        <div className="pt-4">
          <div className="row">
            <div className="col-md-1">
              <GoLocation size={30} />
            </div>
            <div className="col-md-1">
              <h3>{githubLocation}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
