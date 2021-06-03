// components/search-box
import { FunctionComponent, Component, h } from 'preact'
import style from './style.css'
import axios from 'axios'
import ListBox from '../listbox'

/////////////////////////////////////////////////////////

const Loader: FunctionComponent<{t: boolean}> = ({ t = false }) => {
  return (
    <div class={ `${style.ldsRing} ${t ? style.show : style.hide }`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

/////////////////////////////////////////////////////////

type formData = {
  value?: any
}

class SearchBox extends Component {
  state = {
    loading: false,
    value: '',
    results: []
  }

  onSubmit = (e: any) => {
    e.preventDefault()
    axios.get(`/locations?q=${this.state.value}`, {})
      .then(res => {
        this.setState({ results: res.data })
      })
  }

  onInput = (e: any) => {
    const { value } = e.target
    this.setState({ value })
  }

  reset = () => {
    this.setState({ value: '',  results: [] })
  }

  // output
  render(_: any, opt: formData) {
    return (
      <div class={style.searchBox}>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={opt.value} onInput={this.onInput} /><Loader t={this.state.loading} />
          <button type="submit" disabled={opt.value.length <= 1}>Search</button>
          <button type="button" onClick={this.reset} disabled={!(this.state.results.length > 0)}>RESET</button>
        </form>

        <hr />

        <ListBox results={this.state.results} />

      </div>
    )
  }
}


export default SearchBox
