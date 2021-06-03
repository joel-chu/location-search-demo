// Since this is going to be a sub-comp
// we need to take special care to avoid all the re-rendering

import { ComponentChildren, Component, h } from 'preact'
import { useState } from 'preact/hooks'
import style from './style.css'

////////////////////////////////////////////////////////////

type ChildrenProps = {
  i: number;
  children: ComponentChildren;
}

// the headache, how to frozen it once the state is set
function DelayClsLi({ i, children }: ChildrenProps) {

  const [ update, setUpdate ] = useState('')

  const delayBy = i * 100

  setTimeout(() => {
    setUpdate('animate__backInLeft')
  }, delayBy)

  return (
    <li class={`animate__animated ${update}`}>{children}</li>
  )
}


////////////////////////////////////////////////////////////

type Props = {
  results: any[];
}

// Just stick an empty object to fill it up to satisfy the TS code pattern
class ListBox extends Component<Props, {}> {

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.results.length > 0
  }

  render() {
    return (
      <ul class={style.listBox}>
        {
          this.props.results.map((name: any, i: number) => (
            <DelayClsLi i={i}>{ name }</DelayClsLi>
          ))
        }
      </ul>
    )
  }
}

export default ListBox
