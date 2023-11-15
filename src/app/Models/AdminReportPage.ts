import { Report } from '../Models/report';
export interface AdminReportPage{
    content : Report[],
    pageable : any,
    totalPages:number,
    size : number
}