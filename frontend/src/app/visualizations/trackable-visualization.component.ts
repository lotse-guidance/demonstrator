import { Directive, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { GuidanceService } from '../services/guidance.service';
import { InteractionTypes, Suggestion, SuggestionModel } from '../schemas/schemas';

@Directive()
// ts-ignore directive-class-suffix
export abstract class TrackableVisualizationComponent<T> implements OnInit {

  public suggestions: Suggestion<T>[] = [];

  public constructor(private channelService: ChannelService,
                     protected dialog: MatDialog,
                     protected guidanceService: GuidanceService) {

  }

  ngOnInit(): void {
    this.channelService.messages$.subscribe(message => {
      if (!this.getStrategies().includes(message.suggestion.strategy)) {
        return;
      }

      this.processGuidance(message.suggestion, message.interaction);
    });
  }

  /**
   * The name of the strategies for which guidance events should be processed.
   */
  abstract getStrategies(): Array<string>;

  /**
   * The name of the component. Will be used to determine whether a received socket message concerns the current component
   * and for logging purposes.
   */
  abstract getComponent(): string;

  /**
   * A unique name for the component in case there are multiple instances of the same component.
   */
  abstract getName(): string;

  /**
   * Handle new, incoming guidance suggestions
   * @param suggestion the suggestion
   */
  guidanceMake(suggestion: Suggestion<T>): void {
    this.suggestions.push(suggestion);
  }

  /**
   * Handle starting a new guidance suggestion preview
   * @param suggestion the suggestion
   */
  abstract guidancePreviewStart(suggestion: Suggestion<T>): void;

  /**
   * Handle ending a guidance suggestion preview
   * @param suggestion the suggestion
   */
  abstract guidancePreviewEnd(suggestion: Suggestion<T>): void;

  protected guidanceRetract(suggestion: Suggestion<T>): void {
    this.guidancePreviewEnd(suggestion);
  }

  protected guidanceAfterAccept(suggestion: Suggestion<T>): void { }

  protected guidanceReject(suggestion: Suggestion<T>): void {
    this.guidancePreviewEnd(suggestion);
  }

  /**
   * Handle a new guidance event
   * @param suggestion the suggestion
   * @param interaction the interaction type
   */
  public processGuidance(suggestion: Suggestion<T>, interaction: InteractionTypes): void {
    // suggestion.event = this.trackingEventManipulator(suggestion.event);
    switch (interaction) {
      case 'make':
        this.guidanceMake(suggestion);
        break;
      case 'accept':
        // this.guidancePreviewEnd(suggestion);
        this.guidanceService.acceptGuidance(new SuggestionModel(suggestion, 'accept'));
        this.removeSuggestion(suggestion);
        this.guidanceAfterAccept(suggestion);
        break;
      case 'preview end':
        this.guidancePreviewEnd(suggestion);
        break;
      case 'preview start':
        this.guidancePreviewStart(suggestion);
        break;
      case 'reject':
        this.removeSuggestion(suggestion);
        this.guidancePreviewEnd(suggestion);
        this.guidanceReject(suggestion);
        this.guidanceService.rejectGuidance(new SuggestionModel(suggestion, 'reject'));
        break;
      case 'retract':
        this.guidanceRetract(suggestion);
        break;
    }
  }

  private removeSuggestion(suggestion: Suggestion<T>): void {
    this.suggestions = this.suggestions.filter(s => s.id !== suggestion.id)
  }
}
