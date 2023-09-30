import NameField from './NameField'
import NumberField from './NumberField'

const PersonForm = ({handleSubmit, name, handleName, number, handleNumber}) => {
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <NameField name={name} handleName={handleName}/>
            <NumberField number={number} handleNumber={handleNumber}/>
            <button type="submit">save</button>
        </form>
        </div>
    )
}

export default PersonForm