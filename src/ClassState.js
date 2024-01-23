import React from "react"
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
        }
    }
/*     UNSAFE_componentWillMount(){
        console.log("componentWillMount")
    }
     */
  
/*     componentDidMount(){
        console.log("componentDidMount")
    } */

    componentDidUpdate(){
        console.log('actualización')
        if(!!this.state.loading){
            setTimeout(()=>{
                console.log('Haciendo la validación')
                if(SECURITY_CODE === this.state.value){
                    this.setState({loading: false})
                } else {
                    this.setState({error: true, loading: false, })
                }
                console.log('Terminando la validación')
            }, 3000)
        }
        
    }
    

    render() {

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p> Por favor escribe el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) &&(
                <p>Error: el Código es incorrecto</p>
                 )}
                {this.state.loading &&(
                <Loading/>
                )}
                <input
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(e)=>{
                        this.setState({value: e.target.value})
                    }}
                />
                <button
                    onClick={()=> this.setState({loading: true, error: false})}
                >Comprobar</button>
            </div>
        )
    }
}
export { ClassState }