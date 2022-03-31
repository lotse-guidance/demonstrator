import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SuggestionModel } from '../schemas/schemas';

@Injectable({
    providedIn: 'root'
})
export class GuidanceService {

    constructor(private http: HttpClient) {
    }

    public acceptGuidance(interaction: SuggestionModel<any>) {
        this.http.post(`${environment.backend}/guidance/accept`, interaction).subscribe({
            complete: () => {
            },
            error: e => {
                console.error(e);
                throw e;
            }
        })
    }

    public rejectGuidance(interaction: SuggestionModel<any>) {
        this.http.post(`${environment.backend}/guidance/reject`, interaction).subscribe({
            complete: () => {
            },
            error: e => {
                console.error(e);
                throw e;
            }
        })
    }

    public updateState(update: GuidanceStateUpdate) {
        this.http.post(`${environment.backend}/guidance/state/update`, update).subscribe({
            complete: () => {
            },
            error: e => {
                console.error(e);
                throw e;
            }
        })
    }

    public updateStateWithCallback(update: GuidanceStateCallbackUpdate) {
        this.http.post(`${environment.backend}/guidance/state/update_with_callback`, update).subscribe({
            complete: () => {
            },
            error: e => {
                console.error(e);
                throw e;
            }
        })
    }
}

interface StateUpdate {
    re_evaluate_strategies?: boolean;
    re_evaluate_actions?: boolean;
}

export interface GuidanceStateUpdate extends StateUpdate {
    updates: {[key: string]: any}
}

export interface GuidanceStateCallbackUpdate extends StateUpdate {
    callback: string;
    params: { [key: string]: any };
}
