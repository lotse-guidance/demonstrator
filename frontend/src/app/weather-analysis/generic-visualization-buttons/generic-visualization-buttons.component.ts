import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { VisualizationInfoTooltipComponent } from '../visualization-info-tooltip/visualization-info-tooltip.component';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'gs-generic-visualization-buttons',
  templateUrl: './generic-visualization-buttons.component.html',
  styleUrls: ['./generic-visualization-buttons.component.scss']
})
export class GenericVisualizationButtonsComponent {

  @Input() showReset = true;
  @Input() template: TemplateRef<any>;
  @Output() resetVis = new EventEmitter();
  @ViewChild("tooltipOrigin") overlayOrigin: ElementRef;

  constructor(private tooltip: TooltipService) { }

  openTooltip() {
    const rect = this.overlayOrigin.nativeElement.getBoundingClientRect()
    const tooltip = this.tooltip.openTooltip(VisualizationInfoTooltipComponent, {x: rect.x, y: rect.y + 20});
    tooltip.template = this.template;
  }
}
