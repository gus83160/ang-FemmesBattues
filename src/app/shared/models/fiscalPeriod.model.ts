import * as _moment from 'moment';

export class FiscalPeriod {

	public id:string;
	public start:string;
	public end:string;
	public periodToString:string;
	public status:string;

	constructor(data:any) {
		this.start = data.start.format('YYYY-MM');
		this.end = data.end.format('YYYY-MM');
		this.id = data.id;
	}

	public static startDate(start:string) {
		return _moment(start + '-01', 'yyyy-MM-dd');
	}

	public static endDate(end:string) {
		return _moment(end, 'yyyy-MM').endOf('month');
	}

}