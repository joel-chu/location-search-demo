import { FunctionalComponent, h } from 'preact'
import { useEffect } from 'preact/hooks'
import style from './style.css'

const About: FunctionalComponent = () => {

    // gets called when this route is navigated to
    useEffect(() => {
        // do a Fetch of the README then slot in here 
    }, []);

    return (
        <div class={style.about}>
            <h2>About this demo</h2>

        </div>
    );
};

export default About
