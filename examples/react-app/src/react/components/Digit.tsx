import './Digit.css'

const state = {
  toggle: false,
  previousValue: 0,
}

export default function Digit({ value }) {
  return (
    <div className="ui__digit">
      <div>
          {/* <DEVNOTE: Modulus operand is enforced as a guard to safeguard single-digit usage */}
          <div className="digit" data-before={Math.abs(value % 10)} data-after={Math.abs(state.previousValue % 10)}>
          {/* <Transition name="card-top"> */}
            {/* DEVNOTE: alternative to using v-if with v-show; no pitfalls for doing it this way either */}
            <div className="card card-top">{state.toggle ? Math.abs(value % 10) : Math.abs(state.previousValue % 10)}</div>

            {/* DEVNOTE: here I exploit v-if and the mechanic of injecting into the dom before the reactivity can effect a repaint to cache the previos value and update with a fresh pain after the transition. This avoids having to otherwise manage and orchestrate with logic and removes other potential overheads such as rolling over zero between base-10 and base-6(which would otherwise need to be handled), and by limiting the control logic and the component functionally pure(you feed a prop in and the same prop output pops out) it can handle incrementing and decrementing values without intervention; */}
            {/* although a v-if is more expensive than a v-show. I feel the advantages + development experience outweigh the cost + there is a reduced logic footprint so less to execute so you're getting some return */}
            <div className="card card-top" v-if="state.toggle">{Math.abs(value % 10)}</div>
          {/* </Transition> */}

          {/* <Transition name="card-bottom" @after-leave="onDigitAfterLeave"> */}
            <div className="card card-bottom" v-show="state.toggle">{Math.abs(value % 10)}</div>
          {/* </Transition> */}
        </div>
      </div>
    </div>
  )
}
