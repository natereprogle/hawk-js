interface HawkConfig {
    username: string;
    password: string;
    districtName: string;
    platform: "utilityhawk" | "aquahawk";
}

interface HawkAuthResponseBody {
    success: boolean;
    message: string;
    activeUser: {
        __v: number;
        _id: string;
        attributes: {
            accountIdArray: string[];
        };
        emailAddress: string;
        enabled: boolean;
        firstLoginTime: string;
        lastLoginTime: string;
        name: {
            first: string;
            last: string;
        };
        setupTime: string;
        updatedTime: string;
        username: string;
        contactPreference: Record<string, boolean>;
        mailingAddress: {
            address: string;
            city: string;
            state: string;
            zip: string;
        };
        cellPhone: {
            areaCode: string;
            prefix: string;
            suffix: string;
        };
    } | null;
    errors: string[] | null;
}

interface HawkAuthResponse {
    sessionCookie: string;
    body: HawkAuthResponseBody;
}

interface TimeseriesMetrics {
    electricUse: boolean;
    electricUseReading: boolean;
    temperature: boolean;
    rainfall: boolean;
}

interface TimeseriesResults {
    success: boolean;
    message: string;
    total: number;
    timeseries: {
        interval: "1 day" | "1 hour" | "1 month";
        timezone: string;
        timestamp: string;
        startTime: string;
        endTime: string;
        msec: number;
        electricUseActual: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            "killowatt hours": string;
        };
        electricUse: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            "killowatt hours": string;
        };
        rainfall: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            inches: number;
            centimeters: number;
            millimeters: number;
        };
        highTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
        lowTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
        avgTemp: {
            num: number;
            min: string;
            max: string;
            sum: string;
            sumSq: string;
            sumIx: string;
            sumPos: string;
            degree: number;
            fahrenheit: number;
            celsius: number;
        };
    }[];
    firstTime: string;
    lastTime: string;
}

export type { HawkConfig, HawkAuthResponseBody, HawkAuthResponse, TimeseriesMetrics, TimeseriesResults }