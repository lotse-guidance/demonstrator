import { Component, OnInit } from '@angular/core';
import { ChannelService } from './services/channel.service';
import { MouseTrackerService } from './services/mouse-tracker.service';

@Component({
  selector: 'gsd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GuidanceStudy';

  constructor(private channelService: ChannelService,
              private mouseTrackerService: MouseTrackerService) {
  }

  ngOnInit(): void {
    this.channelService.connect();
  }


}
