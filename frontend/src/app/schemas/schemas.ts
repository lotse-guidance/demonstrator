import { MeasurementDimension } from '../weather-analysis/weather-analysis.component';

export type Event = 'reset' |
    'click' | 'mouseover' | 'change' | 'flashlight on' | 'flashlight off' | 'zoom in' | 'zoom out' | 'suggest zoom' | 'highlight'
    | 'timeslide'
    | 'axis select'

export type InteractionTypes = 'make' | 'accept' | 'reject' | 'preview start' | 'preview end' | 'retract';

export class SuggestionModel<T> {
    suggestion: Suggestion<T>;
    interaction: InteractionTypes;
    type: string = 'guidance';

    constructor(suggestion: Suggestion<T>, interaction: InteractionTypes) {
        this.suggestion = suggestion;
        this.interaction = interaction;
    }
}

export type GuidanceDegree = 'orienting' | 'directing' | 'prescribing';
export interface Suggestion<T> {
    title: string;
    description: string;
    id: number;
    degree: GuidanceDegree;
    event: SuggestionContent<T>;
    strategy: string
}



export interface SuggestionContent<T> {
    value: T
    action_id: string
}

// ==========================================================
// DATA
// ==========================================================

export interface Measurement {
    date: Date;
    station: string;
    continent: string;

    humidity: number;
    pressure: number;
    temperature: number;
    avg_temp: number;
}

export const MeasurementDimensionUnitMap = new Map<MeasurementDimension, string>([
    ['humidity', '%'],
    ['pressure', 'hpa'],
    ['avg_temp', '°C'],
]);
