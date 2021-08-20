import ReactDOM from 'react-dom'
import App from './App'

let counter = 0

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, 
  document.getElementById('root'))
}

refresh()

setInterval(() => {
  counter += 1
  refresh()
}, 1000)