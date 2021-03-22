import { UserI } from './user.interface';

export interface TaskI {
    task_id     : number,
    title       : string,
    description : string,
    user        : UserI,
    state       : string
}