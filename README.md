# React + TypeScript + Vite
## Keys
- Usando estado predeterminado en el useState, por ejemplo
    const [activity, setActivity] = useState({
        category: '1',
        name: '',
        calories: 0
    });
Asi cuando le asignamos el valor a algun input o select solo ponemos {activity.name/category/calories}

- Para que se seleccione por defecto alguna option en el elemento select
En HTML puro, el atributo "selected" en una opción especifica cuál estará seleccionada por defecto.

En React, el estado (usando useState) y el atributo value del <*select> se utilizan para gestionar qué opción está seleccionada, permitiendo una mayor flexibilidad y control sobre la interfaz de usuario.
Esto lo vimos cuando queremos seleccionar algo por defecto, en este caso como lo de arriba, en el useState tenemos un objeto con propiedades, entonces para decirle que valor por defecto tendra solo lo especificamos con value={activity.category}, entonces el valor seria el string '1'
const categories : Category[] = [
    {id:1, name: 'Comida'},
    {id:2, name: 'Ejercicio'}
]
Cada <*option> tiene un atributo value que coincide con los id de las categorías.
option key={category.id} value={category.id}>{category.name}<*option>
Cuando el componente se renderiza, React compara el valor de activity.category con los valores de las opciones. Como '1' coincide con el valor de la opción "Comida", esta se selecciona por defecto.
ENTONCES, EL VALUE DEL SELECT ES EQUIVALENTE AL ID QUE TENDRA EL ELEMENTO OPTION

- El boton con el atributo disabled y ese disabled tomando una funcion
Si isValidActivity() devuelve true, entonces el atributo disabled se establece en true y el botón se deshabilita.
Si isValidActivity() devuelve false, entonces el atributo disabled no se establece, o se establece en false, y el botón no está deshabilitado.
Es como decir si disabled es true entonces esta deshabilitado(el boton se deshabilita), si disabled es false entonces esta habilitado(el boton se habilita)

- Cuando usamos useReducer es forzoso hacer una copia del estado anterior, aun y cuando vayamos a mutar ese estado, no importa que se mutara en el codigo, siempre vamos a tener que mutarlo al inicio con el spread (este comentario se hizo por el return de "save-activity" en el archivo activityReducer.ts)