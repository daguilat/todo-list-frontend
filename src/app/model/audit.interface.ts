import { UserI } from './user.interface';
import { TaskI } from './task.interface';

export interface AuditI {
    audit_id   : number,
    user       : UserI,
    task       : TaskI,
    activity   : string,
    date       : Date
}