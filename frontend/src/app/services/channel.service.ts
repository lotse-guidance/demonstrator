import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { Suggestion, SuggestionModel } from '../schemas/schemas';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  public messages$: Subject<SuggestionModel<any>> = new Subject<SuggestionModel<any>>();
  private subscription?: Subscription;

  private apiPrefix = 'channels';

  private readonly _userID: string;
  private connected: boolean = false;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
    this._userID = 'user'
  }

  public connect(): Subject<SuggestionModel<any>> {
    if (this.subscription) {
      this.disconnect();
    }

    this.subscription = webSocket(`${environment.backendWS}/${this.apiPrefix}/${this._userID}`)
        .subscribe((next: SuggestionModel<any>) => this.messages$.next(next));
    this.connected = true;

    return this.messages$;
  }

  public disconnect(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.connected = false;

    this.snackBar.open('Successfully disconnected.', 'OK');
    // alert('Disconnected.')
  }

  public get userID(): string {
    return this._userID;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}
