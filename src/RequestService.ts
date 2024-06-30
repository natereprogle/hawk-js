import { HawkAuthResponse, HawkConfig, TimeseriesMetrics, TimeseriesResults } from './types'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { auth, getAuthInfo, needsRefresh } from './auth'

class RequestService {

    constructor(private config: HawkConfig, private instance: AxiosInstance) {
    }

    checkIfAuthNeeded(): boolean {
        return needsRefresh()
    }

    async authenticate() {
        return await auth(this.config.username, this.config.password, this.instance)
    }

    getSessionInformation(): HawkAuthResponse {
        return getAuthInfo()
    }

    async queryTimeseriesData(accountNumber: string, startTime: string, endTime: string, interval: '1 hour' | '1 day' | '1 month', extraStartTime: boolean, extraEndTime: boolean, metrics: TimeseriesMetrics): Promise<TimeseriesResults> {
        if (this.checkIfAuthNeeded()) {
            await auth(this.config.username, this.config.password, this.instance)
        }

        return await this.instance.get('/timeseries', {
            params: {
                '_dc': Date.now(),
                districtName: this.config.districtName,
                accountNumber: accountNumber,
                startTime: startTime,
                endTime: endTime,
                interval: interval,
                extraEndTime: extraEndTime,
                extraStartTime: extraStartTime,
                metrics: { ...metrics },
            },
            headers: {
                'Cookie': getAuthInfo().sessionCookie,
            },
        } as AxiosRequestConfig)
    }
}

function toISO8601WithTimezone(date: Date) {
    const pad = (num: number) => String(num).padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    const timezoneOffset = -date.getTimezoneOffset()
    const offsetSign = timezoneOffset >= 0 ? '+' : '-'
    const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60))
    const offsetMinutes = pad(Math.abs(timezoneOffset) % 60)

    return `${year.toString()}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`
}

export default RequestService