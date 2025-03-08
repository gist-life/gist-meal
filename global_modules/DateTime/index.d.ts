
/**
 * 시간의 차이값(기간)을 나타내는 클래스입니다.
 * @class
 * @param {number} millisecond 밀리초
 */
export declare class Duration {
	constructor(millisecond: number);
	
	get amount(): number;
	set amount(value: number);
	
	get millisecond(): number;
	set millisecond(value: number);
	
	get second(): number;
	set second(value: number);
	
	get day(): number;
	set day(value: number);
	
	toString(): string;
}

export declare interface DateTemplate {
	year?: number;
	month?: number;
	day?: number;
}

/**
 * 바닐라 JS의 Date 클래스입니다.
 */
type $D = globalThis.Date;

/**
 * 날짜를 나타내는 클래스입니다.
 * @class
 * @param {number} year 년도
 * @param {number} month 월
 * @param {number} day 일
 */
export declare class Date {
	constructor(year: number, month: number, day: number);
	
	private _source: $D;
	
	get year(): number;
	set year(value: number);
	
	get month(): number;
	set month(value: number);
	
	get day(): number;
	set day(value: number);
	
	/**
	 * `dateObject`와 현재 객체가 같은 날짜인지 비교합니다.
	 */
	eq(dateObject: Date | DateTemplate): boolean;
	
	subtract(dateObject: Date | Duration | DateTemplate): Duration | Date;
	
	/**
	 * 날짜를 문자열로 변환합니다.
	 */
	toString(): string;
	
	/**
	 * Date 객체를 일반 객체로 변환합니다.
	 */
	toObject(): DateTemplate;
}

export declare interface TimeTemplate {
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

/**
 * 시간을 나타내는 클래스입니다.
 * @class
 * @param {number} hour 시
 * @param {number} minute 분
 * @param {number} second 초
 * @param {number} millisecond 밀리초
 */
export declare class Time {
	constructor(hour: number, minute: number, second: number, millisecond: number);
	
	private _source: $D;
	
	get hour(): number;
	set hour(value: number);
	
	get minute(): number;
	set minute(value: number);
	
	get second(): number;
	set second(value: number);
	
	get millisecond(): number;
	set millisecond(value: number);
	
	/**
	 * `timeObject`와 현재 객체가 같은 시간인지 비교합니다.
	 */
	eq(timeObject: Time | TimeTemplate): boolean;
	
	subtract(timeObject: Time | Duration | TimeTemplate): Duration | Time;
	
	/**
	 * 시간을 문자열로 변환합니다.
	 */
	toString(): string;
	
