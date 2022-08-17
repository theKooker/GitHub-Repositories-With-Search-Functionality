import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar/Sidebar';
import SearchRepos from './search-repos/SearchRepos';

function App() {
  return (
    <div className="container">
        <div className="row">
          <div className="box col-md-4 pt-4">
              <Sidebar/>
          </div>
          <div className="box col-md-8">
            <SearchRepos/>
          </div>
        </div>
    </div>
  );
}

export default App;
