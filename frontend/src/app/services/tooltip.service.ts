import {
    ComponentType,
    ConnectedPosition,
    FlexibleConnectedPositionStrategyOrigin,
    Overlay,
    OverlayPositionBuilder,
    OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';

/**
 * Service to handle the creation and closing for tooltips with custom component
 */
@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  private overlayRef: OverlayRef;
  // tslint:disable-next-line
  private tooltipRef?: ComponentRef<any>;
  // An array containing the preferred positions in order for the tooltip to be displayed
  private positions: ConnectedPosition[] = [
    {
      overlayX: 'start',
      overlayY: 'top',
      originX: 'end',
      originY: 'bottom',
      offsetX: 5,
      offsetY: 5
    },
    {
      overlayX: 'end',
      overlayY: 'top',
      originX: 'start',
      originY: 'bottom',
      offsetX: -5,
      offsetY: 5
    },
    {
      overlayX: 'start',
      overlayY: 'bottom',
      originX: 'end',
      originY: 'top',
      offsetX: 5,
      offsetY: -5
    },
    {
      overlayX: 'end',
      overlayY: 'bottom',
      originX: 'start',
      originY: 'top',
      offsetX: -5,
      offsetY: -5
    },
  ];

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder) {
    this.overlayRef = this.overlay.create();
  }

  /**
   * Opens a tooltip with a given template and position
   * @param tooltipComponent Component to use as the tooltip template
   * @param position an object containing an x and y value to position the tooltip
   * @returns the instance of the created tooltip
   */
  openTooltip<T>(tooltipComponent: ComponentType<T>, position: FlexibleConnectedPositionStrategyOrigin): T {
    const tooltipPortal = new ComponentPortal(tooltipComponent);
    const pos = this.overlayPositionBuilder
      .flexibleConnectedTo(position)
      .withPositions(this.positions)
      .withGrowAfterOpen(true);
    this.overlayRef.updatePositionStrategy(pos);
    this.tooltipRef = this.overlayRef.attach(tooltipPortal);
    this.overlayRef.updatePosition();
    return this.tooltipRef.instance;
  }

  /**
   * Closes the currently opened tooltip
   */
  close(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.tooltipRef = undefined;
    }

  }
}
