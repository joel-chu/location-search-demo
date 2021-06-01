import { FunctionalComponent, h } from 'preact'
import style from './style.css'


interface Props {
  result: any[];
}
// there is a problemm with the state as prop - NOT IN USE at the moment 
const ListBox: FunctionalComponent<Props> = (props: Props) => {

  console.log(props.result)

  return (
    <ul class={style.listBox}>
      {
        props.result.map((prop: any)=> (
          <li>{prop.assciname}</li>
        ))
      }
    </ul>
  )
}

export default ListBox
