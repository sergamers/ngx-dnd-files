import { Directive, ElementRef, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDndFiles]',
  exportAs: 'appDndFiles'
})
export class DndFilesDirective implements OnInit {
  /** Режим загрузки файлов */
  @Input() private isMulti = true;

  /** Событие, которое говорит, что нужно загрузить файл */
  @Output() private readonly isUploadFile = new EventEmitter<File[]>();

  /** Файл в драг области */
  public inDragArea = false;

  /** Загрузчик */
  private fileField: HTMLInputElement;

  @HostListener('dragenter', ['$event'])
  dragenter(e): void {
    this.isDragHover(e, true);
  }

  @HostListener('dragover', ['$event'])
  dragover(e): void {
    this.isDragHover(e, true);
  }

  @HostListener('dragleave', ['$event'])
  dragleave(e): void {
    this.isDragHover(e, false);
  }

  @HostListener('dragleave', ['$event'])
  dragend(e): void {
    this.isDragHover(e, false);
  }

  @HostListener('drop', ['$event'])
  drop(e: DragEvent): void {
    this.isDragHover(e, false);

    const files = Array.from(e.dataTransfer.files);

    this.isUploadFile.emit(files);
  }


  constructor(private el: ElementRef) {
    this.fileField = document.createElement('input');
    this.fileField.type = 'file';
    this.fileField.className = 'dndFiles';
    this.fileField.setAttribute(
      'style',
      `
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;`
    );

    this.el.nativeElement.appendChild(this.fileField);
  }

  ngOnInit(): void {
    this.fileField.multiple = this.isMulti;
  }

  /** открыть окно загрузки файлов */
  public openWindow(): void {
    this.fileField.click();
  }

  /** Задаем статус перемещаемого файла */
  private isDragHover(e, inDragArea: boolean): void {
    e.preventDefault();
    e.stopPropagation();

    this.inDragArea = inDragArea;
  }
}