	/**
	 * Time 객체를 일반 객체로 변환합니다.
	 */
	toObject(): TimeTemplate;
}

export declare interface SetDateTimeTemplate extends DateTemplate, TimeTemplate {
	year?: number;
	month?: number;
	day?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare interface GetDateTimeTemplate extends DateTemplate, TimeTemplate {
	year?: number;
	month?: number;
	day?: number;
	weekday?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare interface DurationTemplate {
	year?: number;
	month?: number;
	day?: number;
	week?: number;
	hour?: number;
	minute?: number;
	second?: number;
	millisecond?: number;
}

export declare class DateTime {
	constructor(datetimeObject?: DateTime | $D | SetDateTimeTemplate | number | string, locale?: string, globalizationPath?: string);
	
	private _source: $D;
	private _locale: string;
	private _globalizationPath: string;
	static globalizationPath: string;
	
	/**
	 * 날짜 정보만을 가진 Date 객체를 반환합니다.
	 */
	get date(): Date;
	set date(value: Date);
	
	/**
	 * 시간 정보만을 가진 Time 객체를 반환합니다.
	 */
	get time(): Time;
	set time(value: Time);
	
	/**
	 * 년도를 반환합니다.
	 */
	get year(): number;
	set year(value: number);
	
	/**
	 * 월을 반환합니다.
	 */
	get month(): number;
	set month(value: number);
	
	/**
	 * 일을 반환합니다.
	 */
	get day(): number;
	set day(value: number);
	
	/**
	 * 요일의 인덱스를 반환합니다. (일요일 = 0, ..., 토요일 = 6)
	 */
	get weekday(): number;
	
	/**
	 * 요일의 이름을 반환합니다.
	 */
	get weekdayName(): string;
	
	/**
	 * 시를 반환합니다.
	 */
	get hour(): number;
	set hour(value: number);
	
	/**
	 * 분을 반환합니다.
	 */
	get minute(): number;
	set minute(value: number);
	
	/**
	 * 초를 반환합니다.
	 */
	get second(): number;
	set second(value: number);
	
	/**
	 * 밀리초를 반환합니다.
	 */
	get millisecond(): number;
	set millisecond(value: number);
	
	/**
	 * 현재 DateTime 객체의 로케일을 반환합니다.
	 */
	get locale(): string;
	set locale(value: string);
	
	/**
	 * globalization 폴더의 경로를 반환합니다.
	 */
	get globalizationPath(): string;
	set globalizationPath(value: string);
	
	/**
	 * 1970년 1월 1일 00:00:00부터 현재 DateTime 객체까지의 밀리초를 반환합니다.
	 * @alias toNumber
	 */
	timestamp(): number;
	
	/**
	 * 현재 DateTime 객체를 문자열로 변환합니다.
	 * @param {string} formatString 날짜 형식 문자열
	 *
	 * - `s`: 초 (e.g. 0, 1, ..., 59)
	 * - `ss`: 2자리 초 (e.g. 00, 01, ..., 59)
	 * - `sss`: 밀리초 (e.g. 000, 001, ..., 999)
	 * - `m`: 분 (e.g. 0, 1, ..., 59)
	 * - `mm`: 2자리 분 (e.g. 00, 01, ..., 59)
	 * - `h`: 시 (e.g. 0, 1, ..., 12)
	 * - `hh`: 2자리 시 (e.g. 00, 01, ..., 12)
	 * - `i`: 시 (e.g. 0, 1, ..., 23)
	 * - `ii`: 2자리 시 (e.g. 00, 01, ..., 23)
	 * - `t`: 오전/오후 (e.g. 오전, 오후)
	 * - `D`: 일 (e.g. 1, 2, ..., 31)
	 * - `DD`: 2자리 일 (e.g. 01, 02, ..., 31)
	 * - `W`: 짧은 요일 (e.g. 일, 월, ..., 토)
	 * - `WW`: 긴 요일 (e.g. 일요일, 월요일, ..., 토요일)
	 * - `M`: 월 (e.g. 1, 2, ..., 12)
	 * - `MM`: 2자리 월 (e.g. 01, 02, ..., 12)
	 * - `MMM`: 짧은 월 (e.g. Jan, Feb, ..., Dec) **한국어는 동일**
	 * - `MMMM`: 긴 월 (e.g. January, February, ..., December) **한국어는 동일**
	 * - `YY`: 2자리 연도 (e.g. 70, 71, ..., 24)
	 * - `YYYY`: 4자리 연도 (e.g. 1970, 1971, ..., 2024)
	 *
	 * @example
	 * DateTime.now().toString('YYYY년 M월 D일 t h:m:s.sss')
	 * // => "2024년 1월 1일 목요일 오후 3:30:00.000"
	 * DateTime.now().toString('YYYY-MM-DD hh:mm:ss')
	 * // => "2024-01-01 15:30:00"
	 */
	toString(formatString?: string): string;
	
	/**
	 * 현재 DateTime 객체를 문자열로 변환합니다.
	 * @param {boolean} ignoreTime 시간을 무시하고 날짜만을 문자열로 변환할 지 여부 
	 */
	humanize(ignoreTime?: boolean): string;
	
	/**
	 * 현재 DateTime 객체를 숫자로 변환합니다.
	 * @alias timestamp
	 */
	toNumber(): number;
	
	/**
	 * 현재 DateTime 객체를 바닐라 JS의 Date 객체로 변환합니다.
	 */
	toDate(): $D;
	
	/**
	 * 현재 DateTime 객체를 일반 객체로 변환합니다.
	 */
	toObject(): GetDateTimeTemplate;
	
	/**
	 * 타임스탬프로부터 DateTime 객체를 생성합니다.
	 * @alias fromNumber
	 */
	static fromTimestamp(timestamp: number): DateTime;
	
	/**
	 * 문자열로부터 DateTime 객체를 생성합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param useDuration 날짜 기간을 사용할 지 여부
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 * 
	 * @alias dehumanize
	 */
	static fromString(dateString: string, useDuration?: boolean = false, getString?: boolean = false, filterIncludeEnding?: boolean = true, trim?: boolean = true, std?: DateTime = DateTime.now(), locale?: string = 'ko-KR', globalizationPath?: string): DateTime;
	
	/**
	 * 문자열로부터 DateTime 객체를 생성합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param useDuration 날짜 기간을 사용할 지 여부
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 *
	 * @alias fromString
	 */
	static dehumanize(dateString: string, useDuration?: boolean = false, getString?: boolean = false, filterIncludeEnding?: boolean = true, trim?: boolean = true, std?: DateTime = DateTime.now(), locale?: string = 'ko-KR', globalizationPath?: string): DateTime;
	
	/**
	 * 숫자(타임스탬프)로부터 DateTime 객체를 생성합니다.
	 * @alias fromTimestamp
	 */
	static fromNumber(timestamp: number): DateTime;
	
	/**
	 * 바닐라 JS의 Date 객체로부터 DateTime 객체를 생성합니다.
	 */
	static fromDate(date: $D): DateTime;
	
	/**
	 * 일반 객체로부터 DateTime 객체를 생성합니다.
	 * @param datetimeObject
	 * @param {DateTime} standard 기준이 되는 DateTime 객체, `datetimeObject`에서 빈 값은 `standard`의 값을 따릅니다.
	 * @param defaultToEnd 기준을 끝내는 것으로 잡을 지 여부 (e.g. 12시 3분 -> 12시 3분 59초 999ms)
	 */
	static fromObject(datetimeObject: SetDateTimeTemplate, standard?: DateTime | SetDateTimeTemplate, defaultToEnd?: boolean): DateTime;
	
	/**
	 * DateTime 객체의 덧셈 연산입니다.
	 */
	add(datetimeObject: DateTime | Duration | DurationTemplate): DateTime;
	
	/**
	 * DateTime 객체의 뺄셈 연산입니다.
	 */
	subtract(datetimeObject: DateTime | Duration | DurationTemplate): DateTime | Duration;
	
	/**
	 * DateTime 객체의 대입 연산입니다.
	 */
	set(datetimeObject: DateTime | SetDateTimeTemplate | Date | Time): DateTime;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 두 객체가 같으면 true를 반환합니다.
	 */
	eq(datetimeObject: DateTime | number | $D | SetDateTimeTemplate, ignoreMillisecond?: boolean): boolean;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 두 객체가 다르면 true를 반환합니다.
	 */
	neq(datetimeObject: DateTime | number | $D | SetDateTimeTemplate, ignoreMillisecond?: boolean): boolean;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 현재 객체가 `datetimeObject`보다 이르거나 같으면 true를 반환합니다.
	 */
	ge(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 현재 객체가 `datetimeObject`보다 이르면 true를 반환합니다.
	 */
	gt(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 현재 객체가 `datetimeObject`보다 늦거나 같으면 true를 반환합니다.
	 */
	le(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	/**
	 * DateTime 객체의 비교 연산입니다. 현재 객체가 `datetimeObject`보다 늦으면 true를 반환합니다.
	 */
	lt(datetimeObject: DateTime | number | $D | SetDateTimeTemplate): boolean;
	
	/**
	 * 시간을 설정합니다.
	 * @param hour 시
	 * @param minute 분
	 * @param second 초
	 * @param millisecond 밀리초
	 */
	static at(hour: number, minute?: number, second?: number, millisecond?: number): DateTime;

	/**
	 * 시간을 설정합니다.
	 * @param hour 시
	 * @param minute 분
	 * @param second 초
	 * @param millisecond 밀리초
	 */
	at(hour: number, minute?: number, second?: number, millisecond?: number): DateTime;

	/**
	 * 시간을 설정합니다.
	 * @param time 시간
	 */
	at(time: Time): DateTime;

	/**
	 * 년도를 설정합니다.
	 * @param year 년도
	 */
	static in(year: number): DateTime;
	
	/**
	 * 월, 일을 설정합니다.
	 * @param month 월
	 * @param day 일
	 */
	static on(month: number, day?: number): DateTime;
	
	/**
	 * DateTime 객체를 설정합니다.
	 */
	static set(datetimeObject: SetDateTimeTemplate): DateTime;
	
	/**
	 * 문자열에서 날짜 기간을 추출합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 */
	static parseDuration(dateString: string, getString: true, filterIncludeEnding?: boolean = true, std?: DateTime = DateTime.now(), locale?: string, globalizationPath?: string): {
		parse: {
			from: DateTime | undefined,
			to: DateTime | undefined
		}, string: string
	};
	
	/**
	 * 문자열에서 날짜 기간을 추출합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 */
	static parseDuration(dateString: string, getString?: false, filterIncludeEnding?: boolean = true, std?: DateTime = DateTime.now(), locale?: string, globalizationPath?: string): {
		from: DateTime | undefined,
		to: DateTime | undefined
	};
	
	/**
	 * 문자열에서 날짜를 추출합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 * @param defaultToEnd 기준을 끝내는 것으로 잡을 지 여부 (e.g. 12시 3분 -> 12시 3분 59초 999ms)
	 */
	static parse(dateString: string, getString: true, filterIncludeEnding?: boolean = true, trim?: boolean = true, std?: DateTime = DateTime.now(), locale?: string, globalizationPath?: string, defaultToEnd?: boolean): {
		parse: DateTime | undefined, string: string
	};
	
	/**
	 * 문자열에서 날짜를 추출합니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 * @param std 기준이 되는 DateTime 객체
	 * @param locale 로케일
	 * @param globalizationPath globalization 폴더의 경로
	 * @param defaultToEnd 기준을 끝내는 것으로 잡을 지 여부 (e.g. 12시 3분 -> 12시 3분 59초 999ms)
	 */
	static parse(dateString: string, getString?: false, filterIncludeEnding?: boolean = true, trim?: boolean = true, std?: DateTime = DateTime.now(), locale?: string, globalizationPath?: string, defaultToEnd?: boolean): DateTime | undefined;
	
	/**
	 * 문자열에서 날짜를 추출합니다. 기준은 현재 시간입니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 */
	parse(dateString: string, getString: true, filterIncludeEnding?: boolean = true, trim?: boolean = true): {
		parse: DateTime | undefined, string: string
	};
	
	/**
	 * 문자열에서 날짜를 추출합니다. 기준은 현재 시간입니다.
	 * @param dateString 변환할 날짜 문자열
	 * @param getString `dateString`에서 날짜 기간을 제거한 문자열을 반환할 지 여부
	 * @param filterIncludeEnding 어미를 포함할 지 여부
	 * @param trim `getString`이 true일 때 날짜 기간이 제거된 문자열의 앞뒤 공백을 제거할 지 여부
	 */
	parse(dateString: string, getString?: false, filterIncludeEnding?: boolean = true, trim?: boolean = true): DateTime | undefined;
	
	// private static _parse(dateString: string, locale?: string): [ SetDateTimeTemplate, string? ];
	
	/**
	 * 현재 시간으로 DateTime 인스턴스를 생성합니다.
	 */
	static now(): DateTime;
	
	/**
	 * 오늘 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static today(): DateTime;
	
	/**
	 * 내일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static tomorrow(): DateTime;
	
	/**
	 * 어제 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static yesterday(): DateTime;
	
	/**
	 * 일요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static sunday(): DateTime;
	
	/**
	 * 월요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static monday(): DateTime;
	
	/**
	 * 화요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static tuesday(): DateTime;
	
	/**
	 * 수요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static wednesday(): DateTime;
	
	/**
	 * 목요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static thursday(): DateTime;
	
	/**
	 * 금요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static friday(): DateTime;
	
	/**
	 * 토요일 0시로 DateTime 인스턴스를 생성합니다.
	 */
	static saturday(): DateTime;
	
	/**
	 * 1월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static january(day?: number): DateTime;
	
	/**
	 * 2월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static february(day?: number): DateTime;
	
	/**
	 * 3월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static march(day?: number): DateTime;
	
	/**
	 * 4월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static april(day?: number): DateTime;
	
	/**
	 * 5월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static may(day?: number): DateTime;
	
	/**
	 * 6월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static june(day?: number): DateTime;
	
	/**
	 * 7월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static july(day?: number): DateTime;
	
	/**
	 * 8월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static august(day?: number): DateTime;
	
	/**
	 * 9월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static september(day?: number): DateTime;
	
	/**
	 * 10월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static october(day?: number): DateTime;
	
	/**
	 * 11월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static november(day?: number): DateTime;
	
	/**
	 * 12월 `day`일로 DateTime 인스턴스를 생성합니다.
	 * @param day
	 */
	static december(day?: number): DateTime;
	
	/**
	 * `year`가 윤년인지 판별합니다.
	 * @param year
	 */
	static isLeapYear(year: number): boolean;
	
	/**
	 * `start`부터 `end`까지의 윤년의 개수를 반환합니다.
	 * @param start
	 * @param end
	 */
	static leapYearCount(start: number, end: number): number;
	
	/**
	 * `year`의 `month`의 일 수를 반환합니다.
	 * @param year
	 * @param month
	 */
	static lengthOfMonth(year: number, month: number): number;
	
	/**
	 * `year`의 일 수를 반환합니다.
	 * @param year
	 */
	static lengthOfYear(year: number): number;
	
	/**
	 * `weekDayName`에 해당하는 요일의 인덱스를 반환합니다.
	 * @param weekDayName
	 * @param startOnMon
	 * @param locale
	 */
	static getWeekdayFromName(weekDayName: string, startOnMon?: boolean, locale?: string): number;
	
	/**
	 * 인스턴스의 연도가 윤년인지 확인합니다.
	 */
	isLeapYear(): boolean;
	
	/**
	 * 인스턴스의 날짜가 주말인지 확인합니다.
	 */
	isWeekend(): boolean;
	
	/**
	 * 인스턴스의 날짜가 평일인지 확인합니다.
	 */
	isWeekday(): boolean;
	
	/**
	 * 인스턴스의 날짜가 오늘인지 확인합니다.
	 */
	isToday(): boolean;
	
	/**
	 * 인스턴스의 날짜의 달의 길이를 반환합니다.
	 */
	lengthOfMonth(): number;
	
	/**
	 * 인스턴스의 날짜의 연도의 총 일 수를 반환합니다.
	 */
	lengthOfYear(): number;
}