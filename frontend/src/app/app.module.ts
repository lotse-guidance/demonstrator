import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AxisSelectorComponent } from './weather-analysis/axis-selector/axis-selector.component';
import { GenericVisualizationButtonsComponent } from './weather-analysis/generic-visualization-buttons/generic-visualization-buttons.component';
import { WeatherAnalysisComponent } from './weather-analysis/weather-analysis.component';
import { VisualizationInfoTooltipComponent } from './weather-analysis/visualization-info-tooltip/visualization-info-tooltip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AxisSelectorChangeDialogComponent } from './weather-analysis/axis-selector/axis-selector-change-dialog/axis-selector-change-dialog.component';
import { DimpvisComponent } from './visualizations/dimpvis/dimpvis.component';
import { TimeSliderBrushDialogComponent } from './visualizations/timeslider/brush-dialog/time-slider-brush-dialog/time-slider-brush-dialog.component';
import { SuggestionCardComponent } from './visualizations/suggestions/suggestion-card/suggestion-card.component';
import { StationTooltipComponent } from './visualizations/dimpvis/station-tooltip/station-tooltip.component';
import { SuggestionListComponent } from './visualizations/suggestions/suggestion-list/suggestion-list.component';
import { TimesliderComponent } from './visualizations/timeslider/timeslider.component';
import { BrushDialogComponent } from './visualizations/dimpvis/brush-dialog/brush-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AxisSelectorComponent,
    GenericVisualizationButtonsComponent,
      WeatherAnalysisComponent,
      VisualizationInfoTooltipComponent,
      AxisSelectorChangeDialogComponent,
    AppComponent,
    DimpvisComponent,
    TimesliderComponent,
    BrushDialogComponent,
    SuggestionCardComponent,
    TimeSliderBrushDialogComponent,
    WeatherAnalysisComponent,
    AxisSelectorComponent,
    AxisSelectorChangeDialogComponent,
    StationTooltipComponent,
    SuggestionListComponent,
    GenericVisualizationButtonsComponent,
    VisualizationInfoTooltipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    HttpClientModule,
    MatSliderModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCardModule,
    DragDropModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatOptionModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatRippleModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
