import React , {useState} from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts,setPost]=useState([
    {
      username:'Adhistha' ,
      caption:'wow it works' ,
      imagrUrl:'https://earthsky.org/upl/2013/09/sunrise-red-sea-Graham-Telford-e1489764712368.jpg',
    },
    {
      username:'Rahul' ,
      caption:'Elephant is love' ,
      imagrUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-8R1DogP9c92qoJRclukecXui8AcEPAI7A&usqp=CAU'
    }
  ]);

  return (
    <div className="App">
      <div className='app_header'>
        <img 
          className='app_headerImage'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnEYJW-xEz-zU-C81qxgdTHcTToXctChfjw&usqp=CAU'
        />
      </div>

      {
        posts.map(post =>( 
          <Post username={post.username} caption={post.caption} imagrUrl={post.imagrUrl} />
        ))
      }
     
    </div>
  );
}

export default App;
