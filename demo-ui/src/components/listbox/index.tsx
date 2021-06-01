import { FunctionalComponent, h } from 'preact'
import style from './style.css'


interface Props {
  result: any[];
}

const ListBox: FunctionalComponent<Props> = (props: Props) => {
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
