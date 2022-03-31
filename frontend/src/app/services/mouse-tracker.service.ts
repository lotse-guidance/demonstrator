import { Injectable } from '@angular/core';
import { GuidanceService } from './guidance.service';

@Injectable({
  providedIn: 'root'
})
export class MouseTrackerService {

  constructor(private guidanceService: GuidanceService) {
    document.addEventListener('click', this.directLoggerListener);
  }

  directLoggerListener = (e: MouseEvent) => {
    this.guidanceService.updateState({
      updates: {
        'last_interaction': Math.floor(+new Date() / 1000)
      },
      re_evaluate_actions: false
    })
  }
}