import './helloWorld.css'

export default function HelloWorld({msg}:{msg: string}) {
  return (
    <div className="greetings">
      <h1 className="cyan">{msg}</h1>
      <h3>
        You’ve successfully created a project with
        <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
        <a href="https://react.dev/" target="_blank" rel="noopener">React</a>.
      </h3>
    </div>
  )
}
