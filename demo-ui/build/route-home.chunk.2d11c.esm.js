(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{FDtd:function(t,e,s){"use strict";s.r(e);var a=s("hosL"),n="home__5d1wS",u={searchBox:"searchBox__sXv32",ldsRing:"ldsRing__1DNfd"},l=s("czhI"),h=s.n(l);var i=class extends a.Component{constructor(...t){super(...t),this.state={value:"",result:[]},this.onSubmit=t=>{t.preventDefault(),h.a.post(`/query/${this.state.value}`,{}).then((t=>{this.setState({result:t.data})}))},this.onInput=t=>{const{value:e}=t.target;this.setState({value:e})},this.reset=()=>{this.setState({value:"",result:[]})}}render(t,e){return Object(a.h)("div",{class:u.searchBox},Object(a.h)("form",{onSubmit:this.onSubmit},Object(a.h)("input",{type:"text",value:e.value,onInput:this.onInput}),Object(a.h)("p",null,"You typed this value: ",e.value),Object(a.h)("button",{type:"submit",disabled:e.value.length<=1},"Search"),Object(a.h)("button",{type:"button",onClick:this.reset,disabled:!(this.state.result.length>0)},"RESET")),Object(a.h)("hr",null),Object(a.h)("ul",{class:u.listBox},this.state.result.map((t=>Object(a.h)("li",{class:"animate__animated animate__backInLeft"},t.asciiname)))))}};e.default=()=>Object(a.h)("div",{class:n},Object(a.h)("h1",null,"Home"),Object(a.h)(i,null))}}]);
//# sourceMappingURL=route-home.chunk.2d11c.esm.js.map