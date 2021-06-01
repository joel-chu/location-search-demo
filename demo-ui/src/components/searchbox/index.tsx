// components/search-box
import { Component, h } from 'preact'
import style from './style.css'
import axios from 'axios'

type formData = {
  value?: any
}

class SearchBox extends Component {
  state = {
    value: '',
    result: []
  }

  onSubmit = (e: any) => {

    e.preventDefault()
    axios.post(`/query/${this.state.value}`, {})
      .then(res => {
        this.setState({ result: res.data })
      })
  }

  onInput = (e: any) => {
    const { value } = e.target
    this.setState({ value })
  }

  reset = () => {
    this.setState({ value: '',  result: [] })
  }

  //
  render(_: any, opt: formData) {
    return (
      <div class={style.searchBox}>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={opt.value} onInput={this.onInput} />

          <p>You typed this value: {opt.value}</p>
          <button type="submit" disabled={opt.value.length <= 1}>Search</button>
          <button type="button" onClick={this.reset} disabled={!(this.state.result.length > 0)}>RESET</button>
        </form>
        <hr />
        <ul class={style.listBox}>
          {
            this.state.result.map((prop: any)=> (
              <li class="animate__animated animate__backInLeft">{prop.asciiname}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}
// not in use 
// <div class={ style.ldsRing }><div></div><div></div><div></div><div></div></div>

export default SearchBox
