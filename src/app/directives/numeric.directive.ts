import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[numeric]",
})
export class NumericDirective {
  private check(value: string) {
    return String(value).match(new RegExp(/^\d+$/));
  }

  private run(oldValue: any) {
    setTimeout(() => {
      let currentValue: string = this.el.nativeElement.value;
      if (currentValue !== "" && !this.check(currentValue)) {
        this.el.nativeElement.value = oldValue;
      }
    });
  }

  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.run(this.el.nativeElement.value);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(this.el.nativeElement.value);
  }
}
