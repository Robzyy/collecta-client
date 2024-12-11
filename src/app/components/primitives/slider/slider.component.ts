import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'SliderComponent',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) value: number = 0;
  @Input({ required: true }) min: number = 0;
  @Input({ required: true }) max: number = 100;
  @Input({ required: true }) step: number | 'any' = 'any';

  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('activeTrack') activeTrack!: ElementRef;
  @ViewChild('inactiveTrack') inactiveTrack!: ElementRef;
  @ViewChild('thumb') thumb!: ElementRef;
  @ViewChild('rangeInput') rangeInput!: ElementRef<HTMLInputElement>;

  private isDragging = false;
  private sliderLeft = 0;
  private sliderWidth = 0;

  private boundMouseMove: (event: MouseEvent) => void;
  private boundMouseUp: () => void;

  constructor() {
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundMouseUp = this.onMouseUp.bind(this);
  }

  ngAfterViewInit() {
    this.updateTrackWidth();
    this.setupDragListeners();
  }

  private setupDragListeners() {
    window.addEventListener('mousemove', this.boundMouseMove);
    window.addEventListener('mouseup', this.boundMouseUp);
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.boundMouseMove);
    window.removeEventListener('mouseup', this.boundMouseUp);
  }

  private updateTrackWidth() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.activeTrack.nativeElement.style.width = percentage + '%';
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    this.sliderLeft = rect.left;
    this.sliderWidth = rect.width;

    this.sliderContainer.nativeElement.classList.add('cursor-ew-resize');
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    this.thumb.nativeElement.classList.add('scale-x-150');

    const deltaX = Math.max(
      0,
      Math.min(this.sliderWidth, event.clientX - this.sliderLeft),
    );
    const percentage = (deltaX / this.sliderWidth) * 100;

    const range = this.max - this.min;
    let newValue = (percentage / 100) * range + this.min;

    if (this.step !== 'any') {
      newValue = Math.round(newValue / this.step) * this.step;
      newValue = Math.max(this.min, Math.min(this.max, newValue));
    } else {
      newValue = Math.round(newValue * 100) / 100;
    }

    if (newValue !== this.value) {
      this.value = newValue;
      this.updateTrackWidth();
      this.valueChange.emit(this.value);
      this.rangeInput.nativeElement.value = newValue.toString();
    }
  };

  private onMouseUp = () => {
    this.isDragging = false;
    this.thumb.nativeElement.classList.remove('scale-x-150');
    this.sliderContainer.nativeElement.classList.remove('cursor-ew-resize');
  };
}
