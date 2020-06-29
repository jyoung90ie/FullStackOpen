import { useSelector, useDispatch } from 'react-redux'

const reducer = (state = 'Test message', action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default reducer