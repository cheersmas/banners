import './App.css'
import CardStack from './CardStack';

const notifications = [
  <div>Your notification content 1</div>,
  <div>Your notification content 2</div>,
  <div>Your notification content 3</div>,
  <div>Your notification content 4</div>,
  <div>Your notification content 5</div>,
];

function App() {
  return (
    <>
      <CardStack items={notifications} />
    </>
  )
}

export default App
