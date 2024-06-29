import { HawkConfig } from './types'
import { AxiosInstance } from 'axios'

class RequestService {
    constructor(private config: HawkConfig, private instance: AxiosInstance) {
        
    }
}

export default RequestService