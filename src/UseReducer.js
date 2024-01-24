import React from "react"

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

/*     const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true
        })
    }
    const onError = () => {
        setState({
            ...state,
            loading: false, 
            error: true
        })
    }

    const onWrite = (e) => {
        setState({
            ...state,
            value: e.target.value
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
            error: false,
        })
    }
    const onDelete = () => {
        setState({
            deleted: true,
        })
    }

    const onCancel = () => {
        setState({
            ...state,
            confirmed: false,
            value: '',
        })
    }

    const onReturn = () => {
        setState({
            ...state,
            confirmed: false,
            value: '',
            deleted: false
        })
    } */

    React.useEffect(() => {
        console.log('Empezando el efecto')
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')

                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: actionTypes.confirm
                    })
                } else {
                    dispatch({
                        type: actionTypes.error
                    })
                }

                console.log('Terminando la validación')
            }, 3000)

        }
        console.log('Terminando el efecto el efecto')
    }, [state.loading])
    console.log(state.value)


    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p> Por favor, escribe el codigo de seguridad para confirmar que quieres eliminar</p>
                {(state.error && !state.loading )&&  (
                    <p>Error: el Código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(e) => {
                        dispatch({type: actionTypes.write, payload: e.target.value})
/*                         onWrite(e) */
                    }} />
                <button
                    onClick={() =>(
                        dispatch({type: actionTypes.check}) )}
                >Comprobar</button>
            </div>
        )
    }else if ( state.confirmed && !state.deleted){
        return(
            <>
            <h1>Estado de confirmación</h1>
            <p>¿Seguro que quieres eliminar UseState?</p>
            <button onClick={()=>{
                    dispatch({type: actionTypes.delete})
                }} 
            > Si, eliminar</button>
            <button 
                onClick={()=>{
                    dispatch({type: actionTypes.cancel})
                }}   
            > No, volver</button>
            </>
        );
    } else {
        return(
            <>
            <h2>Eliminado {name} con éxito</h2>
            <button onClick={()=> {
                dispatch({type: actionTypes.return})
            }}>Recuperar {name}</button>
            </>
        );
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}
const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    cancel: 'CANCEL',
    return: 'RETURN',

}

/* const reducer = (state, action) => { 

} */



const reducerObject = (state, payload)=> (
    {
        [actionTypes.confirm]:{
            ...state,
            loading: false,
            error: false,
            confirmed: true
        },
        [actionTypes.error]: {...state,
            error: true,
            loading:false}, 
        [actionTypes.write]: {
            ...state,
            value: payload,
        },
        [actionTypes.check]: {
            ...state,
            loading: true,
            },
        [actionTypes.delete]: {
            ...state,
            deleted: true,
        },
        [actionTypes.cancel]: {
            ...state,
            confirmed: false,
            value: '',
        },
        [actionTypes.return]: {
            ...state,
            confirmed: false,
            value: '',
            deleted: false
            }
       

    }
)

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer }