import '../index.css'
const SuccessNoti = ({message}) => {
    if(message === null) {
        return null
    }
  
    return (
        <div className="success">
            {message}
        </div>
    )
}
export default SuccessNoti