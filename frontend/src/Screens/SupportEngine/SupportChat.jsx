import {useState, useRef, useEffect} from 'react'
import Avatar from './Avatar';
import WindiwSupport from './WindiwSupport';
const SupportChat = () => {
  const [visible, setVisible ] = useState(false);
  const ref= useRef(null);

  useEffect (( ) => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
          setVisible(false)
      }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
      document.removeEventListener("mousedown", handleClickOutside);
  };
}, [ref]);

  return (
    <div ref = {ref}
    className='relative z-10'>
      <WindiwSupport
      visible={visible} 
      />
       <Avatar
       onClick={() => setVisible(true)}
       style={{position  : 'fixed', bottom:'24px', right:'24px'}}
       />
    </div>
  )
}

export default SupportChat