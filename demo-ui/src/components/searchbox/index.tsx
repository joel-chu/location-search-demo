// components/search-box
import { Component, h } from 'preact'
import style from './style.css'
import axios from 'axios'

import ListBox from '../listbox'

type formData = {
  value?: any
}

class SearchBox extends Component {
  state = {
    value: '',
    result: [],
    submitting: false
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
  // <div class={style.ldsRing}><div></div><div></div><div></div><div></div></div>
  render(_: any, opt: formData) {
    return (
      <div class={style.searchBox}>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={opt.value} onInput={this.onInput} />



          <p>You typed this value: {opt.value}</p>
          <button type="submit" disabled={opt.value.length <= 1}>Search</button>

        </form>
        <hr />
        <ListBox result={this.state.result} />
      </div>
    )
  }
}


export default SearchBox
