

import { connect } from 'react-redux'

import AssignmentTwo from '../../components/screens/AssignmentTwo'
import {
    getItuneSongApi
} from '../../thunks'

const mapStateToProps = ({ AssignmentTwo  }) => ({
    loading: AssignmentTwo.loading,
    error:AssignmentTwo.error,
    data:AssignmentTwo.data
})

const mapDispatchToProps = {
    requestGetItuneSongApi: getItuneSongApi,
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentTwo)