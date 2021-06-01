import { FunctionalComponent, h } from 'preact'
import style from './style.css'

import SearchBox from '../../components/searchbox'

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <h1>Home</h1>
            <SearchBox />
        </div>
    )
}

export default Home
