import React from "react"

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    })
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onConfirm = () => {
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
            loading: true
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
    }

    React.useEffect(() => {
        console.log('Empezando el efecto')
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validación')

                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }

                console.log('Terminando la validación')
            }, 3000)
            setState({
                ...state,
                error: false
            }) // Posible BOOM
        }
        console.log('Terminando el efecto el efecto')
    }, [state.loading])
    console.log(state.value)


    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p> Por favor, escribe el codigo de seguridad para confirmar que quieres eliminar</p>
                {state.error && (
                    <p>Error: el Código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(e) => {
                        onWrite(e)
                    }} />
                <button
                    onClick={() =>onCheck() }
                >Comprobar</button>
            </div>
        )
    }else if ( state.confirmed && !state.deleted){
        return(
            <>
            <h1>Estado de confirmación</h1>
            <p>¿Seguro que quieres eliminar UseState?</p>
            <button onClick={()=>{
                    onDelete()
                }} 
            > Si, eliminar</button>
            <button 
                onClick={()=>{
                    onCancel();
                }}   
            > No, volver</button>
            </>
        );
    } else {
        return(
            <>
            <h2>Eliminado {name} con éxito</h2>
            <button onClick={()=> {
                onReturn()
            }}>Recuperar {name}</button>
            </>
        );
    }
}

export { UseState }