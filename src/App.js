import React , {useState , useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth } from './FireBase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [modalStyle] = useState(getModalStyle);


  const [posts,setPost]=useState([ ]);
  const [open, setOpen]=useState(false);
  const [openSignIn , setOpenSignIn] = useState(false);
  const [email , setEmail] = useState('');
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [user , setUser] = useState(null);

  useEffect(() => {
    const unsubscribe= auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(authUser);  
        setUser(authUser);
        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName: username,
          });
        }
      }else{
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  },[user , username]);

  useEffect(() => {
    db.collection('item').onSnapshot(snapshot =>{
     setPost(snapshot.docs.map(doc => ({
       id:doc.id,
       item:doc.data()
     }))); 
    })
  },[]);

  const signUP = (event) => {
     event.preventDefault();
    auth.createUserWithEmailAndPassword(email , password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email , password)
    
    .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }


  return (
    <div className="app">

      <Modal  
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className = "app__signUp">
          <center>
            <img 
               className='app_headerImage'
               src='https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png'
            />
           </center>
           <Input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"  onClick={signUP}>Sign Up</Button>
         </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signUp">
        <center>
          <img className="app__headerimage" alt="abc" src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"></img>
         </center>
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signIn}>Sign In</Button>
        
          </form>
        </div>
      
      </Modal>

      <div className='app_header'>
        <img 
          className='app_headerImage'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnEYJW-xEz-zU-C81qxgdTHcTToXctChfjw&usqp=CAU'
        />
      </div>

      {user ? (
        <Button onClick ={()=>auth.signOut()}>Logout</Button>
        ): (
        <div className = "app__loginContainer">
        <Button onClick ={()=>setOpen(true)}>Sign Up</Button>
        <Button onClick ={()=>setOpenSignIn(true)}>Sign In</Button>
        </div>
      )}

      
      {
        posts.map(({id ,item}) =>( 
          <Post key={id} username={item.username} caption={item.caption} imageUrl={item.imageUrl} />
        ))
      }
     
    </div>
  );
}

export default App;


//  {
//       username:'Adhistha' ,
//       caption:'wow it works' ,
//       imagrUrl:'https://earthsky.org/upl/2013/09/sunrise-red-sea-Graham-Telford-e1489764712368.jpg',
//     },
//     {
//       username:'Rahul' ,
//       caption:'Elephant is love' ,
//       imagrUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-8R1DogP9c92qoJRclukecXui8AcEPAI7A&usqp=CAU'
//     },
//     {
//       username:'Rahul' ,
//       caption:'Elephant is love' ,
//       imagrUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ-8R1DogP9c92qoJRclukecXui8AcEPAI7A&usqp=CAU'
//     }