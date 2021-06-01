import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import style from './style.css'
import axios from 'axios'

let readme: any = ''

const About: FunctionalComponent = () => {

  const [ someReadme, setReadme ] = useState(readme)

    // gets called when this route is navigated to
    useEffect(() => {
        // do a Fetch of the README then slot in here
      axios.get("/query/about-me")
        .then(res => {
          console.log(res.data)
          setReadme(res.data)
        })

    }, []);

    return (
      <div class={style.about}>
        <slot>{someReadme}</slot>
      </div>
    );
};

export default About
