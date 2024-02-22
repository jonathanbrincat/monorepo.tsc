import './helloWorld.css'

export default function HelloWorld({msg}:{msg: string}) {
  return (
    <div className="hello-world">
      <h1 className="heading text-cyan-600">{msg}</h1>
      <h3 className="subheading">
        You've successfully created a project with
        <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
        <a href="https://react.dev/" target="_blank" rel="noopener">React</a>.
      </h3>
    </div>
  )
}
